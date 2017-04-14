import React, { PropTypes, Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';

import { fetch } from '../api';
import { WIDTH, GOOGLE_GEOLOCATION_API_URL, GOOGLE_API_KEY } from '../variables';
import * as colors from '../colors';

import LocationPicker from './LocationPicker';

export default class FullLocationPicker extends Component {
  static propTypes = {
    withCountry: PropTypes.bool,
    withState: PropTypes.bool,
    withCity: PropTypes.bool,
    withStreet: PropTypes.bool,
    withPlace: PropTypes.bool,
    withCoordignates: PropTypes.bool,
    country: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string,
    place: PropTypes.string,
    coordignates: PropTypes.object,
    labelStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    inputStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number,
    ]),
    locationButtonStyle: PropTypes.object,
    fillLocationFields: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  };

  state = {
    country: '',
    state: '',
    city: '',
    street: '',
    place: '',
    coordignates: {},
  };

  componentWillReceiveProps(nextProps) {
    const { country, state, city, street, place, coordignates } = nextProps;
    this.setState({ country, state, city, street, place, coordignates });
  }

  render() {
    const {
      withCountry,
      withState,
      withCity,
      withStreet,
      withPlace,
      withCoordignates,
      labelStyle,
      inputStyle,
      locationButtonStyle,
      onChange,
    } = this.props;

    const {
      country,
      state,
      city,
      street,
      place,
      coordignates,
    } = this.state;

    return (
      <View>
        {withCountry && (
          <View>
            <Text style={labelStyle}>COUNTRY</Text>
            <TextInput
              style={inputStyle}
              onChangeText={(value) => this.handleChange('country', value)}
              value={country}
            />
          </View>
        )}
        {withState && (
          <View>
            <Text style={labelStyle}>STATE</Text>
            <TextInput
              style={inputStyle}
              onChangeText={(value) => this.handleChange('state', value)}
              value={state}
            />
          </View>
        )}
        {withCity && (
          <View>
            <Text style={labelStyle}>CITY</Text>
            <TextInput
              style={inputStyle}
              onChangeText={(value) => this.handleChange('city', value)}
              value={city}
            />
          </View>
        )}
        {withStreet && (
          <View>
            <Text style={labelStyle}>STREET</Text>
            <TextInput
              style={inputStyle}
              onChangeText={(value) => this.handleChange('street', value)}
              value={street}
            />
          </View>
        )}
        {withPlace && (
          <View>
            <Text style={labelStyle}>PLACE</Text>
            <TextInput
              style={inputStyle}
              onChangeText={(value) => this.handleChange('place', value)}
              value={place}
            />
          </View>
        )}
        {withCoordignates && (
          <View>
            <Text style={labelStyle}>LOCATION</Text>
            <LocationPicker
              buttonText="DONE"
              onFinish={({ latitude, longitude }) => {
                this.handlePickerChange('coordignates', {
                  lat: latitude,
                  lon: longitude,
                });
              }}
              buttonStyles={locationButtonStyle}
              inputStyles={inputStyle}
              location={{
                latitude: coordignates.lat,
                longitude: coordignates.lon,
              }}
            />
          </View>
        )}
      </View>
    );
  }

  handleChange = (name, value) => {
    const { withCoordignates } = this.props;
    this.props.onChange(name, value);

    if (withCoordignates) {
      const updatedState = { ...this.state, [name]: value };
      const { place, street, city, state, country } = updatedState;
      const address = `${place || ''},${street || ''},${city || ''},${state || ''},${country || ''}`;
      fetch(`${GOOGLE_GEOLOCATION_API_URL}?address=${address}&key=${GOOGLE_API_KEY}`,
        {
          method: 'GET',
        }).then(({ results }) => {
          if (results.length > 0) {
            const { lat, lng } = results[0].geometry.location;

            this.props.onChange('coordignates', { lat, lon: lng });
          }
        });
    }
  }

  handlePickerChange = (name, { lat, lon }) => {
    const {
      withCountry,
      withState,
      withCity,
      withStreet,
      withPlace,
    } = this.props;
    this.props.onChange(name, { lat, lon });

    fetch(`${GOOGLE_GEOLOCATION_API_URL}?latlng=${lat},${lon}&key=${GOOGLE_API_KEY}`,
      {
        method: 'GET',
      }).then(({ results }) => {
        const addressComponents = results[0].address_components;

        const country = addressComponents.find((e) => e.types.includes('country'));
        const state = addressComponents.find((e) =>
            e.types.includes('administrative_area_level_1'));
        const city = addressComponents.find((e) => e.types.includes('locality'));
        const street = addressComponents.find((e) => e.types.includes('route'));
        const place = addressComponents.find((e) => e.types.includes('premise'));

        const newState = {
          country: country ? country.long_name : null,
          state: state ? state.long_name : null,
          city: city ? city.long_name : null,
          street: street ? street.long_name : null,
          place: place ? place.long_name : null,
        };

        const notify = (fieldName) => {
          if (this.state[fieldName] !== newState[fieldName]) {
            this.props.onChange(fieldName, newState[fieldName]);
          }
        };

        withCountry && notify('country');
        withState && notify('state');
        withCity && notify('city');
        withStreet && notify('street');
        withPlace && notify('place');
      });
  }
}
