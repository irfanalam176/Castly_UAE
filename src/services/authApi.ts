import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ROUTES } from './routes';
import { baseQueryWithReauth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({ baseUrl: ROUTES.BASE_URL }),
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    loginUser: builder.mutation({
      query: payload => ({
        url: ROUTES.Login,
        method: 'POST',
        body: payload,
      }),
       extraOptions: { skipReauth: true },
    }),

    verifyEmail: builder.mutation({
      query: () => ({
        url: ROUTES.verify_email,
        method: 'POST',
      }),
    }),
    verifyEmailOtp: builder.mutation({
      query: payload => ({
        url: ROUTES.email_verification_verify_otp,
        method: 'POST',
        body: payload,
      }),
    }),
    sendOtp: builder.mutation({
      query: payload => ({
        url: ROUTES.send_otp,
        method: 'POST',
        body: payload,
      }),
       extraOptions: { skipReauth: true },
    }),

    verifyOtp: builder.mutation({
      query: payload => ({
        url: ROUTES.verify_otp,
        method: 'POST',
        body: payload,
      }),
       extraOptions: { skipReauth: true },
    }),
    resetPassword: builder.mutation({
      query: payload => ({
        url: ROUTES.reset_password,
        method: 'POST',
        body: payload,
      }),
       extraOptions: { skipReauth: true },
    }),

    refreshToken: builder.mutation({
      query: payload => ({
        url: ROUTES.refresh_token,
        method: 'POST',
        body: payload,
      }),
      extraOptions: { skipReauth: true },
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useVerifyEmailMutation,
  useVerifyEmailOtpMutation
} = authApi;
