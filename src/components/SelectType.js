import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import { WIDTH, HEIGHT } from '../variables';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import TypeButton from './TypeButton';

// Component responsible for rendering signup select type form
function SelectType({
  role,
  onChange,
}) {
  return (
    <Image
      source={require('../../assets/img/gradient_bg.png')}
      style={[styles.background, styles.container]}
    >
      <View style={styles.spacer} />
      <Text style={styles.label}>
        {`Your choice:\n${role === 'user' ? 'Attendee' : 'Expert'}`}
      </Text>

      <View style={styles.center}>
        <View style={styles.buttons}>
          <TypeButton
            onPress={() => onChange('trainer')}
            image={require('../../assets/img/icons/expert_icon.png')}
            text="Expert"
          />

          <TypeButton
            onPress={() => onChange('user')}
            image={require('../../assets/img/icons/attendee_icon.png')}
            text="Attendee"
          />
        </View>
      </View>

      <Text style={[styles.description, styles.label]}>
        Experts host classes and guide users towards their goals.
        Users engage these experts and attend classes that
        match their desired goals.
      </Text>
    </Image>
  );
}

SelectType.propTypes = {
  role: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  background: {
    width: WIDTH,
    height: HEIGHT,
  },
  center: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
    backgroundColor: colors.TRANSPARENT,
    color: colors.WHITE,
    fontSize: 18,
  },
  buttons: {
    marginVertical: 30,
    flexDirection: 'row',
    width: 0.7 * WIDTH,
    justifyContent: 'space-around',
  },
  spacer: {
    height: 50,
  },
  description: {
    width: 0.8 * WIDTH,
  },
});

export default withTopNavigationBar(SelectType, 'choice');
