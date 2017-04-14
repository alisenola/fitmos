import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// Actions
import { showErrorBox } from '../actions/appActions';
import {
  RATE_CLASS,
  rateClass as rateClassAction,
} from '../actions/ratingActions';

// GraphQL methods
import { rateClassMutation } from '../graphql/mutations/classesMutations';

// Other
import client from '../apolloClient';
import { DEFAULT_ERROR_MESSAGE } from '../variables';

// Function responsible for rating classes
function* rateClass({ payload: { classId, rating } }) {
  try {
    const { errors, data: { createRating: { changedRating } } } =
      yield call(client.mutate, rateClassMutation(classId, rating));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(rateClassAction.success(changedRating));
  } catch (err) {
    yield put(rateClassAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Listeners exposition
export default function* ratingSaga() {
  yield [
    takeEvery(RATE_CLASS.REQUEST, rateClass),
  ];
}
