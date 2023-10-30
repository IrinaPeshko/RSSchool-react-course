import { useState } from 'react';
import styles from './ErrorButton.module.css';

function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const resetError = () => {
    setHasError(true);
    throw new Error('This is example Error');
  };

  if (hasError) {
    throw new Error('This is example Error');
  }
  return (
    <>
      {!hasError && (
        <button onClick={resetError} className={styles.errorButton}>
          Create Error
        </button>
      )}
    </>
  );
}

export default ErrorButton;
