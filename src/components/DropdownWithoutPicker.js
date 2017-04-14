import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering dropdown and triggering connected picker
export default function DropdownWithoutPicker({ containerStyle, style, selectedValue, toggleFn }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={toggleFn}>
        <View style={[styles.input, style]}>
          <View style={{ width: 20 }} />
          <Text style={styles.text}>{selectedValue}</Text>
          <Image
            style={styles.icon}
            source={require('../../assets/img/icons/data_arrow_drop_down.png')}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

DropdownWithoutPicker.propTypes = {
  containerStyle: React.PropTypes.any,
  style: React.PropTypes.any,
  selectedValue: React.PropTypes.any.isRequired,
  toggleFn: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colors.BLACK,
  },
  icon: {
    width: 20,
    height: 20,
  },
  picker: {
    height: 300,
  },
});
