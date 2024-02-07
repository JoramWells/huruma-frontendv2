import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wardApi = createApi({
  reducerPath: 'wardApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/wards',
  }),
  endpoints: (builder) => ({
    getWards: builder.query({
      query: () => 'fetchAll',
    }),
    addWard: builder.mutation({
      query: (newWard) => ({
        url: 'add',
        method: 'POST',
        body: newWard,
      }),
    }),
  }),
});

export const { useGetWardsQuery, useAddWardMutation } = wardApi;
