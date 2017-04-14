import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';

import { WIDTH } from '../variables';

// Component responsible for rendering location
export default function LocationTile({ location: { place, street, city } }) {
  return (
    <Text style={[styles.fullWidth, styles.text]}>{`${place}, ${street}, ${city}`}</Text>
  );
}

LocationTile.propTypes = {
  location: React.PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'antonio-regular',
  },
  fullWidth: {
    width: WIDTH,
  },
});
