import {CARI_EKSTRE_URL, CARI_LIST_URL, MIZAN_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const raporSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCariKart: builder.query({
      query: () => ({
        url: CARI_LIST_URL,
      }),
      keepUnusedDataFor: 5,
    }),

    getAllCariHar: builder.query({
      query: () => ({
        url: CARI_EKSTRE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllMizan: builder.query({
      query: () => ({
        url: MIZAN_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetAllCariKartQuery,
  useGetAllCariHarQuery,
  useGetAllMizanQuery,
} = raporSlice;
