import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { RNS3 } from 'react-native-aws3';

// Actions
import { navigate } from '../actions/navigator';
import {
  CREATE_USER,
  createUser as createUserAction,
  UPDATE_USER,
  updateUser as updateUserAction,
  FETCH_OBSERVED_USER,
  fetchObservedUser as fetchObservedUserAction,
  ADD_CLASS_TO_MY_CLASSES,
  addClassToMyClasses as addClassToMyClassesAction,
  ADD_CLASS_TO_FAVORITES,
  addClassToFavorites as addClassToFavoritesAction,
  ADD_CLASS_TO_WATCHED,
  addClassToWatched as addClassToWatchedAction,
  incrementUserScore,
} from '../actions/userActions';
import { showErrorBox } from '../actions/appActions';

// GraphQL Methods
import { getUserQuery } from '../graphql/queries/userQueries';
import {
  updateUserMutation,
  addClassToMyClasses as addClassToMyClassesMutation,
  addClassToFavorites as addClassToFavoritesMutation,
  addClassToWatched as addClassToWatchedMutation,
  incrementUsersScore as incrementUsersScoreMutation,
} from '../graphql/mutations/userMutations';
import { incrementSignedMutation } from '../graphql/mutations/classesMutations';

// Other
import client from '../apolloClient';
import { validator as signUpValidator } from '../models/SignUpForm';
import { validator as profileEditValidator } from '../models/ProfileEditForm';
import { AWS_OPTIONS, DEFAULT_ERROR_MESSAGE } from '../variables';
import { awsResponseLocationParser, validateForm } from '../helpers';

// Function responsible for fetching observed user
function* fetchObservedUser({ payload: { id } }) {
  try {
    const { errors, data: { getUser } } = yield call(client.query, getUserQuery(id));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(fetchObservedUserAction.success({
      ...getUser,
      rate:
        getUser.rate.edges.reduce(
          (sum, { node: { rating } }) => sum + rating, 0
        ) / getUser.rate.length,
      avatar: getUser.avatar ?
        { uri: getUser.avatar } : require('../../assets/img/avatar_placeholder.png'),
    }));
  } catch (err) {
    yield put(fetchObservedUserAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for creating new user
function* createUser({ payload: { user } }) {
  try {
    validateForm(user.toJS(), signUpValidator);

    let avatarUrl = '';

    if (user.avatar) {
      const { status, text } = yield RNS3.put({
        uri: user.avatar,
        type: 'img/png',
        name: `${user.id}.png`,
      }, AWS_OPTIONS);

      if (status !== 201) {
        throw new Error(text);
      }

      avatarUrl = awsResponseLocationParser(text);
    }

    const { data: { updateUser: { changedUser } }, errors } =
      yield call(client.mutate, updateUserMutation({ ...user.toJS(), avatar: avatarUrl }));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(createUserAction.success({
      ...changedUser,
      rate: 0,
      score: 0,
      avatar: changedUser.avatar ?
        { uri: changedUser.avatar } : require('../../assets/img/avatar_placeholder.png'),
    }));
    yield put(navigate('push', 'home'));
  } catch (err) {
    const errorMessage = err.toString();
    const isValidationError = errorMessage.includes('VALIDATION_ERROR');
    yield put(createUserAction.failure(err));
    yield put(
      showErrorBox(isValidationError ? errorMessage.split('/')[1] : DEFAULT_ERROR_MESSAGE, true)
    );
  }
}

// Function responsible for updating current user
function* updateUser({ payload: { user } }) {
  try {
    validateForm(user.toJS(), profileEditValidator);

    let avatarUrl = '';
    if (user.avatar) {
      const resp = yield RNS3.put({
        uri: user.avatar,
        type: 'img/png',
        name: `${user.id}.png`,
      }, AWS_OPTIONS);

      if (resp.status !== 201) {
        throw new Error(resp.text);
      }

      avatarUrl = awsResponseLocationParser(resp.text);
    }

    const { data: { updateUser: { changedUser } }, errors } =
      yield call(client.mutate, updateUserMutation({ ...user.toJS(), avatar: avatarUrl }));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(updateUserAction.success({
      ...changedUser,
      rate: changedUser.rate.edges.reduce(
          (sum, { node: { rating } }) => sum + rating, 0
        ) / changedUser.rate.length,
      avatar: changedUser.avatar ?
        { uri: changedUser.avatar } : require('../../assets/img/avatar_placeholder.png'),
    }));
    yield put(navigate('back'));
  } catch (err) {
    const errorMessage = err.toString();
    const isValidationError = errorMessage.includes('VALIDATION_ERROR');
    yield put(updateUserAction.failure(err));
    yield put(
      showErrorBox(isValidationError ? errorMessage.split('/')[1] : DEFAULT_ERROR_MESSAGE, true)
    );
  }
}

// Function responsible for adding bought class to myClasses list
function* addClassToMyClasses({ payload: { classId, user: { id, myClasses, score }, signed } }) {
  try {
    const { data: { updateUser: { changedUser } }, errors } =
      yield call(client.mutate, addClassToMyClassesMutation(id, [classId, ...myClasses.toJS()]));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const response = yield call(client.mutate, incrementSignedMutation(classId, signed + 1));

    if (response.errors && response.errors.length > 0) {
      throw new Error(errors);
    }

    const scoreResponse = yield call(client.mutate, incrementUsersScoreMutation(id, score + 1));

    if (scoreResponse.errors && scoreResponse.errors.length > 0) {
      throw new Error(errors);
    }

    yield put(addClassToMyClassesAction.success({
      list: changedUser.myClasses,
      signed: signed + 1,
      classId,
    }));
    yield put(incrementUserScore());
    yield put(navigate('push', 'active_class'));
  } catch (err) {
    yield put(addClassToMyClassesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for adding class to favourites
function* addClassToFavorites({ payload: { classId, user: { id, favorites } } }) {
  try {
    const { data: { updateUser: { changedUser } }, errors } =
      yield call(client.mutate, addClassToFavoritesMutation(id, [classId, ...favorites.toJS()]));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(addClassToFavoritesAction.success({
      list: changedUser.favorites,
      classId,
    }));
  } catch (err) {
    yield put(addClassToFavoritesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for adding class to watched list
function* addClassToWatched({ payload: { classId, user: { id, watched } } }) {
  try {
    const { data: { updateUser: { changedUser } }, errors } =
      yield call(client.mutate, addClassToWatchedMutation(id, [classId, ...watched.toJS()]));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(addClassToWatchedAction.success({
      list: changedUser.watched,
      classId,
    }));
  } catch (err) {
    yield put(addClassToWatchedAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Listeners exposition
export default function* userSaga() {
  yield [
    takeEvery(FETCH_OBSERVED_USER.REQUEST, fetchObservedUser),
    takeEvery(CREATE_USER.REQUEST, createUser),
    takeEvery(UPDATE_USER.REQUEST, updateUser),
    takeEvery(ADD_CLASS_TO_MY_CLASSES.REQUEST, addClassToMyClasses),
    takeEvery(ADD_CLASS_TO_FAVORITES.REQUEST, addClassToFavorites),
    takeEvery(ADD_CLASS_TO_WATCHED.REQUEST, addClassToWatched),
  ];
}
