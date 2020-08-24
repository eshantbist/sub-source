// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
currentDate = '';
class DashboardHeader extends React.Component {
    state = {
        entries: ["A", "B", "C", "D"],
        activeSlide: 0,
        modalVisible: false,
        markedDates: {

        }
    }
    constructor(props) {
        super(props)
        this.currentDate = new Date;
    }

    // ======>>>>>>> Life Cycle Methods  <<<<<<<========

    // ==========>>>>> Render Method  <<<<<<<===========
    render() {
        return (
            <View style={[MasterCss.headerContainer,{ paddingBottom: Matrics.CountScale(10) }]}>

                {this.props.leftText ?
                    <TouchableOpacity style={MasterCss.headerTextContainerStyle} onPress={this.props.onLeftPress}>
                        <Text style={MasterCss.headerLeftTextStyle} >{this.props.leftText}</Text>
                    </TouchableOpacity> : <View style={MasterCss.headerTextContainerStyle} />}

                <View style={MasterCss.centerStyle}>
                    <TouchableOpacity onPress={this.props.onLeftPress}>
                        <Text style={MasterCss.centerTextStyle}>{this.props.centerText}</Text>
                    </TouchableOpacity>
                </View>


                <View style={MasterCss.headerTextIconStyle}>
                    <TouchableOpacity onPress={this.props.onRightPress}>
                        <Image style={MasterCss.basicIconStyle} source={this.props.rightImage}></Image>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}
export default DashboardHeader
