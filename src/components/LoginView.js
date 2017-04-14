import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import Video from 'react-native-video';

import { FOOTER_HEIGHT, WIDTH } from '../variables';
import * as colors from '../colors';

import LoginCarousel from './LoginCarousel';
import LoginButton from './LoginButton';

const BACKGROUND_IOS = { uri: 'background' };
const BACKGROUND_ANDROID = require('../../assets/backgroundAndroid.mp4');

// Component responsible for rendering Login View
export default function LoginView({
  pending,
  role,
  updateType,
  loginHandler,
}) {
  return (
    <View style={styles.container}>
      <Video
        source={Platform.OS === 'ios' ? BACKGROUND_IOS : BACKGROUND_ANDROID}
        style={styles.backgroundVideo}
        rate={1}
        muted
        resizeMode="cover"
        repeat
        key="backgroundVideo"
      />

      <LoginCarousel
        pending={pending}
        updateType={updateType}
        type={role}
      />

      <View style={styles.signupContainer}>
        <LoginButton
          text="Sign Up"
          loginHandler={loginHandler}
        />
        <View style={styles.logInContainer}>
          <Text style={styles.logIn}>Already have an account?&nbsp;</Text>
          <LoginButton
            text="Log in"
            loginHandler={loginHandler}
            transparent
          />
        </View>
      </View>
    </View>
  );
}

LoginView.propTypes = {
  pending: React.PropTypes.bool.isRequired,
  role: React.PropTypes.string.isRequired,
  updateType: React.PropTypes.func.isRequired,
  loginHandler: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  signupContainer: {
    width: WIDTH,
    height: FOOTER_HEIGHT,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 0.6 * WIDTH,
  },
  logIn: {
    fontSize: 16,
    color: colors.WHITE,
    backgroundColor: colors.TRANSPARENT,
    fontFamily: 'Antonio-Light',
  },
});
