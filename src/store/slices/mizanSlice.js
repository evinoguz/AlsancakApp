import {MIZAN_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const mizanSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllMizan: builder.query({
      query: () => ({
        url: MIZAN_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetAllMizanQuery} = mizanSlice;
