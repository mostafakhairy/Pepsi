import React, { Component } from 'react';
import translation from '../../assets/localization/language';

export default class ErrorBoundary extends Component {
  state = {
    error: false,
    errorMessage: '',
  };
  componentDidCatch(error: any, info: any) {
    console.log('ERROR: ' + error);
    this.setState({ error: true, erororMessage: translation.generalError });
    //CALL SENTRY
  }
  render() {
    if (!this.state.error) {
      return this.props.children;
    } else {
      return <h3>{this.state.errorMessage}</h3>;
    }
  }
}
