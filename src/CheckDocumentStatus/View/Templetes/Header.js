// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from '../../../Resources/react-native-material-dropdown'

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
currentDate = '';
class CheckDocumentStatusHeader extends React.Component {

    // ==========>>>>> Render Method  <<<<<<<===========
    render() {
        let data = [{
            value: 'Shop 457',
        }, {
            value: 'Shop 22421',
        },
        {
            value: 'Shop 22421',
        }
        ];
        return (

            <View style={{ flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, fontFamily: Fonts.NunitoSansRegular }}>Hire Packets</Text>
                <Dropdown
                    containerStyle={{ justifyContent: 'center' }}
                    pickerStyle={{ top: Matrics.headerHeight }}
                    data={data}
                    value={'Shop 457'}
                    inputContainerStyle={{ borderBottomColor: 'transparent', }}
                    overlayStyle={{ borderWidth: 2 }}
                    dropdownOffset={{ left: -100 }}
                    // dropdownPosition={5}
                    fontSize={17}
                    itemCount={8}
                    rippleColor='white'
                    rippleCentered={true}
                    onChangeText={(val) => {
                        console.log(val, "selected");
                    }} />
            </View>

            /* <View style={MasterCss.leftStyle}>
                {this.props.leftText != '' &&
                    <TouchableOpacity onPress={this.props.onLeftPress}>
                        <Text style={MasterCss.leftTextStyle} >{this.props.leftText}</Text>
                    </TouchableOpacity>
                }
                {this.props.leftText == '' || this.props.leftText == undefined &&
                    < TouchableOpacity >
                        <Image style={this.props.leftImageStyle} source={this.props.leftImage}></Image>
                    </TouchableOpacity>
                }
            </View> */
            
            /* <View style={MasterCss.rightStyle}>
                {this.props.rightText != '' &&
                    <TouchableOpacity onPress={this.props.onRightPress}>
                        <Text style={MasterCss.rightTextStyle}>{this.props.rightText}</Text>
                    </TouchableOpacity>
                }
                {this.props.rightText == '' || this.props.rightText == undefined &&
                    < TouchableOpacity onPress={this.props.onRightPress}>
                        <Image style={this.props.rightImageStyle} source={this.props.rightImage}></Image>
                    </TouchableOpacity>
                }
            </View> */

        )
    }
}
export default CheckDocumentStatusHeader
