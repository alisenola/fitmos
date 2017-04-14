import { Record, List } from 'immutable';

import * as Actions from '../actions/searchActions';

const initialState = new (Record({
  activeSearch: '',
  searchFields: new (Record({
    main: '',
    dateFrom: new Date().getTime(),
    category: '',
    location: {
      lat: 37.78825,
      lon: -122.4324,
    },
  })),
  list: new List([]),
  pending: false,
  searchPage: 0,
}));

export default function searchReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case Actions.SET_ACTIVE_SEARCH: {
      return state.set('activeSearch', action.payload.searchType).set('searchPage', 0);
    }

    case Actions.UPDATE_SEARCH_FIELD: {
      const { name, value } = action.payload;
      return state.setIn(['searchFields', name], value).set('searchPage', 0);
    }

    case Actions.SET_SEARCH_PAGE: {
      return state.set('searchPage', action.payload.page);
    }

    case Actions.SET_CLASS_LIST: {
      const { list } = action.payload;
      return state.set('list', new List(list)).set('pending', false);
    }

    // Async action listeners
    case Actions.SEARCH_CLASSES.REQUEST: {
      return state.set('pending', true);
    }

    case Actions.SEARCH_CLASSES.SUCCESS: {
      const newClasses = state.get('list').concat(action.payload);
      return state.set('list', newClasses).set('pending', false);
    }

    case Actions.SEARCH_CLASSES_BY_LOCATION.REQUEST: {
      return state.set('pending', true);
    }

    case Actions.SEARCH_CLASSES_BY_LOCATION.SUCCESS: {
      const newClasses = state.get('list').concat(action.payload);
      return state.set('list', newClasses).set('pending', false);
    }
  }

  return state;
}
