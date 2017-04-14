import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { makeBraintreePayment } from '../actions/appActions';
import { fetchObservedUser, addClassToWatched } from '../actions/userActions';

// Selectors
import {
  errorMessageSelector,
  isErrorOpenSelector,
  pendingSelector,
} from '../selectors/appSelectors';
import { activeClassSelector } from '../selectors/classesSelectors';
import { loggedUserSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import ClassDetailsComponent from '../components/ClassDetails';

// Other
import Braintree from '../braintree';

class ClassDetails extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  // Function responsible for checking if SignUp button should be rendered
  isAbleToSign = () => {
    const { user: { myClasses }, data: { id, signed, capacity } } = this.props;

    if (signed >= capacity) {
      return false;
    }
    if (myClasses.includes(id)) {
      return false;
    }
    return true;
  }

  // Function responsible for rendering payment overlay and proceed with buying classes
  joinHandler = async () => {
    const { dispatch, data, user } = this.props;
    try {
      const nonce = await Braintree.showPaymentViewController();
      dispatch(makeBraintreePayment.request(nonce, data, user));
    } catch (e) {} // eslint-disable-line no-empty
  }

  // Watching functions
  addToWatched = () => {
    const { dispatch, data: { id }, user } = this.props;
    dispatch(addClassToWatched.request(id, user));
  }

  // Navigation functions
  navigateToUserProfile = (id) => {
    const { dispatch } = this.props;
    dispatch(fetchObservedUser.request(id));
    dispatch(navigate('push', 'user_profile'));
  }
  goBack = () => { this.props.dispatch(navigate('back')); }
  goForward = () => { this.props.dispatch(navigate('push', 'settings')); }

  render() {
    const { data, pending, user: { watched } } = this.props;
    const isWatched = watched.contains(data.id);

    return (
      <ClassDetailsComponent
        data={data}
        joinHanlder={this.joinHandler}
        navigateToUserProfile={this.navigateToUserProfile}
        text={data.title}
        onLeftPress={this.goBack}
        onRightPress={this.goForward}
        isAbleToSign={this.isAbleToSign()}
        pending={pending}
        isWatched={isWatched}
        addToWatched={this.addToWatched}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    data: activeClassSelector(state),
    user: loggedUserSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
    pending: pendingSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(ClassDetails)));
