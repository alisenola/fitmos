import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Actions
import { navigate } from '../actions/navigator';
import { setActiveClass } from '../actions/classesActions';
import {
  setActiveSearch,
  updateSearchField,
  searchClasses,
  searchClassesByLocation,
} from '../actions/searchActions';

// Selectors
import { errorMessageSelector, isErrorOpenSelector } from '../selectors/appSelectors';
import {
  activeSearchSelector,
  searchFieldsSelector,
  searchPageSelector,
  searchListSelector,
  searchPendingSelector,
 } from '../selectors/searchSelectors';

// Components
import withStatusBar from './withStatusBar';
import withErrorBox from './withErrorBox';
import SearchComponent from '../components/SearchView';

// Other
import { NUMBER_OF_FETCHED_CLASSES, NOOP } from '../variables';

class SearchView extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    searchFields: PropTypes.object.isRequired,
    searchPage: PropTypes.number.isRequired,
    activeSearch: PropTypes.string.isRequired,
    pending: PropTypes.bool.isRequired,
    list: PropTypes.object.isRequired,
  };

  componentWillMount() {
    // eslint-disable-next-line no-undef
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.props.dispatch(updateSearchField('location', {
          lat: latitude,
          lon: longitude,
        }));
      },
      NOOP,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  // Helper responsible for returning proper searh queries
  getSearchHandler = () => {
    const { searchFields, searchPage } = this.props;
    return {
      main: {
        query: searchFields.main,
        filters: '',
        page: searchPage,
      },
      date: {
        query: '-',
        filters: `beginsDate>${searchFields.dateFrom}`,
        page: searchPage,
      },
      category: {
        query: '-',
        filters: `goal:${searchFields.category}`,
        page: searchPage,
      },
      location: searchFields.location,
    };
  }

  // Handler for searching
  searchClasses = (activeSearch) => {
    const { dispatch } = this.props;
    const searchHandler = this.getSearchHandler();

    dispatch(setActiveSearch(activeSearch));
    if (activeSearch === 'location') {
      dispatch(searchClassesByLocation.request(searchHandler[activeSearch]));
    } else {
      dispatch(searchClasses.request(searchHandler[activeSearch]));
    }
  }

  // Function responsible for fetching more data into list
  fetchMoreData = () => {
    const { dispatch, pending, activeSearch, list } = this.props;
    const shouldFetchMore = list.size >= NUMBER_OF_FETCHED_CLASSES;
    if (pending || !shouldFetchMore) return;

    const searchHandler = this.getSearchHandler();

    dispatch(searchClasses.request(searchHandler[activeSearch]));
  }

  // Input update functions
  onSearchChange = (name, value) => { this.props.dispatch(updateSearchField(name, value)); }

  // Navigation functions
  goBack = () => { this.props.dispatch(navigate('back')); }
  navigateToDetails = (classObject) => {
    const { dispatch } = this.props;
    dispatch(navigate('push', 'class_details'));
    dispatch(setActiveClass(classObject));
  }

  render() {
    const { searchFields, activeSearch, list, pending } = this.props;

    return (
      <SearchComponent
        list={list}
        activeSearch={activeSearch}
        searchFields={searchFields}
        updateSearchField={this.onSearchChange}
        searchHandler={this.searchClasses}
        text="Search"
        onLeftPress={this.goBack}
        navigateToDetailsHandler={this.navigateToDetails}
        requestPending={pending}
        fetchMoreData={this.fetchMoreData}
      />
    );
  }
}

// Container export
export default connect(
  (state) => ({
    activeSearch: activeSearchSelector(state),
    searchFields: searchFieldsSelector(state),
    searchPage: searchPageSelector(state),
    list: searchListSelector(state),
    pending: searchPendingSelector(state),
    errorMessage: errorMessageSelector(state),
    isErrorOpen: isErrorOpenSelector(state),
  }),
  dispatch => ({ dispatch })
)(withStatusBar(withErrorBox(SearchView)));
