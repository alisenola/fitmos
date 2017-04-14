import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Session } from 'react-native-opentok';

// Actions
import { navigate } from '../actions/navigator';
import {
  updateCommentField,
  createComment,
  startStreaming,
} from '../actions/classesActions';
import { getOpentokToken } from '../actions/appActions';
import {
  toggleFullscreen,
  toggleChat,
  sendChatMessage,
  updateChatInput,
  addChatMessage,
  startRecording,
  stopRecording,
} from '../actions/streamActions';

// Selectors
import {
  errorMessageSelector,
  isErrorOpenSelector,
  opentokTokenSelector,
} from '../selectors/appSelectors';
import {
  isFullscreenOpenSelector,
  isChatOpenSelector,
  chatInputSelector,
  chatMessagesSelector,
  archiveIdSelector,
} from '../selectors/streamSelectors';
import { loggedUserSelector } from '../selectors/userSelectors';
import {
  activeClassSelector,
  activeClassCommentTextSelector,
  startStreamingSelector,
} from '../selectors/classesSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import CurrentClass from '../components/CurrentClass';

// Other
import { OPENTOK_API_KEY } from '../variables';

class MyCurrentClass extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    commentText: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    streamStarted: PropTypes.bool.isRequired,
    isFullscreenOpen: PropTypes.bool.isRequired,
    isChatOpen: PropTypes.bool.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatMessages: PropTypes.object.isRequired,
    archiveId: PropTypes.string.isRequired,
  };

  state = {
    isSessionInitialized: false,
  }

  componentWillReceiveProps(nextProps) {
    const { data: { opentokSessionId }, token, dispatch } = nextProps;
    if (opentokSessionId && token && !this.state.isSessionInitialized) {
      Session.connect(OPENTOK_API_KEY, opentokSessionId, token);
      Session.onMessageRecieved((e) => dispatch(addChatMessage(e)));
      this.setState({ isSessionInitialized: true });
    }
  }

  componentWillMount() {
    const { dispatch, data: { opentokSessionId }, user: { nickname } } = this.props;
    dispatch(getOpentokToken.request(opentokSessionId, 'publisher', nickname));
  }

  // Input update functions
  onCommentChange = (value) => { this.props.dispatch(updateCommentField(value)); }
  onChatChange = (val) => { this.props.dispatch(updateChatInput(val)); }

  // View management functions
  addComment = (text) => {
    const { dispatch, data, user } = this.props;
    dispatch(createComment.request(text, data.id, user.id));
  }
  startStreaming = () => { this.props.dispatch(startStreaming(true)); }
  stopStreaming = () => {
    const { dispatch, archiveId } = this.props;
    dispatch(stopRecording.request(archiveId));
    this.props.dispatch(startStreaming(false));
  }
  toggleFullscreen = (val) => { this.props.dispatch(toggleFullscreen(val)); }
  toggleChat = (val) => { this.props.dispatch(toggleChat(val)); }
  sendChatMessage = (msg) => {
    const { dispatch, user: { nickname } } = this.props;
    Session.sendMessage(msg);
    dispatch(sendChatMessage(nickname, msg));
  }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => { this.props.dispatch(navigate('push', 'settings')); }

  // Archiving functions
  startArchiving = () => {
    const { dispatch, data: { opentokSessionId, id } } = this.props;
    dispatch(startRecording.request(opentokSessionId, id));
  }
  stopArchiving = () => {
    const { dispatch, archiveId } = this.props;
    dispatch(stopRecording.request(archiveId));
  }

  render() {
    const {
      data,
      commentText,
      token,
      streamStarted,
      isFullscreenOpen,
      isChatOpen,
      chatInput,
      chatMessages,
    } = this.props;

    return (
      <CurrentClass
        data={data}
        commentText={commentText}
        onCommentChange={this.onCommentChange}
        addComment={this.addComment}
        token={token}
        startStreaming={this.startStreaming}
        stopStreaming={this.stopStreaming}
        streamStarted={streamStarted}
        text={data.title}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
        isFullscreenOpen={isFullscreenOpen}
        toggleFullscreen={this.toggleFullscreen}
        isChatOpen={isChatOpen}
        toggleChat={this.toggleChat}
        sendChatMessage={this.sendChatMessage}
        chatInput={chatInput}
        updateChatInputField={this.onChatChange}
        chatMessages={chatMessages}
        startArchiving={this.startArchiving}
        stopArchiving={this.stopArchiving}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    data: activeClassSelector(state),
    commentText: activeClassCommentTextSelector(state),
    user: loggedUserSelector(state),
    token: opentokTokenSelector(state),
    streamStarted: startStreamingSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
    isFullscreenOpen: isFullscreenOpenSelector(state),
    isChatOpen: isChatOpenSelector(state),
    chatInput: chatInputSelector(state),
    chatMessages: chatMessagesSelector(state),
    archiveId: archiveIdSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(MyCurrentClass)));
