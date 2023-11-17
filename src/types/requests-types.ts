import React, { Dispatch, SetStateAction } from 'react';

export interface SpellsRequest {
  data: SpellsRequestData[];
  links: SpellsRequestLinks;
  meta: SpellsRequestMeta;
}

export interface OneSpellRequest {
  data: SpellsRequestData;
  links: { self: string };
  meta: SpellsRequestMeta;
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
  records?: string;
}

export interface SpellsRequestMeta {
  copyright: string;
  generated_at: string;
  pagination?: SpellsRequestLinks;
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

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export interface SearchWordsContextType {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  request: string;
  setRequest: Dispatch<SetStateAction<string>>;
}

export interface SpellsRequestType {
  spellsRequest: SpellsRequestData[];
  setSpellsRequest: Dispatch<SetStateAction<SpellsRequestData[]>>;
}

export interface TransformedSpellsRequest {
  spells: SpellsRequestData[];
  page: string | undefined;
  countOfAllItem: string | undefined;
  isNextPage: boolean;
}

export interface TransformedOneSpellRequest {
  response: AttributesSpells;
}
