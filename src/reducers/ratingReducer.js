import { Record } from 'immutable';

import * as Actions from '../actions/ratingActions';

const initialState = new (Record({
  rating: 0,
  isRated: false,
  isRatingModalOpen: false,
}));

export default function ratingReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case Actions.SHOW_RATING_MODAL: {
      return state
        .set('isRatingModalOpen', action.payload.isVisible)
        .set('isRated', false)
        .set('rating', 0);
    }

    case Actions.SET_RATING: {
      return state.set('rating', action.payload.rating);
    }

    // Async action listeners
    case Actions.RATE_CLASS.SUCCESS: {
      return state.set('isRated', true);
    }

  }

  return state;
}
