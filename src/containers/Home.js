import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';

// Selectors
import { barRouteSelector } from '../selectors/routesSelectors';
import { loggedUserSelector } from '../selectors/userSelectors';

// Components
import ClassesView from './ClassesView';
import MyClassesView from './MyClassesView';
import ClassesIGiveView from './ClassesIGiveView';
import Profile from './Profile';

// Other
import * as colors from '../colors';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
  };

  // Navigation functions
  goToNewClasses = () => { this.props.dispatch(navigate('bar', 'classes')); }
  goToMyClasses = () => { this.props.dispatch(navigate('bar', 'my_classes')); }
  goToClassesIGive = () => { this.props.dispatch(navigate('bar', 'classes_i_give')); }
  goToProfile= () => { this.props.dispatch(navigate('bar', 'profile')); }
  goToAddClass = () => { this.props.dispatch(navigate('push', 'add_class')); }

  // Icon renderers
  renderIcon = (source) => <Image source={source} />;

  renderNewClassesIcon = () =>
    this.renderIcon(require('../../assets/img/icons/classes_inactive.png'));
  renderNewClassesSelectedIcon = () =>
    this.renderIcon(require('../../assets/img/icons/classes_active.png'));
  renderMyClassesIcon = () =>
    this.renderIcon(require('../../assets/img/icons/fav_inactive.png'));
  renderMyClassesSelectedIcon = () =>
    this.renderIcon(require('../../assets/img/icons/fav_active.png'));
  renderAddClassesIcon = () =>
    this.renderIcon(require('../../assets/img/icons/add_inactive.png'));
  renderClassesIGiveIcon = () =>
    this.renderIcon(require('../../assets/img/icons/my_classes_inactive.png'));
  renderClassesIGiveSelectedIcon = () =>
    this.renderIcon(require('../../assets/img/icons/my_classes_active.png'));
  renderProfileIcon = () =>
    this.renderIcon(require('../../assets/img/icons/profile_inactive.png'));
  renderProfileSelectedIcon = () =>
    this.renderIcon(require('../../assets/img/icons/profile_active.png'));

  render() {
    const { route, user } = this.props;

    return (
      <TabNavigator
        tabBarStyle={{ backgroundColor: colors.NAV_BLACK }}
      >
        <TabNavigator.Item
          selected={route === 'classes'}
          title="Classes"
          renderIcon={this.renderNewClassesIcon}
          renderSelectedIcon={this.renderNewClassesSelectedIcon}
          onPress={this.goToNewClasses}
          titleStyle={{ color: colors.WHITE }}
          selectedTitleStyle={{ color: colors.TURQUOISE }}
        >
          <ClassesView />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={route === 'my_classes'}
          title="My Classes"
          renderIcon={this.renderMyClassesIcon}
          renderSelectedIcon={this.renderMyClassesSelectedIcon}
          onPress={this.goToMyClasses}
          titleStyle={{ color: colors.WHITE }}
          selectedTitleStyle={{ color: colors.TURQUOISE }}
        >
          <MyClassesView />
        </TabNavigator.Item>
        {
          user.role === 'trainer' && (
            <TabNavigator.Item
              selected={false}
              title="Add Class"
              renderIcon={this.renderAddClassesIcon}
              onPress={this.goToAddClass}
              titleStyle={{ color: colors.WHITE }}
            />
          )
        }
        {
          user.role === 'trainer' && (
            <TabNavigator.Item
              selected={route === 'classes_i_give'}
              title="Classes I Give"
              renderIcon={this.renderClassesIGiveIcon}
              renderSelectedIcon={this.renderClassesIGiveSelectedIcon}
              onPress={this.goToClassesIGive}
              titleStyle={{ color: colors.WHITE }}
              selectedTitleStyle={{ color: colors.TURQUOISE }}
            >
              <ClassesIGiveView />
            </TabNavigator.Item>
          )
        }
        <TabNavigator.Item
          selected={route === 'profile'}
          title="Profile"
          renderIcon={this.renderProfileIcon}
          renderSelectedIcon={this.renderProfileSelectedIcon}
          onPress={this.goToProfile}
          titleStyle={{ color: colors.WHITE }}
          selectedTitleStyle={{ color: colors.TURQUOISE }}
        >
          <Profile />
        </TabNavigator.Item>

      </TabNavigator>
    );
  }
}

// Container export
export default connect(
  (state) => ({
    route: barRouteSelector(state),
    user: loggedUserSelector(state),
  }),
  dispatch => ({ dispatch })
)(Home);
