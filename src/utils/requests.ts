import { PersonRequest } from "../types/requests-types";

const ROOT: string = 'https://swapi.dev/api';
export const PEOPLE: string = ROOT+"/people";

export const request = (link: string):PersonRequest[]|void => {
  fetch(link)
    .then((res) => res.json())
    .then((res) => console.log(res.results))
    .catch((error) => console.error('The fetch was unsuccessful' + error));
}
request(PEOPLE)