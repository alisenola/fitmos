import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  ListView,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import Picker from 'react-native-picker';
import DatePicker from 'react-native-datepicker';

import { WIDTH, HEIGHT, CONTENT_HEIGHT } from '../variables';
import * as colors from '../colors';

import withTopNavigationBar from './withTopNavigationBar';
import Button from './Button';
import ClassTile from './ClassTile';
import DropdownWithoutPicker from './DropdownWithoutPicker';
import LocationPicker from './LocationPicker';
import EmptyListMessage from './EmptyListMessage';

const simpleComparator = (r1, r2) => r1 !== r2;

const dataStore = new ListView.DataSource({
  rowHasChanged: simpleComparator,
});

// Component responsible for rendering search view with list of matches
function SearchView({
  activeSearch,
  searchHandler,
  updateSearchField,
  searchFields: {
    main,
    dateFrom,
    category,
    location: {
      lat,
      lon,
    },
  },
  list,
  navigateToDetailsHandler,
  fetchMoreData,
  requestPending,
}) {
  const renderSpinner = () => requestPending && (
    <ActivityIndicator
      animating={requestPending}
      style={[styles.centering, { height: 80 }]}
      size="large"
    />
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        {(activeSearch !== 'date' && activeSearch !== 'category' && activeSearch !== 'location') && (
          <SearchView.Row
            title="SEARCH BY NAME"
            value={main}
            onChange={(value) => updateSearchField('main', value)}
            onSubmit={() => searchHandler('main')}
          />
        )}
        {(activeSearch !== 'main' && activeSearch !== 'category' && activeSearch !== 'location') && (
          <SearchView.Row
            title="SEARCH BY DATE"
            value={dateFrom}
            onChange={(value) => updateSearchField('dateFrom', value)}
            onSubmit={() => searchHandler('date')}
            date
            invert
          />
        )}
        {(activeSearch !== 'main' && activeSearch !== 'date' && activeSearch !== 'location') && (
          <View style={[styles.searchContainer, styles.lightBg]}>
            <Text style={styles.title}>SEARCH BY CATEGORIES</Text>
            <View style={styles.innerSearchContainer}>
              <DropdownWithoutPicker
                containerStyle={{ width: 0.6 * WIDTH }}
                style={styles.input}
                selectedValue={category}
                toggleFn={() => this.categoryPicker.toggle()}
              />
              <Button
                text="SEARCH"
                onPress={() => searchHandler('category')}
                buttonStyles={styles.searchButton}
                buttonTextStyles={styles.text}
              />
            </View>
          </View>
        )}
        {(activeSearch !== 'main' && activeSearch !== 'date' && activeSearch !== 'category') && (
          <View style={[styles.searchContainer, styles.lightBg]}>
            <Text style={styles.title}>SEARCH BY LOCATION</Text>
            <View style={styles.innerSearchContainer}>
              <LocationPicker
                buttonText="DONE"
                onFinish={({ latitude, longitude }) => {
                  updateSearchField('location', {
                    lat: latitude,
                    lon: longitude,
                  });
                }}
                buttonStyles={styles.locationPickerButton}
                inputStyles={styles.input}
                location={{
                  latitude: lat,
                  longitude: lon,
                }}
              />
              <Button
                text="SEARCH"
                onPress={() => searchHandler('location')}
                buttonStyles={styles.searchButton}
                buttonTextStyles={styles.text}
              />
            </View>
          </View>
        )}
        {(!!activeSearch && !requestPending && list.size === 0) && (<EmptyListMessage />)}
        {!!activeSearch && (
          <ListView
            automaticallyAdjustContentInsets={false}
            enableEmptySections
            contentContainerStyle={styles.listContainer}
            dataSource={dataStore.cloneWithRows(list.toJS())}
            renderRow={(e) => <ClassTile
              classObj={e}
              signInHandler={navigateToDetailsHandler}
            />}
            renderFooter={renderSpinner}
            onEndReachedThreshold={50}
            onEndReached={fetchMoreData}
          />
        )}
        <Picker
          ref={(picker) => { this.categoryPicker = picker; }}
          style={styles.picker}
          pickerToolBarStyle={styles.toolBar}
          pickerBtnStyle={styles.dpButton}
          maskBackgroundColor={colors.PICKER_BLACK_TRANSAPRENT}
          showMask
          showDuration={200}
          pickerData={['Fat burning', 'Muscle building']}
          selectedValue="Fat burning"
          onPickerDone={(value) => updateSearchField('category', value)}
        />
      </View>
    </ScrollView>
  );
}

