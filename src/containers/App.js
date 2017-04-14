import React, { Component } from 'react';
import { connect } from 'react-redux';

// Scene imports
import Root from './Root';
import Home from './Home';
import Login from './Login';
import SelectType from './SelectType';
import SignUp from './SignUp';
import ProfileEdit from './ProfileEdit';
import AddClass from './AddClass';
import ClassDetails from './ClassDetails';
import ActiveClass from './ActiveClass';
import MyCurrentClass from './MyCurrentClass';
import UserProfile from './UserProfile';
import SearchView from './SearchView';
import Settings from './Settings';

// Actions
import { getBraintreeToken } from '../actions/appActions';

// Selectors
import { isBraintreeSetUpSelector } from '../selectors/appSelectors';

// Reducers
import routeReducer from '../reducers/routes';

class App extends Component {

  // Function responsible for rendering scene
  renderScene = (props) => {
    switch (props.scene.key) {
      case 'scene_home':
        return <Home onNavigate={props.onNavigate} />;
      case 'scene_login':
        return <Login onNavigate={props.onNavigate} />;
      case 'scene_select_type':
        return <SelectType onNavigate={props.onNavigate} />;
      case 'scene_signup':
        return <SignUp onNavigate={props.onNavigate} />;
      case 'scene_profile_edit':
        return <ProfileEdit onNavigate={props.onNavigate} />;
      case 'scene_add_class':
        return <AddClass onNavigate={props.onNavigate} />;
      case 'scene_class_details':
        return <ClassDetails onNavigate={props.onNavigate} />;
      case 'scene_active_class':
        return <ActiveClass onNavigate={props.onNavigate} />;
      case 'scene_my_current_class':
        return <MyCurrentClass onNavigate={props.onNavigate} />;
      case 'scene_user_profile':
        return <UserProfile onNavigate={props.onNavigate} />;
      case 'scene_search':
        return <SearchView onNavigate={props.onNavigate} />;
      case 'scene_settings':
        return <Settings onNavigate={props.onNavigate} />;
      default:
        return null;
    }
  }

  componentWillMount() {
    const { isBraintreeSetUp, dispatch } = this.props; // eslint-disable-line react/prop-types
    if (!isBraintreeSetUp) {
      dispatch(getBraintreeToken.request());
    }
  }

  render() {
    return (
      <Root
        reducer={routeReducer}
        renderScene={this.renderScene}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    isBraintreeSetUp: isBraintreeSetUpSelector(state),
  }),
  dispatch => ({ dispatch })
)(App);
