import { createApi } from '@reduxjs/toolkit/query/react';
import { ROUTES } from './routes';
import { baseQueryWithReauth } from './baseQuery';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    // POST
    addUserData: builder.mutation({
      query: payload => ({
        url: ROUTES.add_user_data,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    createBundleSkills: builder.mutation({
      query: payload => ({
        url: ROUTES.create_skills_bundle,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    addUserBankDetails: builder.mutation({
      query: payload => ({
        url: ROUTES.portfolio_bank_accounts,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    filesPresign: builder.mutation({
      query: payload => ({
        url: ROUTES.files_presign,
        method: 'POST',
        body: payload,
      }),
    }),

    uploadBulkMedia: builder.mutation({
      query: payload => ({
        url: ROUTES.portfolio_create_bulk_media,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    // PATCH / PUT
    updateMeasurements: builder.mutation({
      query: payload => ({
        url: ROUTES.portfolio_create_or_update_measurement,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    getProfile: builder.mutation<any, void>({
      query: () => ROUTES.portfolio,
    }),
    getTalentStates: builder.query<any, void>({
      query: () => ROUTES.talent_states,
    }),

    updateProfile: builder.mutation<any, any>({
      query: payload => ({
        url: ROUTES.portfolio,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    deleteMedia: builder.mutation({
      query: payload => ({
        url: ROUTES.delete_media,
        method: 'DELETE',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateDescription: builder.mutation({
      query: payload => ({
        url: ROUTES.update_description,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateBankAccount: builder.mutation({
      query: ({ id, payload }) => ({
        url: `${ROUTES.portfolio_bank_accounts}/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    createMedia: builder.mutation({
      query: payload => ({
        url: ROUTES.create_media,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    addPortfolio: builder.mutation({
      query: payload => ({
        url: ROUTES.talent_portfolio_add,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),
    addAvailability: builder.mutation({
      query: payload => ({
        url: ROUTES.talent_availability,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),

    addSocialMedia: builder.mutation({
      query: payload => ({
        url: ROUTES.add_social_media,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Profile'],
    }),
    
  }),
});

export const {
  useAddUserDataMutation,
  useCreateBundleSkillsMutation,
  useAddUserBankDetailsMutation,
  useFilesPresignMutation,
  useUploadBulkMediaMutation,
  useUpdateMeasurementsMutation,
  useGetProfileMutation,
  useDeleteMediaMutation,
  useUpdateDescriptionMutation,
  useUpdateBankAccountMutation,
  useCreateMediaMutation,
  useUpdateProfileMutation,
  useAddPortfolioMutation,
  useAddAvailabilityMutation,
  useGetTalentStatesQuery,
  useAddSocialMediaMutation
} = profileApi;
