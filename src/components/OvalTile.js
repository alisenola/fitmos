import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import * as colors from '../colors';

// Component responsible for rendering text inside oval
export default function OvalTile({ text, onPress, circle = false }) {
  return (
    <Text
      style={circle ? styles.circle : [styles.text, styles.oval]}
      onPress={onPress}
    >
      {text}
    </Text>
  );
}

OvalTile.propTypes = {
  text: React.PropTypes.string.isRequired,
  onPress: React.PropTypes.func,
  circle: React.PropTypes.bool,
};

const styles = StyleSheet.create({
  circle: {
    fontSize: 18,
    color: colors.DARK_GRAY,
    backgroundColor: colors.LIGHT_GRAY,
    overflow: 'hidden',
    textAlign: 'center',
    height: 28,
    width: 28,
    borderRadius: 14,
    paddingTop: 2,
  },
  text: {
    height: 28,
    fontSize: 14,
    padding: 4,
    color: colors.DARK_GRAY,
    fontFamily: 'antonio-regular',
  },
  oval: {
    backgroundColor: colors.LIGHT_GRAY,
    overflow: 'hidden',
    borderRadius: 11,
    marginRight: 8,
  },
});
