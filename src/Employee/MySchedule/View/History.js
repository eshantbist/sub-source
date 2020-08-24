/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========> */
import React from 'react'
import {
    View, Platform, BackHandler, FlatList,
    PanResponder, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Text
} from 'react-native'
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import moment from "moment";

/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========> */
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import {
    getMyScheduleHistoryRequest
} from '@Redux/Actions/MyScheduleActions'
import { LoadWheel, LoadMore, CustomModal } from "@Components";
import Global from '../../../GlobalFunction'

/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========> */
class History extends React.Component {

    state = {
        loading: true,
        msgModal: false,
        msg: '',
        historyData: [],
        historyTotal: 0,
        loadmore: false,
        pageSize: 10,
        pageNo: 1,
    }

    callGetMyScheduleHistory() {
        this.props.getMyScheduleHistoryRequest({
            MessageType: 4,
            IsInbox: true, PageSize: this.state.pageSize, PageNo: this.state.pageNo
        })
    }

    componentDidMount() {
        this.callGetMyScheduleHistory()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.mySchedule.getMyScheduleHistorySuccess) {
            this.setState({ loading: false, loadmore: false })
            let response = nextProps.mySchedule.data
            console.log(response)
            if (response.Status == 1) {
                this.setState({ historyTotal: response.Data.TotalRecords, historyData: [...this.state.historyData, ...response.Data.Messages] })
                console.log(response.Data)
            }
            else {
                this.setState({ loading: false, loadmore: false, msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.getMyScheduleHistoryFail && this.state.loading) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true, loadmore: false })
        }
    }

    loadMoreHistory() {
        this.setState({ loadmore: true })
        this.setState({
            pageNo: this.state.pageNo + 1,
        }, () => {
            this.callGetMyScheduleHistory();
        });
    }

    renderMyscheduleHistory = ({ item }) => {
        return (
            <View style={Styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 0.2 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={Styles.cardHeaderDate}>
                            {moment.parseZone(item.MessageDate).format('DD MMMM, hh:mm a')}
                        </Text>
                    </View>
                    <View style={{ flex: 0.1 }}></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', paddingTop: Matrics.CountScale(5) }}>
                    <View style={{ flex: 0.2 }}>
                        <Image source={{ uri: item.ProfilePicture }} style={Styles.iconsStyle} />
                    </View>
                    <View style={{ flex: 1 }}>
                        {/* <Text style={Styles.msgText}>
                            {item.MessageSubject}
                        </Text> */}
                        {/* <WebView
                            style={{ height: 65 }}
                            scrollEnabled={false}
                            source={{ html: `<p style="font-size:70px; color:${Colors.GREY}">${item.MessageSubject}</p>` }}

                        //html={`<p>${item.MessageSubject}</p>`} />
                        /> */}
                        <HTML html={item.MessageSubject} />
                        {/* <Text style={Styles.detailsText} onPress={() => {
                            //this.props.navigation.navigate('HistoryDetail', { details: item })
                        }}>
                            Details
                        </Text> */}
                    </View>
                    <View style={{ flex: 0.1 }}></View>
                </View>
            </View >
        )
    }

    render() {
        return (
            <View style={Styles.pageBody} >

                {/* ====>>>>>>>>>>> Header Start <<<<<<<<<<==========> */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity style={MasterCssEmployee.iconContainerStyle}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                        <Image style={[MasterCssEmployee.iconStyle, Styles.backIconStyle]} source={Images.EmpBackIcon}></Image>

                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle}>History</Text>
                    </View>
                    <View style={MasterCssEmployee.iconContainerStyle} onPress={() => { }}>

                    </View>
                </View>
                {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}
                <FlatList
                    ListEmptyComponent={() => !this.state.loading &&
                        <View>
                            <Text style={Styles.errMsgStyle}>No data found!</Text>
                        </View>}
                    data={this.state.historyData}
                    renderItem={this.renderMyscheduleHistory}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => this.state.historyData.length > 0 && this.state.historyData.length != this.state.historyTotal && !this.state.loadmore ? this.loadMoreHistory() : null}
                />
                {this.state.loadmore ?
                    <LoadMore />
                    : null}

                {/* <ScrollView>
                    {this.renderPageContent('Swap_Approve')}
                    {this.renderPageContent('Swap_Denied')}
                    {this.renderPageContent('Request_Denied')}
                    {this.renderPageContent('Request_Approve')}
                </ScrollView> */}
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View >
        );
    }

    /* ====>>>>>>>>>>> Render Page Class <<<<<<<<<<==========> */
    renderPageContent(data) {
        if (data == 'Swap_Approve') {
            return (
                <View style={Styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.cardHeaderDate}>
                                30 march at 2:20pm
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: Matrics.CountScale(5) }}>
                        <View style={{ flex: 0.2 }}>
                            <Image source={Images.SwapApproveIcon} style={Styles.iconsStyle}></Image>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.msgText}>
                                Swap request  between<Text style={Styles.boldText}> You</Text> and <Text style={Styles.boldText}>Frances Barnett</Text> was approved by<Text style={Styles.boldText}> Tim Collins.</Text>
                            </Text>
                            <Text style={Styles.detailsText}>
                                Details
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                </View >
            )
        }
        if (data == 'Request_Denied') {
            return (
                <View style={Styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.cardHeaderDate}>
                                10 march at 8:00pm
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: Matrics.CountScale(5) }}>
                        <View style={{ flex: 0.2 }}>
                            <Image source={Images.RequestDeniedIcon} style={Styles.iconsStyle}></Image>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.msgText}>
                                Day off request was denied by<Text style={Styles.boldText}> Tim Colfin</Text></Text>
                            <Text style={Styles.detailsText}>
                                Details
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                </View >
            )
        }
        if (data == 'Swap_Denied') {
            return (
                <View style={Styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.cardHeaderDate}>
                                30 march at 2:20pm
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: Matrics.CountScale(5) }}>
                        <View style={{ flex: 0.2 }}>

                            <Image source={Images.SwapDeniedIcon} style={Styles.iconsStyle}></Image>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.msgText}>
                                Swap request  between<Text style={Styles.boldText}> You</Text> and <Text style={Styles.boldText}>Kevin Stevenson</Text> was denied by <Text style={Styles.boldText}>Alta Boones.</Text>
                            </Text>
                            <Text style={Styles.detailsText}>
                                Details
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                </View >
            )
        }
        if (data == 'Request_Approve') {
            return (
                <View style={Styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.cardHeaderDate}>
                                10 march at 8:00pm
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingTop: Matrics.CountScale(5) }}>
                        <View style={{ flex: 0.2 }}>
                            <Image source={Images.RequestApproveIcon} style={Styles.iconsStyle}></Image>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.msgText}>
                                Day off request was approved by<Text style={Styles.boldText}> Willims Hughes</Text></Text>
                            <Text style={Styles.detailsText}>
                                Details
                        </Text>
                        </View>
                        <View style={{ flex: 0.1 }}></View>
                    </View>
                </View >
            )
        }
    }
}

