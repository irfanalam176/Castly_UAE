import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setTokens, logout } from '../redux/reducers/userSlice';
import { ROUTES } from './routes';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: ROUTES.BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

let refreshPromise: Promise<void> | null = null;

export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
   if (extraOptions?.skipReauth) {
    return await rawBaseQuery(args, api, extraOptions);
  }
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    try {
      const storedRefreshToken = (api.getState() as any).user.refreshToken;

      if (!storedRefreshToken) {
        console.log('No refresh token');
        api.dispatch(logout());
        return result;
      }

      if (!refreshPromise) {
        refreshPromise = (async () => {
          console.log('Refreshing token...');

          const res = await fetch(`${ROUTES.BASE_URL}/${ROUTES.refresh_token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: storedRefreshToken }),
          });

          console.log('Refresh response status:', res.status);

          if (!res.ok) {
            console.log('Refresh failed — logging out');
            api.dispatch(logout());
            return;
          }

          const data = await res.json();
          console.log('Token refreshed successfully');
          api.dispatch(setTokens({
            accessToken: data.tokens.accessToken,
            refreshToken: data.tokens.refreshToken,
          }));
        })().finally(() => {
          refreshPromise = null;
        });
      }

      await refreshPromise;

      const newToken = (api.getState() as any).user.accessToken;
      if (!newToken) {
        console.log('No new token after refresh — aborting retry');
        return result;
      }

      console.log('Retrying original request...');
      result = await rawBaseQuery(args, api, extraOptions);

    } catch (err) {
      console.log('Refresh threw an error:', err);
      api.dispatch(logout());
    }
  }

  return result;
};