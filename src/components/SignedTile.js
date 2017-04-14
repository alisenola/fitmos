import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { CAPACITY_DIFFERENCE } from '../variables';
import * as colors from '../colors';

const addZeros = (number) => {
  if (number < 10) {
    return `00${number}`;
  } else if (number < 100) {
    return `0${number}`;
  }

  return number;
};

// Component responsible for rendering information about people signed up to class and it's capacity
export default function SignedTile({ signed, capacity }) {
  const isCloseToFull = (capacity - signed) < CAPACITY_DIFFERENCE;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/img/icons/signed.png')} />
      <Text style={[styles.text, isCloseToFull ? styles.violet : styles.gray]}>
        {`${addZeros(signed)}/${addZeros(capacity)}`}
      </Text>
    </View>
  );
}

SignedTile.propTypes = {
  signed: React.PropTypes.number.isRequired,
  capacity: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: 20,
    height: 24,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontFamily: 'antonio-regular',
  },
  gray: {
    color: colors.DARK_GRAY,
  },
  violet: {
    color: colors.DARKVIOLET,
  },
});
