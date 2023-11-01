export type PersonProperties = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};
export type PersonRequest = {
  description: string;
  properties: PersonProperties;
  uid: string;
  __v: number;
  _id: string;
};

export type ShortPersonRequest = {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  hair_color: string;
  url: string;
  key: string;
};

export interface iErrorBoundaryProps {
  children: React.ReactNode;
}

export interface iRenderRequest {
  renderRequest: ShortPersonRequest[];
}
