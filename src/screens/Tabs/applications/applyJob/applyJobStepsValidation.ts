import Toast from 'react-native-toast-message';

const showError = (message: string) =>
  Toast.show({ type: 'error', text1: 'Error', text2: message });

const inRange = (value: any, min: number, max: number): boolean => {
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

const validClothingSizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];

export const validateConfirmProfile = (confirmProfile: any): boolean => {
  if (!confirmProfile.avatarUrl?.trim()) {
    showError('Please upload a profile photo.');
    return false;
  }

  if (!confirmProfile.fullName?.trim()) {
    showError('Full name is required.');
    return false;
  }

  if (!confirmProfile.handle?.trim()) {
    showError('Handle is required.');
    return false;
  }

  if (!confirmProfile.location?.trim()) {
    showError('Location is required.');
    return false;
  }

  if (!confirmProfile.bio?.trim()) {
    showError('Bio is required.');
    return false;
  }

  if (!confirmProfile.email?.trim()) {
    showError('Email is required.');
    return false;
  }

  if (!confirmProfile.phoneNumber?.trim()) {
    showError('Phone number is required.');
    return false;
  }

  if (!validClothingSizes.includes(confirmProfile.clothingSize)) {
    showError('Clothing size must be one of: XXS, XS, S, M, L, XL.');
    return false;
  }

  // height: 100cm - 250cm
  if (!inRange(confirmProfile.height, 100, 250)) {
    showError('Height must be between 100 and 250 cm.');
    return false;
  }

  // weight: 30kg - 300kg
  if (!inRange(confirmProfile.weight, 30, 300)) {
    showError('Weight must be between 30 and 300 kg.');
    return false;
  }

  // bust: 50cm - 200cm
  if (!inRange(confirmProfile.bust, 50, 200)) {
    showError('Bust must be between 50 and 200 cm.');
    return false;
  }

  // waist: 40cm - 200cm
  if (!inRange(confirmProfile.waist, 40, 200)) {
    showError('Waist must be between 40 and 200 cm.');
    return false;
  }

  // hips: 50cm - 200cm
  if (!inRange(confirmProfile.hips, 50, 200)) {
    showError('Hips must be between 50 and 200 cm.');
    return false;
  }

  // shoe size: 20 - 60 (EU sizing)
  if (!inRange(confirmProfile.shoeSize, 20, 60)) {
    showError('Shoe size must be between 20 and 60.');
    return false;
  }

  return true;
};