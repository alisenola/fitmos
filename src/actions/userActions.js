import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const UPDATE_SIGNUP_FIELD = 'signUp/UPDATE_FORM_FIELD';
export const INITIALIZE_SIGNUP_FORM = 'signUp/INITIALIZE_FORM';
export const REMOVE_SIGNUP_SPECIALITIES = 'signUp/REMOVE_SIGNUP_SPECIALITIES';
export const UPDATE_PROFILE_EDIT_FIELD = 'profileEdit/UPDATE_FORM_FIELD';
export const INITIALIZE_EDIT_FORM = 'profileEdit/INITIALIZE_FORM';
export const REMOVE_EDIT_FORM_SPECIALITIES = 'profileEdit/REMOVE_EDIT_FORM_SPECIALITIES';
export const SET_ACTIVE_USER = 'user/SET_ACTIVE';
export const INCREMENT_USER_SCORE = 'user/INCREMENT_SCORE';

// Async actions
export const CREATE_USER = createRequestTypes('signUp/CREATE_USER');
export const UPDATE_USER = createRequestTypes('profileEdit/UPDATE_USER');
export const FETCH_DIGITS_USER_DATA = createRequestTypes('digits/FETCH_USER_DATA');
export const ADD_CLASS_TO_MY_CLASSES = createRequestTypes('user/ADD_CLASS_TO_MY_CLASSES');
export const ADD_CLASS_TO_FAVORITES = createRequestTypes('user/ADD_CLASS_TO_FAVORITES');
export const ADD_CLASS_TO_WATCHED = createRequestTypes('user/ADD_CLASS_TO_WATCHED');
export const FETCH_OBSERVED_USER = createRequestTypes('user/FETCH_OBSERVED');

// Action helpers
export const updateSignUpField = (name, value) => action(UPDATE_SIGNUP_FIELD, { name, value });
export const initializeSignUpForm = (form) => action(INITIALIZE_SIGNUP_FORM, { form });
export const removeSignUpSpecialities = (id) => action(REMOVE_SIGNUP_SPECIALITIES, { id });
export const updateProfileEditField =
  (name, value) => action(UPDATE_PROFILE_EDIT_FIELD, { name, value });
export const initializeEditForm = (form) => action(INITIALIZE_EDIT_FORM, { form });
export const removeProfileEditSpecialities = (id) => action(REMOVE_EDIT_FORM_SPECIALITIES, { id });
export const setActiveUser = (user) => action(SET_ACTIVE_USER, { user });
export const incrementUserScore = () => action(INCREMENT_USER_SCORE);

// Async action helpers
export const createUser = requestAction(CREATE_USER, ['user']);
export const updateUser = requestAction(UPDATE_USER, ['user']);
export const fetchDigitsUserData = requestAction(FETCH_DIGITS_USER_DATA, ['url', 'oauth']);
export const addClassToMyClasses =
  requestAction(ADD_CLASS_TO_MY_CLASSES, ['classId', 'user', 'signed']);
export const addClassToFavorites =
  requestAction(ADD_CLASS_TO_FAVORITES, ['classId', 'user']);
export const addClassToWatched =
  requestAction(ADD_CLASS_TO_WATCHED, ['classId', 'user']);
export const fetchObservedUser = requestAction(FETCH_OBSERVED_USER, ['id']);
