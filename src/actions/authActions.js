import { requestAction, createRequestTypes } from './helpers';

// Async actions
export const LOGIN_USER_WITH_DIGITS = createRequestTypes('digits/LOGIN_USER');

// Async helpers
export const loginUserWithDigits =
  requestAction(LOGIN_USER_WITH_DIGITS, ['apiUrl', 'credentials', 'choice']);
