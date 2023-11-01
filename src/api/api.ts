import { PersonRequest, ShortPersonRequest } from '../types/requests-types';

const ROOT: string = 'https://www.swapi.tech/api';
const PEOPLE: string = '/people';
const SEARCH: string = '/?name=';
// const LIMIT: string = '&limit=82';
// const PAGE: string = '&page=1';

export const findPeople = (searchWord: string) =>
  request(ROOT + PEOPLE + SEARCH + searchWord);

const request = async (link: string): Promise<void | ShortPersonRequest> => {
  console.log(link);
  try {
    const result = await fetch(link);
    const resultJSON = await result.json();
    console.log(resultJSON);
    return resultJSON.result;
  } catch (error) {
    console.error('The fetch was unsuccessful: ' + error);
  }
};

export const createShortArr = async function (searchWord: string) {
  const trimSearchWord = searchWord.trim();
  const requestArr = await findPeople(trimSearchWord);
  if (requestArr instanceof Array) {
    const shortRequestArr = requestArr.map((el: PersonRequest) => {
      return {
        name: el.properties.name,
        birth_year: el.properties.birth_year,
        gender: el.properties.gender,
        height: el.properties.height,
        eye_color: el.properties.eye_color,
        hair_color: el.properties.hair_color,
        url: el.properties.url,
        key: el.uid,
      };
    });
    return shortRequestArr;
  }
};
// 'https://www.swapi.tech/api/people/?limit=3&page=1&name=le';
