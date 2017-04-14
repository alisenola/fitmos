import React from 'react';
import {
  StyleSheet,
  ListView,
  ActivityIndicator,
} from 'react-native';

import withTopBarWithLogo from './withTopBarWithLogo';
import ClassTile from './ClassTile';
import EmptyListMessage from './EmptyListMessage';

import { HEIGHT } from '../variables';

const simpleComparator = (r1, r2) => r1 !== r2;

const dataStore = new ListView.DataSource({
  rowHasChanged: simpleComparator,
});

// Component responsible for rendering New Classes View
function ClassesView({
  list,
  navigateToDetailsHandler,
  requestPending,
  fetchMoreData,
}) {
  const renderSpinner = () => requestPending && (
    <ActivityIndicator
      animating={requestPending}
      style={[styles.centering, { height: 80 }]}
      size="large"
    />
  );
  return (
    <ListView
      automaticallyAdjustContentInsets={false}
      enableEmptySections
      style={styles.list}
      contentContainerStyle={styles.listContainer}
      dataSource={dataStore.cloneWithRows(list.toJS())}
      renderHeader={() => (!requestPending && list.size === 0) && (<EmptyListMessage />)}
      renderRow={(e) => <ClassTile
        classObj={e}
        signInHandler={navigateToDetailsHandler}
      />}
      renderFooter={renderSpinner}
      onEndReachedThreshold={50}
      onEndReached={fetchMoreData}
    />
  );
}

ClassesView.propTypes = {
  list: React.PropTypes.object.isRequired,
  navigateToDetailsHandler: React.PropTypes.func.isRequired,
  requestPending: React.PropTypes.bool.isRequired,
  fetchMoreData: React.PropTypes.func.isRequired,
  navigateToUserProfile: React.PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    height: HEIGHT - 100,
  },
  listContainer: {
    minHeight: HEIGHT - 100,
  },
});

export default withTopBarWithLogo(ClassesView);
