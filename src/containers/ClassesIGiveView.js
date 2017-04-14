import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import {
  fetchClassesIGive,
  setActiveClass,
  startStreaming,
} from '../actions/classesActions';
import { setActiveSearch } from '../actions/searchActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  classesIGiveListSelector,
  classesIGivePendingSelector,
} from '../selectors/classesSelectors';
import { loggedUserIdSelector } from '../selectors/userSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import ClassesIGive from '../components/ClassesIGive';

class ClassesIGiveView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    list: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    const { dispatch, id } = this.props;
    dispatch(fetchClassesIGive.request(id));
  }

  // Function responsible for starting streaming
  startStreaming = (classObject) => {
    const { dispatch } = this.props;
    dispatch(startStreaming(false));
    dispatch(setActiveClass(classObject));
    dispatch(navigate('push', 'my_current_class'));
  }

  // Navigation functions
  goForward = () => {
    const { dispatch } = this.props;
    dispatch(setActiveSearch(''));
    dispatch(navigate('push', 'search'));
  }

  render() {
    const { list, pending } = this.props;
    return (
      <ClassesIGive
        list={list}
        requestPending={pending}
        startStreamingHandler={this.startStreaming}
        onRightClick={this.goForward}
        rightIcon={require('../../assets/img/icons/search.png')}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    list: classesIGiveListSelector(state),
    pending: classesIGivePendingSelector(state),
    id: loggedUserIdSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(ClassesIGiveView)));
