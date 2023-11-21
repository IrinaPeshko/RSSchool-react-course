import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
import { ErrorBoundaryProps } from '../../types/requests-types';

class ErrorBoundary extends Component<ErrorBoundaryProps> {
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
        <div className={styles.errorContainer}>
          <h2 className={styles.header}>This is an example error</h2>
          <button className={styles.resetBtn} onClick={this.onResetButtonClick}>
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
