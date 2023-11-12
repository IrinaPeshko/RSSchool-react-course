import { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton = () => {
  const [hasError, setHasError] = useState(false);

  const resetError = () => {
    setHasError(true);
    console.error('This is example Error');
  };

  if (hasError) {
    throw new Error('This is example Error');
  }
  return (
    <>
      {!hasError && (
        <button
          onClick={resetError}
          className={styles.errorButton}
          data-testid="errorBtn"
        >
          Create Error
        </button>
      )}
    </>
  );
};

export default ErrorButton;
