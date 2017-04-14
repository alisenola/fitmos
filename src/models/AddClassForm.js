import { Record } from 'immutable';

export const validator = {
  title: {
    validate: (value) => value.length > 2 && value.length < 30,
    message: 'Title must be between 2 and 30 characters.',
  },
  price: {
    validate: (value) => value > 0,
    message: 'Price must be greater than zero.',
  },
  goal: {
    validate: (value) => value.length > 2 && value.length < 30,
    message: 'Goal must be between 2 and 30 characters.',
  },
};

export default Record({
  title: '',
  language: 'en',
  location: new (Record({
    place: '',
    street: '',
    city: '',
  })),
  price: 0,
  beginsDate: new Date().getTime(),
  endsDate: new Date().getTime() + (60 * 60 * 1000),
  capacity: 0,
  image: null,
  recurring: false,
  interval: 'daily',
  currency: 'USD',
  goal: '',
  level: 'beginner',
  type: 'remote',
  description: '',
  coordignates: {
    lat: 37.78825,
    lon: -122.4324,
  },
});
