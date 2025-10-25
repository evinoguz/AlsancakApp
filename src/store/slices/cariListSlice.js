import {CARI_LIST_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const cariListSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCariKart: builder.query({
      query: () => ({
        url: CARI_LIST_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetAllCariKartQuery} = cariListSlice;
