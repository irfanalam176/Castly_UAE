import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Icons from '../vectorIcons/Icons';
import { colors } from '../../utils/colors';
import { correctSize } from '../../utils';
import { Fonts } from '../../assets/fonts';
import { SlideLeftFade } from '../Animation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ROUTES } from '../../services/routes';
import { imageUrlFormate } from '../../utils/imageUrlFormate';

interface ApplicationHeaderCardProps {
  item: any;
  onBookmark: () => void;
  navigation: any;
  onShare?: () => void;
}

const ApplicationHeaderCard = ({
  item,
  onBookmark,
  navigation,
  onShare,
}: ApplicationHeaderCardProps) => {
  
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.coverContainer}>
        <FastImage
          source={{ uri: imageUrlFormate(item?.coverImageUrl)}}
          style={styles.jobImage}
        />
        <View style={styles.overlay} />
      </View>
      <View style={StyleSheet.absoluteFill}>
        <SlideLeftFade
          delay={150}
          style={[styles.content, { paddingTop: insets.top + correctSize(8) }]}
        >
          <View style={styles.tagsContainer}>
            {/* Tags Row */}
            <View style={styles.rightBtn}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={[
                  styles.bookmarkButton,
                  {
                    backgroundColor: colors.white_rgb4,
                  },
                ]}
              >
                <Icons
                  family="Ionicons"
                  name="arrow-back-outline"
                  size={20}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rightBtn}>
              <TouchableOpacity
                onPress={onShare}
                style={[
                  styles.bookmarkButton,
                  {
                    backgroundColor: colors.white_rgb4,
                  },
                ]}
              >
                <Icons
                  family="Ionicons"
                  name="share-social"
                  size={15}
                  color={colors.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  onBookmark && onBookmark();
                  setIsBookmarked(!isBookmarked);
                }}
                style={[
                  styles.bookmarkButton,
                  {
                    backgroundColor: isBookmarked
                      ? colors.lightBlue_2
                      : colors.white_rgb4,
                  },
                ]}
              >
                <Icons
                  family="Ionicons"
                  name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
                  size={15}
                  color={isBookmarked ? colors.gray_1 : colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.header}>
            <View style={styles.tagsRow}>
              {/* {item.matchScore && ( */}
              <View style={[styles.tag, { backgroundColor: colors.primary }]}>
                <Text style={styles.matchScoreText}>
                  {item?.matchPct || '0'}% Match
                </Text>
              </View>
              {/* )} */}
              {/* {item.isVerified && ( */}
              {item?.status == 'ACTIVE'?(
                <View
                  style={[styles.tag, { backgroundColor: colors.green_rgb }]}
                >
                  <Text style={styles.tagText}>Open</Text>
                </View>
              ):(
                <View
                  style={[styles.tag, { backgroundColor: colors.red }]}
                >
                  <Text style={styles.tagText}>Closed</Text>
                </View>
              )
            }
              {/* )} */}

              {/* <View
                style={[
                  styles.tag,
                  {
                    backgroundColor: colors.white_rgb4,
                    borderWidth: 1,
                    borderColor: colors.white_7,
                  },
                ]}
              >
                <Text style={styles.tagText}>Photo Shoot</Text>
              </View> */}
              {item?.tag && (
                <View
                  style={[
                    styles.tag,
                    {
                      backgroundColor:
                        item?.tag === 'Premium'
                          ? colors.lightBlue_9
                          : colors.light_orange,
                    },
                  ]}
                >
                  <Icons
                    family={
                      item?.tag === 'Premium'
                        ? 'MaterialCommunityIcons'
                        : 'MaterialIcons'
                    }
                    name={item?.tag === 'Premium' ? 'trophy' : 'access-time'}
                    size={14}
                    color={
                      item?.tag === 'Premium' ? colors.blue_6 : colors.red_2
                    }
                  />
                  <Text
                    style={
                      item?.tag === 'Premium'
                        ? styles.premiumTagText
                        : styles.urgentTagText
                    }
                  >
                    {' '}
                    {item?.tag}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.jobTitle}>{item?.title}</Text>
          </View>
        </SlideLeftFade>
      </View>
    </View>
  );
};

export default ApplicationHeaderCard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: correctSize(16),
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  tagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bookmarkButton: {
    width: correctSize(35),
    height: correctSize(35),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.white_7,
    // padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: correctSize(8),
    marginBottom: correctSize(16),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: correctSize(10),
    paddingVertical: correctSize(4),
    borderRadius: 50,
  },
  tagText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 11,
    color: colors.white,
  },
  premiumTagText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: '#0284C7',
  },
  urgentTagText: {
    fontFamily: Fonts.Inter_SemiBold,
    fontSize: 12,
    color: '#C2410C',
  },
  matchScoreText: {
    fontFamily: Fonts.Inter_Bold,
    fontSize: 11,
    color: colors.black,
  },
  header: {},
  jobTitle: {
    fontFamily: Fonts.InriaSerif_Bold,
    fontSize: 20,
    color: colors.white,
  },
  jobImage: {
    // ...StyleSheet.absoluteFill,
    height: correctSize(265),
    width: '100%',
  },
  rightBtn: {
    flexDirection: 'row',
    gap: 8,
  },
  coverContainer: {
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: '100%',
    height: '100%',
  },
});
