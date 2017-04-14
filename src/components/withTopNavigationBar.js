import React from 'react';
import { View } from 'react-native';

import NavBar from './NavBar';

// Higher order component which adds navigation bar
const withTopNavigationBar = (Component, type) => class TopMenuView extends React.Component {
  static propTypes = {
    onLeftPress: React.PropTypes.func,
    onRightPress: React.PropTypes.func,
    text: React.PropTypes.string,
    continueText: React.PropTypes.string,
    backText: React.PropTypes.string,
  }

  render() {
    const {
      onLeftPress,
      onRightPress,
      text,
      continueText,
      backText,
      ...props,
    } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {do {
          if (type === 'back') {
            <NavBar
              onBackPress={onLeftPress}
              backIcon={require('../../assets/img/icons/chevron_left.png')}
              backText="Back"
              backIconStyle={{ width: 15, height: 24, marginLeft: 8 }}
              middleText={text}
            />;
          } else if (type === 'backWithOptions') {
            <NavBar
              onBackPress={onLeftPress}
              backIcon={require('../../assets/img/icons/chevron_left.png')}
              backText="Back"
              backIconStyle={{ width: 15, height: 24, marginLeft: 8 }}
              onContinuePress={onRightPress}
              continueIcon={require('../../assets/img/icons/more_horiz.png')}
              continueIconStyle={{ width: 32, height: 8, marginRight: 8 }}
              middleText={text}
            />;
          } else if (type === 'choice') {
            <NavBar
              onBackPress={onLeftPress}
              backText="Back"
              onContinuePress={onRightPress}
              continueText="Continue"
            />;
          } else if (type === 'backWithCreate') {
            <NavBar
              onBackPress={onLeftPress}
              backIcon={require('../../assets/img/icons/chevron_left.png')}
              backText={backText || 'Back'}
              backIconStyle={{ width: 15, height: 24, marginLeft: 8 }}
              onContinuePress={onRightPress}
              continueText={continueText || 'Create'}
              middleText={text}
            />;
          }
        }}
        <Component {...props} />
      </View>
    );
  }
};

export default withTopNavigationBar;
