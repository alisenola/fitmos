import { Record } from 'immutable';

import * as Actions from '../actions/authActions';
import { UPDATE_SIGNUP_FIELD } from '../actions/userActions';

const initialState = new (Record({
  token: '',
  isAuthPending: false,
  didUserMadeChoiceOn: false,
}));

export default function authReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case UPDATE_SIGNUP_FIELD: {
      const { name } = action.payload;
      return name === 'role' ? state.set('didUserMadeChoiceOn', true) : state;
    }

    // Async action listeners
    case Actions.LOGIN_USER_WITH_DIGITS.REQUEST: {
      return state.set('isAuthPending', true);
    }

    case Actions.LOGIN_USER_WITH_DIGITS.SUCCESS: {
      const { token } = action.payload;
      return state.set('token', token).set('isAuthPending', false);
    }

    case Actions.LOGIN_USER_WITH_DIGITS.FAILURE: {
      return state.set('isAuthPending', false);
    }

  }

  return state;
}
