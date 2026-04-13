import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { correctSize } from '../../../utils';
import { colors } from '../../../utils/colors';
import StarIcon from '../../../assets/svg/applications/StarIcon';
import { Fonts } from '../../../assets/fonts';
import CrossIcon from '../../../components/vectorIcons/CrossIcon';
import BriefCaseIcon from '../../../components/vectorIcons/BriefCaseIcon';
import StarOutline from '../../../assets/svg/applications/StarOutline';
import { quickTagsList } from '../../../utils/array';
import { AnimatedWrapper } from '../../../components/Animation';

interface FeedBackProps {
  visible?: boolean;
  onClose?: () => void;
}

const FeedBack = ({ visible, onClose }: FeedBackProps) => {
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const toggleTag = (id: number) => {
    setSelectedTags(prev =>
      prev.includes(id) ? prev.filter(tagId => tagId !== id) : [...prev, id],
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.crossIcon} onPress={onClose}>
              <CrossIcon />
            </TouchableOpacity>

            <AnimatedWrapper>
              <View style={styles.iconContainer}>
                <StarIcon width={33} height={33} color={colors.darkgray} />
              </View>
            </AnimatedWrapper>

            <AnimatedWrapper>
              <Text style={styles.largeHeading}>
                {'How was your \n experience?'}
              </Text>
              <Text style={styles.description}>
                Your feedback helps us improve Castly
              </Text>
            </AnimatedWrapper>
          </View>

          {/* body */}
          <View style={styles.body}>
            <ScrollView>
              <AnimatedWrapper>
                <View style={styles.jobCard}>
                  <View style={styles.jobIcon}>
                    <BriefCaseIcon
                      width={18}
                      height={18}
                      fillColor={colors.white}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      Fashion Model - Summer Campaign
                    </Text>
                    <Text style={styles.date}>Completed on Dec 10, 2025</Text>
                  </View>
                </View>

                <Text style={[styles.mainHeading, styles.rateHeading]}>
                  Rate your experience
                </Text>
              </AnimatedWrapper>

              <AnimatedWrapper delay={200}>
                <View style={styles.rateContainer}>
                  {[1, 2, 3, 4, 5].map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      activeOpacity={0.7}
                      onPress={() => setRating(item)}
                      style={[
                        styles.startContainer,
                        rating >= item && { backgroundColor: colors.primary },
                      ]}
                    >
                      <StarOutline />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.mainHeading}>
                  Share your thoughts (optional)
                </Text>
              </AnimatedWrapper>

              <AnimatedWrapper delay={300}>
                <TextInput
                  multiline
                  placeholder="Tell us about your experience working with this brand..."
                  placeholderTextColor={colors.gray_2}
                  style={styles.textArea}
                  numberOfLines={6}
                  maxLength={500}
                  onChangeText={e => {
                    setComments(e);
                  }}
                />

                <View style={styles.row}>
                  <Text style={styles.helpText}>
                    Help others make informed decisions
                  </Text>
                  <Text style={styles.count}>{comments.length}/500</Text>
                </View>
                <Text style={styles.mainHeading}>Quick tags (optional)</Text>

                <View style={styles.tagsContainer}>
                  {quickTagsList.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => toggleTag(item.id)}
                      style={[
                        styles.tag,
                        selectedTags.includes(item.id) && {
                          backgroundColor: colors.primary,
                        },
                      ]}
                    >
                      <Text style={styles.tagText}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity style={styles.footerBtn}>
                  <Text style={styles.btnText}>Submit Review</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.btnText}>Skip for now</Text>
                </TouchableOpacity>
              </AnimatedWrapper>
            </ScrollView>
          </View>
          {/* body */}
        </View>
      </View>
    </Modal>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  footerBtn: {
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: correctSize(18),
    shadowColor: colors.lightBlue_10,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,

    // Android
    elevation: 6,
    marginBottom: correctSize(30),
  },
  btnText: {
    fontSize: 16,
    fontFamily: Fonts.Inter_SemiBold,
    color: colors.gray_1,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginRight: correctSize(8),
    marginBottom: correctSize(8),
    backgroundColor: colors.white_1,
    paddingHorizontal: correctSize(16),
    paddingVertical: correctSize(8),
    borderRadius: 100,
  },
  tagText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Medium,
    color: colors.darkgray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: correctSize(14),
    marginBottom: correctSize(24),
  },
  helpText: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_4,
  },
  count: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.gray_3,
  },
  textArea: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray,
    padding: correctSize(10),
    fontSize: 14,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
    height: correctSize(108),
    textAlignVertical: 'top',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: correctSize(12),
    marginBottom: correctSize(68),
  },
  startContainer: {
    flex: 1,
    height: correctSize(56),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white_1,
  },
  mainHeading: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: correctSize(12),
  },
  rateHeading: {
    textAlign: 'center',
    marginBottom: correctSize(16),
  },
  jobCard: {
    flexDirection: 'row',
    padding: correctSize(16),
    backgroundColor: colors.lightBlue_2,
    borderRadius: 12,
    marginTop: correctSize(32),
    marginBottom: correctSize(24),
  },

  body: {
    height: Dimensions.get('window').height - correctSize(400),
    paddingVertical: correctSize(32),
    paddingHorizontal: correctSize(24),
    paddingTop: 0,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.darkgray_1,
    paddingTop: correctSize(32),
    paddingBottom: correctSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  crossIcon: {
    width: correctSize(40),
    height: correctSize(40),
    borderRadius: 100,
    backgroundColor: colors.white_3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: correctSize(16),
    top: correctSize(16),
  },
  largeHeading: {
    fontSize: 24,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.white,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: correctSize(10),
  },
  iconContainer: {
    width: correctSize(80),
    height: correctSize(80),
    marginBottom: correctSize(16),
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: correctSize(24),
  },
  modal: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: colors.lightBlue_3,
    fontFamily: Fonts.Inter_Regular,
    textAlign: 'center',
  },
  title: {
    fontSize: 14,
    fontFamily: Fonts.InriaSerif_Bold,
    color: colors.darkgray_1,
    marginBottom: 5,
  },
  date: {
    fontFamily: Fonts.Inter_Regular,
    fontSize: 12,
    color: colors.gray_1,
  },
  jobIcon: {
    width: correctSize(48),
    height: correctSize(48),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray_1,
    marginRight: correctSize(12),
  },
});
