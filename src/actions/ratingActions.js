import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const SHOW_RATING_MODAL = 'rating/SHOW_MODAL';
export const SET_RATING = 'rating/SET_RATING';

// Async actions
export const RATE_CLASS = createRequestTypes('rating/RATE_CLASS');

// Action helpers
export const showRatingModal = (isVisible) => action(SHOW_RATING_MODAL, { isVisible });
export const setRating = (rating) => action(SET_RATING, { rating });

// Async action helpers
export const rateClass = requestAction(RATE_CLASS, ['classId', 'rating']);