SearchView.propTypes = {
  searchHandler: React.PropTypes.func.isRequired,
  searchFields: React.PropTypes.object.isRequired,
  updateSearchField: React.PropTypes.func.isRequired,
  activeSearch: React.PropTypes.string.isRequired,
  list: React.PropTypes.object.isRequired,
  navigateToDetailsHandler: React.PropTypes.func.isRequired,
  fetchMoreData: React.PropTypes.func.isRequired,
  requestPending: React.PropTypes.bool.isRequired,
};

// eslint-disable-next-line react/prop-types
SearchView.Row = ({ onChange, onSubmit, value, title, invert = false, date = false }) => (
  <View
    style={[
      styles.searchContainer,
      invert ? styles.darkBg : styles.lightBg,
      date ? { paddingBottom: 10 } : undefined,
    ]}
  >
    <Text style={styles.title}>{title}</Text>
    <View style={styles.innerSearchContainer}>
      {date ? (
        <DatePicker
          date={moment(value).format('DD-MM-YYYY h:mm a')}
          mode="datetime"
          showIcon={false}
          placeholder="Date from"
          format="DD-MM-YYYY h:mm a"
          confirmBtnText="Set"
          cancelBtnText="Cancel"
          duration={300}
          customStyles={{
            dateInput: [
              styles.input,
              styles.dpInput,
              invert ? styles.inputInvert : undefined,
            ],
            datePickerCon: styles.dpToolBar,
            btnTextConfirm: styles.dpButton,
            btnTextCancel: styles.dpButton,
            datePicker: styles.datePicker,
          }}
          onDateChange={(val) => onChange(moment(val, 'DD-MM-YYYY h:mm a').valueOf())}
        />
      ) : (
        <TextInput
          style={[styles.input, invert ? styles.inputInvert : undefined]}
          placeholder="Search..."
          onChangeText={onChange}
          value={value}
        />
      )}
      <Button
        text="SEARCH"
        onPress={onSubmit}
        buttonStyles={styles.searchButton}
        buttonTextStyles={styles.text}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: CONTENT_HEIGHT,
  },
  searchButton: {
    backgroundColor: colors.TURQUOISE,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingHorizontal: 10,
  },
  title: {
    color: colors.DARKVIOLET,
    marginVertical: 5,
    width: 0.9 * WIDTH,
  },
  innerSearchContainer: {
    flexDirection: 'row',
    width: 0.9 * WIDTH,
    justifyContent: 'space-between',
  },
  dpInput: {
    marginTop: -10,
    marginLeft: 0.2 * WIDTH,
  },
  input: {
    backgroundColor: colors.CREAM_GRAY,
    borderWidth: 1,
    borderColor: colors.GRAY,
    padding: 3,
    borderRadius: 7,
    height: 30,
    width: 0.6 * WIDTH,
  },
  inputInvert: {
    backgroundColor: colors.BACKGROUND_GRAY,
  },
  searchContainer: {
    borderBottomWidth: 1,
    paddingBottom: 20,
    width: WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
  },
  lightBg: {
    backgroundColor: colors.BACKGROUND_GRAY,
    borderBottomColor: colors.GRAY,
  },
  darkBg: {
    backgroundColor: colors.CREAM_GRAY,
    borderBottomColor: colors.GRAY,
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
  listContainer: {
    height: HEIGHT,
  },
  picker: {
    height: 300,
    backgroundColor: colors.WHITE,
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

export default withTopNavigationBar(SearchView, 'back');
