import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'
import { correctSize } from '../../utils'
import { Fonts } from '../../assets/fonts'

interface TransactionSummaryTableProps{
    amount?:string,
    status?:string
}
const TransactionSummaryTable = ({amount,status}:TransactionSummaryTableProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Transaction Summary</Text>

   

        <View style={styles.row}>
            <Text style={styles.label}>Withdrawal Amount</Text>
            <Text style={styles.value}>AED {amount}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.label}>Processing Fee</Text>
            <Text style={[styles.value,{color:colors.green}]}>{status}</Text>
        </View>

    <View style={styles.footer}>
        <Text style={styles.footerLabel}>Total Amount</Text>
        <Text style={styles.total}>{amount}</Text>
    </View>
    </View>
  )
}

export default TransactionSummaryTable
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        borderRadius:16,
        borderWidth:1,
        borderColor:colors.gray,
        padding:correctSize(21),
        marginVertical:correctSize(24)
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:correctSize(12)
    },
    label:{
        fontSize:14,
        fontFamily:Fonts.Inter_Regular,
        color:colors.gray_1
    },
    value:{
        fontFamily:Fonts.Inter_SemiBold,
        fontSize:14,
        color:colors.darkgray_1
    },
    heading:{
        fontSize:14,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.darkgray_1,
        marginBottom:correctSize(16)
    },
    footer:{
        borderTopWidth:1,
        borderTopColor:colors.gray,
        paddingTop:correctSize(16),
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    footerLabel:{
        fontSize:16,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.darkgray_1,
    },
    total:{
        fontSize:18,
        fontFamily:Fonts.InriaSerif_Bold,
        color:colors.gray_1,
    }

})