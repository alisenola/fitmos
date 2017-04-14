import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import RNImagePicker from 'react-native-image-picker';

import * as colors from '../colors';

// Image picker's options - see https://github.com/marcshilling/react-native-image-picker for details
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

// Component responsible for rendering image picker
export default function ImagePicker({
  imageSource,
  onImageChange,
  imageStyle = styles.image,
}) {
  const handlePress = () => {
    RNImagePicker.showImagePicker(options, ({ error, customButton, didCancel, uri }) => {
      console.log('uri');
      console.log(uri);
      if (!didCancel && !error && !customButton) {
        onImageChange(uri);
      }
    });
  };

  const source =
    typeof imageSource === 'string' ? { uri: imageSource, isStatic: true } : imageSource;

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={source} style={imageStyle} />
    </TouchableOpacity>
  );
}

ImagePicker.propTypes = {
  imageSource: React.PropTypes.any,
  imageStyle: React.PropTypes.any,
  onImageChange: React.PropTypes.func.isRequired,
  circle: React.PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.TRANSPARENT,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.LIGHT_GRAY,
  },
});
