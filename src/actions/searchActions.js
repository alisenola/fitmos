import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const SET_ACTIVE_SEARCH = 'search/SET_ACTIVE';
export const UPDATE_SEARCH_FIELD = 'search/UPDATE_FIELD';
export const SET_SEARCH_PAGE = 'search/SET_PAGE';
export const SET_CLASS_LIST = 'search/SET_CLASS_LIST';

// Async actions
export const SEARCH_CLASSES = createRequestTypes('search/SEARCH_CLASSES');
export const SEARCH_CLASSES_BY_LOCATION = createRequestTypes('search/SEARCH_CLASSES_BY_LOCATION');

// Action helpers
export const setActiveSearch = (searchType) => action(SET_ACTIVE_SEARCH, { searchType });
export const updateSearchField = (name, value) => action(UPDATE_SEARCH_FIELD, { name, value });
export const setSearchPage = (page) => action(SET_SEARCH_PAGE, { page });
export const setClassList = (list) => action(SET_CLASS_LIST, { list });

// Async action helpers
export const searchClasses = requestAction(SEARCH_CLASSES, ['options']);
export const searchClassesByLocation = requestAction(SEARCH_CLASSES_BY_LOCATION, ['location']);
