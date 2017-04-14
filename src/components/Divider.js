import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering dividing line
export default function Divider() {
  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: 0.9 * WIDTH,
    height: 1,
    backgroundColor: colors.BLACK,
  },
});
