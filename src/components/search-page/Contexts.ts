import React from "react";
import { SearchWordsContextType, SpellsRequestType } from "../../types/requests-types";

export const SearchWordsContext = React.createContext<SearchWordsContextType>({
  searchWord: '',
  setSearchWord: () => {},
});

export const SpellsRequestContext = React.createContext<SpellsRequestType>({
  spellsRequest: [],
  setSpellsRequest: () => {},
});
