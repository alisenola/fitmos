import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import * as colors from '../colors';

// Component responsible for rendering button with user type
export default function TypeButton({
  onPress,
  text,
  image,
  imageStyles = styles.typeImage,
  fontSize = 18,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.typeContainer}>
        <Image
          source={image}
          style={imageStyles}
        />
        <Text style={[styles.typeText, { fontSize }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

TypeButton.propTypes = {
  onPress: React.PropTypes.func.isRequired,
  image: React.PropTypes.any.isRequired,
  text: React.PropTypes.string.isRequired,
  imageStyles: React.PropTypes.any,
  fontSize: React.PropTypes.number,
};

const styles = StyleSheet.create({
  typeImage: {
    width: 80,
    height: 80,
  },
  typeText: {
    backgroundColor: colors.TRANSPARENT,
    color: colors.WHITE,
    fontFamily: 'antonio-regular',
  },
  typeContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
