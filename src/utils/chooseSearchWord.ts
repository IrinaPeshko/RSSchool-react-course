export function chooseSearchWord() {
  const value: string | null = localStorage.getItem('inputValue');
  if (value) {
    return value;
  }
  return '';
}
