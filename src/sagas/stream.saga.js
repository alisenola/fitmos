import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

// Actions
import {
  START_RECORDING,
  startRecording as startRecordingAction,
  STOP_RECORDING,
  stopRecording as stopRecordingAction,
} from '../actions/streamActions';
import { addArchiveUrlMutation } from '../graphql/mutations/classesMutations';

// Other
import client from '../apolloClient';
import { fetch } from '../api';
import { createArchiveUrl } from '../helpers';
import { OPENTOK_API_KEY, OPENTOK_API_SECRET, OPENTOK_API_URL } from '../variables';

// Function responsible for starting OpenTok recording
function* startRecording({ payload: { sessionId, classId } }) {
  try {
    const headers = {
      'X-TB-PARTNER-AUTH': `${OPENTOK_API_KEY}:${OPENTOK_API_SECRET}`,
      'Content-Type': 'application/json',
    };

    const body = {
      sessionId,
      hasAudio: true,
      hasVideo: true,
      name: `archive-${sessionId}`,
      outputMode: 'composed',
    };

    const response = yield call(fetch, `${OPENTOK_API_URL}/archive`, {
      headers,
      method: 'POST',
      body,
    });

    if (!response) {
      throw new Error({ msg: 'Error while starting archiving' });
    }

    const archiveUrl = createArchiveUrl(OPENTOK_API_KEY, response.id);

    const { errors } = yield call(client.mutate, addArchiveUrlMutation(classId, archiveUrl));

    if (errors && errors.length > 0) {
      throw new Error(errors);
    }

    yield put(startRecordingAction.success(response.id));
  } catch (err) {
    yield put(startRecordingAction.failure(err));
  }
}

// Function responsible for stoping OpenTok recording
function* stopRecording({ payload: { archiveId } }) {
  try {
    const headers = {
      'X-TB-PARTNER-AUTH': `${OPENTOK_API_KEY}:${OPENTOK_API_SECRET}`,
      'Content-Type': 'application/json',
    };

    const response = yield call(fetch, `${OPENTOK_API_URL}/archive/${archiveId}/stop`, {
      headers,
      method: 'POST',
    });

    if (!response) {
      throw new Error({ msg: 'Error while stopping archiving' });
    }

    yield put(stopRecordingAction.success(response));
  } catch (err) {
    yield put(stopRecordingAction.failure(err));
  }
}

// Listeners exposition
export default function* streamSaga() {
  yield [
    takeEvery(START_RECORDING.REQUEST, startRecording),
    takeEvery(STOP_RECORDING.REQUEST, stopRecording),
  ];
}
