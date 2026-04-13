import { createApi } from '@reduxjs/toolkit/query/react';
import { ROUTES } from './routes';
import { baseQueryWithReauth } from './baseQuery';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['notifications'],

  endpoints: builder => ({
    getAllNotifications: builder.query({
      query: params => ({
        url: ROUTES.get_notifications,
        params,
      }),
      providesTags: ['notifications'],
    }),
  }),
});

export const { useGetAllNotificationsQuery} = notificationsApi;
