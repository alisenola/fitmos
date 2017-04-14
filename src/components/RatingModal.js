import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { WIDTH, HEIGHT, NOOP } from '../variables';
import * as colors from '../colors';

import StarRating from './StarRating';

// Component responsible for rendering rating modal overlay
export default function RatingModal({
  starCount,
  rateHandler,
  isOpen,
  isRated,
  hideModal,
  title,
  onChangeText,
  comment,
  onRateChange,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isOpen}
      onRequestClose={NOOP}
    >
      <View style={styles.wrapper}>
        <View style={styles.container}>
          {isRated ? (
            <View style={styles.contentContainer}>
              <Text style={styles.text}>THANK YOU FOR YOUR OPINION</Text>
              <RatingModal.Button text="OK" onPress={hideModal} filled large />
            </View>
            ) : (
            <View style={styles.contentContainer}>
              <Text style={[styles.text, styles.violetText]}>RATE CLASS</Text>
              <Text style={styles.text}>{title.toUpperCase()}</Text>
              <StarRating count={starCount} onRateChange={onRateChange} />

              <Text style={[styles.text, styles.violetText]}>REVIEW</Text>
              <TextInput
                style={styles.input}
                placeholder="Add comment..."
                onChangeText={onChangeText}
                value={comment}
              />

              <View style={styles.buttons}>
                <RatingModal.Button text="NOT NOW" onPress={hideModal} />
                <RatingModal.Button
                  text="RATE"
                  onPress={rateHandler}
                  filled
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

RatingModal.propTypes = {
  starCount: React.PropTypes.number.isRequired,
  rateHandler: React.PropTypes.func.isRequired,
  isOpen: React.PropTypes.bool.isRequired,
  isRated: React.PropTypes.bool.isRequired,
  hideModal: React.PropTypes.func.isRequired,
  title: React.PropTypes.string.isRequired,
  onChangeText: React.PropTypes.func.isRequired,
  comment: React.PropTypes.string.isRequired,
  onRateChange: React.PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
RatingModal.Button = ({ filled = false, onPress, text, large = false }) => (
  <TouchableOpacity onPress={onPress}>
    <Text
      style={[
        styles.button,
        filled ? styles.filled : styles.empty,
        large ? { width: 0.7 * WIDTH } : undefined,
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  wrapper: {
    left: 0,
    top: 0,
    width: WIDTH,
    height: HEIGHT,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 6,
    overflow: 'hidden',
    width: 0.8 * WIDTH,
  },
  violetText: {
    color: colors.DARKVIOLET,
    marginBottom: 0,
    fontFamily: 'antonio-regular',
  },
  text: {
    fontSize: 18,
    marginVertical: 5,
    fontFamily: 'antonio-regular',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.7 * WIDTH,
  },
  button: {
    fontSize: 18,
    width: 0.3 * WIDTH,
    paddingTop: 8,
    paddingBottom: 5,
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'antonio-regular',
  },
  filled: {
    backgroundColor: colors.DARKVIOLET,
    color: colors.WHITE,
    borderWidth: 2,
    borderColor: colors.DARKVIOLET,
  },
  empty: {
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    borderWidth: 2,
    borderColor: colors.LIGHT_GRAY,
  },
  input: {
    backgroundColor: colors.CREAM_GRAY,
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 3,
    borderRadius: 7,
    width: 0.7 * WIDTH,
    height: 100,
    alignSelf: 'center',
  },
});
