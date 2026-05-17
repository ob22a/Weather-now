import { Component, type ErrorInfo, type ReactNode } from 'react';
import ErrorPage from '../ErrorPage/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Uncaught render error:', error, info.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, message: '' });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          message={this.state.message}
          kind="general"
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
