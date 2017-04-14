import { Record, Set } from 'immutable';

import { validateEmail } from '../helpers';

export const validator = {
  nickname: {
    validate: (value) => value.length > 2 && value.length < 30,
    message: 'Username must be between 2 and 30 characters.',
  },
  email: {
    validate: (value) => validateEmail(value),
    message: 'Email is not valid email address',
  },
  age: {
    validate: (value) => value > 0 && value < 150,
    message: 'Age is not valid.',
  },
};

export default Record({
  id: '',
  nickname: '',
  gender: 'male',
  role: 'trainer',
  avatar: '',
  aboutMe: '',
  email: '',
  age: 0,
  goals: new Set([]),
  specialities: new Set([]),
  location: {
    lat: 37.78825,
    lon: -122.4324,
  },
});
