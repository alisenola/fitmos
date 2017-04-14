import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { CLASS_IMAGE_HEIGHT, WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering buttons
export default function Button({
  onPress,
  text,
  buttonStyles = styles.button,
  buttonTextStyles = styles.buttonText,
}) {
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={buttonTextStyles}>{text}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func.isRequired,
  buttonStyles: React.PropTypes.any,
  buttonTextStyles: React.PropTypes.any,
};

// eslint-disable-next-line react/prop-types
Button.Back = ({ onPress }) => (
  <View style={styles.backContainer}>
    <Button
      text="Back"
      onPress={onPress}
      buttonStyles={styles.back}
      buttonTextStyles={styles.backText}
    />
  </View>
);

const styles = StyleSheet.create({
  button: {
    width: 0.4 * WIDTH,
    height: 0.2 * CLASS_IMAGE_HEIGHT,
    backgroundColor: colors.TURQUOISE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.BLACK,
    fontFamily: 'antonio-regular',
    fontSize: 18,
  },
  back: {
    marginTop: 10,
    height: 20,
    width: 60,
  },
  backText: {
    fontSize: 12,
  },
  backContainer: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
