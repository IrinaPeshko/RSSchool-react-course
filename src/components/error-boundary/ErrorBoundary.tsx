import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';
import { ErrorBoundaryProps } from '../../types/requests-types';

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { ...defaultState };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error, errorInfo });
  }

  onResetButtonClick = () => {
    this.setState({ ...defaultState });
  };

  handleImageLoad = () => {
    this.setState({ imageAppeared: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className={styles.errorContainer}>
          <h2>Do you have a problem? I&apos;ll help you!</h2>
          <button className={styles.resetBtn} onClick={this.onResetButtonClick}>
            Just click here
          </button>
          <img
            src="./harry-potter.png"
            alt="harry-potter"
            className={`${styles.error__img} ${
              this.state.imageAppeared && styles.appear
            }`}
            onLoad={this.handleImageLoad}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

const defaultState = {
  hasError: false,
  error: null,
  errorInfo: null,
  imageAppeared: false,
};

export default ErrorBoundary;
