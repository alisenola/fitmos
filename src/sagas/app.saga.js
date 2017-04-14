import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import accounting from 'accounting';

// Actions
import {
  GET_BRAINTREE_TOKEN,
  getBraintreeToken as getBraintreeTokenAction,
  MAKE_BRAINTREE_PAYMENT,
  makeBraintreePayment as makeBraintreePaymentAction,
  GET_OPENTOK_TOKEN,
  getOpentokToken as getOpentokTokenAction,
  showErrorBox,
} from '../actions/appActions';
import { addClassToMyClasses } from '../actions/userActions';

// Other
import { fetch } from '../api';
import { AWS_API_URL, DEFAULT_ERROR_MESSAGE } from '../variables';

// Function responsible for fetching braintree token
function* getBraintreeToken() {
  try {
    const { clientToken } = yield call(fetch, `${AWS_API_URL}/get-token`, {
      method: 'GET',
    });

    yield put(getBraintreeTokenAction.success(clientToken));
  } catch (err) {
    yield put(getBraintreeTokenAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for making braintree payment
function* makeBraintreePayment({
  payload: { nonce, classObject: { price, id, signed }, user },
}) {
  try {
    const response = yield call(fetch, `${AWS_API_URL}/pay`, {
      method: 'POST',
      body: {
        nonce,
        amount: accounting.toFixed(price, 2),
      },
    });

    if (response.success) {
      yield put(makeBraintreePaymentAction.success());
      yield put(addClassToMyClasses.request(id, user, signed));
    } else {
      yield put(makeBraintreePaymentAction.failure());
    }
  } catch (err) {
    yield put(makeBraintreePaymentAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Function responsible for fetching OpenTok token
function* getOpentokToken({ payload: { sessionId, role, username } }) {
  try {
    const { token } = yield call(fetch, `${AWS_API_URL}/create-token`, {
      method: 'POST',
      body: {
        sessionId,
        options: {
          role,
          data: `username=${username}`,
        },
      },
    });

    yield put(getOpentokTokenAction.success(token));
  } catch (err) {
    yield put(getOpentokTokenAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Listeners exposition
export default function* appSaga() {
  yield [
    takeEvery(GET_BRAINTREE_TOKEN.REQUEST, getBraintreeToken),
    takeEvery(MAKE_BRAINTREE_PAYMENT.REQUEST, makeBraintreePayment),
    takeEvery(GET_OPENTOK_TOKEN.REQUEST, getOpentokToken),
  ];
}
