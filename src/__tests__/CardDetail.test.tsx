// import { MemoryRouter, Route } from 'react-router-dom';
// import CardDetail from '../components/card-detail/CardDetail';
// import { render, screen } from '@testing-library/react';

// describe('Detailed card tests', () => {
//   vi.mock('../api/api', () => ({
//     default: {
//       getSpell: vi.fn().mockResolvedValue({
//         data: {
//           attributes: {
//             name: 'Test Spell',
//             image: 'https://example.com/test.png',
//             effect: 'Test Effect',
//             category: 'Test Category',
//             light: 'Test Light',
//           },
//         },
//       }),
//     },
//   }));

//   test('Make sure the detailed card component correctly displays the detailed card data', async () => {
//     render(
//       <MemoryRouter
//         initialEntries={['details/f31f5ae2-596f-41a6-aa97-506134ac17aa']}
//       >
//         <CardDetail />
//       </MemoryRouter>
//     );
//     screen.debug();
//     await screen.findByText('Age Line');
//   });
// });

// // test('Check that a loading indicator is displayed while fetching data', async () => {
// // const fetchSpell = () => {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve({
// //         data: {
// //           attributes: {
// //             name: 'Sample Spell',
// //             image: 'sample_image_url',
// //             effect: 'Sample Effect',
// //             category: 'Sample Category',
// //             light: 'Sample Light',
// //           },
// //         },
// //       });
// //     }, 1000);
// //   });
// // };

// // render(<CardDetail />);

// // const loadingElement = await screen.findByTestId('loadingBlock');

// // expect(loadingElement).toBeTruthy();
// // });
