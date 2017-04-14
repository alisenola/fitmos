import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// Actions
import { navigate } from '../actions/navigator';
import {
  LOGIN_USER_WITH_DIGITS,
  loginUserWithDigits as loginUserWithDigitsAction,
} from '../actions/authActions';
import { setActiveUser, initializeSignUpForm } from '../actions/userActions';
import { showErrorBox } from '../actions/appActions';

// GraphQL methods
import {
  loginUserWithDigitsMutation,
} from '../graphql/mutations/authMutations';

// Other
import client from '../apolloClient';
import { DEFAULT_ERROR_MESSAGE } from '../variables';

// Function responsible for logging user with Digits
function* loginUserWithDigits({ payload: { apiUrl, credentials, choice } }) {
  try {
    const {
      errors,
      data: { loginUserWithDigits: { id_token, user } },
    } = yield call(client.mutate, loginUserWithDigitsMutation(apiUrl, credentials));

    if (errors && errors.length > 0) {
      throw new Error({ msg: 'Digits login error', err: errors });
    }

    yield put(loginUserWithDigitsAction.success({ token: id_token }));

    const { isRegistered, avatar, rate, ...userData } = user;

    if (isRegistered) {
      yield put(navigate('push', 'home'));
      yield put(setActiveUser({
        ...userData,
        rate: rate.edges.reduce((sum, { node: { rating } }) => sum + rating, 0) / rate.length,
        avatar: avatar ?
          { uri: avatar } : require('../../assets/img/avatar_placeholder.png'),
      }));
    } else {
      yield put(initializeSignUpForm({ id: user.id }));
      yield choice ? put(navigate('push', 'signup')) : put(navigate('push', 'select_type'));
    }
  } catch (err) {
    yield put(loginUserWithDigitsAction.failure(err));
    yield put(showErrorBox(DEFAULT_ERROR_MESSAGE, true));
  }
}

// Listeners exposition
export default function* authSaga() {
  yield [
    takeEvery(LOGIN_USER_WITH_DIGITS.REQUEST, loginUserWithDigits),
  ];
}
