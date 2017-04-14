import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

// Component responsible for rendering user rating in stars
export default function UserRating({ count }) {
  return (
    <View style={styles.container}>
      {
        [...Array(5)].map(
          (_, i) => {
            if (i + 1 < count) {
              return <Image key={i} source={require('../../assets/img/icons/star.png')} />;
            } else if (i + 0.5 < count) {
              return <Image key={i} source={require('../../assets/img/icons/star_half.png')} />;
            }

            return <Image key={i} source={require('../../assets/img/icons/star_outline.png')} />;
          }
        )
      }
    </View>
  );
}

UserRating.propTypes = {
  count: React.PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
