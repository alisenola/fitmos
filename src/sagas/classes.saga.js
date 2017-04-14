import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { RNS3 } from 'react-native-aws3';

// Actions
import { navigate } from '../actions/navigator';
import {
  FETCH_NEW_CLASSES,
  fetchNewClasses as fetchNewClassesAction,
  FETCH_MY_CLASSES,
  fetchMyClasses as fetchMyClassesAction,
  FETCH_WATCHED_CLASSES,
  fetchWatchedClasses as fetchWatchedClassesAction,
  FETCH_CLASSES_I_GIVE,
  fetchClassesIGive as fetchClassesIGiveAction,
  CREATE_CLASS,
  createClass as createClassAction,
  CREATE_COMMENT,
  createComment as createCommentAction,
  GET_LOCATION_DETAILS,
  getLocationDetails as getLocationDetailsAction,
  setPage,
} from '../actions/classesActions';
import { showErrorBox } from '../actions/appActions';

// GraphQL methods
import {
  createLocationMutation,
  createClassMutation,
  createCommentMutation,
} from '../graphql/mutations/classesMutations';
import {
  getClassesQuery,
  getClassesbyIdsQuery,
  getClassesIGiveQuery,
} from '../graphql/queries/classesQueries';

// Other
import client from '../apolloClient';
import { fetch } from '../api';
import {
  AWS_OPTIONS,
  AWS_API_URL,
  DEFAULT_ERROR_MESSAGE,
  GOOGLE_GEOLOCATION_API_URL,
  GOOGLE_API_KEY,
} from '../variables';
import { validator as addClassValidator } from '../models/AddClassForm';
import { awsResponseLocationParser, validateForm } from '../helpers';

