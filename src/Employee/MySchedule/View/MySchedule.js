// ======>>>>>>>>> Libraries <<<<<<<========
import React from 'react'
import { View, StatusBar, SectionList, BackHandler, Platform, ScrollView, FlatList, TouchableOpacity, TouchableWithoutFeedback, Image, Text } from 'react-native'
import Swipeout from 'react-native-swipeout';
import { NavigationActions } from 'react-navigation'
import { Dropdown } from '../../../Resources/react-native-material-dropdown';
import { connect } from 'react-redux';
import _ from 'lodash'
import moment from "moment";

// ======>>>>>>>>> Assets <<<<<<<========
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import {
    getMyScheduleRequest, getEmployeeStoreRequest, openEmployeeShiftRequest, deleteEmployeeOpenShiftRequest
} from '@Redux/Actions/MyScheduleActions'
import { LoadWheel } from "@Components";
import Global from '../../../GlobalFunction'

// ======>>>>>>>>> Class Declaration <<<<<<<========
class MySchedule extends React.Component {
    state = {
        myScheduleData: [],
        loading: true,
        storelist: [],
        allData: [],
        selectedShopId: 0,
        refreshing: false,
        StartDate: '',
    }

    // ======>>>>>>>>> Life Cycle Methods <<<<<<<========
    componentDidMount() {
        this.getMyScheduleData()
    }

