import React from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { CLASS_IMAGE_HEIGHT, WIDTH, MARGIN } from '../variables';
import { capitalize } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import OvalTile from './OvalTile';
import UserTile from './UserTile';
import LocationTile from './LocationTile';
import LanguageTile from './LanguageTile';
import DateTile from './DateTile';
import SignedTile from './SignedTile';
import Button from './Button';
import MoneyTile from './MoneyTile';
import TimeTile from './TimeTile';

// Component responsible for rendering Class Details View
function ClassDetails({
  data: {
    title,
    recurring,
    interval,
    beginsDate,
    endsDate,
    currency,
    location,
    owner,
    language,
    image,
    capacity,
    signed,
    price,
    level,
    goal,
    description,
  },
  joinHanlder,
  navigateToUserProfile,
  isAbleToSign,
  pending,
  isWatched,
  addToWatched,
}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.image} source={image}>
          <View style={styles.smallContainer}>
            <UserTile
              avatarSize={40}
              user={owner}
              navigateToUserProfile={navigateToUserProfile}
              clickable
              withHighlight
            />
            <MoneyTile
              price={price}
              currency={currency}
              transparent={false}
            />
          </View>
        </Image>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            {isWatched ? (
              <Image
                style={styles.watch}
                source={require('../../assets/img/icons/visibility_violet.png')}
              />
            ) : (
              <TouchableOpacity onPress={addToWatched}>
                <Image
                  style={styles.watch}
                  source={require('../../assets/img/icons/visibility.png')}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.signedContainer}>
            <DateTile beginsDate={beginsDate} endsDate={endsDate} />
            <SignedTile signed={signed} capacity={capacity} />
          </View>

          <View style={styles.location}>
            <LocationTile location={location} />
          </View>

          <Text style={styles.smallText}>{description}</Text>

          <View style={styles.ovals}>
            <TimeTile beginsDate={beginsDate} endsDate={endsDate} />
            <LanguageTile language={language} />
            <OvalTile text={capitalize(level)} />
            <OvalTile text={capitalize(goal)} />
            {recurring && <OvalTile text="Recurring" />}
            {recurring && <OvalTile text={capitalize(interval)} />}
          </View>

          {isAbleToSign && <Button text="SIGN UP" onPress={joinHanlder} />}

          {pending && (
            <ActivityIndicator
              animating={pending}
              style={{ height: 80 }}
              size="large"
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

ClassDetails.propTypes = {
  data: React.PropTypes.object.isRequired,
  joinHanlder: React.PropTypes.func.isRequired,
  navigateToUserProfile: React.PropTypes.func.isRequired,
  isAbleToSign: React.PropTypes.bool.isRequired,
  pending: React.PropTypes.bool.isRequired,
  isWatched: React.PropTypes.bool,
  addToWatched: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  watch: {
    width: 25,
    height: 17,
  },
  titleContainer: {
    width: WIDTH - (2 * MARGIN),
    height: 30,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontFamily: 'antonio-bold',
  },
  smallText: {
    width: WIDTH - (2 * MARGIN),
    fontSize: 14,
  },
  image: {
    width: WIDTH,
    height: CLASS_IMAGE_HEIGHT,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GRAY,
  },
  smallContainer: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    marginBottom: 20,
  },
  signedContainer: {
    width: WIDTH - (2 * MARGIN),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  location: {
    marginLeft: 15,
    marginBottom: 10,
  },
  ovals: {
    width: WIDTH - (2 * MARGIN),
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export default withTopNavigationBar(ClassDetails, 'backWithOptions');
