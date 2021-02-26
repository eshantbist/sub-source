// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'

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
                    selectedTextStyle={{ textAlign: 'center'}}
                    onChangeText={(val) => {
                        console.log(val, "selected");
                    }} />
            </View>
        )
    }
}
export default CheckDocumentStatusHeader
