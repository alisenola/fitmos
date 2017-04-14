import { createSelector } from 'reselect';

export const searchStateSelector = (state) => state.search;

export const activeSearchSelector = createSelector(
  searchStateSelector,
  (search) => search.get('activeSearch')
);

export const searchFieldsSelector = createSelector(
  searchStateSelector,
  (search) => search.get('searchFields')
);

export const searchPageSelector = createSelector(
  searchStateSelector,
  (search) => search.get('searchPage')
);

export const searchListSelector = createSelector(
  searchStateSelector,
  (search) => search.get('list')
);

export const searchPendingSelector = createSelector(
  searchStateSelector,
  (search) => search.get('pending')
);
