// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Images, Matrics, MasterCss } from '@Assets'


// ======>>>>> Class Declaration <<<<<=========
class WeeklySchedule extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Employees',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerRight:
            <View />,
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                <Image source={Images.BackIcon} style={MasterCss.headerIconStyle} />
            </TouchableOpacity>,
    })


    //--------->>>State Initilization----------->>>
    state = {
        employeeData: [1, 2, 3]
    };

    //------------>>>LifeCycle Methods------------->>>

    UNSAFE_componentWillMount() {
    }


    componentWillUnmount() { }


    //------------->>>Controllers/Functions------------>>>>

    renderItem = ({ item }) => {
        return (
            <View style={Styles.itemContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={Styles.employeeImgStyle} />
                    <View>
                        <Text style={Styles.nameStyle}>Martha Bryan</Text>
                        <Text style={Styles.shopTextStyle}>Shop #11245</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={Images.Calendar} />
                    <Text style={Styles.timingStyle}>Mar 30, Sat 10.00pm - 12.00pm</Text>
                </View>
            </View>
        )
    }

    //----------->>>Render Method-------------->>>

    render() {
        return (
            <View style={{ flex: 1, paddingVertical: Matrics.CountScale(5) }}>
                <FlatList
                    data={this.state.employeeData}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    itemContainerStyle: {
        backgroundColor: 'white', borderRadius: Matrics.CountScale(5),
        marginVertical: Matrics.CountScale(5), marginHorizontal: Matrics.CountScale(10),
        padding: Matrics.CountScale(10)
    },
    nameStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        marginVertical: Matrics.CountScale(5)
    },
    shopTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        fontSize: Matrics.CountScale(12)
    },
    timingStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(10)
    },
    employeeImgStyle: {
        height: Matrics.CountScale(40),
        width: Matrics.CountScale(40),
        backgroundColor: 'grey',
        borderRadius: Matrics.CountScale(20),
        margin: Matrics.CountScale(10),
    }

});

export default WeeklySchedule;
