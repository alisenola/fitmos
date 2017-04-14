import { Record } from 'immutable';

import * as Actions from '../actions/appActions';
import Braintree from '../braintree';

const initialState = new (Record({
  isBraintreeSetUp: false,
  opentokToken: '',
  errorMessage: '',
  isErrorOpen: false,
  pending: false,
}));

export default function appReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case Actions.SHOW_ERROR_BOX: {
      const { message, isOpen } = action.payload;
      return state.set('errorMessage', message).set('isErrorOpen', isOpen);
    }

    // Async action listeners
    case Actions.GET_BRAINTREE_TOKEN.SUCCESS: {
      Braintree.setup(action.payload);
      return state.set('isBraintreeSetUp', true);
    }

    case Actions.GET_BRAINTREE_TOKEN.FAILURE: {
      return state.set('isBraintreeSetUp', false);
    }

    case Actions.GET_OPENTOK_TOKEN.SUCCESS: {
      return state.set('opentokToken', action.payload);
    }

    case Actions.MAKE_BRAINTREE_PAYMENT.REQUEST: {
      return state.set('pending', true);
    }

    case Actions.MAKE_BRAINTREE_PAYMENT.SUCCESS: {
      return state.set('pending', false);
    }

  }

  return state;
}
