// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

                {/* {this.props.leftText ?
                    <TouchableOpacity style={MasterCss.headerTextContainerStyle} onPress={this.props.onLeftPress}>
                        <Text style={MasterCss.headerLeftTextStyle} >{this.props.leftText}</Text>
                    </TouchableOpacity> : <View style={MasterCss.headerTextContainerStyle} />} */}
                <TouchableOpacity  style={MasterCss.headerTextContainerStyle} onPress={this.props.onLeftPress} >
                    {/* <Image 
                        source={Images.ProfileIconPlaceholder}
                        style={{ 
                            heigh: Matrics.CountScale(30),
                            width: Matrics.CountScale(50),
                            resizeMode: 'center',
                            marginLeft: Matrics.CountScale(10)
                        }}
                    /> */}
                    <Icon name="user-circle-o" size={30} color='#7C8786' style={{ marginLeft: Matrics.CountScale(30)}} />
                </TouchableOpacity>
                <View style={MasterCss.centerStyle}>
                    <Text style={MasterCss.centerTextStyle}>{this.props.centerText}</Text>
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