    componentWillReceiveProps(nextProps) {
        console.log("PropsReceive", nextProps.mySchedule);

        // const setParamsAction = NavigationActions.setParams({
        //     params: { tabBarVisible: true },
        //     key: 'MySchedule',
        // });
        // this.props.navigation.dispatch(setParamsAction);

        if (nextProps.mySchedule.getMyScheduleSuccess) {
            this.setState({ loading: false, refreshing: false })
            let response = nextProps.mySchedule.data
            console.log('response-->', response);
            if (response.Status == 1) {
                //console.log(response)
                let dataArr = response.Data
                console.log('dataArr-->', dataArr);
                // const startDate = moment(this.state.StartDate).format('YYYY-MM-DD')
                // let after14DayDate = moment(startDate, 'YYYY-MM-DD').add(14,'days').format('YYYY-MM-DD');
                // console.log('StartDate-->', startDate);
                // console.log('StartDateAfter14-->', after14DayDate);
                // let finalScheduleData = [];
                // dataArr.forEach(data => {
                //     if(data.ScheduleDate < after14DayDate) {
                //         finalScheduleData.push(data);
                //     }
                // });
                // console.log('finalScheduleData-->',finalScheduleData)

                let resultArr = []
                this.currentDate = dataArr[0].ScheduleDate
                for (i = 0; i < dataArr.length; i++) {

                    let monthName = Global.getMonthValue(dataArr[i].ScheduleDate)
                    if (_.some(resultArr, { 'title': monthName })) {
                        var index = resultArr.findIndex(data => data.title == monthName);
                        resultArr[index].data.push(dataArr[i])
                    }
                    else {
                        let tmpdata = []
                        tmpdata.push(dataArr[i])
                        resultArr.push({ 'title': monthName, 'data': tmpdata })
                    }
                }
                this.setState({ myScheduleData: resultArr, allData: resultArr, loading: true })
                this.props.getEmployeeStoreRequest()
                console.log('resultArr-->',resultArr)
                
                // let dataaa = [
                //     {
                //         "title": "December", "data": [
                //             {
                //                 "ScheduleDate": "2018-10-31T00:00:00",
                //                 "InTime": "00:00:00",
                //                 "OutTime": "00:00:00",
                //                 "TotalTime": 0,
                //                 "RequestTypeName": "",
                //                 "RequestTypeID": 0,
                //                 "RequestID": "0",
                //                 "RequestCount": 0,
                //                 "StoreID": 41,
                //                 "StoreNumber": "1945",
                //                 "DailyScheduleID": 0
                //             },
                //             {
                //                 "ScheduleDate": "2018-11-01T00:00:00",
                //                 "InTime": "00:00:00",
                //                 "OutTime": "00:00:00",
                //                 "TotalTime": 0,
                //                 "RequestTypeName": "",
                //                 "RequestTypeID": 0,
                //                 "RequestID": "0",
                //                 "RequestCount": 0,
                //                 "StoreID": 41,
                //                 "StoreNumber": "27117",
                //                 "DailyScheduleID": 0
                //             },
                //             {
                //                 "ScheduleDate": "2018-11-02T00:00:00",
                //                 "InTime": "00:00:00",
                //                 "OutTime": "00:00:00",
                //                 "TotalTime": 0,
                //                 "RequestTypeName": "",
                //                 "RequestTypeID": 0,
                //                 "RequestID": "0",
                //                 "RequestCount": 0,
                //                 "StoreID": 41,
                //                 "StoreNumber": "3061",
                //                 "DailyScheduleID": 0
                //             },
                //             {
                //                 "ScheduleDate": "2018-11-03T00:00:00",
                //                 "InTime": "07:00:00",
                //                 "OutTime": "13:00:00",
                //                 "TotalTime": 6,
                //                 "RequestTypeName": "Swap",
                //                 "RequestTypeID": 2,
                //                 "RequestID": "6008",
                //                 "RequestCount": 1,
                //                 "StoreID": 41,
                //                 "StoreNumber": "1945",
                //                 "DailyScheduleID": 1991079
                //             },
                //         ]
                //     },
                //     {
                //         "title": "January", "data": [
                //             {
                //                 "ScheduleDate": "2018-10-31T00:00:00",
                //                 "InTime": "00:00:00",
                //                 "OutTime": "00:00:00",
                //                 "TotalTime": 0,
                //                 "RequestTypeName": "",
                //                 "RequestTypeID": 0,
                //                 "RequestID": "0",
                //                 "RequestCount": 0,
                //                 "StoreID": 41,
                //                 "StoreNumber": "1945",
                //                 "DailyScheduleID": 0
                //             },
                //             {
                //                 "ScheduleDate": "2018-11-01T00:00:00",
                //                 "InTime": "00:00:00",
                //                 "OutTime": "00:00:00",
                //                 "TotalTime": 0,
                //                 "RequestTypeName": "",
                //                 "RequestTypeID": 0,
                //                 "RequestID": "0",
                //                 "RequestCount": 0,
                //                 "StoreID": 41,
                //                 "StoreNumber": "27117",
                //                 "DailyScheduleID": 0
                //             }]
                //     }
                // ]

               
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)

            }
        }
        else if (nextProps.mySchedule.getEmployeeStoreSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data
            console.log(response)
            if (response.Status == 1) {

                let numArr = []
                response.Data.forEach(element => {
                    numArr.push({
                        StoreID: element.StoreID,
                        DisplayStoreNumber: Number(element.DisplayStoreNumber),
                        UserStoreID: element.UserStoreID,
                        UserStoreGuid: element.UserStoreGuid
                    })
                });

                this.setState({ storelist: [{ DisplayStoreNumber: 'All Shops' }, ..._.sortBy(numArr, ['DisplayStoreNumber'])] })
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)

            }
        }
        else if (nextProps.mySchedule.openEmployeeShiftSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data
            console.log('open shift-->', response);
            if (response.Status != 0) {
                this.getMyScheduleData()
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)
            }
        }
        else if (nextProps.mySchedule.deleteEmployeeOpenShiftSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data

            if (response.Status == 1) {
                this.getMyScheduleData()
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.mySchedule.getMyScheduleFailed || nextProps.mySchedule.getEployeeStoreFailed || nextProps.mySchedule.openEmployeeShiftFailed) {
            this.setState({ loading: false, refreshing: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }
    }

    pullToRefresh = async () => {
        await this.setState({ refreshing: true })
        this.getMyScheduleData()
    }


    getMyScheduleData() {
        let sdate = new Date();
        // let startDate = Global.getDateValue(sdate)
        // let endDate = Global.getDateAfterSomeMonth(sdate, 2)

        let startDate = '11-21-2018'
        // let startDate = '09-28-2019'
        // let endDate = '12-06-2018'
        let after14DayDate = moment(startDate, 'MM-DD-YYYY').add(13,'days').format('MM-DD-YYYY');
        console.log('after14DayDate-->',after14DayDate);
        this.props.getMyScheduleRequest({ StartDate: startDate, EndDate: after14DayDate })
        if (this.state.refreshing == false)
            this.setState({ loading: true })
        
        this.setState({ StartDate: startDate });
    }

    renderMyScheduleHeader = ({ section: { title } }) => (
        <Text style={Styles.monthTextStyle} >
            {title}
        </Text>
    )

    _allowScroll(scrollEnabled) {
        if (this.state.scrollEnabled != scrollEnabled)
            this.setState({ scrollEnabled: scrollEnabled })
    }

    cancelEmployeeOpenShift(val) {
        this.setState({ loading: true })
        this.props.deleteEmployeeOpenShiftRequest({ EmployeeRequestID: val })
    }

    renderMyScheduleData = ({ item, index, section }) => {
        var swipeoutBtns = [
            {
                backgroundColor: 'transparent',
                onPress: () => {
                    if (item.RequestTypeName) {
                        this.cancelEmployeeOpenShift(item.RequestID)
                    }
                    else {
                        this.setState({ loading: true })
                        this.props.openEmployeeShiftRequest({ DailyScheduleID: item.DailyScheduleID })
                    }

                },
                disabled:  item.InTime === '00:00:00' && item.OutTime === '00:00:00' ? true : false,
                component: <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor:'red',
                        flex: 1
                        // top: 20,
                        // flexDirection: 'column',
                    }}>
                    {item.RequestTypeName ? <View style={{ backgroundColor: 'red', height: 65, width: 120, borderRadius: 5, alignItems: 'center', justifyContent: 'space-around' }}>
                        <Image source={Images.CloseIcon} style={{ height: Matrics.CountScale(25), width: Matrics.CountScale(25) }} />
                        <Text style={{ fontFamily: Fonts.NunitoSansRegular, color: 'white', fontSize: Matrics.CountScale(16), }}>Cancel Shift</Text>
                    </View>
                        : <Image style={{ height: 65, width: 120, borderRadius: 5 }} source={Images.OperShiftImg}></Image>
                    }
                </View>
            }
        ]

        let req_type = 'Open'
        return (

            <Swipeout autoClose={true}
                close={this.state.openIndex != index}
                buttonWidth={Matrics.CountScale(160)} right={swipeoutBtns}
                // disabled={item.RequestTypeName ? true : false}
                onOpen={(sectionID, rowId, direction) => {
                    this.setState({ openIndex: index })
                }}
                scroll={event => this._allowScroll(event)}
                backgroundColor={'transparent'}>
                <TouchableOpacity
                    onPress={() => {

                        this.props.navigation.navigate('SwapOffer', { itemData: item, getMyScheduleData: this.getMyScheduleData.bind(this) })

                    }}
                    style={[Styles.dayCard, item.RequestTypeName != '' ? { borderRightColor: Colors.YELLOW, borderRightWidth: Matrics.CountScale(8) } : {}]}
                    disabled={item.RequestTypeName == ''}
                >
                    <View style={Styles.dateContainer} >
                        <Text style={Styles.dayTextStyle} >
                            {Global.getDayValue(item.ScheduleDate)}
                        </Text>
                        <View style={index == 0 && this.currentDate == item.ScheduleDate ? Styles.currentDateStyle : Styles.dateTextContainer}>
                            <Text style={[Styles.dateTextStyle, { color: index == 0 && this.currentDate == item.ScheduleDate ? 'white' : 'black' }]}>{Global.getDateFromDate(item.ScheduleDate)}</Text>
                        </View>
                    </View>

                    <View style={Styles.shopNameContainer} >
                        {
                            item.InTime === '00:00:00' && item.OutTime === '00:00:00'
                            ?   <Text style={Styles.timeTextStyle}>Off Work</Text>
                            : 
                                <View>
                                    <Text style={Styles.timeTextStyle} >{`${Global.getTime24to12(item.InTime)} - ${Global.getTime24to12(item.OutTime)}`}</Text>

                                    <Text style={Styles.shopNameTextStyle}>
                                        Shop #{item.StoreNumber}
                                    </Text>
                                    {
                                        item.RequestTypeName != '' && item.RequestCount > 0
                                        ? <Text style={Styles.offerTextStyle}>{item.RequestCount} swap offers</Text> 
                                        : null
                                    }
                                </View>
                        }
                        
                        
                    </View>

                    {/* {item.InTime == '00:00:00' && item.OutTime == '00:00:00' ?
                        <View style={{ justifyContent: 'center' }}><Text style={Styles.timeTextStyle}> Off Work </Text></View>
                        : <View style={Styles.shopNameContainer} >
                            <Text style={Styles.timeTextStyle} >{`${Global.getTime24to12(item.InTime)} - ${Global.getTime24to12(item.OutTime)}`}</Text>

                            <Text style={Styles.shopNameTextStyle}>
                                Shop #{item.StoreNumber}
                            </Text>
                            {
                                item.RequestTypeName == req_type ? <Text style={Styles.offerTextStyle}>{item.RequestCount} swap offers</Text> : null
                            }

                        </View>} */}

                </TouchableOpacity>
            </Swipeout>
        )
    }

    async onShopChanged(value, index, data) {
        console.log(value, index, data)
        if (index == 0) {
            this.setState({ myScheduleData: this.state.allData })
        }
        else {
            await this.setState({ selectedShopId: data[index].DisplayStoreNumber })
            let newArr = []
            _.forEach(this.state.allData, (res) => {
                let tmp = _.filter(res.data, (resp) => {
                    return Number(resp.StoreNumber) == this.state.selectedShopId;
                })
                if (tmp.length != 0) {
                    newArr.push({ 'title': res.title, 'data': tmp })
                }
            })
            this.setState({ myScheduleData: newArr })
        }

    }

    render() {
        return (
            <View style={Styles.pageBody}>
                {/* <StatusBar barStyle="dark-content"></StatusBar> */}

                {/* ======>>>>>>>>>  Header  start  <<<<<<<======== */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity style={MasterCssEmployee.leftStyle}
                        onPress={() => {

                            // const setParamsAction = NavigationActions.setParams({
                            //     params: { tabBarVisible: false },
                            //     key: 'MySchedule',
                            // });
                            // this.props.navigation.dispatch(setParamsAction)
                            this.props.navigation.navigate('History')
                        }}
                    >
                        <Image style={[MasterCssEmployee.iconStyle, { height: 20, width: 20 }]} source={Images.MyScheduleHeaderLeft}></Image>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={{ fontSize: 18, fontFamily: Fonts.NunitoSansRegular, color: Colors.BLACK, fontWeight: 'bold' }}>My Schedule</Text>
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
                    <TouchableOpacity style={MasterCssEmployee.rightStyle}
                        onPress={() => {

                            // const setParamsAction = NavigationActions.setParams({
                            //     params: { tabBarVisible: false },
                            //     key: 'MySchedule',
                            // });
                            // this.props.navigation.dispatch(setParamsAction)
                            this.props.navigation.navigate('CreateRequest')
                        }}
                    >
                        <Image style={[MasterCssEmployee.iconStyle, { height: 20, width: 20, }]} source={Images.MyScheduleHeaderRight}></Image>

                    </TouchableOpacity>
                </View>
                <View  style={{  alignItems: 'center', height: Matrics.CountScale(50),  backgroundColor: 'white',}}>
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
                        // onChangeText={(val) => {
                        //     console.log(val, "selected");
                        // }}
                    />
                </View>
                {/* ======>>>>>>>>>  Header  end  <<<<<<<======== */}
                <View style={{ margin: Matrics.CountScale(10), flex: 1 }}>

                    <SectionList
                        ListEmptyComponent={() => <View>
                            <Text style={Styles.errMsgStyle}>No data found!</Text>
                        </View>}
                        refreshing={this.state.refreshing}
                        onRefresh={this.pullToRefresh}
                        renderItem={this.renderMyScheduleData}
                        renderSectionHeader={this.renderMyScheduleHeader}
                        sections={this.state.myScheduleData}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={this.state.scrollEnabled}
                    />
                </View>
                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }
}

// ======>>>>>>>>> StyleSheet <<<<<<<========
const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND
    },
    HeaderContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Matrics.headerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Matrics.CountScale(25),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15),
    },
    leftStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 0.5,
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    rightStyle: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 0.5
    },
    dayCard: {
        backgroundColor: 'white',
        borderRadius: Matrics.CountScale(5),
        flexDirection: 'row',
        marginTop: Matrics.CountScale(5),
        marginBottom: Matrics.CountScale(5),
    },
    monthTextStyle: {
        color: 'grey',
        backgroundColor: Colors.BODYBACKGROUND,
        fontSize: Matrics.CountScale(15),
        padding: Matrics.CountScale(5),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    dateContainer: {
        paddingBottom: Matrics.CountScale(15),
        paddingTop: Matrics.CountScale(15),
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'column'
    },
    dayTextStyle: {
        color: 'grey',
        paddingBottom: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(13),
        fontFamily: Fonts.NunitoSansRegular
    },
    shopNameContainer: {
        flex: 1,
        paddingBottom: Matrics.CountScale(20),
        paddingTop: Matrics.CountScale(20),
        flexDirection: 'column'
    },
    shopNameTextStyle: {
        color: 'grey',
        fontSize: Matrics.CountScale(14),
        paddingTop: Matrics.CountScale(10),
        fontFamily: Fonts.NunitoSansRegular
    },
    offerTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.CountScale(14),
        paddingTop: Matrics.CountScale(10),
        fontFamily: Fonts.NunitoSansRegular
    },
    currentDateStyle: {
        top: 5,
        backgroundColor: Colors.APPCOLOR,
        height: Matrics.CountScale(30),
        width: Matrics.CountScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Matrics.CountScale(30) / 2
    },
    dateTextContainer: {
        top: 5,
        height: Matrics.CountScale(30),
        width: Matrics.CountScale(30),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTextStyle: {
        padding: Matrics.CountScale(5)
    },
    timeTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.BLACK,
        fontSize: Matrics.CountScale(17),

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
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getMyScheduleRequest, getEmployeeStoreRequest, openEmployeeShiftRequest, deleteEmployeeOpenShiftRequest
})(MySchedule);
