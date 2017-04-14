import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';

import { WIDTH } from '../variables';
import * as colors from '../colors';

// Component responsible for rendering video player
export default function VideoPlayer({ archiveUrl, paused, toggleVideoPlaying }) {
  const icon = paused ?
    require('../../assets/img/icons/play_arrow.png') : require('../../assets/img/icons/pause.png');

  return (
    <View style={[styles.container, styles.dimensions]}>
      <Video
        source={{ uri: archiveUrl }}
        rate={1.0}
        volume={1.0}
        muted={false}
        paused={paused}
        resizeMode="cover"
        repeat={false}
        playInBackground={false}
        playWhenInactive={false}
        style={styles.dimensions}
      />

      <View style={styles.overlayBar}>
        <TouchableOpacity onPress={toggleVideoPlaying}>
          <Image
            style={styles.icon}
            source={icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

VideoPlayer.propTypes = {
  archiveUrl: React.PropTypes.string.isRequired,
  toggleVideoPlaying: React.PropTypes.func.isRequired,
  paused: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  dimensions: {
    width: WIDTH,
    height: 200,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  overlayBar: {
    backgroundColor: colors.BLACK_TRANSAPRENT,
    position: 'absolute',
    width: WIDTH,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
  },
});
