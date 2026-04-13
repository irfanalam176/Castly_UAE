import { colors } from "./colors";

export const inputIcons = {
  // Login & SignUp Icons
  email: {
    family: 'MaterialIcons',
    name: 'email',
    color: colors.gray_2,
    size: 20
  },
  lock: {
    family: 'FontAwesome',
    name: 'lock',
    color: colors.gray_2,
    size: 20
  },
  phone: {
    family: 'MaterialIcons',
    name: 'phone-iphone',
    color: colors.gray_3,
    size: 25
  },
  
  // Profile Screen Icons
  user: {
    family: 'FontAwesome',
    name: 'user',
    color: colors.gray_2,
    size: 20
  },
  calendar: {
    family: 'FontAwesome',
    name: 'calendar-o',
    color: colors.gray_2,
    size: 18
  },
  
  // Personal Info Screen Icons
  rulerVertical: {
    family: 'FontAwesome6',
    name: 'ruler-vertical',
    color: colors.gray_2,
    size: 20
  },
  weightScale: {
    family: 'FontAwesome6',
    name: 'weight-scale',
    color: colors.gray_2,
    size: 20
  },
  shoePrints: {
    family: 'FontAwesome6',
    name: 'shoe-prints',
    color: colors.gray_2,
    size: 20
  },
  personDress: {
    family: 'FontAwesome6',
    name: 'person-dress',
    color: colors.gray_2,
    size: 20
  },
  
  // Payment Info Screen Icons
  userProfile: {
    family: 'FontAwesome6',
    name: 'user',
    color: colors.gray_2,
    size: 20
  },
  bank: {
    family: 'FontAwesome',
    name: 'bank',
    color: colors.gray_2,
    size: 20
  },
  globe: {
    family: 'FontAwesome6',
    name: 'globe',
    color: colors.gray_2,
    size: 20
  },
  
  // Gender Icons (for Profile Screen)
  male: {
    family: 'MaterialIcons',
    name: 'male',
    color: colors.blue_1,
    size: 20
  },
  female: {
    family: 'MaterialIcons',
    name: 'female',
    color: colors.pink,
    size: 20
  },
  other: {
    family: 'FontAwesome',
    name: 'circle-o',
    color: colors.purple_1,
    size: 12
  },
  
  // Checkbox Icons
  checkboxChecked: {
    family: 'MaterialIcons',
    name: 'check-box',
    color: colors.darkGreen_2,
    size: 20
  },
  checkboxUnchecked: {
    family: 'MaterialIcons',
    name: 'check-box-outline-blank',
    color: colors.black,
    size: 20
  },
  
  // Social Icons
  google: {
    family: 'FontAwesome',
    name: 'google',
    color: colors.black,
    size: 20
  },
  facebook: {
    family: 'Ionicons',
    name: 'logo-facebook',
    color: colors.white,
    size: 20
  },
  apple: {
    family: 'MaterialIcons',
    name: 'apple',
    color: colors.white,
    size: 24
  }
};

// Also create helper functions for specific screens
export const loginIcons = {
  email: inputIcons.email,
  password: inputIcons.lock
};

export const signUpIcons = {
  email: inputIcons.email,
  password: inputIcons.lock,
  phone: inputIcons.phone
};

export const profileIcons = {
  user: inputIcons.user
};

export const personalInfoIcons = {
  height: inputIcons.rulerVertical,
  weight: inputIcons.weightScale,
  shoe: inputIcons.shoePrints,
  dress: inputIcons.personDress
};

export const paymentInfoIcons = {
  accountHolder: inputIcons.userProfile,
  bank: inputIcons.bank,
  swift: inputIcons.globe
};