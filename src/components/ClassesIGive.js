import React from 'react';
import {
  ListView,
  StyleSheet,
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

// Component responsible for rendering Classes i Give View
function ClassesIGive({
  list,
  startStreamingHandler,
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
    <ListView
      style={styles.list}
      automaticallyAdjustContentInsets={false}
      enableEmptySections
      contentContainerStyle={styles.listContainer}
      dataSource={dataStore.cloneWithRows(list.toJS())}
      renderHeader={() => (!requestPending && list.size === 0) && (<EmptyListMessage />)}
      renderRow={(e) =>
        <ClassTile
          classObj={e}
          streaming
          streamHandler={startStreamingHandler}
        />
      }
      renderFooter={renderSpinner}
    />
  );
}

ClassesIGive.propTypes = {
  list: React.PropTypes.object.isRequired,
  startStreamingHandler: React.PropTypes.func.isRequired,
  requestPending: React.PropTypes.bool.isRequired,
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

export default withTopBarWithLogo(ClassesIGive);
