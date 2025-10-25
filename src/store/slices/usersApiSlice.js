import {LOGIN_URL} from '../../service/url';
import {apiSlice} from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: data => ({
        url: LOGIN_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {useLoginMutation} = userApiSlice;