// Function responsible for fetching new classes
function* fetchNewClasses({ payload: { page } }) {
  try {
    const { errors, data: { viewer: { searchClasssByQuery: { hits } } } } =
      yield call(client.query, getClassesQuery(page));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = hits.map((e) => ({
      ...e,
      id: e.objectID,
      image: e.image ? { uri: e.image } : require('../../assets/img/class_placeholder.png'),
      owner: {
        ...e.owner,
        avatar: e.owner.avatar ?
          { uri: e.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
      comments: e.comments.edges.map(({ node }) => ({
        ...node,
        owner: {
          ...node.owner,
          avatar: node.owner.avatar ?
            { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
        },
      })),
    }));

    yield put(fetchNewClassesAction.success(list));
    yield put(setPage('newClasses', page + 1));
  } catch (err) {
    yield put(fetchNewClassesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for fetching subscribtions
function* fetchMyClasses({ payload: { ids } }) {
  try {
    const { errors, data: { viewer: { searchClasssByIds: { results } } } } =
      yield call(client.query, getClassesbyIdsQuery(ids));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = results.map((e) => ({
      ...e,
      id: e.objectID,
      image: e.image ? { uri: e.image } : require('../../assets/img/class_placeholder.png'),
      owner: {
        ...e.owner,
        avatar: e.owner.avatar ?
          { uri: e.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
      comments: e.comments.edges.map(({ node }) => ({  // eslint-disable-line no-shadow
        ...node,
        owner: {
          ...node.owner,
          avatar: node.owner.avatar ?
            { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
        },
      })),
    }));

    yield put(fetchMyClassesAction.success(list));
  } catch (err) {
    yield put(fetchMyClassesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for fetching subscribtions
function* fetchWatchedClasses({ payload: { ids } }) {
  try {
    const { errors, data: { viewer: { searchClasssByIds: { results } } } } =
      yield call(client.query, getClassesbyIdsQuery(ids));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = results.map((e) => ({
      ...e,
      id: e.objectID,
      image: e.image ? { uri: e.image } : require('../../assets/img/class_placeholder.png'),
      owner: {
        ...e.owner,
        avatar: e.owner.avatar ?
          { uri: e.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
      comments: e.comments.edges.map(({ node }) => ({  // eslint-disable-line no-shadow
        ...node,
        owner: {
          ...node.owner,
          avatar: node.owner.avatar ?
            { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
        },
      })),
    }));

    yield put(fetchWatchedClassesAction.success(list));
  } catch (err) {
    yield put(fetchWatchedClassesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for fetching classes i'm giving
function* fetchClassesIGive({ payload: { id } }) {
  try {
    const { errors, data: { getUser: { classesIGive: { edges } } } } =
      yield call(client.query, getClassesIGiveQuery(id));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = edges.map(({ node }) => ({
      ...node,
      image: node.image ? { uri: node.image } : require('../../assets/img/class_placeholder.png'),
      owner: {
        ...node.owner,
        avatar: node.owner.avatar ?
          { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
      comments: node.comments.edges.map(({ node }) => ({  // eslint-disable-line no-shadow
        ...node,
        owner: {
          ...node.owner,
          avatar: node.owner.avatar ?
            { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
        },
      })),
    }));

    yield put(fetchClassesIGiveAction.success(list));
  } catch (err) {
    yield put(fetchClassesIGiveAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for adding new class
function* addClass({ payload: { form, ownerId } }) {
  try {
    validateForm(form.toJS(), addClassValidator);

    const { location, beginsDate, endsDate, ...newClass } = form.toJS();
    const locationResponse =
      yield call(client.mutate, createLocationMutation(location));

    if (locationResponse.errors && locationResponse.errors.length > 0) {
      throw new Error(locationResponse.errors);
    }

    const { data: { createLocationEntry: { changedLocationEntry: { id } } } } = locationResponse;

    let image = '';
    if (form.image) {
      const { status, text } = yield RNS3.put({
        uri: form.image,
        type: 'img/png',
        name: `${id}.png`,
      }, AWS_OPTIONS);

      if (status !== 201) {
        throw new Error(text);
      }

      image = awsResponseLocationParser(text);
    }

    const { sessionId } = yield call(fetch, `${AWS_API_URL}/create-session`, {
      method: 'GET',
    });

    const response =
      yield call(client.mutate, createClassMutation({
        ...newClass,
        beginsDate,
        endsDate,
        locationId: id,
        ownerId,
        image,
        opentokSessionId: sessionId,
        capacity: 300,
      }));

    if (response.errors && response.errors.length > 0) {
      throw new Error(response.errors);
    }

    yield put(createClassAction.success());
    yield put(navigate('back'));
  } catch (err) {
    const errorMessage = err.toString();
    const isValidationError = errorMessage.includes('VALIDATION_ERROR');
    yield put(createClassAction.failure(err));
    yield put(
      showErrorBox(isValidationError ? errorMessage.split('/')[1] : DEFAULT_ERROR_MESSAGE, true)
    );
  }
}

// Function responsible for adding new comment
function* addComment({ payload: { text, classId, ownerId } }) {
  try {
    if (text.length === 0) {
      throw new Error('VALIDATION_ERROR/Comment must be not be empty.');
    }

    const { errors, data: { createComment: { changedComment } } } =
      yield call(client.mutate, createCommentMutation(text, classId, ownerId));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const comment = {
      ...changedComment,
      owner: {
        ...changedComment.owner,
        avatar: changedComment.owner.avatar ?
          { uri: changedComment.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
    };

    yield put(createCommentAction.success(comment));
  } catch (err) {
    const errorMessage = err.toString();
    const isValidationError = errorMessage.includes('VALIDATION_ERROR');
    yield put(createCommentAction.failure(err));
    yield put(
      showErrorBox(isValidationError ? errorMessage.split('/')[1] : DEFAULT_ERROR_MESSAGE, true)
    );
  }
}

// Function responsible for fetching google location details
function* getLocationDetails({ payload: { lat, lon } }) {
  try {
    const { results } = yield call(
      fetch,
      `${GOOGLE_GEOLOCATION_API_URL}?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`,
      {
        method: 'GET',
      }
    );

    if (results.length === 0) {
      throw new Error();
    }

    const addressComponents = results[0].address_components;
    const locationData = {
      city: addressComponents.find((e) => e.types.includes('postal_town')),
      street: addressComponents.find((e) => e.types.includes('route')),
      place: addressComponents.find((e) => e.types.includes('premise')),
    };

    yield put(getLocationDetailsAction.success(locationData));
  } catch (err) {
    yield put(getLocationDetailsAction.failure(err));
  }
}

// Listeners exposition
export default function* classesSaga() {
  yield [
    takeEvery(FETCH_NEW_CLASSES.REQUEST, fetchNewClasses),
    takeEvery(FETCH_MY_CLASSES.REQUEST, fetchMyClasses),
    takeEvery(FETCH_CLASSES_I_GIVE.REQUEST, fetchClassesIGive),
    takeEvery(CREATE_CLASS.REQUEST, addClass),
    takeEvery(CREATE_COMMENT.REQUEST, addComment),
    takeEvery(FETCH_WATCHED_CLASSES.REQUEST, fetchWatchedClasses),
    takeEvery(GET_LOCATION_DETAILS.REQUEST, getLocationDetails),
  ];
}
