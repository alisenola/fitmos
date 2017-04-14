import React from 'react';
import { View, StatusBar, Platform } from 'react-native';

// Other
import * as colors from '../colors';
import { STATUS_BAR_HEIGHT, HEIGHT } from '../variables';

// Higher order component responsible for rendering status bar
const withStatusBar = (
  Component,
  backgroundColor = colors.NAV_BLACK,
  barStyle = 'light-content',
  backgroundColorAndroid = colors.NAV_BLACK
) => class StatusBarView extends React.Component {

  render() {
    const isTransparent = backgroundColor === colors.TRANSPARENT;
    const isAndroid = Platform.OS === 'android';
    return (
      <View style={{ backgroundColor: colors.BACKGROUND_GRAY, height: HEIGHT, flex: 1 }}>
        <StatusBar
          style
          backgroundColor={backgroundColorAndroid}
          barStyle={barStyle}
        />
        <View
          style={{
            height: (isTransparent || isAndroid) ? 0 : STATUS_BAR_HEIGHT, backgroundColor,
          }}
        />
        <Component {...this.props} />
      </View>
    );
  }
};

export default withStatusBar;
