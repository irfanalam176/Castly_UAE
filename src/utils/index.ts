import { Dimensions, NativeModules, PixelRatio, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const windowWidth = Dimensions.get('window').width;

const isIpad = () => {
  // iOS Only
  const deviceType = NativeModules?.PlatformConstants?.interfaceIdiom ?? false;
  if (deviceType === 'pad') {
    return true;
  }
  return false;
};

const isTabletBasedOnRatio = (ratio: number = PixelRatio.get()) => {
  // Android Only
  if (ratio > 1.6) {
    return false;
  }
  return true;
};

export const isDeivceTablet = () => (isIOS ? isIpad() : isTabletBasedOnRatio());

function correctSize(size: number) {
  const isTab = isDeivceTablet();
  if (isTab) {
    return (size / (834 * 1.25)) * windowWidth;
  }
  return (size / 414) * windowWidth;
}

// let isTab = false;
function fontSize(size: number) {
  const isTab = isDeivceTablet();
  if (isTab) {
    return (size / (834 * 1.3)) * windowWidth;
  }
  return (size / 414) * windowWidth;
}

const EmailValidator = (email: string) => {
  // const passwordRgx =
  //   /^(?=.*\d)(?=.*[!@#$%^&*()-])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  const emailRgx = /\S+@\S+\.\S+/;
  if (!email) {
    return 'Email is required.';
  }
  if (!emailRgx.test(email)) {
    return 'Email format is invalid.';
  }

  return true;
};

const PhoneNumberValidator = (phoneNumber: string) => {
  if (!phoneNumber) {
    return 'Phone number is required.';
  }
};

const EURO = new Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
});

const customCeil = (value: number, decimalPlaces: number = 2) => {
  const factor = Math.pow(10, decimalPlaces);
  const ceilValue = Math.ceil(value * factor) / factor;

  // Use toFixed to ensure it always shows 2 decimal places
  return Number(ceilValue.toFixed(decimalPlaces));
};

export {
  correctSize,
  customCeil,
  EmailValidator,
  EURO,
  fontSize,
  PhoneNumberValidator,
};
