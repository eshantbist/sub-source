// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, ScrollView, Dimensions, Text, TouchableOpacity } from 'react-native';

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import Header from './Header';

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
currentDate = '';
class FilterModal extends React.Component {
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
            <View>
                <Header
                    leftText={'Cancel'}
                    rightText={'Save'}
                    centerText={'Filter'}
                    onLeftPress={this.props.onLeftPress}
                    onRightPress={this.props.onRightPress}
                />
                <ScrollView style={{ flex: 1, margin: Matrics.CountScale(15) }}>
                    <View style={{ backgroundColor: Colors.WHITE, borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1 }}>
                        <Text style={{ justifyContent: 'flex-start' }} >W/E</Text>
                        <Text style={{ justifyContent: 'flex-end' }} >06/13/17</Text>
                    </View>
                    <View>
                        <Text>Role</Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default FilterModal
