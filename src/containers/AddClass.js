import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { updateAddClassField, createClass, getLocationDetails } from '../actions/classesActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import { addClassesFormSelector, addClassesPendingSelector } from '../selectors/classesSelectors';
import { loggedUserIdSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import NewClass from '../components/NewClass';

// Other
import { NOOP } from '../variables';

class AddClass extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.props.dispatch(updateAddClassField('coordignates', {
          lat: latitude,
          lon: longitude,
        }));
      },
      NOOP,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  fillLocationFields = (lat, lon) => {
    this.props.dispatch(getLocationDetails.request(lat, lon));
  }

  // Input update functions
  onChange = (name, value, place) => {
    this.props.dispatch(updateAddClassField(name, value, place));
  }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => {
    const { dispatch, form, userId } = this.props;
    dispatch(createClass.request(form, userId));
  }

  render() {
    const { form, pending } = this.props;

    return (
      <NewClass
        form={form}
        pending={pending}
        fillLocationFields={this.fillLocationFields}
        onChange={this.onChange}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
        text="New Class"
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    form: addClassesFormSelector(state),
    pending: addClassesPendingSelector(state),
    userId: loggedUserIdSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(AddClass)));
