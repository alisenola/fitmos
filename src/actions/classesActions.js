import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const UPDATE_ADD_CLASS_FIELD = 'addClass/UPDATE_FORM_FIELD';
export const SET_ACTIVE_BAR = 'classesList/SET_ACTIVE_BAR';
export const SET_PAGE = 'classesList/SET_PAGE';
export const SET_ACTIVE_CLASS = 'class/SET_ACTIVE_CLASS';
export const START_STREAMING = 'class/START_STREAMING';
export const UPDATE_COMMENT_FIELD = 'comment/UPDATE_FIELD';

// Async actions
export const CREATE_CLASS = createRequestTypes('addClass/CREATE_CLASS');
export const FETCH_NEW_CLASSES = createRequestTypes('classesList/FETCH_NEW_CLASSES');
export const FETCH_MY_CLASSES = createRequestTypes('classesList/FETCH_MY_CLASSES');
export const FETCH_WATCHED_CLASSES = createRequestTypes('classesList/FETCH_WATCHED_CLASSES');
export const FETCH_CLASSES_I_GIVE = createRequestTypes('classesList/FETCH_CLASSES_I_GIVE');
export const CREATE_COMMENT = createRequestTypes('comment/CREATE_COMMENT');
export const GET_LOCATION_DETAILS = createRequestTypes('location/GET_DETAILS');

// Action helpers
export const updateAddClassField =
  (name, value, place) => action(UPDATE_ADD_CLASS_FIELD, { name, value, place });
export const setMyClassesActiveBar =
  (place, archive) => action(SET_ACTIVE_BAR, { place, archive });
export const setPage =
  (place, page) => action(SET_PAGE, { place, page });
export const setActiveClass = (classObject) => action(SET_ACTIVE_CLASS, { classObject });
export const updateCommentField = (value) => action(UPDATE_COMMENT_FIELD, { value });
export const startStreaming = (start) => action(START_STREAMING, { start });

// Async action helpers
export const createClass = requestAction(CREATE_CLASS, ['form', 'ownerId']);
export const fetchNewClasses = requestAction(FETCH_NEW_CLASSES, ['page']);
export const fetchMyClasses = requestAction(FETCH_MY_CLASSES, ['ids']);
export const fetchWatchedClasses = requestAction(FETCH_WATCHED_CLASSES, ['ids']);
export const fetchClassesIGive = requestAction(FETCH_CLASSES_I_GIVE, ['id']);
export const createComment = requestAction(CREATE_COMMENT, ['text', 'classId', 'ownerId']);
export const getLocationDetails = requestAction(GET_LOCATION_DETAILS, ['lat', 'lon']);
