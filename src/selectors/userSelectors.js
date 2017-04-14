import { createSelector } from 'reselect';

export const userStateSelector = (state) => state.user;

export const profileEditSelector = createSelector(
  userStateSelector,
  (user) => user.get('profileEdit')
);

export const signUpSelector = createSelector(
  userStateSelector,
  (user) => user.get('signUp')
);

export const loggedUserSelector = createSelector(
  userStateSelector,
  (user) => user.get('loggedUser')
);

export const observedUserSelector = createSelector(
  userStateSelector,
  (user) => user.get('observedUser')
);

export const profileEditFormSelector = createSelector(
  profileEditSelector,
  (edit) => edit.get('form')
);

export const profileEditPendingSelector = createSelector(
  profileEditSelector,
  (edit) => edit.get('pending')
);

export const signUpFormSelector = createSelector(
  signUpSelector,
  (signup) => signup.get('form')
);

export const signUpPendingSelector = createSelector(
  signUpSelector,
  (signup) => signup.get('pending')
);

export const usersClassesSelector = createSelector(
  loggedUserSelector,
  (logged) => logged.get('myClasses')
);

export const usersFavoritesSelector = createSelector(
  loggedUserSelector,
  (logged) => logged.get('favorites')
);

export const usersWatchedSelector = createSelector(
  loggedUserSelector,
  (logged) => logged.get('watched')
);

export const loggedUserIdSelector = createSelector(
  loggedUserSelector,
  (logged) => logged.get('id')
);

export const observedUserPendingSelector = createSelector(
  observedUserSelector,
  (observed) => observed.get('pending')
);

export const observedUserObjectSelector = createSelector(
  observedUserSelector,
  (observed) => observed.get('user')
);
