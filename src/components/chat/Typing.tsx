import { View, Text, StyleSheet } from 'react-native';

import HorizontalDots from '../../assets/svg/applications/HorizontalDots';
import { correctSize } from '../../utils';
import { colors } from '../../utils/colors';
const Typing = () => {
  return (
    <View style={styles.container}>
      <HorizontalDots width={32} height={38} />
    </View>
  );
};

export default Typing;
const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.white,
    paddingHorizontal: correctSize(12),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,

    elevation: 1,
    borderRadius:16,
    borderTopLeftRadius:6
  },
});
