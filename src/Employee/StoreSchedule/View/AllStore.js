/*  =============>>>>>>>>> Libraries <<<<<<<<<<============= */
import React from 'react'
import { View, Platform, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Text, FlatList, RefreshControl } from 'react-native'
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation'
import moment from 'moment';
import { connect } from 'react-redux';
import _ from 'lodash'

/*  =============>>>>>>>>> Assets <<<<<<<<<<============= */
import { getStoreSchedule, getAllStoreRequest } from '@Redux/Actions/StoreScheduleAction';
import CalendarStrip from '../../../Resources/react-native-calendar-strip'
import { Dropdown } from 'react-native-material-dropdown'
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { LoadWheel } from "@Components";
import Global from '../../../GlobalFunction'
let self;
//let UserStoreGuid = JSON.parse(global.user.LoginObject).Login.UserStoreGuid;

/*  =============>>>>>>>>> Classs Declaration <<<<<<<<<<============= */
class AllStore extends React.Component {
    state = {
        selectedUser: '',
        storeScheduleData: [],
        loading: true,
        selectedDate: '',
        viewHeight: 0,
        storelist: [],
        selectedShopId: 0,
        allStoreData: [],
        refreshing: false
    }
    UNSAFE_componentWillMount() {
        self = this;
        console.log(this.props, "receive");
        this.UserStoreGuid = JSON.parse(global.user.LoginObject).Login.UserStoreGuid
        // let sdate = new Date();
        // let startDate = Global.getDateValue(sdate)
        let startDate = '11-21-2018'
        this.setState({ selectedDate: startDate })
        //alert(startDate)
        this.props.getStoreSchedule({ StartDate: startDate })
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.storeSchedule.getStoreScheduleSuccess) {
            this.setState({ loading: false, refreshing: false })
            let response = nextProps.storeSchedule.data
            console.log("store....4", response)

            if (response.Status == 1) {
                this.setState({ storeScheduleData: response.Data, allStoreData: response.Data, loading: true })


                // let dataArr = response.Data
                // let resultArr = []
                // this.currentDate = dataArr[0].ScheduleDate
                // for (i = 0; i < dataArr.length; i++) {

                //     let monthName = Global.getMonthValue(dataArr[i].ScheduleDate)
                //     if (_.some(resultArr, { 'title': monthName })) {
                //         var index = resultArr.findIndex(data => data.title == monthName);
                //         resultArr[index].data.push(dataArr[i])
                //     }
                //     else {
                //         let tmpdata = []
                //         tmpdata.push(dataArr[i])
                //         resultArr.push({ 'title': monthName, 'data': tmpdata })
                //     }
                // }

                let offerRequest = []
                response.Data.forEach(res => {
                    if (res.UserStoreGuid != this.UserStoreGuid) {
                        console.log(res)
                        _.forEach(res.EmployeeAllShifts, (allShifts) => {
                            // let offers = _.filter(allShifts.EmployeeShifts, (data) => {
                            //     return data.RequestTypeID == 1;
                            // })
                            _.forEach(allShifts.EmployeeShifts, (data) => {
                                if (data.RequestTypeID != 0) {
                                    let monthName = Global.getMonthValue(allShifts.ScheduleDate)
                                    if (_.some(offerRequest, { 'title': monthName })) {
                                        var index = offerRequest.findIndex(data => data.title == monthName);
                                        offerRequest[index].data.push(data)
                                    }
                                    else {
                                        let tmpdata = []
                                        tmpdata.push(data)
                                        offerRequest.push({ 'title': monthName, 'data': tmpdata })
                                    }
                                }
                            })
                            //offerRequest = offerRequest.concat(offers)
                        });
                    }
                })
                this.offers = offerRequest

                // let offerRequest = []
                // response.Data.forEach(res => {
                //     if (res.UserStoreGuid == this.UserStoreGuid) {
                //         console.log(res)
                //         _.forEach(res.EmployeeAllShifts, (allShifts) => {
                //             let offers = _.filter(allShifts.EmployeeShifts, (data) => {
                //                 return data.RequestTypeID == 1;
                //             })
                //             offerRequest = offerRequest.concat(offers)
                //         });
                //     }
                // })
                // this.offers = offerRequest
                console.log('offerRequest',offerRequest)
                this.props.getAllStoreRequest()
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)

            }
        }
        if (nextProps.storeSchedule.getAllStoreSuccess) {
            this.setState({ loading: false })
            let response = nextProps.storeSchedule.data
            console.log('response store-->',response)
            if (response.Status == 1) {
                let numArr = []
                // let Data = [
                //     {
                //         "StoreID": 3,
                //         "DisplayStoreNumber": "27117",
                //         "UserStoreID": 29003,
                //         "UserStoreGuid": "E8051AB5-496E-46A3-89DC-465F45620B50"
                //     },
                //     {
                //         "StoreID": 6,
                //         "DisplayStoreNumber": "1945",
                //         "UserStoreID": 19823,
                //         "UserStoreGuid": "7EFF44C5-58D9-49A5-9387-F55E0D0D22F7"
                //     },
                //     {
                //         "StoreID": 9,
                //         "DisplayStoreNumber": "3061",
                //         "UserStoreID": 11501,
                //         "UserStoreGuid": "615D5857-29B8-442B-A7B9-68B92EDCD3F4"
                //     },
                // ]

                response.Data.forEach(element => {
                    numArr.push({
                        StoreID: element.StoreID,
                        DisplayStoreNumber: Number(element.DisplayStoreNumber),
                        UserStoreID: element.UserStoreID,
                        UserStoreGuid: element.UserStoreGuid
                    })
                });

                let storelist = _.sortBy(numArr, ['DisplayStoreNumber'])

                this.setState({ storelist: [{ DisplayStoreNumber: 'All Shops' }, ...storelist] })
                //setTimeout(() => { console.log(this.state.storelist) }, 1000)
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)
            }
        }
        else if (nextProps.storeSchedule.getStoreScheduleFailed || nextProps.storeSchedule.getAllStoreFailed) {
            this.setState({ loading: false, refreshing: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }
        // this.props.navigation.push('Notification');
    }

    _allowScroll(scrollEnabled) {
        if (this.state.scrollEnabled != scrollEnabled)
            this.setState({ scrollEnabled: scrollEnabled })
    }

    renderStoreSchedule = ({ item, index }) => {
        // let data = []
        // _.forEach(item.EmployeeAllShifts, function (res) {
        //     if (Global.getDateValue(res.ScheduleDate) == self.state.selectedDate)
        //         data = res.EmployeeShifts //[0]
        // });
        // console.log(data)
        console.log(this.offers, item)
        console.log(self.state.selectedDate)

        let data = {}
        _.forEach(item.EmployeeAllShifts, function (res) {
            if (Global.getDateValue(res.ScheduleDate) == self.state.selectedDate)
                data = res.EmployeeShifts[0]
        });

        //console.log(item.EmployeeAllShifts)
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
                    <TouchableOpacity onPress={() => {
                        console.log("Cover");
                    }}>
                        <Image style={Styles.coverImgStyle} source={Images.CoverIcon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            //this.props.navigation.navigate('StoreSchedule');
                        }}>

                        <Image style={Styles.swapImgStyle} source={Images.SwapIcon}></Image>
                    </TouchableOpacity>
                </View >
            }
        ]
        // { console.log(this.UserStoreGuid) }

        // return (data.length > 0 &&
        return (!_.isEmpty(data) &&
            <View >
                <Swipeout
                    close={this.state.openIndex != index}
                    onOpen={(sectionID, rowId, direction) => {
                        this.setState({ openIndex: index })
                    }}
                    scroll={event => this._allowScroll(event)}
                    autoClose={true} buttonWidth={Matrics.CountScale(250)}
                    right={swipeoutBtns} disabled={this.state.changeClass}
                    backgroundColor={'transparent'}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('StoreSchedule', { offers: this.offers, userInfo: item, userShiftInfo: data }); }}
                        disabled={item.UserStoreGuid != this.UserStoreGuid}
                    >
                        <View style={Styles.card}>
                            <View style={Styles.cardContent}>
                                <View style={{ flex: 0.2 }}>
                                    <Image
                                        style={Styles.profileImgStyle}
                                        source={item.ProfilePicture == '' ? Images.ProfileIconPlaceholder : { uri: item.ProfilePicture }}>
                                    </Image>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={Styles.nameTextStyle}>
                                        {`${item.FirstName} ${item.LastName}`}
                                    </Text>
                                    <Text style={Styles.timeTextStyle}>
                                        {`${Global.getTime24to12(data.InTime)} - ${Global.getTime24to12(data.OutTime)}`}
                                    </Text>
                                    {/* {
                                        data.map(res => {
                                            return (
                                                <Text style={Styles.timeTextStyle}>
                                                    {`${Global.getTime(res.InDateTime)} - ${Global.getTime(res.OutDateTime)}`}
                                                </Text>
                                            )
                                        })

                                    } */}

                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>
                </Swipeout>
            </View >
        )
    }

    async onShopChanged(value, index, data) {
        console.log(value, index, data)
        if (index == 0) {
            this.setState({ storeScheduleData: this.state.allStoreData })
        }
        else {
            await this.setState({ selectedShopId: data[index].UserStoreID })
            this.setState({
                storeScheduleData: _.filter(this.state.allStoreData, (res) => {
                    return res.UserStoreID == this.state.selectedShopId;
                })
            })
        }


        //console.log(data[index].DisplayStoreNumber)
        // let newArr = []
        // _.forEach(this.state.allData, (res) => {
        //     let tmp = _.filter(res.data, (resp) => {
        //         return Number(resp.StoreNumber) == this.state.selectedShopId;
        //     })
        //     if (tmp.length != 0) {
        //         newArr.push({ 'title': res.title, 'data': tmp })
        //     }
        // })
        // this.setState({ myScheduleData: newArr })
    }

    pullToRefresh = async () => {
        await this.setState({ refreshing: true })
        this.props.getStoreSchedule({ StartDate: this.state.selectedDate })
    }

    render() {
        return (
            <View style={Styles.pageBody}>

                {/*  =============>>>>>>>>> Header Start <<<<<<<<<<============= */}
                <View style={[MasterCssEmployee.headerContainer, { borderBottomWidth: 0 }]}>
                    <View style={MasterCssEmployee.leftStyle}  />
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={{ fontSize: 18, fontFamily: Fonts.NunitoSansRegular, color: Colors.BLACK, fontWeight: 'bold' }}>Shop Schedule</Text>
                        {/* <Dropdown
                            containerStyle={{ width: Matrics.CountScale(150) }}
                            data={this.state.storelist}
                            value={'All Shops'}
                            onChangeText={(value, index, data) => this.onShopChanged(value, index, data)}
                            //onChangeText={(value, index, data) => this.setState({ selectedShopId: data[index].StoreNumber })}
                            valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber == 'All Shops' ? DisplayStoreNumber : `Shop ${DisplayStoreNumber}`}
                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                            overlayStyle={{ borderWidth: 2 }}
                            dropdownOffset={{ top: 32, left: 0 }}
                            // dropdownPosition={5}
                            fontSize={17}
                            itemCount={8}
                            rippleCentered={true}
                        // onChangeText={(val) => {
                        //     console.log(val, "selected");
                        // }}
                        /> */}
                    </View>
                    <View style={MasterCssEmployee.rightStyle} />
                </View>
                <View  style={{  alignItems: 'center',  backgroundColor: 'white',}}>
                    <Dropdown
                        containerStyle={{ width: Matrics.CountScale(150), bottom: 25 }}
                        data={this.state.storelist}
                        value={'All Shops'}
                        onChangeText={(value, index, data) => this.onShopChanged(value, index, data)}
                        //onChangeText={(value, index, data) => this.setState({ selectedShopId: data[index].StoreNumber })}
                        valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber == 'All Shops' ? DisplayStoreNumber : `Shop ${DisplayStoreNumber}`}
                        inputContainerStyle={{ borderBottomColor: 'transparent', }}
                        overlayStyle={{ borderWidth: 2 }}
                        dropdownOffset={{ top: 32, left: 0 }}
                        // dropdownPosition={5}
                        fontSize={17}
                        itemCount={8}
                        rippleCentered={true}
                        selectedTextStyle={{ textAlign: 'center'}}
                    // onChangeText={(val) => {
                    //     console.log(val, "selected");
                    // }}
                    />
                </View>

                {this.renderCalender()}

                {(this.state.viewHeight == 0 && !this.state.loading) &&
                    <View>
                        <Text style={Styles.errMsgStyle}>No data found!</Text>
                    </View>}
                <View style={{ flex: 1 }}>
                    <View onLayout={(event) => {
                        var { x, y, width, height } = event.nativeEvent.layout;
                        this.setState({ viewHeight: height })
                        console.log(height)
                    }}>
                        <FlatList
                            data={this.state.storeScheduleData}
                            renderItem={this.renderStoreSchedule}
                            extraData={this.state}
                            scrollEnabled={this.state.scrollEnabled}
                            onRefresh={this.pullToRefresh}
                            refreshing={this.state.refreshing}
                        />
                    </View>
                </View>
                <LoadWheel visible={this.state.loading} onRequestClose={() => this.setState({ loading: false })} />
            </View >
        );
    }

    /*  =============>>>>>>>>> Calender <<<<<<<<<<============= */
    renderCalender() {
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(3, 'days')  // total 4 days enabled
        }];
        let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled

        return (
            <View >
                <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 100 }}
                    startingDate={moment('11/21/2018')}
                    selectedDate={moment('11/21/2018')}
                    daySelectionAnimation={{
                        type: 'border',
                        duration: 500,
                        borderWidth: 1,
                        borderHighlightColor: Colors.APPCOLOR
                    }}
                    ref='calender'
                    style={Styles.calendarStyle}
                    calendarHeaderStyle={{
                        color: Colors.BLACK,
                        paddingBottom: Matrics.CountScale(5),
                    }}
                    calendarColor={Colors.WHITE}
                    highlightDateNumberStyle={{
                        color: Colors.APPCOLOR,
                        borderRadius: 10

                    }}
                    highlightDateNameStyle={{
                        color: Colors.APPCOLOR
                    }}
                    onWeekChanged={(data) => { this.setState({ selectedDate: Global.getDateValue(data._d) }) }}
                    onDateSelected={(data) => {
                        this.setState({ selectedDate: Global.getDateValue(data._d) })
                        //console.log()
                        // console.log(data._d)
                    }}

                    iconContainer={{ flex: 0.1 }}
                />
            </View>
        )
    }
    /*  =============>>>>>>>>> Render Employee Function <<<<<<<<<<============= */
    renderEmployeeList(name) {

        {/*  =======>>>>>> Swipe Button View <<<<<====== */ }
        var swipeoutBtns = [
            {
                backgroundColor: 'transparent',
                onPress: (val) => {
                    //this.props.navigation.navigate('StoreSchedule');
                },
                component: <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1, flexDirection: 'row',
                        // backgroundColor:'red'
                        top: Matrics.CountScale(3)
                    }}>
                    <TouchableOpacity onPress={() => {
                        console.log("Cover");
                    }}>
                        <Image style={Styles.coverImgStyle} source={Images.CoverIcon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('StoreSchedule');
                        }}>

                        <Image style={Styles.swapImgStyle} source={Images.SwapIcon}></Image>
                    </TouchableOpacity>
                </View >
            }
        ]
        return (

            <View >
                <Swipeout autoClose={true} buttonWidth={Matrics.CountScale(250)} right={swipeoutBtns} disabled={this.state.changeClass} backgroundColor={'transparent'}>

                    <View style={Styles.card}>
                        <View style={Styles.cardContent}>
                            <View style={{ flex: 0.2 }}>
                                <Image
                                    style={Styles.profileImgStyle}
                                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkbJOq4hiNY-zqjUostpFuS5HAQM-liLb6gaTp2ML6H7tdgnLL' }}>
                                </Image>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={Styles.nameTextStyle}>
                                    {name}
                                </Text>
                                <Text style={Styles.timeTextStyle}>
                                    4:00pm - 9:00pm
                                </Text>
                            </View>
                        </View>

                    </View>
                </Swipeout>
            </View >
        );
    }

}

