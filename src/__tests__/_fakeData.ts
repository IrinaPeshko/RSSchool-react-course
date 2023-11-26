import { TransformedSpellsRequest } from '@/types/requests-types';

export const TransformSpellsRequest: TransformedSpellsRequest = {
  spells: [
    {
      attributes: {
        category: 'Jinx',
        creator: 'Harry Potter',
        effect: 'Repels intruders',
        hand: 'Slashing movement',
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/b/be/Dumbledore_and_Harry_performing_Apparition.gif',
        incantation: 'Aqua Eructo(A-kwa ee-RUCK-toh)',
        light: 'Ice-blue',
        name: 'Aqua Eructo',
        slug: 'aqua-eructo',
        wiki: 'https://harrypotter.fandom.com/wiki/Aqua_Eructo',
      },
      id: 'f10af5f6-c6d3-48b9-b229-fee496e3ae41',
      links: {
        self: '/v1/spells/f10af5f6-c6d3-48b9-b229-fee496e3ae41',
      },
      type: 'spell',
    },
    {
      attributes: {
        category: 'Conjuration',
        creator: 'Harry Potter',
        effect: "Conjures a shooting arrow from the caster's wand",
        hand: 'Slashing movement',
        image:
          'https://static.wikia.nocookie.net/harrypotter/images/8/82/ArrowShootingSpellHM.png',
        incantation: 'Aqua Eructo(A-kwa ee-RUCK-toh)',
        light: 'Ice-blue',
        name: 'Arrow Shooting Spell',
        slug: 'arrow-shooting-spell',
        wiki: 'https://harrypotter.fandom.com/wiki/Arrow_Shooting_Spell',
      },
      id: '463c97fc-09b2-4b07-9494-39c83f592a40',
      links: {
        self: '/v1/spells/f10af5f6-c6d3-48b9-b229-fee496e3ae41',
      },
      type: 'spell',
    },
  ],
  isNextPage: true,
};

export const propsToCard = {
  name: 'Age Line',
  effect:
    'Prevents people above or below a certain age from access to a target',
  image:
    'https://static.wikia.nocookie.net/harrypotter/images/e/e5/Age_Line_surrounding_the_Goblet_of_Fire_PM.jpg',
  category: 'Charm',
  light: 'Blue',
  id: 'ef7c3503-8dea-41b2-8755-f9424ba7645e',
};