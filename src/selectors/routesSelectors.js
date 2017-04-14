import { createSelector } from 'reselect';

export const routesStateSelector = (state) => state.routes;

export const barRouteSelector = createSelector(
  routesStateSelector,
  (routes) => routes.barRoute
);
