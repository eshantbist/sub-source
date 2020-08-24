/* ====>>>>>>>>>>>  Libraires  <<<<<<<<<<========== */
import React from 'react'
import { View, Platform, TouchableOpacity, Image, Text } from 'react-native'

/* ====>>>>>>>>>>>  Assets  <<<<<<<<<<========== */
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'

/* ====>>>>>>>>>>>   Class Declaration   <<<<<<<<<<========== */
class Header extends React.Component {
    render() {
        return (
            <View style={MasterCssEmployee.headerContainer}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}
                    style={MasterCssEmployee.iconContainerStyle}>
                    <Image style={[{ height: Matrics.CountScale(20), width: Matrics.CountScale(10) }, MasterCssEmployee.iconStyle]} source={Images.EmpBackIcon}></Image>
                </TouchableOpacity>
                <View style={MasterCssEmployee.centerStyle}>
                    <Text style={MasterCssEmployee.centerTextStyle}>{this.props.titleText}</Text>
                </View>
                <View style={MasterCssEmployee.iconContainerStyle}>
                </View>
            </View>
        );
    }
}
export default Header