import { createSelector } from 'reselect';

export const classesStateSelector = (state) => state.classes;

export const addClassesSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('addClass')
);

export const newClassesSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('newClasses')
);

export const myClassesSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('myClasses')
);

export const classesIGiveSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('classesIGive')
);

export const activeClassSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('activeClass')
);

export const activeClassCommentTextSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('activeClassCommentText')
);

export const startStreamingSelector = createSelector(
  classesStateSelector,
  (classes) => classes.get('startStreaming')
);

export const addClassesPendingSelector = createSelector(
  addClassesSelector,
  (addClasses) => addClasses.get('pending')
);

export const addClassesFormSelector = createSelector(
  addClassesSelector,
  (addClasses) => addClasses.get('form')
);

export const newClassesListSelector = createSelector(
  newClassesSelector,
  (newClasses) => newClasses.get('list')
);

export const newClassesPendingSelector = createSelector(
  newClassesSelector,
  (newClasses) => newClasses.get('pending')
);

export const newClassesPageSelector = createSelector(
  newClassesSelector,
  (newClasses) => newClasses.get('page')
);

export const myClassesListSelector = createSelector(
  myClassesSelector,
  (myClasses) => myClasses.get('list')
);

export const watchedListSelector = createSelector(
  myClassesSelector,
  (newClasses) => newClasses.get('watched')
);

export const myClassesPendingSelector = createSelector(
  myClassesSelector,
  (myClasses) => myClasses.get('pending')
);

export const classesIGiveListSelector = createSelector(
  classesIGiveSelector,
  (classesIGive) => classesIGive.get('list')
);

export const classesIGivePendingSelector = createSelector(
  classesIGiveSelector,
  (classesIGive) => classesIGive.get('pending')
);
