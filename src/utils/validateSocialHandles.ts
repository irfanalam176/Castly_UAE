import Toast from 'react-native-toast-message';

type SocialPlatform = 'instagram' | 'tiktok' | 'pinterest' | 'twitter' | 'reddit';
type SocialHandles = Partial<Record<SocialPlatform, string>>;

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  twitter: 'X (Twitter)',
  reddit: 'Reddit',
};

// Only allow clean handles — no spaces, no URLs, no special chars except _ and .
const HANDLE_REGEX = /^[a-zA-Z0-9_.]{1,50}$/;

export const validateSocialHandles = (handles: SocialHandles): boolean => {
  for (const [platform, value] of Object.entries(handles) as [SocialPlatform, string][]) {
    if (!value || !value.trim()) continue; // skip empty — they're optional

    const trimmed = value.trim();
    const label = PLATFORM_LABELS[platform];

    if (!HANDLE_REGEX.test(trimmed)) {
      Toast.show({
        type: 'info',
        text1: 'Invalid Handle',
        text2: `Please enter a valid ${label} handle (e.g. yourusername).`,
      });
      return false;
    }
  }

  return true;
};