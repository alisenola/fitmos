import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import { CLASS_IMAGE_DIMENSION, WIDTH } from '../variables';
import { resizedImage } from '../helpers';
import * as colors from '../colors';

import UserTile from './UserTile';
import LanguageTile from './LanguageTile';
import DateTile from './DateTile';
import SignedTile from './SignedTile';
import Button from './Button';
import TimeTile from './TimeTile';
import MoneyTile from './MoneyTile';
import ClassDivider from './ClassDivider';

const IMAGE_CONTAINER_WIDTH = CLASS_IMAGE_DIMENSION + 20;

// Component responsible for rendering class list record
export default function ClassesTile({
  classObj,
  classObj: {
    title,
    owner,
    language,
    price,
    beginsDate,
    endsDate,
    capacity,
    signed,
    image,
    description,
    currency,
  },
  signInHandler,
  streaming = false,
  streamHandler,
  join = false,
  joinHandler,
}) {
  const isStreaming = !join && streaming;
  const isJoining = join && !streaming;
  const isSigningUp = !join && !streaming;

  const handler = do {
    if (isStreaming) {
      () => streamHandler(classObj);
    } else if (isJoining) {
      () => joinHandler(classObj);
    } else if (isSigningUp) {
      () => signInHandler(classObj);
    } else {
      () => {};
    }
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handler}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={resizedImage(image, 400)}>
              <MoneyTile price={price} currency={currency} />
            </Image>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{title}</Text>

            <UserTile
              user={owner}
            />

            <Text style={styles.description}>{description}</Text>

            <View style={styles.dateContainer}>
              <DateTile beginsDate={beginsDate} endsDate={endsDate} />
              <SignedTile signed={signed} capacity={capacity} />
            </View>

            <View style={styles.dateContainer}>
              <TimeTile beginsDate={beginsDate} endsDate={endsDate} />
              <LanguageTile language={language} />
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <ClassDivider />
    </View>
  );
}

ClassesTile.propTypes = {
  classObj: React.PropTypes.object.isRequired,
  signInHandler: React.PropTypes.func,
  streaming: React.PropTypes.bool,
  streamHandler: React.PropTypes.func,
  join: React.PropTypes.bool,
  joinHandler: React.PropTypes.func,
};

// eslint-disable-next-line react/prop-types
ClassesTile.StreamingButton = ({ date, streamHandler = () => {} }) => (
  moment(date).diff(moment(), 'minutes') <= 3 ?
    <Button text="Start streaming" onPress={streamHandler} /> :
    <View style={styles.disabled}>
      <Text>
        Streaming will be available 3 min before the class
      </Text>
    </View>
);

// eslint-disable-next-line react/prop-types
ClassesTile.JoinButton = ({ joinHandler = () => {} }) =>
  <Button text="Join" onPress={joinHandler} />;


const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
  },
  container: {
    width: WIDTH,
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: CLASS_IMAGE_DIMENSION,
    height: CLASS_IMAGE_DIMENSION,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: colors.LIGHT_GRAY,
  },
  imageContainer: {
    width: IMAGE_CONTAINER_WIDTH,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    width: WIDTH - IMAGE_CONTAINER_WIDTH,
  },
  title: {
    width: WIDTH,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'antonio-bold',
  },
  description: {
    marginVertical: 4,
    fontFamily: 'Antonio-Light',
    width: 0.6 * WIDTH,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
});
