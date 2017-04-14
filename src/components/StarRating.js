import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

// Component responsible for rendering clickable star component
export default function StarRating({ count, onRateChange }) {
  return (
    <View style={styles.container}>
      {
        [...Array(5)].map(
          (_, i) =>
            <StarRating.Star
              key={i}
              active={i < count}
              handler={() => onRateChange(i + 1)}
            />
        )
      }
    </View>
  );
}

// eslint-disable-next-line react/prop-types
StarRating.Star = ({ active, handler }) => {
  const source =
    active ?
      require('../../assets/img/icons/rate_star.png') : require('../../assets/img/icons/rate_star_outline.png');
  return (
    <TouchableOpacity onPress={handler}>
      <Image
        style={styles.star}
        source={source}
      />
    </TouchableOpacity>
  );
};


StarRating.propTypes = {
  count: React.PropTypes.number.isRequired,
  onRateChange: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  star: {
    height: 25,
    width: 27,
  },
});
