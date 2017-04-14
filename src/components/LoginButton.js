import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering login buttons
export default function LoginButton({
  text,
  transparent = false,
  loginHandler,
}) {
  return (
    <TouchableOpacity
      style={transparent ? styles.transparentButton : styles.button}
      onPress={loginHandler}
    >
      <Text style={transparent ? styles.transparentText : styles.text}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

LoginButton.propTypes = {
  text: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func,
  transparent: React.PropTypes.bool,
  loginHandler: React.PropTypes.func.isRequired,
};

const styles = {
  button: {
    height: 50,
    width: 0.8 * WIDTH,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    borderColor: colors.VIOLET_TRANSAPRENT,
    borderWidth: 2,
    borderRadius: 3,
  },
  text: {
    fontSize: 18,
    color: colors.BLACK,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'antonio-bold',
  },
  transparentButton: {
    backgroundColor: colors.TRANSPARENT,
  },
  transparentText: {
    fontSize: 16,
    color: colors.WHITE,
    textDecorationLine: 'underline',
    fontFamily: 'antonio-bold',
  },
};
