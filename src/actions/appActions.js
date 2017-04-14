import { requestAction, createRequestTypes, action } from './helpers';

// Actions
export const SHOW_ERROR_BOX = 'error/SHOW_ERROR_BOX';

// Async actions
export const GET_BRAINTREE_TOKEN = createRequestTypes('braintree/GET_TOKEN');
export const MAKE_BRAINTREE_PAYMENT = createRequestTypes('braintree/MAKE_PAYMENT');
export const GET_OPENTOK_TOKEN = createRequestTypes('opentok/GET_TOKEN');

// Action helpers
export const showErrorBox = (message, isOpen) => action(SHOW_ERROR_BOX, { message, isOpen });

// Async action helpers
export const getBraintreeToken = requestAction(GET_BRAINTREE_TOKEN);
export const makeBraintreePayment =
  requestAction(MAKE_BRAINTREE_PAYMENT, ['nonce', 'classObject', 'user']);
export const getOpentokToken = requestAction(GET_OPENTOK_TOKEN, ['sessionId', 'role', 'username']);
