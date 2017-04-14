import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering dividing line
export default function ClassDivider() {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divider: {
    width: 0.94 * WIDTH,
    height: 1,
    backgroundColor: colors.LIGHT_GRAY,
  },
});
