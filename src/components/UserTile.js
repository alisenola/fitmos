import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import { WIDTH } from '../variables';
import { resizedImage } from '../helpers';
import * as colors from '../colors';

// Component responsible for rendering little information about user
export default function UserTile({
  user: { avatar, nickname, id },
  avatarSize = 30,
  usernameFontSize = 16,
  navigateToUserProfile,
  clickable = false,
  withHighlight = false,
}) {
  return (
    <View style={[styles.container, { height: avatarSize }]}>
      <View style={[styles.trainer, withHighlight ? undefined : { width: WIDTH }]}>
        {
          clickable ? (
            <TouchableOpacity
              style={{
                top: (avatarSize / 2) - (usernameFontSize / 2) - 4,
                left: (avatarSize / 2) + 2,
                position: 'absolute',
              }}
              onPress={() => navigateToUserProfile(id)}
            >
              <Text
                style={[
                  {
                    fontSize: usernameFontSize,
                    padding: 2,
                    paddingLeft: (avatarSize / 2) + 2,
                  },
                  styles.text,
                  withHighlight ? styles.hightlight : undefined,
                ]}
              >{nickname}</Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                {
                  top: (avatarSize / 2) - (usernameFontSize / 2) - 4,
                  fontSize: usernameFontSize,
                  padding: 2,
                  paddingLeft: (avatarSize / 2) + 2,
                  left: (avatarSize / 2) + 2,
                  position: 'absolute',
                },
                styles.text,
                withHighlight ? styles.hightlight : undefined,
              ]}
            >{nickname}</Text>
          )
        }
        <Image
          style={[{
            height: avatarSize,
            width: avatarSize,
            borderRadius: avatarSize / 2,
          }, styles.image]}
          source={resizedImage(avatar, 400)}
        />
      </View>
    </View>
  );
}

UserTile.propTypes = {
  user: React.PropTypes.object.isRequired,
  avatarSize: React.PropTypes.number,
  usernameFontSize: React.PropTypes.number,
  clickable: React.PropTypes.bool,
  withHighlight: React.PropTypes.bool,
  navigateToUserProfile: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    position: 'relative',
  },
  trainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: colors.TURQUOISE,
    backgroundColor: colors.TRANSPARENT,
    fontFamily: 'antonio-regular',
  },
  image: {
    position: 'absolute',
    left: 0,
    borderWidth: 2,
    borderColor: colors.TURQUOISE,
    backgroundColor: Platform.select({
      ios: colors.LIGHT_GRAY,
      android: colors.TRANSPARENT,
    }),
  },
  hightlight: {
    color: colors.BLACK,
    backgroundColor: colors.TURQUOISE,
  },
});
