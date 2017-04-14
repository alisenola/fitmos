import { Record } from 'immutable';

export default Record({
  id: '',
  title: '',
  owner: {
    id: '',
    nickname: '',
    avatar: null,
  },
  language: 'en',
  location: {
    place: '',
    street: '',
    city: '',
  },
  price: 0,
  beginsDate: '',
  endsDate: '',
  capacity: 0,
  signed: 0,
  image: null,
  recurring: false,
  interval: '',
  currency: '',
  goal: '',
  level: '',
  type: '',
  opentokSessionId: '',
  archiveUrl: '',
  comments: null,
  description: '',
});
