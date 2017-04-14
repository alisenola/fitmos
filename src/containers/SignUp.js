import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { updateSignUpField, removeSignUpSpecialities, createUser } from '../actions/userActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import { signUpFormSelector, signUpPendingSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import SignUpComponent from '../components/SignUp';

// Other
import { NOOP } from '../variables';

class SignUp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.props.dispatch(updateSignUpField('location', {
          lat: latitude,
          lon: longitude,
        }));
      },
      NOOP,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // Input update functions
  onChange = (name, value) => { this.props.dispatch(updateSignUpField(name, value)); }
  removeSpecialities = (id) => { this.props.dispatch(removeSignUpSpecialities(id)); }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => {
    const { dispatch, form } = this.props;
    dispatch(createUser.request(form));
  }

  render() {
    const { form, pending } = this.props;
    return (
      <SignUpComponent
        form={form}
        pending={pending}
        onChange={this.onChange}
        removeSpecialities={this.removeSpecialities}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
      />
    );
  }
}

// Component export
export default connect(
  (state) => ({
    form: signUpFormSelector(state),
    pending: signUpPendingSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(SignUp)));
