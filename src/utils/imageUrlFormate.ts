import { ROUTES } from "../services/routes";
export const imageUrlFormate=(path?: string | null): string => {
  if (!path) return '';

  if (path.startsWith('upload')) {
    return `${ROUTES.MEDIA_URL}${path}`;
  }

  if (path.startsWith('http')) {
    return path;
  }

  return path;
};