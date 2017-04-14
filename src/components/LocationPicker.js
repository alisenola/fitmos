import React, { Component, PropTypes } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';

import { HEIGHT, WIDTH } from '../variables';

export default class LocationPicker extends Component {
  static propTypes = {
    location: PropTypes.object,
    onFinish: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    buttonStyles: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.number.isRequired,
    ]),
    inputStyles: PropTypes.oneOfType([
      PropTypes.object.isRequired,
      PropTypes.number.isRequired,
    ]),
  };

  state = {
    coordinates: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    deltas: {
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    timeout: null,
    isPressing: false,
    isModalOpen: false,
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps;
    if (location) {
      this.setState({ coordinates: location });
    }
  }

  onRegionChange = ({ latitude, longitude }) => {
    this.isPressing();
    this.setState({ coordinates: { latitude, longitude } });
  }

  isPressing = () => {
    const { timeout } = this.state;

    this.setState({ isPressing: true });

    if (timeout) {
      clearTimeout(timeout);
    }

    const newTimeout = setTimeout(() => this.setState({ isPressing: false }), 500);
    this.setState({ timeout: newTimeout });
  }

  onButtonPress = () => {
    this.props.onFinish(this.state.coordinates);
    this.setState({ isModalOpen: false });
  }

  showModal = () => this.setState({ isModalOpen: true });

  render() {
    const { buttonText, buttonStyles, inputStyles } = this.props;
    const { coordinates, deltas, isPressing, isModalOpen } = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent
          visible={isModalOpen}
          onRequestClose={() => {}}
        >
          <MapView
            style={styles.map}
            initialRegion={{ ...coordinates, ...deltas }}
            onRegionChange={this.onRegionChange}
            onPanDrag={this.onPanDrag}
          >
            {!isPressing && (
              <MapView.Marker
                coordinate={coordinates}
                title="Test"
              />
            )}
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.onButtonPress}>
              <Text style={buttonStyles}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={inputStyles} onPress={this.showModal}>
          {`Lat: ${
            Math.round(coordinates.latitude * 100) / 100
          }, Lng: ${
            Math.round(coordinates.longitude * 100) / 100
          }`}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    width: WIDTH,
    height: HEIGHT,
  },
  buttonContainer: {
    position: 'absolute',
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20,
  },
});
