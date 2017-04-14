import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering price Navigation Bar
export default function NavBar({
  onBackPress,
  backText,
  backIcon,
  backIconStyle,
  onContinuePress,
  continueText,
  continueIcon,
  continueIconStyle,
  middleText,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.smallContainer}>
      {!!onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 10 }}>
            {!!backIcon && (<Image style={backIconStyle} source={backIcon} />)}
            {!!backText && (
              <Text style={[styles.text, { marginLeft: 8 }]}>{backText}</Text>
            )}
          </View>
        </TouchableOpacity>
      )}
      </View>
      {!!middleText && (
        <Text style={[styles.text, { fontWeight: 'bold', justifyContent: 'center' }]}>
          {middleText.length > 11 ? `${middleText.substr(0, 12)}...` : middleText}
        </Text>
      )}
      <View style={styles.smallContainer}>
      {!!onContinuePress && (
        <TouchableOpacity onPress={onContinuePress}>
          <View style={[styles.smallContainer, { justifyContent: 'flex-end', paddingVertical: 10  }]}>
            {!!continueText && (
              <Text style={[styles.text, { marginRight: 8 }]}>{continueText}</Text>
            )}
            {!!continueIcon && (<Image style={continueIconStyle} source={continueIcon} />)}
          </View>
        </TouchableOpacity>
      )}
      </View>
    </View>
  );
}

NavBar.propTypes = {
  onBackPress: React.PropTypes.func,
  backText: React.PropTypes.string,
  backIcon: React.PropTypes.any,
  backIconStyle: React.PropTypes.any,
  onContinuePress: React.PropTypes.func,
  continueText: React.PropTypes.string,
  continueIcon: React.PropTypes.any,
  continueIconStyle: React.PropTypes.any,
  middleText: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 40,
    backgroundColor: colors.NAV_BLACK,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  smallContainer: {
    flexDirection: 'row',
    width: 0.33 * WIDTH,
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
  },
});
