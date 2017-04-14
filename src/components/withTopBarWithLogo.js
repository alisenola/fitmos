import React from 'react';
import { View } from 'react-native';

import { TOP_NAV_BAR_HEIGHT } from '../variables';

import TopNavBar from './TopNavBar';

// Higher order component which adds navigation bar with logo
const withTopBarWithLogo = (Component) => class TopNavBarView extends React.Component {
  static propTypes = {
    onRightClick: React.PropTypes.func,
    rightIcon: React.PropTypes.any,
    iconStyle: React.PropTypes.any,
  }

  render() {
    const { onRightClick, rightIcon, iconStyle, ...passProps } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TopNavBar
          onRightClick={onRightClick}
          rightIcon={rightIcon}
          iconStyle={iconStyle || {
            height: TOP_NAV_BAR_HEIGHT - 20,
            width: TOP_NAV_BAR_HEIGHT - 20,
            marginRight: 8,
          }}
        />
        <Component {...passProps} />
      </View>
    );
  }
};

export default withTopBarWithLogo;
