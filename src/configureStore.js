import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import client from './apolloClient';
import reducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [client.middleware(), sagaMiddleware];

const enhancer = applyMiddleware(...middlewares);

// Redux and sagas setup and store configuration
export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  sagaMiddleware.run(sagas);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
