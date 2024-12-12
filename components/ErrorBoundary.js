import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, info) {
    // log to console or external monitoring service
  }

  render() {
    if (this.state.hasError) {
      return (<h1>Oops, une erreur est survenue</h1>);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