{/*  =============>>>>>>>>> StyleSheet <<<<<<<<<<============= */ }
const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    calendar: {
        paddingTop: Matrics.CountScale(5),
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(5),

    },
    calendarStyle: {
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 1,
        height: Matrics.CountScale(150),
        paddingTop: 5,
        paddingBottom: 10
    },
    coverImgStyle: {
        alignSelf: 'center',
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(120),
        height: Matrics.CountScale(65),
        borderRadius: Matrics.CountScale(5)
    },
    swapImgStyle: {
        alignSelf: 'center',
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(120),
        height: Matrics.CountScale(65),
        borderRadius: Matrics.CountScale(5)
    },
    card: {
        backgroundColor: Colors.WHITE,
        margin: Matrics.CountScale(10),
        marginBottom: Matrics.CountScale(2),
        borderRadius: Matrics.CountScale(4),
        padding: Matrics.CountScale(15)
    },
    cardContent: {
        flex: 1,
        flexDirection: 'row',
        padding: Matrics.CountScale(5)
    },
    profileImgStyle: {
        alignSelf: 'flex-start',
        width: Matrics.CountScale(40),
        height: Matrics.CountScale(40),
        borderRadius: Matrics.CountScale(20)
    },
    nameTextStyle: {
        justifyContent: 'flex-start',
        fontSize: Matrics.CountScale(18),
        color: Colors.BLACK,
        fontFamily: Fonts.NunitoSansRegular
    },
    timeTextStyle: {
        justifyContent: 'flex-end',
        fontSize: Matrics.CountScale(15),
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansSemiBold,
        paddingTop: Matrics.CountScale(5)
    },
    errMsgStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        textAlign: 'center',
        fontSize: Matrics.CountScale(16),
        color: 'grey',
        margin: Matrics.CountScale(10),
    }
}
//export default AllStore;
const mapStateToProps = (state) => {

    return {
        storeSchedule: state.StoreSchedule,
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getStoreSchedule, getAllStoreRequest
})(AllStore);

