import {CHECK_BOOK_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const checkBookSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllCheckBookKasadaki: builder.query({
      query: () => ({
        url: `${CHECK_BOOK_URL}/kasadaki`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllCheckBookTakastaki: builder.query({
      query: () => ({
        url: `${CHECK_BOOK_URL}/takastaki`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetAllCheckBookKasadakiQuery, useGetAllCheckBookTakastakiQuery} =
  checkBookSlice;
