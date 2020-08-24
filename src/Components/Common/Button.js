//LIBRARIES
import React from 'react'
import { StyleSheet, Dimensions, View, TouchableOpacity, Text } from 'react-native'
//ASSETS
import { Matrics, Fonts, Colors } from '@Assets'
//CONSTANTS

const { width, height } = Dimensions.get('window')
export const Button = ({ onPress, title, simpleButtonStyle, color, buttonContainerStyle, }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={Styles.resetBtn}>
                <Text style={Styles.resetText}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create({ 
    resetBtn: {
        backgroundColor: Colors.BUTTON,
        height: Matrics.CountScale(50),
        borderRadius: Matrics.CountScale(3),
        margin: Matrics.CountScale(20),
        justifyContent: "center",
        alignItems: "center",
    },
    resetText: {
        alignSelf: "center",
        color: Colors.WHITE,
        fontWeight : "400",
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(20)
    },
})