import { createApi } from '@reduxjs/toolkit/query/react';
import { ROUTES } from './routes';
import { baseQueryWithReauth } from './baseQuery';

export const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Applications'],

  endpoints: builder => ({
    getAllJobs: builder.query({
      query: params => ({
        url: ROUTES.all_jobs,
        params,
      }),
    }),

    getMyJobs: builder.query({
      query: params => ({
        url: ROUTES.my_jobs,
        params,
      }),
    }),
    getMySpecificJob: builder.query({
      query: params => ({
        url: `${ROUTES.my_jobs}/${params}`,
      }),
    }),

    getSpecificJobs: builder.query({
      query: params => {
        return {
          url: `${ROUTES.jobs}/${params.id}`,
        };
      },
    }),
    getSpecificAppliedJobs: builder.query({
      query: params => ({
        url: `${ROUTES.specific_applied_job}${params.id}`,
      }),
    }),

    applyToProject: builder.mutation({
      query: ({ projectId, payload }) => ({
        url: `${ROUTES.project_apply}${projectId}/apply`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),

    getAppliedProjects: builder.query({
      query: params => ({
        url: ROUTES.get_applied_projects,
        params,
      }),
      providesTags: ['Applications'],
    }),

    // Add these endpoints inside your existing applicationApi endpoints builder:

    // ── Step 1: Profile ───────────────────────────────────────────────────────────
    saveApplicationProfile: builder.mutation({
      query: ({ jobId, payload }) => ({
        url: `${ROUTES.job_Apply}${jobId}/profile`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),

    // ── Step 2: Availability ──────────────────────────────────────────────────────
    saveApplicationAvailability: builder.mutation({
      query: ({ jobId, payload }) => ({
        url: `${ROUTES.job_Apply}${jobId}/availability`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),

    // ── Step 3: Portfolio ─────────────────────────────────────────────────────────
    saveApplicationPortfolio: builder.mutation({
      query: ({ jobId, payload }) => ({
        url: `${ROUTES.job_Apply}${jobId}/portfolio`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),

    // ── Step 4: Message ───────────────────────────────────────────────────────────
    saveApplicationMessage: builder.mutation({
      query: ({ jobId, payload }) => ({
        url: `${ROUTES.job_Apply}${jobId}/message`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),

    // ── Step 5: Review (GET) ──────────────────────────────────────────────────────
    getApplicationReview: builder.query({
      query: (jobId: any) => ({
        url: `${ROUTES.job_Apply}${jobId}/review`,
      }),
      providesTags: ['Applications'],
    }),

    // ── Submit ────────────────────────────────────────────────────────────────────
    submitApplication: builder.mutation({
      query: (jobId: string) => ({
        url: `${ROUTES.job_Apply}${jobId}/submit`,
        method: 'POST',
      }),
      invalidatesTags: ['Applications'],
    }),

    getApplyProgress: builder.query({
      query: (id: any) => ({
        url: `${ROUTES.get_apply_progress}/${id}`,
      }),
      providesTags: ['Applications'],
    }),

    reportIssue: builder.mutation({
      query: payload => ({
        url: ROUTES.report_issue,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useApplyToProjectMutation,
  useGetAppliedProjectsQuery,
  useGetSpecificJobsQuery,
  useGetSpecificAppliedJobsQuery,
  useSaveApplicationProfileMutation,
  useSaveApplicationAvailabilityMutation,
  useSaveApplicationPortfolioMutation,
  useGetApplicationReviewQuery,
  useSubmitApplicationMutation,
  useSaveApplicationMessageMutation,
  useLazyGetApplyProgressQuery,
  useGetMyJobsQuery,
  useGetMySpecificJobQuery,
  useReportIssueMutation,
} = applicationApi;
