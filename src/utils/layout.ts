import { StyleSheet } from 'react-native';
import { colors } from './colors';
import { correctSize } from '.';

export const btmContainer = StyleSheet.create({
  bottomContainer: {
    paddingTop: correctSize(21),
    paddingHorizontal: correctSize(24),
    paddingBottom: correctSize(10),
    borderTopWidth: 1,
    borderColor: colors.gray,
  },
});
