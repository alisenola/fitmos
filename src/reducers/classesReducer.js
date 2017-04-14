import { Record, List } from 'immutable';

import * as Actions from '../actions/classesActions';
import { ADD_CLASS_TO_MY_CLASSES } from '../actions/userActions';

import * as Models from '../models';

import {
  updateClassListWithComments,
  updateSignedNumber,
  adjustGoogleLocationResponse,
} from '../helpers';

const initialState = new (Record({
  addClass: new (Record({
    form: new Models.AddClassForm,
    pending: false,
  })),
  newClasses: new (Record({
    list: new List([]),
    pending: false,
    page: 0,
  })),
  myClasses: new (Record({
    list: new List([]),
    watched: new List([]),
    pending: false,
  })),
  classesIGive: new (Record({
    list: new List([]),
    pending: false,
  })),
  activeClass: new Models.Class,
  activeClassCommentText: '',
  startStreaming: false,
}));

export default function authReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case Actions.UPDATE_ADD_CLASS_FIELD: {
      const { name, value, place } = action.payload;
      const setInPlace = place ? ['addClass', 'form', place, name] : ['addClass', 'form', name];

      return state.setIn(setInPlace, value);
    }

    case Actions.UPDATE_COMMENT_FIELD: {
      return state.set('activeClassCommentText', action.payload.value);
    }

    case Actions.START_STREAMING: {
      return state.set('startStreaming', action.payload.start);
    }

    case Actions.SET_ACTIVE_CLASS: {
      const { classObject } = action.payload;
      return state.set('activeClass', new Models.Class(classObject));
    }

    case Actions.SET_PAGE: {
      const { place, page } = action.payload;
      return state.setIn([place, 'page'], page);
    }

    // Async action listeners
    case Actions.FETCH_NEW_CLASSES.REQUEST:
      return state.setIn(['newClasses', 'pending'], true);

    case Actions.FETCH_NEW_CLASSES.SUCCESS: {
      const newClasses = state.getIn(['newClasses', 'list']).concat(action.payload);
      return state
        .setIn(['newClasses', 'list'], newClasses)
        .setIn(['newClasses', 'pending'], false);
    }

    case Actions.FETCH_NEW_CLASSES.FAILURE: {
      return state.setIn(['newClasses', 'pending'], false);
    }

    case Actions.FETCH_MY_CLASSES.REQUEST: {
      return state.setIn(['myClasses', 'pending'], true);
    }

    case Actions.FETCH_MY_CLASSES.SUCCESS: {
      const list = action.payload;
      return state
        .setIn(['myClasses', 'list'], new List(list))
        .setIn(['myClasses', 'pending'], false);
    }

    case Actions.FETCH_MY_CLASSES.FAILURE: {
      return state.setIn(['myClasses', 'pending'], false);
    }

    case Actions.FETCH_WATCHED_CLASSES.REQUEST: {
      return state.setIn(['myClasses', 'pending'], true);
    }

    case Actions.FETCH_WATCHED_CLASSES.SUCCESS: {
      const list = action.payload;
      return state
        .setIn(['myClasses', 'watched'], new List(list))
        .setIn(['myClasses', 'pending'], false);
    }

    case Actions.FETCH_WATCHED_CLASSES.FAILURE: {
      return state.setIn(['myClasses', 'pending'], false);
    }

    case Actions.FETCH_CLASSES_I_GIVE.REQUEST: {
      return state.setIn(['classesIGive', 'pending'], true);
    }

    case Actions.FETCH_CLASSES_I_GIVE.SUCCESS: {
      const list = action.payload;
      return state
        .setIn(['classesIGive', 'list'], new List(list))
        .setIn(['classesIGive', 'pending'], false);
    }

    case Actions.FETCH_CLASSES_I_GIVE.FAILURE: {
      return state.setIn(['classesIGive', 'pending'], false);
    }

    case Actions.CREATE_CLASS.REQUEST: {
      return state.setIn(['addClass', 'pending'], true);
    }

    case Actions.CREATE_CLASS.SUCCESS: {
      return state
        .setIn(['addClass', 'form'], new Models.AddClassForm)
        .setIn(['addClass', 'pending'], false);
    }

    case Actions.CREATE_CLASS.FAILURE: {
      return state.setIn(['addClass', 'pending'], false);
    }

    case Actions.GET_LOCATION_DETAILS.SUCCESS: {
      const { street, city, place } = action.payload;

      let newState = adjustGoogleLocationResponse(state, 'street', street);
      newState = adjustGoogleLocationResponse(newState, 'city', city);
      newState = adjustGoogleLocationResponse(newState, 'place', place);

      return newState;
    }

    case Actions.CREATE_COMMENT.SUCCESS: {
      const comments = state.getIn(['activeClass', 'comments']);
      const comment = action.payload;
      let newState = state;

      newState = updateClassListWithComments(newState, 'newClasses', comment);
      newState = updateClassListWithComments(newState, 'myClasses', comment);
      newState = updateClassListWithComments(newState, 'myClasses', comment, 'watching');
      newState = updateClassListWithComments(newState, 'classesIGive', comment);

      return newState.setIn(['activeClass', 'comments'], [...comments, comment]);
    }

    case ADD_CLASS_TO_MY_CLASSES.SUCCESS: {
      const { signed, classId } = action.payload;

      let newState = state;
      newState = updateSignedNumber(newState, 'newClasses', classId, signed);
      newState = updateSignedNumber(newState, 'myClasses', classId, signed);
      newState = updateSignedNumber(newState, 'classesIGive', classId, signed);

      return newState.setIn(['activeClass', 'signed'], signed);
    }
    //
    // case ADD_CLASS_TO_WATCHED.SUCCESS: {
    //   return state.setIn(['loggedUser', 'watched'], new List(action.payload.list));
    // }

  }

  return state;
}
