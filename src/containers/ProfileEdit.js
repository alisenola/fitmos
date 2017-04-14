import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import {
  updateProfileEditField,
  updateUser,
  initializeEditForm,
  removeProfileEditSpecialities,
} from '../actions/userActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  profileEditFormSelector,
  profileEditPendingSelector,
  loggedUserSelector,
} from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import ProfileEditComponent from '../components/ProfileEdit';

class ProfileEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { user, dispatch, form: { id } } = this.props;
    if (!id) {
      dispatch(initializeEditForm(user.toJS()));
    }
  }

  // Input update functions
  onChange = (name, value) => { this.props.dispatch(updateProfileEditField(name, value)); }
  removeSpecialities = (id) => { this.props.dispatch(removeProfileEditSpecialities(id)); }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => {
    const { dispatch, form } = this.props;
    dispatch(updateUser.request(form));
  }

  render() {
    const { form, pending } = this.props;
    return (
      <ProfileEditComponent
        form={form}
        onChange={this.onChange}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
        removeSpecialities={this.removeSpecialities}
        pending={pending}
        text="Edit Profile"
        continueText="Update"
        removeSpecialities={this.removeSpecialities}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    form: profileEditFormSelector(state),
    pending: profileEditPendingSelector(state),
    user: loggedUserSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(ProfileEdit)));
