import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// Actions
import {
  SEARCH_CLASSES,
  searchClasses as searchClassesAction,
  SEARCH_CLASSES_BY_LOCATION,
  searchClassesByLocation as searchClassesByLocationAction,
  setSearchPage,
  setClassList,
} from '../actions/searchActions';
import { showErrorBox } from '../actions/appActions';

// GraphQL methods
import { searchClassesQuery, searchClassesByLocationQuery } from '../graphql/queries/searchQueries';

// Other
import client from '../apolloClient';
import { DEFAULT_ERROR_MESSAGE } from '../variables';

// Function responsible for searching classes
function* searchClasses({ payload: { options, options: { page } } }) {
  try {
    const { errors, data: { viewer: { searchClasssByQuery: { hits } } } } =
      yield call(client.query, searchClassesQuery(options));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = hits.map((e) => ({
      ...e,
      image: e.image ? { uri: e.image } : require('../../assets/img/class_placeholder.png'),
      owner: {
        ...e.owner,
        avatar: e.owner.avatar ?
          { uri: e.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      },
      comments: e.comments.edges.map(({ node }) => ({
        ...node,
        avatar: node.owner.avatar ?
          { uri: node.owner.avatar } : require('../../assets/img/avatar_placeholder.png'),
      })),
    }));

    if (page === 0) {
      yield put(setClassList(list));
    } else {
      yield put(searchClassesAction.success(list));
    }
    yield put(setSearchPage(page + 1));
  } catch (err) {
    yield put(searchClassesAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for searching classes
function* searchClassesByLocation({ payload: { location } }) {
  try {
    const { errors, data: { viewer: { getNearestClasssByCoordignates } } } =
      yield call(client.query, searchClassesByLocationQuery(location));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    const list = getNearestClasssByCoordignates.map(({ node }) => ({
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

    yield put(searchClassesByLocationAction.success(list));
  } catch (err) {
    yield put(searchClassesByLocationAction.failure(err));
  }
}

// Listeners exposition
export default function* searchSaga() {
  yield [
    takeEvery(SEARCH_CLASSES.REQUEST, searchClasses),
    takeEvery(SEARCH_CLASSES_BY_LOCATION.REQUEST, searchClassesByLocation),
  ];
}
