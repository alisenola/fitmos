import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import moment from 'moment';

import * as colors from '../colors';

// Component responsible for rendering class status
export default function DateTile({ beginsDate, endsDate }) {
  const now = new Date();
  if (beginsDate < now && endsDate > now) {
    return <Text style={[styles.date, styles.live]}>LIVE NOW</Text>;
  } else if (endsDate <= now) {
    return <Text style={[styles.date, styles.archived]}>ARCHIVED</Text>;
  }

  return (
    <Text style={[styles.date, styles.normal]}>
      {moment(beginsDate).format('hh:mm a, Do MM')}
    </Text>
  );
}


DateTile.propTypes = {
  beginsDate: React.PropTypes.number.isRequired,
  endsDate: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    marginRight: 10,
    fontFamily: 'antonio-regular',
  },
  live: {
    color: colors.DARKVIOLET,
  },
  archived: {
    color: colors.DARK_GRAY,
  },
  normal: {
    color: colors.TURQUOISE,
  },
});
