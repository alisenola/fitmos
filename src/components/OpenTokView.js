import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { PublisherView, SubscriberView } from 'react-native-opentok';

import { OPENTOK_API_KEY, WIDTH, HEIGHT, NOOP } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering OpenTok View
function OpenTokView({
  sessionId,
  token,
  toggleFullscreen,
  isFullscreen,
  isChatOpen,
  toggleChat,
  sendChatMessage,
  chatInput,
  chatMessages,
  updateChatInputField,
  startArchiving,
  stopArchiving,
  showModal,
  stopStreaming,
}, type) {
  return (
    <View>
      <View style={[styles.container, styles.streamWindow]}>
        {
          !isFullscreen && type === 'publisher' && (
            <PublisherView
              apiKey={OPENTOK_API_KEY}
              sessionId={sessionId}
              token={token}
              style={styles.streamWindow}
              onPublishStart={startArchiving}
              onPublishStop={stopArchiving}
            />
          )
        }
        {
          !isFullscreen && type === 'subscriber' && (
            <SubscriberView
              apiKey={OPENTOK_API_KEY}
              sessionId={sessionId}
              token={token}
              style={styles.streamWindow}
              onSubscribeStop={showModal}
            />
          )
        }
        <View style={styles.overlayBar}>
          <TouchableOpacity onPress={stopStreaming}>
            <Image style={styles.icon} source={require('../../assets/img/icons/pause.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFullscreen(true)}>
            <Image style={styles.icon} source={require('../../assets/img/icons/fullscreen.png')} />
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={isFullscreen}
          onRequestClose={NOOP}
        >
          {
            isFullscreen && type === 'publisher' && (
              <TouchableWithoutFeedback onPress={() => toggleChat(true)}>
                <PublisherView
                  apiKey={OPENTOK_API_KEY}
                  sessionId={sessionId}
                  token={token}
                  style={styles.fullscreenWindow}
                  onPublishStart={startArchiving}
                />
              </TouchableWithoutFeedback>
            )
          }
          {
            isFullscreen && type === 'subscriber' && (
              <TouchableWithoutFeedback onPress={() => toggleChat(true)}>
                <SubscriberView
                  apiKey={OPENTOK_API_KEY}
                  sessionId={sessionId}
                  token={token}
                  style={styles.fullscreenWindow}
                  onSubscribeStop={showModal}
                />
              </TouchableWithoutFeedback>
            )
          }
          {
            isChatOpen && (
              <TouchableWithoutFeedback onPress={() => toggleChat(false)}>
                <View style={styles.chatOverlay}>
                  {
                    chatMessages.map(({ username, message }, i) =>
                      <OpenTokView.ChatRow key={i} username={username} message={message} />
                    )
                  }
                  <TextInput
                    style={styles.input}
                    onChangeText={updateChatInputField}
                    value={chatInput}
                    onSubmitEditing={() => sendChatMessage(chatInput)}
                  />
                </View>
              </TouchableWithoutFeedback>
            )
          }
          <View style={styles.overlayBar}>
            <TouchableOpacity onPress={stopStreaming}>
              <Image style={styles.icon} source={require('../../assets/img/icons/pause.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleFullscreen(false)}>
              <Image
                style={styles.icon}
                source={require('../../assets/img/icons/fullscreen_shrink.png')}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

OpenTokView.propTypes = {
  sessionId: React.PropTypes.string.isRequired,
  token: React.PropTypes.string.isRequired,
  toggleFullscreen: React.PropTypes.func.isRequired,
  isFullscreen: React.PropTypes.bool.isRequired,
  toggleChat: React.PropTypes.func.isRequired,
  isChatOpen: React.PropTypes.bool.isRequired,
  messageToChat: React.PropTypes.func.isRequired,
  chatMessages: React.PropTypes.object.isRequired,
  sendChatMessage: React.PropTypes.func.isRequired,
  chatInput: React.PropTypes.string.isRequired,
  updateChatInputField: React.PropTypes.func.isRequired,
  stopStreaming: React.PropTypes.func,
  startArchiving: React.PropTypes.func,
  stopArchiving: React.PropTypes.func,
  showModal: React.PropTypes.func,
};

// eslint-disable-next-line react/prop-types
OpenTokView.ChatRow = ({ username, message }) => (
  <View style={styles.chatRecord}>
    <Text style={styles.username}>{username}</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  transparent: {
    fontSize: 16,
    backgroundColor: colors.TURQUOISE_TRANSAPRENT,
  },
  regular: {
    fontSize: 16,
    backgroundColor: colors.TURQUOISE,
  },
  streamWindow: {
    width: WIDTH,
    height: 200,
  },
  fullscreenWindow: {
    width: WIDTH,
    height: HEIGHT,
  },
  overlayBar: {
    backgroundColor: colors.BLACK_TRANSAPRENT,
    position: 'absolute',
    width: WIDTH,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
  },
  chatOverlay: {
    backgroundColor: colors.TRANSAPRENT,
    position: 'absolute',
    height: HEIGHT - 40,
    width: WIDTH,
    bottom: 50,
    left: 0,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  chatRecord: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: 50,
    width: WIDTH,
    backgroundColor: colors.TRANSPARENT,
  },
  input: {
    backgroundColor: colors.WHITE_TRANSAPRENT,
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 3,
    borderRadius: 7,
    height: 30,
    width: 0.8 * WIDTH,
    alignSelf: 'center',
  },
  username: {
    color: colors.TURQUOISE,
  },
  message: {
    color: colors.WHITE,
  },
});

export const Publisher = (props) => OpenTokView(props, 'publisher');
export const Subscriber = (props) => OpenTokView(props, 'subscriber');
