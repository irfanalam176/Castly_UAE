
const BASE_URL = 'https://uat-api.castly.co/v1';

const MEDIA_URL = 'https://castly.s3.ap-south-1.amazonaws.com/'

export const ROUTES = {
  BASE_URL,
  MEDIA_URL,

  // ─── Auth ────────────────────────────────────────────────────────────────────
  Sign_up_step_1: 'auth/signup/talent/step-1',
  Sign_up_step_2: 'auth/signup/talent/step-2',
  Sign_up_step_3: 'auth/signup/talent/step-3',
  Sign_up_step_4: 'auth/signup/talent/step-4',
  Sign_up_step_5: 'auth/signup/talent/step-5',
  Sign_up_step_6: 'auth/signup/talent/step-6',
  Sign_up_step_7: 'auth/signup/talent/step-7',
  
  Login: 'auth/login',
  refresh_token: 'auth/refresh',
  auth_logout: 'auth/logout',
  googleSingin: 'auth/oauth',
  verify_email:'auth/email-verification/send-otp',
  email_verification_verify_otp:'auth/email-verification/verify-otp',
  forgot_password: 'auth/forgot-password',
  reset_password: 'auth/reset-password',
  send_otp: 'auth/forgot-password/send-otp',
  verify_otp: 'auth/forgot-password/verify-otp',
  reset_password: 'auth/forgot-password/reset', 
  report_issue:"support/report-issue",
  delete_media:"talent/me/portfolio",

  // ─── Talent ──────────────────────────────────────────────────────────────────
  portfolio: 'talent/me',
  talent_states: 'talent/me/stats',
  talent_availability: 'talent/me/availability',
  talent_portfolio_add: 'talent/me/portfolio',
  talent_verify_id: 'talent/me/verify-id',
  talent_search: 'talent/search',
  talent_public_profile: 'talent/', // + {id}/public
  talent_push_tokens: 'talent/push-tokens',
  add_social_media:'talent/me/social-media',

  // ─── Jobs ────────────────────────────────────────────────────────────────────
  jobs: 'jobs',
  job_Apply: 'talent/applications/job/',
  jobs_publish: 'jobs/publish',
  my_jobs:'talent/my-jobs',
  // ─── Applications ────────────────────────────────────────────────────────────
  talent_applications: 'talent/applications',
  get_apply_progress:"applications",

  // ─── Messages ────────────────────────────────────────────────────────────────
  messages_inbox: 'messages/inbox',
  messages_unread: 'messages/unread',
  messages_conversations: 'messages/conversations',
  messages_send: 'messages',

  // ─── Payments ────────────────────────────────────────────────────────────────
  talent_wallet: 'payments/talent/wallet',
  talent_payment_history: 'payments/talent/history',
  talent_monthly_earnings: 'payments/talent/monthly-earnings',
  talent_bank_accounts: 'payments/talent/bank-accounts',
  talent_withdraw: 'payments/talent/withdraw',

  // ─── Notifications ──────────────────────────────────────────────────────────
  talent_notifications: 'talent/notifications',

  // ─── Storage ─────────────────────────────────────────────────────────────────
  storage_presigned_url: 'storage/presign-upload',

  // ─── Legacy (kept for existing service references) ───────────────────────────
  auth_profile: 'auth/profile',
  add_user_data: 'portfolio/create-profile',
  create_skills_bundle: 'portfolio/create-bulk-skill',
  portfolio_create_or_update_measurement: 'portfolio/create-or-update-measurement',
  portfolio_bank_accounts: 'portfolio/bank-accounts',
  files_presign: 'files/presign',
  portfolio_create_bulk_media: 'portfolio/create-bulk-media',
  create_media: 'portfolio/create-media',
  delete_portfolio_media: 'portfolio/delete-media',
  update_description: 'portfolio/update-description',
  all_jobs: '/jobs', //projects/get-all-projects
  specific_job: 'projects/',
  specific_applied_job: 'project-apply/applications/',
  project_apply: 'project-apply/',
  get_applied_projects: 'project-apply/applications/me',
  get_notifications: 'notifications/me',
};
