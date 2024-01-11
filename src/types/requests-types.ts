export interface PersonRequest extends ShortPersonRequest {
  mass: string;
  skin_color: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
}

export interface ShortPersonRequest {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  hair_color: string;
  url: string;
}

export interface iErrorBoundaryProps {
  children: React.ReactNode;
}

export interface iRenderRequest {
  renderRequest: ShortPersonRequest[];
}
