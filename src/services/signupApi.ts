import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';
import { ROUTES } from './routes';

interface StepResponse {
  message: string;
  stepNo: number;
  user: Record<string, any>;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export const signupApi = createApi({
  reducerPath: 'signupApi',
  baseQuery: baseQueryWithReauth, 
  endpoints: builder => ({
    signUpStep1: builder.mutation<StepResponse, {
      stepNo: number;
      fullName: string;
      email: string;
      phoneNumber: string;
      phoneNumberPrefix: string;
      password: string;
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_1, method: 'POST', body }),
    }),
    signUpStep2: builder.mutation<StepResponse, {
      stepNo: number;
      talent: string;
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_2, method: 'PATCH', body }),
    }),
    signUpStep3: builder.mutation<StepResponse, {
      stepNo: number;
      location: string;
      bio: string;
      specialities: string[];
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_3, method: 'PATCH', body }),
    }),
    signUpStep4: builder.mutation<StepResponse, {
      stepNo: number;
      height: number;
      weight: number;
      bust: number;
      waist: number;
      hips: number;
      shoeSize: number;
      clothingSize: string;
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_4, method: 'PATCH', body }),
    }),
    signUpStep5: builder.mutation<StepResponse, {
      stepNo: number;
      availability: string[];
      shootDurationPreference: string;
      noticeRequired: string;
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_5, method: 'PATCH', body }),
    }),
    signUpStep6: builder.mutation<StepResponse, {
      stepNo: number;
      imageUrl: string;
      portfolioImages: string[];
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_6, method: 'PATCH', body }),
    }),
    signUpStep7: builder.mutation<StepResponse, {
      stepNo: number;
      referralCode?: string;
      emiratesId?: string | null;
      idVerified: boolean;
      termsAgreed: boolean;
    }>({
      query: body => ({ url: ROUTES.Sign_up_step_7, method: 'PATCH', body }),
    }),
  }),
});

export const {
  useSignUpStep1Mutation,
  useSignUpStep2Mutation,
  useSignUpStep3Mutation,
  useSignUpStep4Mutation,
  useSignUpStep5Mutation,
  useSignUpStep6Mutation,
  useSignUpStep7Mutation,
} = signupApi;