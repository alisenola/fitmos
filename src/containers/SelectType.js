import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { updateSignUpField } from '../actions/userActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import { signUpFormSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import SelectTypeComponent from '../components/SelectType';

class SelectType extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
  };

  // Input update functions
  onChange = (value) => {
    this.props.dispatch(updateSignUpField('role', value));
    this.goForward();
  }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => { this.props.dispatch(navigate('push', 'signup')); }

  render() {
    const { form: { role } } = this.props;
    return (
      <SelectTypeComponent
        role={role}
        onChange={this.onChange}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    form: signUpFormSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(SelectType)));
