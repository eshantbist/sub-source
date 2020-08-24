// =======>>>>>> Libraries  <<<<<<========
import React from 'react';
import Swipeout from 'react-native-swipeout';
import { View, Image, Text, TouchableOpacity } from 'react-native';

/* =======>>>>>> Assets  <<<<<<======== */
import { Colors, Fonts, Matrics, Images } from '@Assets'


// export const SwapOfferCard = ({ onAcceptPress, onDeclinePress, disable, close, onOpen, status, onPress, name, shopNo, img, scheduleDate, shiftTime }) => {
//     console.log(close)
//     let pending_status = 'Employee Approval Pending';
//     let appoved_by_employee = 'Approved by Employee';
//     let manager_approval_pending = 'Manager Approval Pending';
//     let approved_by_manager = 'Approved by Manager';
//     let disapproved_by_employee = 'Disapproved By Employee';
//     let disapproved_by_manager = 'Disapproved By Manager';

//     var swipeoutBtns = [
//         {
//             backgroundColor: 'transparent',
//             component: <View
//                 style={{
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     top: Matrics.CountScale(25),
//                     flexDirection: 'row',
//                     // backgroundColor: 'red',
//                 }}
//             >
//                 <TouchableOpacity onPress={onAcceptPress}>
//                     <Image style={[Styles.acceptImg, { height: 55, width: 100, borderRadius: 5 }]} source={Images.AcceptImg}></Image>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={onDeclinePress}>
//                     <Image source={Images.DeclineImg} style={[Styles.acceptImg, { height: 55, width: 100, borderRadius: 5 }]} ></Image>
//                 </TouchableOpacity>
//             </View>
//         }
//     ]
//     return (
//         <Swipeout
//             autoClose={true}
//             close={close}
//             onOpen={onOpen}
//             buttonWidth={230} right={swipeoutBtns}
//             disabled={status != pending_status || disable}
//             backgroundColor={'transparent'}>
//             <TouchableOpacity onPress={onPress}>
//                 <View style={Styles.swapOfferCard}>
//                     <View style={Styles.cardContainer1}>
//                         <View style={{ flex: 0.2 }}>
//                             <Image style={Styles.profileImgStyle}
//                                 source={{ uri: img }} ></Image>
//                         </View>
//                         <View style={Styles.nameContainerStyle}>
//                             <View style={{ flex: 1, flexDirection: 'row' }}>
//                                 <Text style={Styles.nameTextStyle} >
//                                     {name}
//                                 </Text>
//                                 {status != pending_status ?
//                                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                                         <Image style={Styles.processingImg} source={Images.ProcessingDotIcon}></Image>
//                                         <Text style={Styles.processignTextStyle}>
//                                             Processing
//                             </Text>
//                                     </View>
//                                     : null}
//                             </View>
//                             <Text style={Styles.shopNameTextStyle} >
//                                 Shop #{shopNo}
//                             </Text>
//                         </View>
//                     </View>
//                     <View style={{ flex: 1, flexDirection: 'row' }}>
//                         <Image style={Styles.storeIcon} source={Images.StoreGrey}></Image>
//                         <Text style={Styles.dateTextStyle}>
//                             {scheduleDate} {shiftTime}
//                         </Text>
//                     </View>
//                 </View >
//             </TouchableOpacity>
//         </Swipeout >
//     )
// }


/* =======>>>>>> Class Declaration <<<<<<======== */
class SwapOfferCard extends React.Component {


