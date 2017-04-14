import { Record } from 'immutable';

import { validateEmail } from '../helpers';

export const validator = {
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
  gender: '',
  role: '',
  avatar: '',
  aboutMe: '',
  email: '',
  age: 0,
  firstName: '',
  lastName: '',
  coordignates: {
    lat: 37.78825,
    lon: -122.4324,
  },
  state: '',
  city: '',
  goals: new Set([]),
  specialities: new Set([]),
});
