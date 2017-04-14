import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Picker from 'react-native-picker';

import { WIDTH } from '../variables';
import { parseNumberInput } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import ImagePicker from './ImagePicker';
import DropdownWithoutPicker from './DropdownWithoutPicker';
import MultiSelectWithoutPicker from './MultiSelectWithoutPicker';
import FullLocationPicker from './FullLocationPicker';

// Component responsible for rendering profile edition form
function ProfileEdit({
  form: {
    gender,
    role,
    avatar,
    specialities,
    aboutMe,
    email,
    age,
    goals,
    firstName,
    lastName,
    coordignates,
    state,
    city,
  },
  onChange,
  removeSpecialities,
  pending,
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

        <Text style={styles.label}>First name</Text>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChange('firstName', value)}
            value={firstName}
            maxLength={30}
          />
        </View>

        <Text style={styles.label}>Last name</Text>
        <View style={styles.center}>
          <TextInput
            style={styles.input}
            onChangeText={(value) => onChange('lastName', value)}
            value={lastName}
            maxLength={30}
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <DropdownWithoutPicker
          style={styles.dropdown}
          selectedValue={gender}
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

        {role === 'user' && (
          <View style={styles.centerColumn}>
            <Text style={styles.label}>Goals</Text>
            <MultiSelectWithoutPicker
              values={goals}
              toggleFn={() => this.specialitiesPicker.toggle()}
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

        <FullLocationPicker
          withState
          withCity
          withCoordignates
          state={state}
          city={city}
          coordignates={coordignates}
          locationButtonStyle={styles.locationPickerButton}
          inputStyle={styles.input}
          labelStyle={styles.label}
          onChange={onChange}
        />

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
          pickerData={['male', 'female']}
          selectedValue={gender}
          onPickerDone={(value) => onChange('gender', value.toString())}
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

ProfileEdit.propTypes = {
  form: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  removeSpecialities: React.PropTypes.func.isRequired,
  pending: React.PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  background: {
    width: WIDTH,
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
  },
  description: {
    height: 100,
  },
  label: {
    marginVertical: 5,
    textAlign: 'center',
    backgroundColor: colors.TRANSPARENT,
    color: colors.WHITE,
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
});

export default withTopNavigationBar(ProfileEdit, 'backWithCreate');
