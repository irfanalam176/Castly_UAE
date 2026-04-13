// validations/measurementValidation.ts or add to a separate file
import Toast from 'react-native-toast-message';

export interface Step4Data {
  height: string;
  weight: string;
  bust: string;
  waist: string;
  hips: string;
  shoeSize: string;
  clothingSize: string | null;
}

export const measurementValidation = (data: Step4Data): boolean => {
  const height = Number(data.height);
  const weight = Number(data.weight);
  const bust = Number(data.bust);
  const waist = Number(data.waist);
  const hips = Number(data.hips);
  const shoeSize = Number(data.shoeSize);
  
  const validations = [
    {
      condition: !data.height.trim() || height < 100 || height > 250,
      title: 'Invalid Height',
      message: 'Height must be between 100-250cm',
    },
    {
      condition: !data.weight.trim() || weight < 30 || weight > 200,
      title: 'Invalid Weight',
      message: 'Weight must be between 30-200kg',
    },
    {
      condition: !data.bust.trim() || bust < 50 || bust > 150,
      title: 'Invalid Bust Measurement',
      message: 'Bust must be between 50-150cm',
    },
    {
      condition: !data.waist.trim() || waist < 40 || waist > 130,
      title: 'Invalid Waist Measurement',
      message: 'Waist must be between 40-130cm',
    },
    {
      condition: !data.hips.trim() || hips < 50 || hips > 150,
      title: 'Invalid Hips Measurement',
      message: 'Hips must be between 50-150cm',
    },
    {
      condition: !data.shoeSize.trim() || shoeSize < 30 || shoeSize > 50,
      title: 'Invalid Shoe Size',
      message: 'Shoe size must be between 30-50 EU',
    },
    {
      condition: !data.clothingSize,
      title: 'Clothing Size Required',
      message: 'Please select your clothing size',
    },
  ];
  
  for (const validation of validations) {
    if (validation.condition) {
      Toast.show({
        type: 'error',
        text1: validation.title,
        text2: validation.message,
      });
      return false;
    }
  }
  
  return true;
};