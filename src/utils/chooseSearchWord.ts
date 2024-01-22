export function chooseSearchWord() {
  const value: string | null = localStorage.getItem('inputValue');
  if (value) {
    return value;
  }
  return '';
}

export function chooseLimit() {
  const value: string | null = localStorage.getItem('limit');
  if (value) {
    return value;
  }
  return '8';
}

export function choosePage() {
  const value: string | null = localStorage.getItem('page');
  if (value) {
    return value;
  }
  return '1';
}
