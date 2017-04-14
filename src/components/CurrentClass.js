import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
// import { PublisherView } from 'react-native-opentok';

import { CLASS_IMAGE_HEIGHT, WIDTH, MARGIN, HEIGHT } from '../variables';
import { capitalize } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import DateTile from './DateTile';
import TimeTile from './TimeTile';
import LocationTile from './LocationTile';
import LanguageTile from './LanguageTile';
import OvalTile from './OvalTile';
import SignedTile from './SignedTile';
import Button from './Button';
import Comment from './Comment';
import { Publisher } from './OpenTokView';

// Component responsible for rendering class which is currently guided by expert
function CurrentClass({
  data: {
    title,
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
  },
  token,
  startStreaming,
  streamStarted,
  isFullscreenOpen,
  toggleFullscreen,
  isChatOpen,
  toggleChat,
  sendChatMessage,
  chatInput,
  chatMessages,
  updateChatInputField,
  startArchiving,
  stopArchiving,
  stopStreaming,
}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        {
          !streamStarted && (
            <View style={[styles.stream, styles.treamWindow]}>
              <Button text="Play" onPress={startStreaming} />
            </View>
          )
        }

        {(streamStarted && !!token) && (
          <Publisher
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
            startArchiving={startArchiving}
            stopArchiving={stopArchiving}
            stopStreaming={stopStreaming}
          />
        )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

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
          {comments.length === 0 && (<Text>No reviews available!</Text>)}
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

CurrentClass.propTypes = {
  data: React.PropTypes.object.isRequired,
  onCommentChange: React.PropTypes.func.isRequired,
  commentText: React.PropTypes.string.isRequired,
  addComment: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
  startStreaming: React.PropTypes.func.isRequired,
  stopStreaming: React.PropTypes.func.isRequired,
  streamStarted: React.PropTypes.bool.isRequired,
  isFullscreenOpen: React.PropTypes.bool.isRequired,
  toggleFullscreen: React.PropTypes.func.isRequired,
  isChatOpen: React.PropTypes.bool.isRequired,
  toggleChat: React.PropTypes.func.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired,
  chatInput: React.PropTypes.string.isRequired,
  chatMessages: React.PropTypes.object.isRequired,
  updateChatInputField: React.PropTypes.func.isRequired,
  startArchiving: React.PropTypes.func.isRequired,
  stopArchiving: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  title: {
    width: WIDTH - (2 * MARGIN),
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
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
    borderTopColor: colors.DARK_GRAY,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 0.4 * HEIGHT,
  },
});

export default withTopNavigationBar(CurrentClass, 'backWithOptions');
