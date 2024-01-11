import { Component, ReactNode } from 'react';
import styles from './ErrorButton.module.css';

const errorMessage = 'Oh no... You have a problem!';
class ErrorButton extends Component {
  state = {
    hasError: false,
  };

  createError = () => {
    this.setState({ hasError: false });
  };

  resetError = () => {
    this.setState({ hasError: true });
    throw new Error(errorMessage);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error(errorMessage);
    }

    return (
      <>
        {!this.state.hasError && (
          <button onClick={this.resetError} className={styles.errorButton}>
            Create Error
          </button>
        )}
      </>
    );
  }
}

export default ErrorButton;
