// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
currentDate = '';
class Header extends React.Component {
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
            this.props.leftText && this.props.rightText ?
                <View style={MasterCss.headerContainer}>
                    <TouchableOpacity style={MasterCss.headerTextContainerStyle} onPress={this.props.onLeftPress}>
                        <Text style={MasterCss.headerLeftTextStyle} >{this.props.leftText}</Text>
                    </TouchableOpacity>
                    <View style={MasterCss.centerStyle}>

                        <Text style={MasterCss.centerTextStyle}>{this.props.centerText}</Text>

                    </View>
                    <TouchableOpacity style={MasterCss.headerTextContainerStyle} onPress={this.props.onRightPress}>
                        <Text style={MasterCss.headerRightTextStyle} >{this.props.rightText}</Text>
                    </TouchableOpacity>
                </View>
                :
                (this.props.headerIcon ?
                    <View style={MasterCss.headerContainer}>
                        <View style={MasterCss.iconContainerStyle} ></View>
                        <View style={MasterCss.centerStyle}>
                            <Text style={MasterCss.centerTextStyle}>{this.props.centerText}</Text>
                        </View>
                        <View style={MasterCss.iconContainerStyle} >
                            {this.props.rightImage ?
                                <TouchableOpacity onPress={this.props.onLeftPress}>
                                    <Image style={[MasterCss.headerIconStyle, MasterCss.basicIconStyle, { alignSelf: 'flex-end' }]} source={this.props.rightImage} />
                                </TouchableOpacity> : null}
                        </View>
                    </View> : null)
            // <View style={MasterCss.headerContainer}>
            //     <View style={MasterCss.leftStyle}>
            //         {this.props.leftText != '' &&
            //             <TouchableOpacity onPress={this.props.onLeftPress}>
            //                 <Text style={MasterCss.leftTextStyle} >{this.props.leftText}</Text>
            //             </TouchableOpacity>
            //         }
            //         {this.props.leftText == '' || this.props.leftText == undefined &&
            //             < TouchableOpacity onPress={this.props.onLeftPress}>
            //                 <Image style={this.props.leftImageStyle} source={this.props.leftImage}></Image>
            //             </TouchableOpacity>
            //         }
            //     </View>
            //     <View style={MasterCss.centerStyle}>
            //         <Text style={MasterCss.centerTextStyle}>{this.props.centerText}</Text>
            //     </View>
            //     <View style={MasterCss.rightStyle}>
            //         {this.props.rightText != '' &&
            //             <TouchableOpacity onPress={this.props.onRightPress}>
            //                 <Text style={MasterCss.rightTextStyle}>{this.props.rightText}</Text>
            //             </TouchableOpacity>
            //         }
            //         {this.props.rightText == '' || this.props.rightText == undefined &&
            //             < TouchableOpacity onPress={this.props.onRightPress}>
            //                 <Image style={this.props.rightImageStyle} source={this.props.rightImage}></Image>
            //             </TouchableOpacity>
            //         }
            //     </View>
            // </View>
        )
    }
}
export default Header
