import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { fetchNewClasses, setActiveClass } from '../actions/classesActions';
import { fetchObservedUser } from '../actions/userActions';
import { setActiveSearch } from '../actions/searchActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  newClassesListSelector,
  newClassesPendingSelector,
  newClassesPageSelector,
} from '../selectors/classesSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import ClassesViewComponent from '../components/ClassesView';

class ClassesView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    page: PropTypes.number.isRequired,
  };

  componentWillMount() {
    const { dispatch, page } = this.props;
    dispatch(fetchNewClasses.request(page));
  }

  // Function responsible for fetching more data into list
  fetchMoreData = () => {
    const { dispatch, pending, page } = this.props;

    if (pending) return;
    dispatch(fetchNewClasses.request(page));
  }

  // Navigation functions
  navigateToDetails = (classObject) => {
    const { dispatch } = this.props;
    dispatch(navigate('push', 'class_details'));
    dispatch(setActiveClass(classObject));
  }
  navigateToUserProfile = (id) => {
    const { dispatch } = this.props;
    dispatch(fetchObservedUser.request(id));
    dispatch(navigate('push', 'user_profile'));
  }
  goBack = () => {
    const { dispatch } = this.props;
    dispatch(setActiveSearch(''));
    dispatch(navigate('push', 'search'));
  }

  render() {
    const { list, pending } = this.props;

    return (
      <ClassesViewComponent
        list={list}
        navigateToDetailsHandler={this.navigateToDetails}
        requestPending={pending}
        fetchMoreData={this.fetchMoreData}
        navigateToUserProfile={this.navigateToUserProfile}
        onRightClick={this.goBack}
        rightIcon={require('../../assets/img/icons/search.png')}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    list: newClassesListSelector(state),
    pending: newClassesPendingSelector(state),
    page: newClassesPageSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(ClassesView)));
