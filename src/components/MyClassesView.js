import React from 'react';
import {
  ScrollView,
  Text,
  ListView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import withTopBarWithLogo from './withTopBarWithLogo';
import ClassTile from './ClassTile';
import EmptyListMessage from './EmptyListMessage';

import { WIDTH } from '../variables';
import * as colors from '../colors';

const simpleComparator = (r1, r2) => r1 !== r2;

const dataStore = new ListView.DataSource({
  rowHasChanged: simpleComparator,
  sectionHeaderHasChanged: simpleComparator,
});

const areListsEmpty = (object) =>
  Object.values(object).reduce((prev, next) => prev && next.size === 0, true);


// Component responsible for rendering list of classes bought by user
function MyClassesView({
  listsData,
  navigateToActiveHandler,
  navigateToDetailsHandler,
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
    <ScrollView style={styles.listContainer}>
      {(!requestPending && areListsEmpty(listsData)) && (<EmptyListMessage />)}
      <ListView
        style={styles.list}
        automaticallyAdjustContentInsets={false}
        enableEmptySections
        contentContainerStyle={styles.listContainer}
        dataSource={dataStore.cloneWithRowsAndSections(listsData)}
        renderSectionHeader={(_, title) => <Text style={styles.header}>{title.toUpperCase()}</Text>}
        renderRow={(e, section) => <ClassTile
          classObj={e}
          join
          joinHandler={section === 'watching' ? navigateToDetailsHandler : navigateToActiveHandler}
        />}
        renderFooter={renderSpinner}
      />
    </ScrollView>
  );
}

MyClassesView.propTypes = {
  listsData: React.PropTypes.object.isRequired,
  navigateToActiveHandler: React.PropTypes.func,
  navigateToDetailsHandler: React.PropTypes.func,
  requestPending: React.PropTypes.bool.isRequired,
  navigateToUserProfile: React.PropTypes.func,
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    marginBottom: 40,
  },
  header: {
    width: WIDTH,
    paddingVertical: 5,
    paddingLeft: 10,
    marginBottom: 5,
    fontFamily: 'antonio-regular',
    backgroundColor: colors.DARKVIOLET,
    color: colors.WHITE,
  },
});

export default withTopBarWithLogo(MyClassesView);
