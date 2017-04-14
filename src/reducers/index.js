import { combineReducers } from 'redux';
import routes from './routes';
import app from './appReducer';
import auth from './authReducer';
import user from './userReducer';
import classes from './classesReducer';
import search from './searchReducer';
import rating from './ratingReducer';
import stream from './streamReducer';
import ApolloClient from 'apollo-client';

const client = new ApolloClient();

export default combineReducers({
  app,
  routes,
  auth,
  user,
  classes,
  search,
  rating,
  stream,
  apollo: client.reducer(),
});
