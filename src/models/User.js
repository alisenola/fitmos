import { List, Record } from 'immutable';

export default Record({
  id: '',
  nickname: '',
  firstName: '',
  lastName: '',
  gender: '',
  location: null,
  role: 'user',
  avatar: null,
  aboutMe: '',
  email: '',
  age: 0,
  goals: new List([]),
  specialities: new List([]),
  rate: 0,
  score: 0,
  myClasses: new List([]),
  favorites: new List([]),
  watched: new List([]),
});
