import React from 'react';
import { View, LayoutAnimation } from 'react-native';

// Actions
import { showErrorBox } from '../actions/appActions';

// Components
import ErrorBox from '../components/ErrorBox';

// Higher order component responsible for rendering error box
const withErrorBox = (Component) => class ErrorBoxView extends React.Component {
  static propTypes = {
    errorMessage: React.PropTypes.string,
    isErrorOpen: React.PropTypes.bool,
    dispatch: React.PropTypes.func,
  }

  // Function responsible for hiding error box
  showError = () => { this.props.dispatch(showErrorBox('', false)); }

  componentWillReceiveProps(nextProps) {
    const { isErrorOpen } = this.props;
    LayoutAnimation.easeInEaseOut();
    if (!isErrorOpen && nextProps.isErrorOpen) {
      setTimeout(this.showError, 3000);
    }
  }

  render() {
    const { errorMessage, isErrorOpen, ...passProps } = this.props;
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <Component {...passProps} />
        {isErrorOpen && <ErrorBox text={errorMessage} />}
      </View>
    );
  }
};

export default withErrorBox;