    render() {

        let pending_status = 'Employee Approval Pending';
        let appoved_by_employee = 'Approved by Employee';
        let manager_approval_pending = 'Manager Approval Pending';
        let approved_by_manager = 'Approved by Manager';
        let disapproved_by_employee = 'Disapproved By Employee';
        let disapproved_by_manager = 'Disapproved By Manager';


        /* =======>>>>>> Swipe Button View  <<<<<<======== */
        var swipeoutBtns = [
            {
                backgroundColor: 'transparent',
                component: <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: Matrics.CountScale(25),
                        // flexDirection: 'row',
                        // backgroundColor: 'red',
                    }}
                >

                    <Image style={[Styles.acceptImg, { height: 55, width: 100, borderRadius: 5 }]} source={Images.AcceptImg}></Image>

                </View>,
                onPress: this.props.onAcceptPress
            },
            {
                backgroundColor: 'transparent',
                component: <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: Matrics.CountScale(25),
                        // flexDirection: 'row',
                        // backgroundColor: 'red',
                    }}
                >
                    {/* <TouchableOpacity onPress={this.props.onAcceptPress}>
                        <Image style={[Styles.acceptImg, { height: 55, width: 100, borderRadius: 5 }]} source={Images.AcceptImg}></Image>
                    </TouchableOpacity> */}

                    <Image source={Images.DeclineImg} style={[Styles.acceptImg, { height: 55, width: 100, borderRadius: 5 }]} ></Image>

                </View>,
                onPress: this.props.onDeclinePress
            }
        ]

        return (
            <Swipeout
                autoClose={true}
                close={this.props.close}
                onOpen={this.props.onOpen}
                scroll={this.props.scroll}
                openRight={this.props.openOnPress}
                buttonWidth={110} right={swipeoutBtns}
                disabled={this.props.status != pending_status || this.props.disable}
                backgroundColor={'transparent'}>
                <TouchableOpacity disabled={this.props.disable} onPress={this.props.onPress}>
                    <View style={Styles.swapOfferCard}>
                        <View style={Styles.cardContainer1}>
                            <View style={{ flex: 0.2 }}>
                                <Image style={Styles.profileImgStyle}
                                    source={{ uri: this.props.img }} ></Image>
                            </View>
                            <View style={Styles.nameContainerStyle}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Text style={Styles.nameTextStyle} >
                                        {this.props.name}
                                    </Text>
                                    {this.props.status != pending_status ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={Styles.processingImg} source={Images.ProcessingDotIcon}></Image>
                                            <Text style={Styles.processignTextStyle}>
                                                Processing
                                            </Text>
                                        </View>
                                        : null}
                                </View>
                                <Text style={Styles.shopNameTextStyle} >
                                    Shop #{this.props.shopNo}
                                </Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image style={Styles.storeIcon} source={Images.StoreGrey}></Image>
                            <Text style={Styles.dateTextStyle}>
                                {this.props.scheduleDate} {this.props.shiftTime}
                            </Text>
                        </View>
                    </View >
                </TouchableOpacity>
            </Swipeout >
        );
    }
}




/* =======>>>>>> StyleSheet <<<<<<<======= */
const Styles = {
    swapOfferCard: {
        marginTop: Matrics.CountScale(8),
        marginBottom: 0,
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: 'white',
    },
    profileImgStyle: {
        margin: Matrics.CountScale(10),
        alignSelf: 'flex-start',
        borderRadius: Matrics.CountScale(18),
        height: Matrics.CountScale(35),
        width: Matrics.CountScale(35)
    },
    nameTextStyle: {
        flex: 1,
        justifyContent: 'center',
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansSemiRegular,
        fontWeight: '300',
        lineHeight: 20
    },
    processingImg: {
        height: Matrics.CountScale(7),
        width: Matrics.CountScale(7),
        alignItems: 'center',
        marginLeft: Matrics.CountScale(1),
        marginRight: Matrics.CountScale(5)
    },
    shopNameTextStyle: {
        flex: 1,
        justifyContent: 'center',
        color: 'grey',
        fontSize: Matrics.CountScale(12),
        fontFamily: Fonts.NunitoSansRegular
    },
    storeIcon: {
        height: Matrics.CountScale(15),
        width: Matrics.CountScale(13),
        alignItems: 'center',
        marginLeft: Matrics.CountScale(15),
        marginRight: Matrics.CountScale(15)
    },
    acceptImg: {
        marginLeft: Matrics.CountScale(5),
        // marginRight: Matrics.CountScale(10),
        // height: 75,
        // width: 75
    },
    cardContainer1: {
        flex: 1,
        flexDirection: 'row'
    },
    nameContainerStyle: {
        flex: 1,
        paddingTop: Matrics.CountScale(10),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    processignTextStyle: {
        fontSize: Matrics.CountScale(12), color: 'grey'
    },
    dateTextStyle: {
        flex: 1,
        fontSize: Matrics.CountScale(14),
        fontWeight: '200',
        fontFamily: Fonts.NunitoSansSemiRegular
    }
}
export default SwapOfferCard;