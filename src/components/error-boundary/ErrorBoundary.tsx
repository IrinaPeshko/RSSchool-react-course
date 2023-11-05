import { Component, ErrorInfo, ReactNode } from 'react';
import s from './ErrorBoundary.module.css';
import { iErrorBoundaryProps } from '../../types/requests-types';

class ErrorBoundary extends Component<iErrorBoundaryProps> {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error: error, errorInfo: errorInfo });
  }

  onResetButtonClick = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={s.errorContainer}>
          <h2>This is an example error</h2>
          <button className={s.resetBtn} onClick={this.onResetButtonClick}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
