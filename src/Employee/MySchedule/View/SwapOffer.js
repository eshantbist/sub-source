// =====>>>>>>>>> Libraries <<<<<<<<========
import React from 'react';
import { View, StyleSheet, Image, Modal, FlatList, TouchableHighlight, TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import _ from 'lodash'

// =====>>>>>>>>> Assets <<<<<<<<========
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { LoadWheel, CustomModal } from "@Components";
import SwapOfferCard from './SwapOfferCard';
import Global from '../../../GlobalFunction';

import {
    getPendingSwapRequestDetailsRequest, acceptSwapRequest, declineSwapRequest, deleteEmployeeOpenShiftRequest
} from '@Redux/Actions/MyScheduleActions'

// =====>>>>>>>>> Class Declaration<<<<<<<<========
class SwapOfferDetails extends React.Component {
    state = {
        modalVisible: false,
        offerRequestDetails: [],
        loading: true,
        msgModal: false,
        msg: '',
        disable: false,
    }
    // =====>>>>>>>>> Toggle Function for Modal <<<<<<<<========
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }

    getSwapRequestDetail() {
        this.setState({ loading: true })
        this.props.getPendingSwapRequestDetailsRequest({
            DailyScheduleID: this.props.navigation.state.params.itemData.DailyScheduleID
        })
    }

    componentDidMount() {
        console.log(this.props.navigation.state.params.itemData)
        this.getSwapRequestDetail()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('***swap offer***')
        console.log(nextProps.mySchedule)
        if (nextProps.mySchedule.getPendingSwapRequestDetailsSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data

            if (response.Status == 1) {
                this.setState({ offerRequestDetails: response.Data })
                if (response.Data.length > 1) {
                    let tmp = []
                    tmp = _.filter(response.Data, function (res) { return res.ShiftRequestStatusTypeName == 'Employee Approval Pending' })
                    // console.log(tmp)
                    // console.log(tmp.length, response.Data.length)
                    if (tmp && tmp.length != response.Data.length) {
                        this.setState({ disable: true })
                    }
                }
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.acceptSwapShiftRequestSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data

            if (response.Status == 1) {
                console.log(response)
                this.getSwapRequestDetail()
                this.setState({ msg: 'Offer is successfully accepted', msgModal: true })
                //setTimeout(() => { alert('Offer is successfully accepted') }, Global.alert_timeout)
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.declineSwapShiftRequestSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data

            if (response.Status == 1) {
                console.log(response)
                this.getSwapRequestDetail()
                this.setState({ msg: 'Offer is successfully declined', msgModal: true })
                //setTimeout(() => { alert('Offer is successfully declined') }, Global.alert_timeout)
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.deleteEmployeeOpenShiftSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data

            if (response.Status == 1) {
                this.props.navigation.state.params.getMyScheduleData()
                this.props.navigation.navigate('MySchedule')
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.getPendingSwapRequestDetailsFail || nextProps.mySchedule.acceptSwapShiftRequestFail || nextProps.mySchedule.declineSwapShiftRequestFail || nextProps.mySchedule.deleteEmployeeOpenShiftFail) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true })
        }
    }

    cancelEmployeeOpenShift() {
        this.setState({ modalVisible: false, loading: true })
        this.props.deleteEmployeeOpenShiftRequest({ EmployeeRequestID: this.props.navigation.state.params.itemData.RequestID })
    }


    // =====>>>>>>>>> Render Method <<<<<<<<========
    render() {
        const offerDetails = this.props.navigation.state.params.itemData

        return (
            <View style={Styles.pageBody}>

                {/* =====>>>>>>>>> Modal Start <<<<<<<<======== */}
                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTextStyle} >
                            If you cancel open shift all the received offers will be declined.
                        </Text>
                        <View style={{ marginVertical: Matrics.CountScale(15) }}>
                            <TouchableOpacity onPress={() => {
                                this.cancelEmployeeOpenShift()
                            }} style={styles.cancelOpenShiftButtonStyle} >
                                <Text style={styles.cancelShiftTextStyle} >
                                    Cancel Open Shift
                             </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this.setState({ modalVisible: false })
                            }} style={styles.cancelButtonStyle} >
                                <Text style={styles.cancelButtonTextStyle} >
                                    Cancel
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                {/* =====>>>>>>>>> Modal End <<<<<<<<======== */}


                {/* =====>>>>>>>>> Header Start <<<<<<<<======== */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity onPress={() => {
                        // const setParamsAction = this.props.navigation.setParams({
                        //     params: { tabBarVisible: true },
                        //     key: 'MySchedule',
                        // });
                        // this.props.navigation.dispatch(setParamsAction)
                        this.props.navigation.navigate('MySchedule', { changeData: true });
                    }}
                        style={MasterCssEmployee.iconContainerStyle}>
                        <Image style={[MasterCssEmployee.iconStyle, { height: Matrics.CountScale(20), width: Matrics.CountScale(10) }]} source={Images.EmpBackIcon}></Image>
                    </TouchableOpacity>

                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle}>Swap Offers</Text>
                    </View>

                    <TouchableOpacity onPress={() => { this.toggleModal(true) }} style={MasterCssEmployee.iconContainerStyle}>
                        <Image style={[MasterCssEmployee.iconStyle, Styles.rightImgStyle]} source={Images.CancelOpenShiftHeaderIcon}></Image>
                    </TouchableOpacity>
                </View>
                {/* =====>>>>>>>>> Header End <<<<<<<<======== */}

                <View style={{ flex: 1, padding: Matrics.CountScale(10) }}>

                    {/* =====>>>>>>>>>  My Shift Card <<<<<<<<======== */}
                    <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                        <Text style={Styles.CardHeader}>My Shift</Text>
                        <View style={Styles.Card}>
                            <View style={Styles.cardPartStyle1}>
                                <View>
                                    <Text style={Styles.monthTextStyle}>
                                        {Global.getMonthValue(offerDetails.ScheduleDate).substring(0, 3)}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={Styles.dateTextStyle}>
                                        {Global.getDateFromDate(offerDetails.ScheduleDate)}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={Styles.dayTextStyle}>
                                        <Text>{Global.getDayValue(offerDetails.ScheduleDate)}</Text>
                                    </Text>
                                </View>
                            </View>
                            <View style={Styles.cardPartStyle2}>
                                <View>
                                    <Text style={Styles.timeTextStyle}>
                                        {`${Global.getTime24to12(offerDetails.InTime)} - ${Global.getTime24to12(offerDetails.OutTime)}`}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={Styles.shopTextStyle}>
                                        Shop #{offerDetails.StoreNumber}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={Styles.swapOfferTextStyle}>
                                        {offerDetails.RequestCount} swap Offers
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: Colors.GREY, paddingTop: Matrics.CountScale(10), fontFamily: Fonts.NunitoSansRegular, fontSize: Matrics.CountScale(13) }}>Offers</Text>
                    </View>
                    <FlatList
                        data={this.state.offerRequestDetails}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={this.renderSwapRequests}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={this.state.scrollEnabled}
                        extraData={this.state}
                    />
                </View >
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View >
        );
    }

    _allowScroll(scrollEnabled) {
        if (this.state.scrollEnabled != scrollEnabled)
            this.setState({ scrollEnabled: scrollEnabled })
    }

    /* =====>>>>>>>>> Offer Card Rendering Function <<<<<<<<======== */
    renderSwapRequests = ({ item, index }) => {
        console.log('swapoffer item-->', item);
        return (
            <SwapOfferCard
                name={item.FirstName}
                shopNo={item.StoreNumber}
                img={item.ProfilePicture}
                close={this.state.openIndex != index}
                openOnPress={index == this.state.opened ? true : false}
                scroll={event => this._allowScroll(event)}
                onOpen={(sectionID, rowId, direction) => {
                    this.setState({ openIndex: index, opened: null })
                }}
                scheduleDate={moment.parseZone(item.ScheduleDate).format('MMM DD, ddd')}
                shiftTime={`${Global.getTime24to12(item.InTime)} - ${Global.getTime24to12(item.OutTime)}`}
                onAcceptPress={() => {
                    this.props.acceptSwapRequest({ RequestID: item.RequestID, ShiftRequestStatusTypeID: 2, OfferedDailyScheduleID: item.OfferedDailyScheduleID, RequestedDailyScheduleID: item.RequestedDailyScheduleID })
                }}
                onDeclinePress={() => { this.props.declineSwapRequest({ EmployeeRequestID: item.RequestID, OfferedDailyScheduleID: item.OfferedDailyScheduleID, RequestedDailyScheduleID: item.RequestedDailyScheduleID }) }}
                status={item.ShiftRequestStatusTypeName}
                disable={this.state.disable}
                onPress={() => this.setState({ opened: index })}
            //onPress={() => this.props.navigation.navigate('OfferDetail', { requestDetails: item })}
            />
        );
    }
}

