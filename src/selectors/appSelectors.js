import { createSelector } from 'reselect';

export const appStateSelector = (state) => state.app;

export const isBraintreeSetUpSelector = createSelector(
  appStateSelector,
  (app) => app.get('isBraintreeSetUp')
);

export const opentokTokenSelector = createSelector(
  appStateSelector,
  (app) => app.get('opentokToken')
);

export const errorMessageSelector = createSelector(
  appStateSelector,
  (app) => app.get('errorMessage')
);

export const isErrorOpenSelector = createSelector(
  appStateSelector,
  (app) => app.get('isErrorOpen')
);

export const pendingSelector = createSelector(
  appStateSelector,
  (app) => app.get('pending')
);
