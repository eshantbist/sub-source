// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation';
import moment from 'moment';

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { Dropdown } from 'react-native-material-dropdown'
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
class Card extends React.Component {
    state = {
    }
    // ==========>>>>> Render Method  <<<<<<<===========
    render() {
        var swipeoutBtns = [
            {
                backgroundColor: 'transparent',
                onPress: (val) => {
                },
                component: <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1, flexDirection: 'row',
                        // backgroundColor:'red'
                        top: Matrics.CountScale(3)
                    }}>
                    <TouchableOpacity
                        onPress={() => this.props.onVoidPress(this.props.item)}
                        disabled={this.props.item.DisplayStatusName == 'Hiring Packet in process' ? false : true}
                    >
                        <Image style={Styles.coverImgStyle} source={Images.VoidPacketIcon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={this.props.onResendPress}
                        disabled={this.props.item.DisplayStatusName == 'Employee Created' ? false : true}
                    >
                        <Image style={Styles.swapImgStyle} source={Images.ResendIcon}></Image>
                    </TouchableOpacity>
                </View >
            }
        ]
        const DateArr = this.props.item.CreatedOn.split('T');
        const CDate = moment(DateArr[0]).format('MM-DD-YYYY');
        const Time = moment(DateArr[1], "h:mm A").format('hh:mm a');
        return (
            <Swipeout autoClose={true} buttonWidth={Matrics.CountScale(250)} right={swipeoutBtns} disabled={this.state.changeClass} backgroundColor={'transparent'}>
                <TouchableOpacity onPress={() => {
                    console.log(this.props);
                    const setParamsAction = NavigationActions.setParams({
                        params: { tabBarVisible: false },
                        key: 'CheckDocumentStatus',
                    });
                    this.props.navigation.dispatch(setParamsAction)
                    this.props.navigation.navigate('DocumentDetails', {
                    data: this.props.item, recipientsListArr: this.props.recipientsListArr, HiringData: this.props.HiringData, isEditable: this.props.item.StatusName == 'completed' ? false : true,
                    });
                }}>
                    <View style={Styles.cardContainer}>
                        <View style={Styles.cardPart1}>
                            <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
                                <Text style={Styles.nameTextStyle}>
                                    {this.props.item.FirstName} {this.props.item.LastName}
                                </Text>
                                <Text style={[Styles.sendStatusText, this.props.item.StatusName == 'completed' ? { color: Colors.APPCOLOR } : { color: Colors.RED }]}>
                                    {this.props.item.DisplayStatusName ? `Send To ${this.props.item.DisplayStatusName}` : null}
                                </Text>
                            </View>
                            <View style={{ alignSelf: 'flex-start', alignItems: 'flex-end', flex: 0.5 }}>
                                <Text style={Styles.shopNameTextStyle}>
                                    {this.props.item.DisplayStoreNumber ? `Shop #${this.props.item.DisplayStoreNumber}`: null}
                                </Text>
                            </View>
                        </View>

                        <View style={Styles.cardPart2}>
                            <Text style={Styles.sentByStatusTextStyle}>{this.props.item.SentBy ? `SentBy ${this.props.item.SentBy}`: null} {CDate}@{Time}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeout>
        )
    }
}
export default Card
// ======>>>>>>> StyleSheet for Card <<<<<<=========
const Styles = {
    cardContainer: {
        flex: 1,
        margin: Matrics.CountScale(10),
        padding: Matrics.CountScale(12),
        borderRadius: Matrics.CountScale(5),
        backgroundColor: Colors.WHITE
    },
    cardPart1: {
        flexDirection: 'row',
        paddingTop: Matrics.CountScale(10),
        paddingBottom: Matrics.CountScale(10),
    },
    nameTextStyle: {
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular
    },
    shopNameTextStyle: {
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansRegular
    },
    sendStatusText: {
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansRegular
    },
    cardPart2: {
        borderTopWidth: 1,
        borderTopColor: Colors.LIGHTGREY
    },
    sentByStatusTextStyle: {
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        paddingTop: Matrics.CountScale(10),
    },
    coverImgStyle: {
        alignSelf: 'center',
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(115),
        height: Matrics.CountScale(65),
        borderRadius: Matrics.CountScale(5)
    },
    swapImgStyle: {
        alignSelf: 'center',
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(115),
        height: Matrics.CountScale(65),
        borderRadius: Matrics.CountScale(5)
    },
}
