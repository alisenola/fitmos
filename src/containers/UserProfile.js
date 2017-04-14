import React, { Component, PropTypes } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  observedUserPendingSelector,
  observedUserObjectSelector,
} from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import { BackProfileView } from '../components/ProfileView';

class UserProfile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => { this.props.dispatch(navigate('push', 'settings')); }

  render() {
    const { dispatch, user, pending } = this.props;
    return pending ?
      (
      <ActivityIndicator
        animating={pending}
        style={{ height: 80 }}
        size="large"
      />
      ) :
      (
      <BackProfileView
        user={user}
        isPrivate={false}
        onLeftPress={() => dispatch(navigate('back'))}
        onRightPress={() => dispatch(navigate('push', 'settings'))}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    pending: observedUserPendingSelector(state),
    user: observedUserObjectSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(UserProfile)));
