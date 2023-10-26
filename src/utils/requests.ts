import { PersonRequest } from '../types/requests-types';

const ROOT: string = 'https://swapi.dev/api';
export const PEOPLE: string = ROOT + '/people';

export const request = async (link: string): Promise<void | PersonRequest> => {
  try {
    const result = await fetch(link);
    const resultJSON = await result.json();
    return resultJSON.results;
  } catch (error) {
    console.error('The fetch was unsuccessful: ' + error);
  }
};
