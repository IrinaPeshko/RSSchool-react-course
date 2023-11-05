export interface SpellsRequest {
  data: SpellsRequestData[];
  links: SpellsRequestLinks;
  meta: SpellsRequestMeta;
}

export interface OneSpellRequest {
  data: SpellsRequestData;
  links: { self: string };
  meta: {
    copyright: string;
    generated_at: string;
  };
}

export interface SpellsRequestData {
  attributes: AttributesSpells;
  id: string;
  links: { self: string };
  type: string;
}

export interface SpellsRequestLinks {
  current: string;
  last: string;
  next: string;
  self: string;
}

export interface SpellsRequestMeta {
  copyright: string;
  generated_at: string;
  pagination: {
    current: number;
    last?: number;
    next?: number;
    records: number;
  };
}

export interface AttributesSpells {
  category: string;
  creator: string;
  effect: string;
  hand: string;
  image: string;
  incantation: string;
  light: string;
  name: string;
  slug: string;
  wiki: string;
}

export interface iErrorBoundaryProps {
  children: React.ReactNode;
}
