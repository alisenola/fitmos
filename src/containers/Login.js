import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DigitsManager } from 'react-native-fabric-digits';

// Actions
import { updateSignUpField } from '../actions/userActions';
import { loginUserWithDigits } from '../actions/authActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import { isAuthPendingSelector, didUserMadeChoiceOnSelector } from '../selectors/authSelectors';
import { signUpFormSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import LoginView from '../components/LoginView';

// Other
import { DIGITS_OPTIONS } from '../variables';
import * as colors from '../colors';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    choice: PropTypes.bool.isRequired,
  };

  // Callback invoked after digits login success
  digitsCompletion = (_, res) => {
    const { pending, dispatch, choice } = this.props;
    if (!pending && res) {
      dispatch(
        loginUserWithDigits.request(
          res['X-Auth-Service-Provider'],
          res['X-Verify-Credentials-Authorization'],
          choice
        )
      );
    }
  }

  // Sign in function
  digitsLogin = async () => {
    try {
      const responseData = await DigitsManager.launchAuthentication(
        {
          ...DIGITS_OPTIONS,
          appearance: digitsAppearance,
        }
      );
      this.digitsCompletion(null, responseData);
    } catch (err) {
      this.digitsCompletion(err, null);
    }
  }

  // Input update functions
  updateTypeHandler = (value) => {
    this.props.dispatch(updateSignUpField('role', value));
    this.digitsLogin();
  }

  render() {
    const { pending, form: { role } } = this.props;

    return (
      <LoginView
        pending={pending}
        role={role}
        loginHandler={this.digitsLogin}
        updateType={this.updateTypeHandler}
      />
    );
  }
}

// Digits modal styles
const digitsAppearance = {
  backgroundColor: {
    hex: colors.DARKVIOLET,
    alpha: 1.0,
  },
  accentColor: {
    hex: colors.TURQUOISE,
    alpha: 0.7,
  },
  headerFont: {
    name: 'Arial',
    size: 16,
  },
  labelFont: {
    name: 'Helvetica',
    size: 18,
  },
  bodyFont: {
    name: 'Helvetica',
    size: 16,
  },
};

// Container export
export default connect(
  (state) => ({
    pending: isAuthPendingSelector(state),
    form: signUpFormSelector(state),
    choice: didUserMadeChoiceOnSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(Login)));
