import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AttributesSpells,
  OneSpellRequest,
  SpellsRequest,
  TransformedSpellsRequest,
} from '../../types/requests-types';
import { HYDRATE } from 'next-redux-wrapper';

export const SpellsApi = createApi({
  reducerPath: 'api-cards',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.potterdb.com//v1/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useGetSpellsQuery,
  useGetOneSpellQuery,
} = SpellsApi;

export const { getSpells, getOneSpell } = SpellsApi.endpoints;
