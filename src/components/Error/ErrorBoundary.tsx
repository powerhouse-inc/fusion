import { withRouter } from 'next/router';
import { Component } from 'react';
import CustomError from './CustomError';
import type { NextRouter } from 'next/router';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  router: NextRouter;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRouteChange() {
    this.state.hasError && this.setState({ hasError: false });
  }

  componentDidMount() {
    this.props.router.events.on('routeChangeComplete', () => this.handleRouteChange());
  }

  componentWillUnmount() {
    this.props.router.events.off('routeChangeComplete', () => this.handleRouteChange);
  }

  render() {
    if (this.state.hasError) {
      return (
        <CustomError
          description="Something went wrong. We'll be right back."
          skyButtonTitle="Try again"
          callback={() => {
            window.location.reload();
          }}
        />
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
