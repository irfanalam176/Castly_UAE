import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { correctSize } from ".";

export const GlobalStyles = StyleSheet.create({
    body:{
        // flex:1,
        paddingHorizontal:correctSize(24)
    },
    asteric:{ color: colors.red }
})