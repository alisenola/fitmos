import { createSelector } from 'reselect';

export const authStateSelector = (state) => state.auth;

export const isAuthPendingSelector = createSelector(
  authStateSelector,
  (auth) => auth.get('isAuthPending')
);

export const didUserMadeChoiceOnSelector = createSelector(
  authStateSelector,
  (auth) => auth.get('didUserMadeChoiceOn')
);
