import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for displaying message when there are zero items in list
export default function EmptyListMessage() {
  return (
    <Text style={styles.message}>No class available!</Text>
  );
}

const styles = StyleSheet.create({
  message: {
    fontFamily: 'antonio-regular',
    fontSize: 20,
    width: WIDTH,
    textAlign: 'center',
    color: colors.DARKVIOLET,
    paddingVertical: 10,
  },
});
