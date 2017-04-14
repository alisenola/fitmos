import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { fetchObservedUser } from '../actions/userActions';
import { fetchMyClasses, fetchWatchedClasses, setActiveClass } from '../actions/classesActions';
import { setActiveSearch } from '../actions/searchActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  myClassesListSelector,
  myClassesPendingSelector,
  watchedListSelector,
} from '../selectors/classesSelectors';
import {
  usersClassesSelector,
  usersFavoritesSelector,
  usersWatchedSelector,
} from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import MyClassesViewComponent from '../components/MyClassesView';

class MyClassesView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired,
    myClasses: PropTypes.object.isRequired,
    pending: PropTypes.bool.isRequired,
    favorites: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired,
    ]),
    watched: PropTypes.object.isRequired,
    watchedList: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const { dispatch, myClasses, watched } = this.props;
    if (myClasses.size > 0) {
      dispatch(fetchMyClasses.request(myClasses.toJS()));
    }
    if (watched.size > 0) {
      dispatch(fetchWatchedClasses.request(watched.toJS()));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.watched.size !== nextProps.watched.size) {
      this.props.dispatch(fetchWatchedClasses.request(nextProps.watched.toJS()));
    }
  }

  // Navigation functions
  navigateToClassDetails = (id) => {
    const { dispatch } = this.props;
    dispatch(setActiveClass(id));
    dispatch(navigate('push', 'class_details'));
  }
  navigateToActiveClass = (id) => {
    const { dispatch } = this.props;
    dispatch(setActiveClass(id));
    dispatch(navigate('push', 'active_class'));
  }
  navigateToUserProfile = (id) => {
    const { dispatch } = this.props;
    dispatch(fetchObservedUser.request(id));
    dispatch(navigate('push', 'user_profile'));
  }
  goForward = () => {
    const { dispatch } = this.props;
    dispatch(setActiveSearch(''));
    dispatch(navigate('push', 'search'));
  }

  render() {
    const { list, pending, favorites, watchedList } = this.props;
    const now = new Date().getTime();

    const data = {
      registered: list.filter(({ beginsDate }) => beginsDate > now).toJS(),
      favorites: list.filter(({ id }) => favorites.contains(id)).toJS(),
      watching: watchedList.toJS(),
      archived: list.filter(({ beginsDate }) => beginsDate < now).toJS(),
    };

    return (
      <MyClassesViewComponent
        listsData={data}
        requestPending={pending}
        navigateToDetailsHandler={this.navigateToClassDetails}
        navigateToActiveHandler={this.navigateToActiveClass}
        navigateToUserProfile={this.navigateToUserProfile}
        onRightClick={this.goForward}
        rightIcon={require('../../assets/img/icons/search.png')}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    myClasses: usersClassesSelector(state),
    list: myClassesListSelector(state),
    watchedList: watchedListSelector(state),
    favorites: usersFavoritesSelector(state),
    watched: usersWatchedSelector(state),
    pending: myClassesPendingSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(MyClassesView)));
