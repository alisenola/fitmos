import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering error box
export default function ErrorBox({ text }) {
  return <Text style={styles.error}>{text}</Text>;
}

ErrorBox.propTypes = {
  text: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  error: {
    width: WIDTH,
    fontSize: 14,
    color: colors.WHITE,
    backgroundColor: colors.RED,
    textAlign: 'center',
    padding: 10,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
