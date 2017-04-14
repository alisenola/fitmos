import { Record, List } from 'immutable';

import * as Actions from '../actions/streamActions';

const initialState = new (Record({
  isFullscreenOpen: false,
  chat: new (Record({
    isOpen: false,
    input: '',
    messages: new List([]),
  })),
  archiveId: '',
  paused: true,
}));

export default function streamReducer(state = initialState, action) {
  if (!(state instanceof Record)) return initialState.merge(state);

  switch (action.type) {

    // Action listeners
    case Actions.TOGGLE_FULLSCREEN: {
      const { isOpen } = action.payload;
      return state.set('isFullscreenOpen', isOpen);
    }

    case Actions.TOGGLE_CHAT: {
      return state.setIn(['chat', 'isOpen'], action.payload.isOpen);
    }

    case Actions.ADD_CHAT_MESSAGE: {
      const { data, message } = action.payload;
      const username = data.replace('username=', '');
      return state.setIn(
        ['chat', 'messages'],
        state.getIn(['chat', 'messages']).push({ username, message })
      );
    }

    case Actions.UPDATE_CHAT_INPUT: {
      return state.setIn(['chat', 'input'], action.payload.value);
    }

    case Actions.SEND_CHAT_MESSAGE: {
      return state.setIn(['chat', 'input'], '');
    }

    case Actions.TOGGLE_VIDEO_PLAYING: {
      return state.set('paused', !state.get('paused'));
    }

    // Async action listeners
    case Actions.START_RECORDING.REQUEST: {
      return state.set('archiveId', '');
    }

    case Actions.START_RECORDING.SUCCESS: {
      return state.set('archiveId', action.payload);
    }

    case Actions.STOP_RECORDING.SUCCESS: {
      return state.set('archiveId', '');
    }
  }

  return state;
}
