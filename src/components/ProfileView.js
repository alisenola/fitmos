import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import { WIDTH, HEIGHT } from '../variables';
import { capitalize, resizedImage } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import withTopBarWithLogo from './withTopBarWithLogo';
import UserRating from './UserRating';
import OvalTile from './OvalTile';

// Component responsible for rendering user's profile
function ProfileView({
  user: {
    avatar,
    nickname,
    firstName,
    lastName,
    role,
    gender,
    aboutMe,
    specialities,
    rate,
    score,
  },
  editHandler,
  isPrivate = true,
}) {
  return (
    <ScrollView style={{ flex: 1 }} automaticallyAdjustContentInsets={false} >
      <Image
        source={require('../../assets/img/gradient_bg.png')}
        style={[styles.background, styles.container]}
      >
        {isPrivate && (
          <View style={styles.settingsContainer}>
            <TouchableOpacity onPress={editHandler}>
              <Image
                style={styles.settings}
                source={require('../../assets/img/icons/settings.png')}
              />
            </TouchableOpacity>
          </View>
        )}

        <Image style={styles.image} source={resizedImage(avatar, 400)} />
        <Text style={[styles.text, styles.name]}>{nickname}</Text>
        <Text style={[styles.text, styles.details]}>
          {firstName && (
            `${firstName} `
          )}
          {lastName && (
            lastName
          )}
        </Text>
        <Text style={[styles.text, styles.details]}>
          {`${capitalize(gender)}, ${role === 'user' ? 'Attendee' : 'Fitness expert'}`}
        </Text>
        <Text style={[styles.text, styles.details]}>{`Score : ${score}`}</Text>

        {role === 'trainer' && (
          <View style={styles.trainerContainer}>
            <UserRating count={rate} />
            <View style={styles.specialitiesContainer}>
              {specialities.map((spec, i) => <OvalTile key={i} text={spec} />)}
            </View>
            <Text style={[styles.text, styles.aboutMe]}>About me:</Text>
            <Text style={[styles.text, styles.details]}>{aboutMe}</Text>
          </View>
        )}
      </Image>
    </ScrollView>
  );
}

ProfileView.propTypes = {
  user: React.PropTypes.object.isRequired,
  editHandler: React.PropTypes.func,
  isPrivate: React.PropTypes.bool,
  specialities: React.PropTypes.object,
  rate: React.PropTypes.number,
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: WIDTH,
    height: 1.05 * HEIGHT,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  trainerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    width: 0.8 * WIDTH,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.WHITE,
    marginTop: 40,
    backgroundColor: Platform.select({
      ios: colors.LIGHT_GRAY,
      android: colors.TRANSPARENT,
    }),
  },
  text: {
    color: colors.WHITE,
    backgroundColor: colors.TRANSPARENT,
    fontFamily: 'Antonio-Light',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
  },
  aboutMe: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specialitiesContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  settingsContainer: {
    width: WIDTH,
    marginTop: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  setting: {
    height: 20,
    width: 20,
  },
});

export const NavProfileView = withTopBarWithLogo(ProfileView);
export const BackProfileView = withTopNavigationBar(ProfileView, 'backWithOptions');
