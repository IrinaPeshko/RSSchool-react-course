import { render, screen } from '@testing-library/react';
import SearchCard from './SearchCard';
import { MemoryRouter } from 'react-router-dom';

test('Ensure that the card component renders the relevant card data;', () => {
  const propsToCard = {
    name: 'Age Line',
    effect:
      'Prevents people above or below a certain age from access to a target',
    image:
      'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
    category: 'Charm',
    light: 'Blue',
    id: 'ef7c3503-8dea-41b2-8755-f9424ba7645e',
  };

  render(
    <MemoryRouter>
      <SearchCard {...propsToCard} />
    </MemoryRouter>
  );
  screen.debug();
  const cardName = screen.getByText(propsToCard.name);
  expect(cardName).toBeTruthy();

  const cardEffect = screen.getByText((content) => {
    return content.includes(propsToCard.effect);
  });
  expect(cardEffect).toBeTruthy();

  const cardImage = screen.getByAltText('spells-image');
  expect(cardImage.getAttribute('src')).toBe(propsToCard.image);
});
