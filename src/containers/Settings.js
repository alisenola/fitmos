import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DigitsManager } from 'react-native-fabric-digits';

// Actions
import { navigate } from '../actions/navigator';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import SettingsView from '../components/SettingsView';

class Settings extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  // Helper responsible for rendering options in settings list
  getOptions = () => {
    const { dispatch } = this.props;
    return [
      {
        title: 'FAQ',
        handler: () => {},
        icon: require('../../assets/img/icons/faq.png'),
      },
      {
        title: 'Terms and Conditions',
        handler: () => {},
        icon: require('../../assets/img/icons/drive_document.png'),
      },
      {
        title: 'Logout',
        handler: () => {
          DigitsManager.logout();
          dispatch(navigate('logout'));
        },
        icon: require('../../assets/img/icons/exit_to_app.png'),
      },
    ];
  }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }

  render() {
    return (
      <SettingsView
        options={this.getOptions()}
        onLeftPress={this.goBack}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(Settings)));
