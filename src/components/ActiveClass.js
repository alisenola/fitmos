import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { CLASS_IMAGE_HEIGHT, WIDTH, MARGIN, HEIGHT } from '../variables';
import { capitalize } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import TimeTile from './TimeTile';
import OvalTile from './OvalTile';
import Comment from './Comment';
import LocationTile from './LocationTile';
import LanguageTile from './LanguageTile';
import DateTile from './DateTile';
import SignedTile from './SignedTile';
import RatingModal from './RatingModal';
import VideoPlayer from './VideoPlayer';
import { Subscriber } from './OpenTokView';

// Component responsible for rendering Active Class View
function ActiveClass({
  data: {
    title,
    image,
    recurring,
    interval,
    beginsDate,
    endsDate,
    location,
    language,
    capacity,
    signed,
    description,
    level,
    goal,
    comments,
    opentokSessionId,
    archiveUrl,
  },
  onCommentChange,
  commentText,
  token,
  rating,
  isRated,
  isRatingModalOpen,
  showRatingModal,
  onRateChange,
  rateHandler,
  isFullscreenOpen,
  toggleFullscreen,
  isChatOpen,
  toggleChat,
  sendChatMessage,
  chatInput,
  chatMessages,
  updateChatInputField,
  toggleVideoPlaying,
  isPaused,
  isFavorite,
  addToFavorites,
}) {
  const now = new Date().getTime();
  return (
    <ScrollView>
      <View style={styles.container}>
        <RatingModal
          starCount={rating}
          isOpen={isRatingModalOpen}
          isRated={isRated}
          hideModal={() => showRatingModal(false)}
          onRateChange={onRateChange}
          rateHandler={rateHandler}
          title={title}
          onChangeText={onCommentChange}
          comment={commentText}
        />

        {!!token && endsDate >= now && (
          <Subscriber
            sessionId={opentokSessionId}
            token={token}
            isFullscreen={isFullscreenOpen}
            toggleFullscreen={toggleFullscreen}
            isChatOpen={isChatOpen}
            toggleChat={toggleChat}
            sendChatMessage={sendChatMessage}
            chatInput={chatInput}
            chatMessages={chatMessages}
            updateChatInputField={updateChatInputField}
            showModal={() => showRatingModal(true)}
          />
        )}

        {archiveUrl && endsDate < now && (
          <VideoPlayer
            archiveUrl={archiveUrl}
            paused={isPaused}
            toggleVideoPlaying={toggleVideoPlaying}
          />
        )}

        {!archiveUrl && endsDate < now && (
          <Image style={styles.image} source={image} />
        )}

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {isFavorite ? (
              <Image style={styles.star} source={require('../../assets/img/icons/rate_star.png')} />
            ) : (
              <TouchableOpacity onPress={addToFavorites}>
                <Image
                  style={styles.star}
                  source={require('../../assets/img/icons/rate_star_outline.png')}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signedContainer}>
            <DateTile beginsDate={beginsDate} endsDate={endsDate} />
            <SignedTile signed={signed} capacity={capacity} />
          </View>

          <View style={styles.location}>
            <LocationTile location={location} />
          </View>

          <Text style={styles.smallText}>{description}</Text>

          <View style={styles.ovals}>
            <TimeTile beginsDate={beginsDate} endsDate={endsDate} />
            <LanguageTile language={language} />
            <OvalTile text={capitalize(level)} />
            <OvalTile text={capitalize(goal)} />
            {recurring && <OvalTile text="Recurring" />}
            {recurring && <OvalTile text={capitalize(interval)} />}
          </View>
        </View>

        <View style={styles.commentContainer}>
          {
            comments.map(
              (comment, i) => <Comment key={i} author={comment.owner} text={comment.text} />
            )
          }
        </View>

      </View>
    </ScrollView>
  );
}

ActiveClass.propTypes = {
  data: React.PropTypes.object.isRequired,
  onCommentChange: React.PropTypes.func.isRequired,
  commentText: React.PropTypes.string.isRequired,
  token: React.PropTypes.string.isRequired,
  rating: React.PropTypes.number.isRequired,
  isRatingModalOpen: React.PropTypes.bool.isRequired,
  showRatingModal: React.PropTypes.func.isRequired,
  isRated: React.PropTypes.bool.isRequired,
  onRateChange: React.PropTypes.func.isRequired,
  rateHandler: React.PropTypes.func.isRequired,
  isFullscreenOpen: React.PropTypes.bool.isRequired,
  toggleFullscreen: React.PropTypes.func.isRequired,
  isChatOpen: React.PropTypes.bool.isRequired,
  toggleChat: React.PropTypes.func.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired,
  chatInput: React.PropTypes.string.isRequired,
  chatMessages: React.PropTypes.object.isRequired,
  updateChatInputField: React.PropTypes.func.isRequired,
  isPaused: React.PropTypes.bool,
  toggleVideoPlaying: React.PropTypes.func,
  isFavorite: React.PropTypes.bool,
  addToFavorites: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  titleContainer: {
    width: WIDTH - (2 * MARGIN),
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  star: {
    height: 25,
    width: 27,
  },
  video: {
    width: WIDTH,
    height: 200,
  },
  smallText: {
    width: WIDTH - (2 * MARGIN),
    fontSize: 12,
  },
  smallContainer: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 20,
  },
  signedContainer: {
    width: WIDTH - (2 * MARGIN),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  location: {
    marginLeft: 15,
    marginBottom: 10,
  },
  ovals: {
    width: WIDTH - (2 * MARGIN),
    flexDirection: 'row',
    marginVertical: 10,
  },
  stream: {
    width: WIDTH,
    height: CLASS_IMAGE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  streamWindow: {
    width: WIDTH,
    height: 200,
  },
  commentContainer: {
    width: WIDTH,
    backgroundColor: colors.LIGHT_GRAY,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 0.4 * HEIGHT,
  },
  image: {
    width: WIDTH,
    height: CLASS_IMAGE_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GRAY,
  },
});

export default withTopNavigationBar(ActiveClass, 'backWithOptions');
