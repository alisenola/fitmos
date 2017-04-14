import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import Carousel from 'react-native-spring-carousel';

import { FOOTER_HEIGHT, WIDTH, STATUS_BAR_HEIGHT, HEIGHT } from '../variables';
import * as colors from '../colors';

import TypeButton from './TypeButton';

const CAROUSEL_HEIGHT = HEIGHT - FOOTER_HEIGHT - STATUS_BAR_HEIGHT;

// Component responsible for rendering carousel on login screen
export default function LoginCarousel({ pending, updateType, type }) {
  return (
    <Carousel
      width={WIDTH}
      height={CAROUSEL_HEIGHT}
      pagerColor={colors.WHITE}
      activePagerColor={colors.TURQUOISE}
      pagerSize={10}
      pagerOffset={10}
      pagerMargin={2}
    >
      <View style={styles.carouselContainer}>
        <Image style={styles.logo} source={require('../../assets/img/icons/logo_splash.png')} />
        {pending ? (
          <ActivityIndicator
            animating={pending}
            style={[styles.centering, { height: 80 }]}
            size="large"
          />
        ) : (
          <Text style={styles.details}>
            Our platform is designed to bring fitness
            experts and motivated users together for
            live streaming fitness, health, and
            nutrition classes.
          </Text>
        )
        }
      </View>

      <View style={styles.carouselContainer}>
        <Text style={styles.details}>
          {"There are two types of users in AtmosFit:\n Experts and Users."}
        </Text>

        <Text style={styles.details}>
          Experts host classes and guide users towards their goals.
          Users engage these experts and attend classes that
          match their desired goals.
        </Text>

        <View style={styles.buttonContainer}>
          <Text style={styles.details}>
            Please choose:
          </Text>

          <View style={styles.buttons}>
            <TypeButton
              onPress={() => updateType('trainer')}
              image={require('../../assets/img/icons/expert_icon.png')}
              text="EXPERT"
            />

            <TypeButton
              onPress={() => updateType('user')}
              image={require('../../assets/img/icons/attendee_icon.png')}
              text="ATTENDEE"
            />
          </View>
        </View>
      </View>

      <View style={[styles.carouselContainer, styles.carouselContainerCenter]}>
        <Text style={styles.details}>Hey Fitlete!</Text>
        {
          type === 'user' ?
            (<Text style={styles.details}>
              Lets get your short profile set up so you can start searching for classes!
            </Text>) :
            (<Text style={styles.details}>
              Lets get your profile set up so you can start creating classes!
            </Text>)
        }
      </View>
    </Carousel>
  );
}

LoginCarousel.propTypes = {
  pending: React.PropTypes.bool.isRequired,
  updateType: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: WIDTH,
    height: CAROUSEL_HEIGHT,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  carouselContainerCenter: {
    justifyContent: 'center',
  },
  logo: {
    width: 190,
    height: 166,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  details: {
    width: 0.8 * WIDTH,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    backgroundColor: colors.TRANSPARENT,
    color: colors.WHITE,
    fontFamily: 'antonio-bold',
  },
  buttonContainer: {
    width: WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
  },
  buttons: {
    width: 0.8 * WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
