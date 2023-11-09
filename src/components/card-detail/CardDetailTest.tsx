import CardDetail from './CardDetail';
import { render, screen } from '@testing-library/react';

test('Check that a loading indicator is displayed while fetching data', async () => {
  // const fetchSpell = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({
  //         data: {
  //           attributes: {
  //             name: 'Sample Spell',
  //             image: 'sample_image_url',
  //             effect: 'Sample Effect',
  //             category: 'Sample Category',
  //             light: 'Sample Light',
  //           },
  //         },
  //       });
  //     }, 1000);
  //   });
  // };

  render(<CardDetail />);

  const loadingElement = await screen.findByTestId('loadingBlock');

  expect(loadingElement).toBeTruthy();
});
