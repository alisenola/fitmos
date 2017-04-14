import { Record, List, Set } from 'immutable';

import * as Actions from '../actions/userActions';

import * as Models from '../models';

const initialState = new (Record({
  loggedUser: new Models.User,
  profileEdit: new (Record({
    form: new Models.ProfileEditForm,
    pending: false,
  })),
  signUp: new (Record({
    form: new Models.SignUpForm,
    pending: false,
  })),
  observedUser: new (Record({
    pending: false,
    user: new Models.User,
  })),
}));

export default function userReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {
    case Actions.UPDATE_PROFILE_EDIT_FIELD: {
      const { name, value } = action.payload;
      const newValue = do {
        if (name === 'specialities') {
          state.getIn(['profileEdit', 'form', 'specialities']).add(value);
        } else if (name === 'goals') {
          state.getIn(['profileEdit', 'form', 'goals']).add(value);
        } else {
          value;
        }
      };
      return state.setIn(['profileEdit', 'form', name], newValue);
    }

    case Actions.UPDATE_SIGNUP_FIELD: {
      const { name, value } = action.payload;
      const newValue = do {
        if (name === 'specialities') {
          state.getIn(['signUp', 'form', 'specialities']).add(value);
        } else if (name === 'goals') {
          state.getIn(['signUp', 'form', 'goals']).add(value);
        } else {
          value;
        }
      };
      return state.setIn(['signUp', 'form', name], newValue);
    }

    case Actions.REMOVE_SIGNUP_SPECIALITIES: {
      const { id } = action.payload;
      const newValue = state.getIn(['signUp', 'form', 'specialities']).delete(id);
      return state.setIn(['signUp', 'form', 'specialities'], newValue);
    }

    case Actions.REMOVE_EDIT_FORM_SPECIALITIES: {
      const { id } = action.payload;
      const newValue = state.getIn(['profileEdit', 'form', 'specialities']).delete(id);
      return state.setIn(['profileEdit', 'form', 'specialities'], newValue);
    }
    case Actions.INITIALIZE_SIGNUP_FORM: {
      const { form } = action.payload;
      return state.setIn(['signUp', 'form'], new Models.SignUpForm(form));
    }

    case Actions.INITIALIZE_EDIT_FORM: {
      const { form: { goals, specialities, ...user } } = action.payload;
      return state
        .setIn(
          ['profileEdit', 'form'],
          new Models.ProfileEditForm({
            ...user,
            goals: new Set(goals),
            specialities: new Set(specialities),
          })
        );
    }
    case Actions.SET_ACTIVE_USER: {
      const {
        user,
        user: {
          myClasses,
          specialities,
          favorites,
          watched,
          goals,
        },
      } = action.payload;
      const classList = new List(myClasses || []);
      const favoritesList = new List(favorites || []);
      const watchedList = new List(watched || []);
      const specialitiesList = new List(specialities || []);
      const goalsList = new List(goals || []);
      return state.set('loggedUser',
        new Models.User({
          ...user,
          favorites: favoritesList,
          watched: watchedList,
          myClasses: classList,
          specialities: specialitiesList,
          goals: goalsList,
        })
      );
    }

    case Actions.INCREMENT_USER_SCORE: {
      return state.setIn(['loggedUser', 'score'], state.getIn(['loggedUser', 'score']) + 1);
    }

    // Async action listeners
    case Actions.CREATE_USER.REQUEST: {
      return state.setIn(['signUp', 'pending'], true);
    }

    case Actions.CREATE_USER.SUCCESS: {
      const {
        myClasses,
        specialities,
        favorites,
        watched,
        goals,
      } = action.payload;
      const classList = new List(myClasses || []);
      const favoritesList = new List(favorites || []);
      const watchedList = new List(watched || []);
      const specialitiesList = new List(specialities || []);
      const goalsList = new List(goals || []);
      return state
        .set('loggedUser',
          new Models.User({
            ...action.payload,
            favorites: favoritesList,
            watched: watchedList,
            myClasses: classList,
            specialities: specialitiesList,
            goals: goalsList,
          })
        )
        .setIn(['signUp', 'form'], new Models.SignUpForm)
        .setIn(['signUp', 'pending'], false);
    }

    case Actions.UPDATE_USER.REQUEST: {
      return state.setIn(['profileEdit', 'pending'], true);
    }

    case Actions.UPDATE_USER.SUCCESS: {
      const classList = new List(action.payload.myClasses || []);
      return state
        .set('loggedUser', new Models.User({ ...action.payload, myClasses: classList }))
        .setIn(['profileEdit', 'pending'], true);
    }

    case Actions.ADD_CLASS_TO_MY_CLASSES.SUCCESS: {
      return state.setIn(['loggedUser', 'myClasses'], new List(action.payload.list));
    }

    case Actions.ADD_CLASS_TO_FAVORITES.SUCCESS: {
      return state.setIn(['loggedUser', 'favorites'], new List(action.payload.list));
    }

    case Actions.ADD_CLASS_TO_WATCHED.SUCCESS: {
      return state.setIn(['loggedUser', 'watched'], new List(action.payload.list));
    }

    case Actions.FETCH_OBSERVED_USER.REQUEST: {
      return state.setIn(['observedUser', 'pending'], true);
    }

    case Actions.FETCH_OBSERVED_USER.SUCCESS: {
      const { specialities, ...user } = action.payload;
      const specialitiesList = new List(specialities || []);
      return state
        .setIn(['observedUser', 'user'], new Models.User({
          ...user,
          specialities: specialitiesList,
        }))
        .setIn(['observedUser', 'pending'], false);
    }
  }

  return state;
}
