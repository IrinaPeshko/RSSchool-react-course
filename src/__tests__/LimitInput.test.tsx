import { render, screen } from '@testing-library/react';
import LimitInput from '../components/limitPerPageInput/LimitInput';

test('Make sure that limit input is working correct', () => {
  const setLimitMock = vi.fn();
  const setPageMock = vi.fn();
  render(
    <LimitInput limit="5" setLimit={setLimitMock} setPage={setPageMock} />
  );
  const limit = screen.getByTestId('limitInput');
  expect(limit).instanceOf(HTMLInputElement);
  expect(limit).toBeInTheDocument();
  const value = limit.getAttribute('value');
  expect(value).toBe('5');
});
