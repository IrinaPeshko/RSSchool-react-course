import { SpellsRequest } from '../types/requests-types';

const ROOT: string = 'https://api.potterdb.com//v1/';
const SPELLS: string = '/spells';
const LIMIT: string = '?page[size]=';
const PAGE: string = '&page[number]=';
const SEARCH: string = '&filter[name_cont_any]=';

export const findSpells = (
  searchWord: string,
  limit: string = '10',
  page: string = '1'
) => request(ROOT + SPELLS + LIMIT + limit + PAGE + page + SEARCH + searchWord);

const request = async (link: string): Promise<void | SpellsRequest> => {
  console.log(link);
  try {
    const result = await fetch(link);
    const resultJSON = await result.json();
    return resultJSON;
  } catch (error) {
    console.error('The fetch was unsuccessful: ' + error);
  }
};
