import {CARI_EKSTRE_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const cariEkstreSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCariEkstre: builder.query({
      query: ({id}) => ({
        url: `${CARI_EKSTRE_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCariDetailById: builder.query({
      query: ({id}) => ({
        url: `${CARI_EKSTRE_URL}/fis/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetAllCariEkstreQuery, useGetCariDetailByIdQuery} =
  cariEkstreSlice;
