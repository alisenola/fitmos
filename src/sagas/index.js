import { fork } from 'redux-saga/effects';
import user from './user.saga';
import app from './app.saga';
import auth from './auth.saga';
import classes from './classes.saga';
import search from './search.saga';
import rating from './rating.saga';
import stream from './stream.saga';

export default function* rootSaga() {
  yield [
    fork(app),
    fork(user),
    fork(auth),
    fork(classes),
    fork(search),
    fork(rating),
    fork(stream),
  ];
}
