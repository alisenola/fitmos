import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import { WIDTH, TOP_NAV_BAR_HEIGHT } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering nav bar with logo
export default function TopNavBar({ onRightClick, rightIcon, iconStyle }) {
  return (
    <View style={styles.container}>
      <View style={styles.element} />
      <View style={[styles.element, styles.center]}>
        <Image style={styles.logo} source={require('../../assets/img/icons/logo_nav.png')} />
      </View>
      <View style={[styles.element, styles.right]}>
        <TouchableOpacity onPress={onRightClick}>
          <Image style={iconStyle} source={rightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

TopNavBar.propTypes = {
  onRightClick: React.PropTypes.func.isRequired,
  rightIcon: React.PropTypes.any.isRequired,
  iconStyle: React.PropTypes.any.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: TOP_NAV_BAR_HEIGHT,
    backgroundColor: colors.NAV_BLACK,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  element: {
    width: 0.33 * WIDTH,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  logo: {
    height: TOP_NAV_BAR_HEIGHT - 10,
    width: 50,
  },
});
