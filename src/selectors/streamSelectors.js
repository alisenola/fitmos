import { createSelector } from 'reselect';

export const streamStateSelector = (state) => state.stream;

export const isFullscreenOpenSelector = createSelector(
  streamStateSelector,
  (stream) => stream.get('isFullscreenOpen')
);

export const chatSelector = createSelector(
  streamStateSelector,
  (stream) => stream.get('chat')
);

export const archiveIdSelector = createSelector(
  streamStateSelector,
  (stream) => stream.get('archiveId')
);

export const isPausedSelector = createSelector(
  streamStateSelector,
  (stream) => stream.get('paused')
);

export const isChatOpenSelector = createSelector(
  chatSelector,
  (chat) => chat.get('isOpen')
);

export const chatInputSelector = createSelector(
  chatSelector,
  (chat) => chat.get('input')
);

export const chatMessagesSelector = createSelector(
  chatSelector,
  (chat) => chat.get('messages')
);
