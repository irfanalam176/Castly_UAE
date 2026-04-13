import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CalendarIcon from '../../assets/svg/common/CalendarIcon'
import MapPin from '../../assets/svg/common/MapPin'
import ClockIcon from '../../assets/svg/Home/ClockIcon'
import { Fonts } from '../../assets/fonts'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'

type Perk = {
  label: string
}

type BookingCardProps = {
  title: string
  brandName: string
  jobCategory?: string
  rateLabel: string
  startDate: string
  endDate: string
  location: string
  shootDays: number
  totalPay?: number
  netPay?: number
}

const formatDateRange = (start: string, end: string) => {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const startStr = startDate.toLocaleDateString('en-US', options)
  const endStr = endDate.toLocaleDateString('en-US', { ...options, year: 'numeric' })
  return `${startStr}–${endStr}`
}

const CommonBookingCard = ({
  title,
  brandName,
  jobCategory,
  rateLabel,
  startDate,
  endDate,
  location,
  shootDays,
}: BookingCardProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftContainer}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.company}>
            {brandName}
            {jobCategory ? ` · ${jobCategory}` : ''}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.heading}>{rateLabel.split('/')[0]}</Text>
          <Text style={styles.rateType}>
            {rateLabel.includes('/') ? `per ${rateLabel.split('/')[1]}` : ''}
          </Text>
        </View>
      </View>

      {/* Meta info */}
      <View>
        <View style={styles.row}>
          <CalendarIcon width={12} height={12} color={colors.gray_3} />
          <Text style={styles.listItem}>{formatDateRange(startDate, endDate)}</Text>
        </View>
        <View style={styles.row}>
          <MapPin width={12} height={12} color={colors.gray_3} />
          <Text style={styles.listItem}>{location}</Text>
        </View>
        <View style={styles.row}>
          <ClockIcon width={12} height={12} color={colors.gray_3} />
          <Text style={styles.listItem}>
            {shootDays} {shootDays === 1 ? 'shoot day' : 'shoot days'}
          </Text>
        </View>
      </View>

    </View>
  )
}

export default CommonBookingCard

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: correctSize(16),
    borderWidth:1,
    borderColor:colors.white_1
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: correctSize(5),
  },
  heading: {
    fontSize: 14,
    fontFamily: Fonts.Inter_Bold,
    color: colors.darkgray_1,
    lineHeight: correctSize(20),
  },
  company: {
    color: colors.gray_3,
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  rateType: {
    color: colors.gray_3,
    fontSize: 10,
    fontFamily: Fonts.Inter_Regular,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: correctSize(8),
    marginTop: correctSize(8),
  },
  listItem: {
    fontSize: 12,
    fontFamily: Fonts.Inter_Regular,
    color: colors.darkgray,
  },
  leftContainer: {
    width: '60%',
  }
})