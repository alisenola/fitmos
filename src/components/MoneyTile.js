import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import accounting from 'accounting';

import * as colors from '../colors';

// Component responsible for rendering price with currency
export default function MoneyTile({ price, transparent = true }) {
  return (
    <Text style={transparent ? styles.transparent : styles.regular}>
      {`${accounting.formatMoney(price)}`}
    </Text>
  );
}

MoneyTile.propTypes = {
  price: React.PropTypes.number.isRequired,
  currency: React.PropTypes.string.isRequired,
  transparent: React.PropTypes.bool,
};

const styles = StyleSheet.create({
  transparent: {
    fontSize: 16,
    backgroundColor: colors.TURQUOISE_TRANSAPRENT,
  },
  regular: {
    fontSize: 16,
    backgroundColor: colors.TURQUOISE,
  },
});
