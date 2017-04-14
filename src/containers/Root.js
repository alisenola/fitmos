import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';

const { CardStack } = NavigationExperimental;

class Root extends Component {
  static propTypes = {
    reducer: PropTypes.func.isRequired,
    routes: PropTypes.object.isRequired,
    renderScene: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  // Navigation helper
  handleNavigation = (action) => {
    const { dispatch } = this.props;
    dispatch(action);
  }

  render() {
    const { routes, renderScene } = this.props;
    return (
      <CardStack
        direction="horizontal"
        onNavigate={this.handleNavigation}
        navigationState={routes}
        renderScene={renderScene}
      />
    );
  }
}

// Container export
export default connect(
  state => state,
  dispatch => ({ dispatch })
)(Root);
