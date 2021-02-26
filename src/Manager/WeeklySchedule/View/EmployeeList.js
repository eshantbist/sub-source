// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'

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
        employeeData: [],
        ShopName: '',
    };

    //------------>>>LifeCycle Methods------------->>>

    componentDidMount(){
        if (this.props.navigation.state.params) {
            const employeeData = this.props.navigation.state.params.employeeData;
            const ShopName = this.props.navigation.state.params.ShopName;
            console.log('employeeData-->',employeeData)
            this.setState({ employeeData, ShopName });
        }
    }


    //------------->>>Controllers/Functions------------>>>>

    renderItem = ({ item }) => {
        return (
            <View style={Styles.itemContainerStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                        item.ProfilePicture != '' ? 
                            <Image style={Styles.employeeImgStyle}  source={ item.ProfilePicture != '' ? { uri: item.ProfilePicture} : Images.UserIcon} />
                        :   <Icon name="user-circle" color="grey" size={40}  style={[Styles.employeeImgStyle,{marginLeft: Matrics.CountScale(5),}]} />
                    }
                    
                    <View>
                        <Text style={Styles.nameStyle}>{item.FullName}</Text>
                        <Text style={Styles.shopTextStyle}>Shop #{this.state.ShopName}</Text>
                    </View>
                </View>
                {
                    item.ShiftData.length > 0 &&
                    item.ShiftData.map((data, i) => {
                        return(
                            <View 
                                key={i}
                                style={{ flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Image source={Images.Calendar} />
                                <View>
                                    <Text style={Styles.timingStyle}>{moment(item.ScheduleDate).format('MMM DD, ddd')} {`${moment(data.InTime, "h:mm A").format('hh:mm a')} - ${moment(data.OutTime, "h:mm A").format('hh:mm a')}`}</Text>
                                </View>
                            </View>
                        )
                    })
                }
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
                    keyExtractor={(item,index) => index.toString()}
                    contentContainerStyle={{ flexGrow: 1, 
                        justifyContent: this.state.employeeData.length == 0 ? 'center' : 'flex-start', 
                    }}
                    ListEmptyComponent={() => (
                        <View>
                            <Text style={{ textAlign: 'center',fontFamily: Fonts.NunitoSansRegular, fontSize: Matrics.CountScale(20) }}>
                                No Data Found Please Try Again!!!
                            </Text>
                        </View>
                    )}
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
        borderRadius: Matrics.CountScale(20),
        margin: Matrics.CountScale(10),
    }

});

export default WeeklySchedule;
