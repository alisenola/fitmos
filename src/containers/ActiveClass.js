import React, { Component, PropTypes } from 'react';
import { LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import { Session } from 'react-native-opentok';

// Actions
import { navigate } from '../actions/navigator';
import { updateCommentField, createComment } from '../actions/classesActions';
import { getOpentokToken } from '../actions/appActions';
import { showRatingModal, rateClass, setRating } from '../actions/ratingActions';
import { fetchObservedUser, addClassToFavorites } from '../actions/userActions';
import {
  toggleFullscreen,
  toggleChat,
  sendChatMessage,
  updateChatInput,
  addChatMessage,
  toggleVideoPlaying,
} from '../actions/streamActions';

// Selectors
import {
  opentokTokenSelector,
  errorMessageSelector,
  isErrorOpenSelector,
} from '../selectors/appSelectors';
import { loggedUserSelector } from '../selectors/userSelectors';
import { activeClassSelector, activeClassCommentTextSelector } from '../selectors/classesSelectors';
import {
  ratingSelector,
  isRatedSelector,
  isRatingModalOpenSelector,
} from '../selectors/ratingSelectors';
import {
  isFullscreenOpenSelector,
  isChatOpenSelector,
  chatInputSelector,
  chatMessagesSelector,
  isPausedSelector,
} from '../selectors/streamSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import ActiveClassComponent from '../components/ActiveClass';

// Other
import { OPENTOK_API_KEY } from '../variables';

class ActiveClass extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    commentText: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    isRatingModalOpen: PropTypes.bool.isRequired,
    isRated: PropTypes.bool.isRequired,
    isFullscreenOpen: PropTypes.bool.isRequired,
    isChatOpen: PropTypes.bool.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatMessages: PropTypes.object.isRequired,
    isPaused: PropTypes.bool.isRequired,
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
    dispatch(getOpentokToken.request(opentokSessionId, 'subscriber', nickname));
  }

  // Input update functions
  onCommentChange = (value) => { this.props.dispatch(updateCommentField(value)); }
  onChatInputChange = (val) => { this.props.dispatch(updateChatInput(val)); }

  // Rating modal functions
  showRatingModal = (val) => { this.props.dispatch(showRatingModal(val)); }
  onRateChange = (val) => { this.props.dispatch(setRating(val)); }
  rateHandler = () => {
    const { dispatch, data, user, commentText, rating } = this.props;
    dispatch(createComment.request(commentText, data.id, user.id));
    dispatch(rateClass.request(data.id, rating));

    LayoutAnimation.spring();
  }

  // Favorites functions
  addToFavorites = () => {
    const { dispatch, data: { id }, user } = this.props;
    dispatch(addClassToFavorites.request(id, user));
  }

  // Chat functions
  toggleFullscreen = (val) => { this.props.dispatch(toggleFullscreen(val)); }
  toggleChat = (val) => { this.props.dispatch(toggleChat(val)); }
  sendChatMessage = (msg) => {
    const { dispatch, user: { nickname } } = this.props;
    Session.sendMessage(msg);
    dispatch(sendChatMessage(nickname, msg));
  }
  toggleVideoPlaying = () => { this.props.dispatch(toggleVideoPlaying()); }

  // Navigation functions
  navigateToUserProfile = (id) => {
    const { dispatch } = this.props;
    dispatch(fetchObservedUser.request(id));
    dispatch(navigate('push', 'user_profile'));
  }
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => { this.props.dispatch(navigate('push', 'settings')); }

  render() {
    const {
      data,
      commentText,
      token,
      rating,
      isRated,
      isRatingModalOpen,
      isFullscreenOpen,
      isChatOpen,
      chatInput,
      chatMessages,
      isPaused,
      user: { favorites },
    } = this.props;
    const isFavorite = favorites.contains(data.id);

    return (
      <ActiveClassComponent
        data={data}
        commentText={commentText}
        onCommentChange={this.onCommentChange}
        token={token}
        rating={rating}
        isRated={isRated}
        isRatingModalOpen={isRatingModalOpen}
        showRatingModal={this.showRatingModal}
        onRateChange={this.onRateChange}
        rateHandler={this.rateHandler}
        navigateToUserProfile={this.navigateToUserProfile}
        text={data.title}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
        isFullscreenOpen={isFullscreenOpen}
        toggleFullscreen={this.toggleFullscreen}
        isChatOpen={isChatOpen}
        toggleChat={this.toggleChat}
        sendChatMessage={this.sendChatMessage}
        chatInput={chatInput}
        updateChatInputField={this.onChatInputChange}
        chatMessages={chatMessages}
        isPaused={isPaused}
        toggleVideoPlaying={this.toggleVideoPlaying}
        isFavorite={isFavorite}
        addToFavorites={this.addToFavorites}
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
    rating: ratingSelector(state),
    isRated: isRatedSelector(state),
    isRatingModalOpen: isRatingModalOpenSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
    isFullscreenOpen: isFullscreenOpenSelector(state),
    isChatOpen: isChatOpenSelector(state),
    chatInput: chatInputSelector(state),
    chatMessages: chatMessagesSelector(state),
    isPaused: isPausedSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(ActiveClass)));
