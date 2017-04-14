import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { setActiveSearch } from '../actions/searchActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import { loggedUserSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import { NavProfileView } from '../components/ProfileView';

class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  // Navigation functions
  logout = () => { this.props.dispatch(navigate('back')); }
  goToEdition = () => { this.props.dispatch(navigate('push', 'profile_edit')); }
  goForward = () => {
    const { dispatch } = this.props;
    dispatch(setActiveSearch(''));
    dispatch(navigate('push', 'settings'));
  }

  render() {
    const { user } = this.props;
    return (
      <NavProfileView
        user={user}
        logoutHandler={this.logout}
        editHandler={this.goToEdition}
        onRightClick={this.goForward}
        rightIcon={require('../../assets/img/icons/more_horiz.png')}
        iconStyle={{ width: 32, height: 8, marginRight: 8 }}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    user: loggedUserSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(Profile)));
