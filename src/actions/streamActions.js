import { action, requestAction, createRequestTypes } from './helpers';

// Actions
export const TOGGLE_FULLSCREEN = 'stream/TOGGLE_FULLSCREEN';
export const TOGGLE_CHAT = 'stream/TOGGLE_CHAT';
export const ADD_CHAT_MESSAGE = 'chat/ADD_MESSAGE';
export const UPDATE_CHAT_INPUT = 'chat/UPDATE_INPUT';
export const SEND_CHAT_MESSAGE = 'chat/SEND_MESSAGE';
export const TOGGLE_VIDEO_PLAYING = 'player/TOGGLE_VIDEO_PLAYING';

// Async actions
export const START_RECORDING = createRequestTypes('stream/START_RECORDING');
export const STOP_RECORDING = createRequestTypes('stream/STOP_RECORDING');

// Action helpers
export const toggleFullscreen = (isOpen) => action(TOGGLE_FULLSCREEN, { isOpen });
export const toggleChat = (isOpen) => action(TOGGLE_CHAT, { isOpen });
export const addChatMessage = (response) => action(ADD_CHAT_MESSAGE, response);
export const updateChatInput = (value) => action(UPDATE_CHAT_INPUT, { value });
export const sendChatMessage = () => action(SEND_CHAT_MESSAGE);
export const toggleVideoPlaying = () => action(TOGGLE_VIDEO_PLAYING);

// Async action helpers
export const startRecording = requestAction(START_RECORDING, ['sessionId', 'classId']);
export const stopRecording = requestAction(STOP_RECORDING, ['archiveId']);
