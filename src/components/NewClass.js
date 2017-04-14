import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Switch,
  ActivityIndicator,
  Modal,
} from 'react-native';
import Picker from 'react-native-picker';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { languages, lookup } from 'country-data';

import { WIDTH, HEIGHT, NOOP } from '../variables';
import { capitalize, parseNumberInput } from '../helpers';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import ImagePicker from './ImagePicker';
import DropdownWithoutPicker from './DropdownWithoutPicker';
import LocationPicker from './LocationPicker';

const now = new Date();
const tenMinutesFromNow = new Date(now.getTime() + (10 * 60 * 1000));

// Component responsible for rendering new class form
function NewClass({
  form: {
    title,
    language,
    location: {
      place,
      street,
      city,
    },
    coordignates: {
      lat,
      lon,
    },
    price,
    beginsDate,
    endsDate,
    recurring,
    interval,
    image,
    currency,
    goal,
    level,
    type,
    description,
  },
  onChange,
  pending,
  fillLocationFields,
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <ImagePicker
            imageSource={image || require('../../assets/img/class_add_photo.png')}
            imageStyle={styles.image}
            onImageChange={(value) => onChange('image', value)}
          />

          <View style={[styles.center, styles.lightBg]}>
            <Text style={styles.label}>CLASS NAME</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange('title', value)}
              value={title}
            />

            <Text style={styles.label}>LANGUAGE</Text>
            <DropdownWithoutPicker
              style={styles.input}
              selectedValue={languages[language].name}
              toggleFn={() => this.languagePicker.toggle()}
            />

            <Text style={styles.label}>DIFFICULTY LEVEL</Text>
            <DropdownWithoutPicker
              style={styles.input}
              selectedValue={capitalize(level)}
              toggleFn={() => this.levelPicker.toggle()}
            />

            <Text style={styles.label}>GOAL</Text>
            <DropdownWithoutPicker
              style={styles.input}
              selectedValue={goal}
              toggleFn={() => this.goalPicker.toggle()}
            />

            <Text style={styles.label}>DESCRIPTION</Text>
            <TextInput
              style={[styles.input, styles.description]}
              onChangeText={(value) => onChange('description', value)}
              value={description}
              multiline
              maxLength={160}
            />
          </View>

          <View style={[styles.center, styles.darkBg]}>
            <Text style={styles.label}>STARTS AT</Text>
            <DatePicker
              date={moment(beginsDate).format('DD-MM-YYYY h:mm a')}
              mode="datetime"
              showIcon={false}
              placeholder="Date from"
              format="DD-MM-YYYY h:mm a"
              confirmBtnText="Set"
              cancelBtnText="Cancel"
              duration={300}
              customStyles={{
                dateInput: [styles.input, styles.inputInvert],
                datePickerCon: styles.dpToolBar,
                btnTextConfirm: styles.dpButton,
                btnTextCancel: styles.dpButton,
                datePicker: styles.datePicker,
              }}
              minDate={now}
              onDateChange={(value) =>
                onChange('beginsDate', moment(value, 'DD-MM-YYYY h:mm a').valueOf())
              }
            />

            <Text style={styles.label}>ENDS AT</Text>
            <DatePicker
              date={moment(endsDate).format('DD-MM-YYYY h:mm a')}
              mode="datetime"
              showIcon={false}
              placeholder="Date from"
              format="DD-MM-YYYY h:mm a"
              confirmBtnText="Set"
              cancelBtnText="Cancel"
              duration={300}
              customStyles={{
                dateInput: [styles.input, styles.inputInvert],
                datePickerCon: styles.dpToolBar,
                btnTextConfirm: styles.dpButton,
                btnTextCancel: styles.dpButton,
                datePicker: styles.datePicker,
              }}
              minDate={tenMinutesFromNow}
              onDateChange={(value) =>
                onChange('endsDate', moment(value, 'DD-MM-YYYY h:mm a').valueOf())
              }
            />

            <Text style={styles.label}>THIS IS A RECURRING CLASS</Text>
            <View style={styles.row}>
              <Switch
                onValueChange={(value) => onChange('recurring', value)}
                value={recurring}
              />
              {
                recurring && (
                  <DropdownWithoutPicker
                    style={[styles.input, styles.inputInvert, styles.small]}
                    selectedValue={capitalize(interval)}
                    toggleFn={() => this.intervalPicker.toggle()}
                  />
                )
              }
            </View>
          </View>

          <View style={[styles.center, styles.lightBg]}>
            <Text style={styles.label}>PRICE</Text>
            <View style={styles.row}>
              <TextInput
                style={[styles.input, styles.small]}
                onChangeText={(value) => onChange('price', parseNumberInput(value))}
                value={`${price}`}
                keyboardType="numeric"
              />
              <DropdownWithoutPicker
                style={[styles.input, { width: 80 }]}
                containerStyle={{ width: undefined, marginLeft: 30 }}
                selectedValue={currency}
                toggleFn={() => this.currencyPicker.toggle()}
              />
            </View>

            <Text style={styles.label}>TYPE OF CLASS</Text>
            <DropdownWithoutPicker
              style={styles.input}
              selectedValue={type}
              toggleFn={() => this.typePicker.toggle()}
            />

            <Text style={styles.label}>LOCATION</Text>
            <LocationPicker
              buttonText="DONE"
              onFinish={({ latitude, longitude }) => {
                onChange('coordignates', {
                  lat: latitude,
                  lon: longitude,
                });
                fillLocationFields(latitude, longitude);
              }}
              buttonStyles={styles.locationPickerButton}
              inputStyles={styles.input}
              location={{
                latitude: lat,
                longitude: lon,
              }}
            />

            <Text style={styles.label}>CITY</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange('city', value, 'location')}
              value={city}
            />

            <Text style={styles.label}>STREET</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange('street', value, 'location')}
              value={street}
            />

            <Text style={styles.label}>PLACE</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChange('place', value, 'location')}
              value={place}
            />
          </View>

          {pending && (
            <ActivityIndicator
              animating={pending}
              style={{ height: 80 }}
              size="large"
            />
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent
        visible={pending}
        onRequestClose={NOOP}
      >
        <View style={styles.centerModal}>
          <ActivityIndicator
            animating={pending}
            style={{ height: 80 }}
            size="large"
          />
        </View>
      </Modal>

      <Picker
        ref={(picker) => { this.languagePicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={300}
        pickerData={languages.all.map(({ name }) => name)}
        selectedValue={languages[language].name}
        onPickerDone={
          (value) => onChange('language', lookup.languages({ name: value })[0].alpha3)
        }
      />
      <Picker
        ref={(picker) => { this.levelPicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={200}
        pickerData={['Beginner', 'Intermediate', 'Expert']}
        selectedValue={capitalize(level)}
        onPickerDone={(value) => onChange('level', value.toString().toLowerCase())}
      />
      <Picker
        ref={(picker) => { this.goalPicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={200}
        pickerData={['Fat burning', 'Muscle building']}
        selectedValue="Fat burning"
        onPickerDone={(value) => onChange('goal', value.toString())}
      />
      <Picker
        ref={(picker) => { this.intervalPicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={200}
        pickerData={['Daily', 'Weekly', 'Monthly']}
        selectedValue={capitalize(interval)}
        onPickerDone={(value) => onChange('interval', value.toString().toLowerCase())}
      />
      <Picker
        ref={(picker) => { this.currencyPicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={200}
        pickerData={['USD']}
        selectedValue={currency}
        onPickerDone={(value) => onChange('currency', value.toString())}
      />
      <Picker
        ref={(picker) => { this.typePicker = picker; }}
        style={styles.picker}
        pickerToolBarStyle={styles.toolBar}
        pickerBtnStyle={styles.dpButton}
        maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
        showMask
        showDuration={200}
        pickerData={['remote', 'stationary']}
        selectedValue={capitalize(level)}
        onPickerDone={(value) => onChange('type', value.toString())}
      />
    </View>
  );
}

NewClass.propTypes = {
  form: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  pending: React.PropTypes.bool.isRequired,
  fillLocationFields: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: WIDTH,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  picker: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.WHITE,
  },
  center: {
    width: WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
  },
  centerModal: {
    width: WIDTH,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BLACK_TRANSAPRENT,
  },
  image: {
    width: WIDTH,
    height: 200,
  },
  label: {
    width: 0.8 * WIDTH,
    marginBottom: 5,
    marginTop: 8,
    color: colors.DARKVIOLET,
    alignSelf: 'center',
    fontFamily: 'antonio-regular',
  },
  input: {
    backgroundColor: colors.CREAM_GRAY,
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 3,
    borderRadius: 7,
    height: 30,
    width: 0.8 * WIDTH,
    alignSelf: 'center',
  },
  inputInvert: {
    backgroundColor: colors.BACKGROUND_GRAY,
  },
  lightBg: {
    backgroundColor: colors.BACKGROUND_GRAY,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
    paddingBottom: 20,
  },
  darkBg: {
    backgroundColor: colors.CREAM_GRAY,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY,
    paddingBottom: 20,
  },
  description: {
    height: 100,
  },
  column: {
    flexDirection: 'column',
    width: 0.5 * WIDTH,
    alignItems: 'center',
  },
  small: {
    width: 0.3 * WIDTH,
  },
  row: {
    width: 0.8 * WIDTH,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  toolBar: {
    backgroundColor: colors.NAV_BLACK,
    height: 50,
  },
  dpButton: {
    color: colors.TURQUOISE,
  },
  dpToolBar: {
    backgroundColor: colors.NAV_BLACK,
  },
  datePicker: {
    backgroundColor: colors.WHITE,
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

export default withTopNavigationBar(NewClass, 'backWithCreate');
