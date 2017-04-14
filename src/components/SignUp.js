import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Picker from 'react-native-picker';

import { WIDTH, HEIGHT } from '../variables';
import { capitalize, parseNumberInput } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import ImagePicker from './ImagePicker';
import DropdownWithoutPicker from './DropdownWithoutPicker';
import MultiSelectWithoutPicker from './MultiSelectWithoutPicker';
import LocationPicker from './LocationPicker';

// Component responsible for rendering sign up form
function SignUp({
  form: {
    nickname,
    gender,
    role,
    avatar,
    aboutMe,
    specialities,
    email,
    age,
    goals,
    location: {
      lat,
      lon,
    },
  },
  pending,
  onChange,
  removeSpecialities,
}) {
  return (
    <ScrollView>
      <Image
        source={require('../../assets/img/gradient_bg.png')}
        style={[styles.background, styles.container]}
      >
        <View style={styles.spacer} />
        <ImagePicker
          imageSource={avatar || require('../../assets/img/icons/add_photo.png')}
          onImageChange={(value) => onChange('avatar', value)}
          imageStyle={styles.imagePicker}
        />

        <Text style={styles.label}>Username</Text>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChange('nickname', value)}
            value={nickname}
            maxLength={30}
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <DropdownWithoutPicker
          style={styles.dropdown}
          selectedValue={capitalize(gender)}
          toggleFn={() => this.genderPicker.toggle()}
        />

        <Text style={styles.label}>Email</Text>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(value) => onChange('email', value)}
            value={email}
            maxLength={30}
          />
        </View>

        <Text style={styles.label}>Age</Text>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => onChange('age', parseNumberInput(value))}
            value={`${age}`}
            maxLength={3}
          />
        </View>

        <Text style={styles.label}>Location</Text>
        <LocationPicker
          buttonText="DONE"
          onFinish={({ latitude, longitude }) => onChange('location', {
            lat: latitude,
            lon: longitude,
          })}
          buttonStyles={styles.locationPickerButton}
          inputStyles={styles.input}
          location={{
            latitude: lat,
            longitude: lon,
          }}
        />

        {role === 'user' && (
          <View style={styles.centerColumn}>
            <Text style={styles.label}>Goals</Text>
            <MultiSelectWithoutPicker
              values={goals}
              toggleFn={() => this.goalsPicker.toggle()}
            />
          </View>
        )}


        {role === 'trainer' && (
          <View style={styles.centerColumn}>
            <Text style={styles.label}>Description</Text>

            <View style={styles.center}>
              <TextInput
                style={[styles.input, styles.description]}
                onChangeText={(value) => onChange('aboutMe', value)}
                value={aboutMe}
                multiline
                maxLength={160}
              />
            </View>

            <Text style={styles.label}>Specialities</Text>
            <MultiSelectWithoutPicker
              values={specialities}
              toggleFn={() => this.specialitiesPicker.toggle()}
              removeFn={(id) => removeSpecialities(id)}
            />
          </View>
        )}

        {pending && (
          <ActivityIndicator
            animating={pending}
            style={{ height: 80 }}
            size="large"
          />
        )}

        <Picker
          ref={(picker) => { this.genderPicker = picker; }}
          style={styles.picker}
          pickerToolBarStyle={styles.toolBar}
          pickerBtnStyle={styles.dpButton}
          maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
          showMask
          showDuration={200}
          pickerData={['Male', 'Female']}
          selectedValue={capitalize(gender)}
          onPickerDone={(value) => onChange('gender', value.toString().toLowerCase())}
        />
        <Picker
          ref={(picker) => { this.goalsPicker = picker; }}
          style={styles.picker}
          pickerToolBarStyle={styles.toolBar}
          pickerBtnStyle={styles.dpButton}
          maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
          showMask
          showDuration={200}
          pickerData={['Muscle building', 'Fat burning']}
          selectedValue="Muscle building"
          onPickerDone={(value) => onChange('goals', value.toString())}
        />
        <Picker
          ref={(picker) => { this.specialitiesPicker = picker; }}
          style={styles.picker}
          pickerToolBarStyle={styles.toolBar}
          pickerBtnStyle={styles.dpButton}
          maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
          showMask
          showDuration={200}
          pickerData={['Yoga', 'Crossfit', 'Muscle building']}
          selectedValue="Yoga"
          onPickerDone={(value) => onChange('specialities', value.toString())}
        />

      </Image>
    </ScrollView>
  );
}

SignUp.propTypes = {
  form: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  pending: React.PropTypes.bool.isRequired,
  removeSpecialities: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  background: {
    width: WIDTH,
    height: 1.05 * HEIGHT,
  },
  center: {
    width: WIDTH,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  centerColumn: {
    width: WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    backgroundColor: colors.WHITE,
    borderWidth: 0.5,
    borderColor: colors.BLACK,
    padding: 3,
    borderRadius: 5,
    height: 30,
    width: 0.6 * WIDTH,
    overflow: 'hidden',
  },
  description: {
    height: 100,
  },
  label: {
    marginVertical: 5,
    textAlign: 'center',
    backgroundColor: colors.TRANSPARENT,
    color: colors.WHITE,
    fontFamily: 'antonio-regular',
  },
  picker: {
    height: 300,
    backgroundColor: colors.WHITE,
  },
  swithContainer: {
    flexDirection: 'row',
  },
  switch: {
    width: 50,
  },
  switchLabel: {
    flex: 1,
  },
  dropdown: {
    padding: 3,
    borderRadius: 5,
    height: 30,
    width: 0.6 * WIDTH,
    marginBottom: 10,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: colors.WHITE,
  },
  spacer: {
    height: 20,
  },
  buttons: {
    flexDirection: 'row',
    width: 0.6 * WIDTH,
    justifyContent: 'space-around',
  },
  typeImage: {
    height: 50,
    width: 50,
  },
  dpButton: {
    color: colors.TURQUOISE,
  },
  toolBar: {
    backgroundColor: colors.NAV_BLACK,
    height: 50,
  },
  locationPickerButton: {
    fontFamily: 'antonio-regular',
    fontSize: 25,
    color: colors.WHITE,
    backgroundColor: colors.BLACK,
    paddingVertical: 15,
    paddingHorizontal: 50,
  },
});

export default withTopNavigationBar(SignUp, 'choice');
