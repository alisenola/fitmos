import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { HEIGHT, WIDTH } from '../variables';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';

const ICON_DIMENSION = 20;

// Component responsible for rendering settings view
function SettingsView({ options }) {
  return (
    <View style={styles.container}>
      {
        options.map(({ title, handler, icon }, i) =>
          <SettingsView.Row key={i} title={title} handler={handler} icon={icon} />
        )
      }
    </View>
  );
}

SettingsView.propTypes = {
  options: React.PropTypes.array.isRequired,
};

// eslint-disable-next-line react/prop-types
SettingsView.Row = ({ title, handler, icon }) => (
  <TouchableOpacity onPress={handler}>
    <View style={styles.rowContainer}>
      <Image style={styles.icon} source={icon} />
      <View style={styles.borderWrapper}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: HEIGHT,
    width: WIDTH,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    width: WIDTH,
    paddingVertical: 10,
  },
  icon: {
    height: ICON_DIMENSION,
    width: ICON_DIMENSION,
    marginHorizontal: 0.1 * WIDTH - (ICON_DIMENSION / 2),
  },
  borderWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: colors.LIGHT_GRAY,
    alignItems: 'center',
    height: ICON_DIMENSION + 20,
    marginRight: 0.05 * WIDTH,
  },
  text: {
    width: 0.75 * WIDTH,
  },
});

export default withTopNavigationBar(SettingsView, 'back');
