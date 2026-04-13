import { Dimensions } from 'react-native';

export const { width: fullWidth, height: fullHeight } =
  Dimensions.get('window');

export const getResponsiveFont = (fontSize: number) => {
  const scale = fullWidth / 414;
  if (fullWidth > 500) {
    if (fullHeight > 1200) {
      return fontSize * 1.3;
    }
    return fontSize * 1.5;
  }
  return fontSize * scale;
};
type FontFamily = 'Inter' | 'Poppins' | 'InriaSerif';
export const font = (
  fontSize: any,
  fontWeight?: any,
  fontFamily: FontFamily = 'Inter',
) => {
  let newFontWeight = '';
  switch (fontWeight) {
    case 100: {
      newFontWeight = 'Thin';
      break;
    }
    case 200: {
      newFontWeight = 'ExtraLight';
      break;
    }
    case 300: {
      newFontWeight = 'Light';
      break;
    }
    case 400: {
      newFontWeight = 'Regular';
      break;
    }
    case 500: {
      newFontWeight = 'Medium';
      break;
    }
    case 600: {
      newFontWeight = 'SemiBold';
      break;
    }
    case 700: {
      newFontWeight = 'Bold';
      break;
    }
    case 800: {
      newFontWeight = 'ExtraBold';
      break;
    }
    case 900: {
      newFontWeight = 'Black';
      break;
    }
  }

  return {
    fontFamily: fontWeight ? `${fontFamily}-${newFontWeight}` : `${fontFamily}`,
    fontSize: getResponsiveFont(fontSize),
  };
};
