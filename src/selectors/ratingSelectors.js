import { createSelector } from 'reselect';

export const ratingStateSelector = (state) => state.rating;

export const ratingSelector = createSelector(
  ratingStateSelector,
  (rating) => rating.get('rating')
);

export const isRatedSelector = createSelector(
  ratingStateSelector,
  (rating) => rating.get('isRated')
);

export const isRatingModalOpenSelector = createSelector(
  ratingStateSelector,
  (rating) => rating.get('isRatingModalOpen')
);