/* =====>>>>>>>>> StyleSheet for Modal <<<<<<<<======== */
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    text: {
        color: '#3f2949',
        marginTop: Matrics.CountScale(10)
    },
    modalTextStyle: {
        justifyContent: "center",
        textAlign: 'center',
        color: '#ccc',
        fontFamily: Fonts.NunitoSansRegular,
        width: Matrics.screenWidth - 50,
        justifyContent: 'center',
        alignSelf: 'center', fontSize: Matrics.fontSize15
    },
    cancelOpenShiftButtonStyle: {
        height: Matrics.CountScale(50),
        marginLeft: Matrics.CountScale(10),
        marginRight: Matrics.CountScale(10),
        width: Matrics.screenWidth - 20,
        borderRadius: Matrics.CountScale(3),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelShiftTextStyle: {
        fontSize: Matrics.CountScale(19),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.APPCOLOR
    },
    cancelButtonStyle: {
        height: Matrics.CountScale(50),
        margin: Matrics.CountScale(10),
        width: Matrics.screenWidth - 20,
        borderRadius: Matrics.CountScale(3),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelButtonTextStyle: {
        fontSize: Matrics.CountScale(19),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY
    }
})

// =====>>>>>>>>> StyleSheet for Page Container <<<<<<<<========
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    HeaderContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Matrics.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Matrics.CountScale(15),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15),
    },
    leftStyle: {
        justifyContent: 'center',
        flex: 0.5,
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    rightStyle: {
        justifyContent: 'center',
        flex: 0.5
    },
    CardHeader: {
        color: 'grey',
        fontSize: Matrics.CountScale(12),
        fontFamily: Fonts.NunitoSansRegular
    },
    Card: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: Matrics.CountScale(4),
        padding: Matrics.CountScale(15),
        borderRightWidth: Matrics.CountScale(7),
        borderRightColor: '#f0d57e',
        marginTop: Matrics.CountScale(10),
        marginBottom: Matrics.CountScale(10),
    },
    rightImgStyle: {
        height: Matrics.CountScale(20),
        alignSelf: 'flex-end',
        width: Matrics.CountScale(20)
    },
    cardPartStyle1: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: 'center'
    },
    cardPartStyle2: {
        flex: 1
    },
    monthTextStyle: {
        fontSize: Matrics.CountScale(13),
        color: 'grey'
    },
    dateTextStyle: {
        fontSize: Matrics.CountScale(14)
    },
    dayTextStyle: {
        fontSize: Matrics.CountScale(13),
        color: 'grey'
    },
    timeTextStyle: {
        padding: Matrics.CountScale(4),
        fontFamily: Fonts.NunitoSansRegular
    },
    shopTextStyle: {
        padding: Matrics.CountScale(4),
        color: 'grey',
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansRegular
    },
    swapOfferTextStyle: {
        padding: Matrics.CountScale(4),
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansRegular
    }
}

const mapStateToProps = (state) => {

    return {
        mySchedule: state.MySchedule,
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getPendingSwapRequestDetailsRequest, acceptSwapRequest, declineSwapRequest, deleteEmployeeOpenShiftRequest
})(SwapOfferDetails);