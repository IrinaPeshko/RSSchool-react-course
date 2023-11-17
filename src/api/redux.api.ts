import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AttributesSpells,
  OneSpellRequest,
  SpellsRequest,
  TransformedSpellsRequest,
} from '../types/requests-types';

export const reduxApi = createApi({
  reducerPath: 'api-cards',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.potterdb.com//v1/' }),
  endpoints: (build) => ({
    getSpells: build.query<
      TransformedSpellsRequest,
      { limitPerPage: string; page: string; searchWord: string }
    >({
      query: ({ limitPerPage = '5', page = '1', searchWord = '' }) => {
        return `spells?page[size]=${limitPerPage}&page[number]=${page}&filter[name_cont_any]=${searchWord}`;
      },
      transformResponse: (response: SpellsRequest) => ({
        spells: response.data,
        page: response.meta.pagination?.current,
        countOfAllItem: response.meta.pagination?.records,
        isNextPage: !!response.meta.pagination?.next,
      }),
    }),
    getOneSpell: build.query<{ response: AttributesSpells }, { id: string }>({
      query: ({ id = '' }) => {
        return `spells/${id}`;
      },
      transformResponse: (response: OneSpellRequest) => ({
        response: response.data.attributes,
      }),
    }),
  }),
});

export const { useGetSpellsQuery, useGetOneSpellQuery } = reduxApi;
