import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from '../redux/reducers/profileSlice';
import { useGetProfileMutation, useUpdateProfileMutation } from '../services/profileAPI';

/**
 * Central hook for profile data.
 *
 * - Fetches profile on mount via `getProfile` mutation
 * - Stores result in Redux via `profileSlice.matchFulfilled`
 * - All reads come from the persisted `selectProfile` selector
 * - Call `fetchProfile()` after any mutation that modifies profile data
 */
export function useProfile(options?: { fetchOnMount?: boolean }) {
  const { fetchOnMount = true } = options ?? {};
  const profile = useSelector(selectProfile);
  const [getProfile, { isLoading, isError }] = useGetProfileMutation();
  const [updateProfile, { isLoading: isUpdatingProfile, isError: isUpdatingProfileError }] = useUpdateProfileMutation();
  const fetchProfile = useCallback(() => {
    return getProfile();
  }, [getProfile]);

  useEffect(() => {
    if (fetchOnMount) {
      fetchProfile();
    }
  }, []);

  return { profile, fetchProfile, isLoading, isError, updateProfile, isUpdatingProfile, isUpdatingProfileError };
}
