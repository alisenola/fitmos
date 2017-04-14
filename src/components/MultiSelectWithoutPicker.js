import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import * as colors from '../colors';

import OvalTile from './OvalTile';

// Component responsible for rendering select component and triggering connected picker
export default function MultiSelectWithoutPicker({ style, values, toggleFn, removeFn }) {
  return (
    <View style={[styles.container, style]}>
      {
        values.map((val, i) =>
          <OvalTile
            key={i}
            text={Array.isArray(val) ? val[0] : val}
            onPress={removeFn ? () => removeFn(i) : () => {}}
          />)
      }
      <OvalTile text="+" onPress={toggleFn} circle />
    </View>
  );
}

MultiSelectWithoutPicker.propTypes = {
  values: React.PropTypes.any.isRequired,
  toggleFn: React.PropTypes.func,
  removeFn: React.PropTypes.func,
  style: React.PropTypes.any,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.TRANSPARENT,
  },
});