{/* ====>>>>>>>>>>> StyleSheet <<<<<<<<<<==========> */ }
const Styles = {
    container: {

        //flex: 1,
        //justifyContent: "center",
        height: 100
    },
    pageBody: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    card: {
        backgroundColor: 'white',
        borderRadius: Matrics.CountScale(4),
        marginBottom: 0,
        margin: Matrics.CountScale(10),
        //height: Matrics.CountScale(150),
        padding: Matrics.CountScale(15)
    },
    cardHeaderDate: {
        color: Colors.GREY,
        fontSize: Matrics.CountScale(13),
        fontFamily: Fonts.NunitoSansRegular
    },
    msgText: {
        color: Colors.GREY,
        fontSize: Matrics.CountScale(17),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    backIconStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(10)
    },
    boldText: {
        color: Colors.BLACK,
        fontFamily: Fonts.NunitoSemiBold
    },
    detailsText: {
        paddingTop: Matrics.CountScale(8),
        color: Colors.APPCOLOR,
        fontSize: Matrics.CountScale(17),
        fontFamily: Fonts.NunitoSansRegular
    },
    iconsStyle: {
        width: Matrics.CountScale(40),
        height: Matrics.CountScale(40)
    },
    errMsgStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        textAlign: 'center',
        fontSize: Matrics.CountScale(16),
        color: 'grey',
        margin: Matrics.CountScale(10),
    }
}
const mapStateToProps = (state) => {
    return {
        mySchedule: state.MySchedule,
    };
}

export default connect(mapStateToProps, {
    getMyScheduleHistoryRequest
})(History);
