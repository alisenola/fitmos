import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering comment
export default function Comment({ text, author }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={author.avatar}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{author.nickname}</Text>
        <Text style={styles.comment}>{text}</Text>
      </View>
    </View>
  );
}

Comment.propTypes = {
  author: React.PropTypes.object.isRequired,
  text: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'column',
    borderBottomWidth: 0.5,
    borderBottomColor: colors.DARK_GRAY,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginHorizontal: 15,
    marginTop: 10,
    backgroundColor: colors.LIGHT_GRAY,
  },
  comment: {
    width: WIDTH,
    color: colors.DARK_GRAY,
    marginBottom: 10,
    fontWeight: '300',
  },
  name: {
    color: colors.BLUE_TURQ,
    marginVertical: 10,
  },
});
