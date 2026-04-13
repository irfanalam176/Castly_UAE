import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect } from 'react';
import { colors } from '../../../utils/colors';
import { Fonts } from '../../../assets/fonts';
import { correctSize } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../../redux/reducers/messageSlice';
import { RootState } from '../../../redux/stores/store';

const MAX = 400;

const MessageCard = () => {
  const dispatch = useDispatch();
  const {data:jobData}:any = useSelector((state:RootState)=>state.JobData)
  
  const message = useSelector((state: RootState) => state.message.message);
  const progress = Math.min(message.length / MAX, 1);
  const { data } = useSelector((state: RootState) => state.applyJobProgress);
   
  useEffect(() => {
    if (!data?.messageDraft) return;
    dispatch(setMessage(data.messageDraft));
  }, [data?.messageDraft]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Message to {jobData?.brand.brandName}</Text>
        <Text style={styles.description}>
          This message goes directly to the brand's casting team.
        </Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          multiline
          style={styles.textArea}
          placeholder={`Introduce yourself and explain why you're perfect for this role...`}
          placeholderTextColor={colors.gray_5}
          value={message}
          onChangeText={text => {
            if (text.length <= MAX) dispatch(setMessage(text));
          }}
          maxLength={MAX}
        />

        <View style={styles.countRow}>
          <Text style={styles.count}>{message.length} / {MAX}</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.white_1,
    backgroundColor: colors.white,
    marginBottom: correctSize(12),
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
  },
  description: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
    lineHeight: correctSize(18),
    marginTop: correctSize(5),
  },
  header: {
    padding: correctSize(16),
    borderBottomColor: colors.lightBlue_5,
    borderBottomWidth: 1,
  },
  textArea: {
    height: correctSize(148),
    textAlignVertical: 'top',
  },
  inputSection: {
    padding: correctSize(16),
  },
  count: {
    fontSize: 11,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  progressBar: {
    width: correctSize(112),
    height: correctSize(6),
    borderRadius: 100,
    backgroundColor: colors.gray,
    overflow: 'hidden',
  },
  progress: {
    height: correctSize(6),
    backgroundColor: colors.primary,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: colors.lightBlue_5,
    borderTopWidth: 1,
    paddingTop: correctSize(10),
  },
});