import {MY_CHECK_BOOK_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const myCheckBookSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllMyCheckBook: builder.query({
      query: () => ({
        url: MY_CHECK_BOOK_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {useGetAllMyCheckBookQuery} = myCheckBookSlice;
