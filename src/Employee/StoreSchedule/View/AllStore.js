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
import CalendarStrip from '../../../Resources/react-native-calendar-strip';
import { Dropdown } from 'react-native-material-dropdown'
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { LoadWheel } from "@Components";
import Global from '../../../GlobalFunction'
import DateTimePicker from 'react-native-modal-datetime-picker';
let self;
//let UserStoreGuid = JSON.parse(global.user.LoginObject).Login.UserStoreGuid;

/*  =============>>>>>>>>> Classs Declaration <<<<<<<<<<============= */
class AllStore extends React.Component {
    state = {
        selectedUser: '',
        storeScheduleData: [],
        loading: true,
        selectedDate: '',
        storelist: [],
        selectedShopId: 0,
        selectedShopName: '',
        allStoreData: [],
        refreshing: false,
        storeLoader:  true,
        isDateTimePickerVisible:false
    }
    calendarRef = React.createRef();
    UNSAFE_componentWillMount() {
        self = this;
        console.log(this.props, "receive");
        this.UserStoreGuid = JSON.parse(global.user.LoginObject).Login.UserStoreGuid
        let startDate = moment(new Date()).format("MM/DD/YYYY");
        // let startDate = '02/09/2021';
        // console.log('startDate-->', startDate)
        this.setState({ selectedDate: startDate })
        this.props.getStoreSchedule({ StartDate: startDate, IsMobile: 1 });
        this.props.getAllStoreRequest();
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.storeSchedule.getStoreScheduleSuccess && (this.state.loading || this.state.refreshing)) {
            let response = nextProps.storeSchedule.data
            console.log("store....4", response)
            if (response.Status == 1 && (this.state.loading || this.state.refreshing)) {
                this.setState({ 
                    storeScheduleData: response.Data, 
                    allStoreData: response.Data, 
                    loading: false, 
                    refreshing: false  
                });

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
                        // console.log(res)
                        _.forEach(res.EmployeeAllShifts, (allShifts) => {
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
                        });
                    }
                })
                this.offers = offerRequest;
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
                // console.log('offerRequest',offerRequest)
            }
            else {
                // setTimeout(() => { alert(response.Message) }, Global.alert_timeout)
                this.setState({ storeScheduleData: [], loading: false, refreshing: false })
            }
        }
        if (nextProps.storeSchedule.getAllStoreSuccess && this.state.storeLoader ) {
            this.setState({ storeLoader: false })
            let response = nextProps.storeSchedule.data
            console.log('response store-->',response)
            if (response.Status == 1) {
                let numArr = []
                // response.Data.forEach(element => {
                //     numArr.push({
                //         StoreID: element.StoreID,
                //         DisplayStoreNumber: Number(element.DisplayStoreNumber),
                //         UserStoreID: element.UserStoreID,
                //         UserStoreGuid: element.UserStoreGuid
                //     })
                // });
                // let storelist = _.sortBy(numArr, ['DisplayStoreNumber']);
                // this.setState({ storelist: [{ DisplayStoreNumber: 'All Shops' }, ...storelist] })
                this.setState({ storelist: response.Data, selectedShopId: response.Data[0].UserStoreID, selectedShopName: response.Data[0].DisplayStoreNumber });
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
        let data = {}
        // console.log('item-->', item);
        if(item.EmployeeAllShifts.length > 0){
            item.EmployeeAllShifts.forEach((res) => {
                if (Global.getDateValue(res.ScheduleDate) ==  moment(self.state.selectedDate).format('MM-DD-YYYY')){
                    data = res.EmployeeShifts[0]
                }
            })
        }
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
                    autoClose={true} 
                    buttonWidth={Matrics.CountScale(250)}
                    right={swipeoutBtns} 
                    disabled={this.state.changeClass}
                    backgroundColor={'transparent'}
                >
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
        // console.log(value, index, data)
        if (index == 0) {
            this.setState({ storeScheduleData: this.state.allStoreData })
        }
        else {
            await this.setState({ selectedShopId: data[index].UserStoreID, selectedShopName: data[index].DisplayStoreNumber })
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
        this.props.getStoreSchedule({ StartDate: this.state.selectedDate, IsMobile: 0 })
    }

    hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible:false})
    }

    handleDatePicked = (date) => {
        this.setState({isDateTimePickerVisible:false, selectedDate: moment(date, 'MMMM DD, YYYY').format('MM/DD/YYYY'), loading: true });
        this.props.getStoreSchedule({ StartDate:  moment(date, 'MMMM DD, YYYY').format('MM/DD/YYYY'), IsMobile: 0 });
        this.calendarRef.current.setSelectedDate(date)
    }

    render() {
        // console.log('this.state.storeScheduleData-->',this.state.storeScheduleData)
        return (
            <>
            {this.state.isDateTimePickerVisible && <DateTimePicker 
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                date={this.state.selectedDate?new Date(moment(this.state.selectedDate, 'MM-DD-YYYY').format('MMMM DD, YYYY')):new Date(this.state.selectedDate)}
            />}
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
                <View  style={{  alignItems: 'center'}}>
                    <Dropdown
                        containerStyle={{ width: Matrics.CountScale(150), bottom: 25 }}
                        data={this.state.storelist}
                        value={this.state.selectedShopName}
                        onChangeText={(value, index, data) => this.onShopChanged(value, index, data)}
                        //onChangeText={(value, index, data) => this.setState({ selectedShopId: data[index].StoreNumber })}
                        // valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber == 'All Shops' ? DisplayStoreNumber : `Shop ${DisplayStoreNumber}`}
                        valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber == 'All Shops' ? DisplayStoreNumber : `${DisplayStoreNumber}`}
                        inputContainerStyle={{ borderBottomColor: 'transparent', }}
                        overlayStyle={{ borderWidth: 2 }}
                        dropdownOffset={{ top: 32, left: 0 }}
                        // dropdownPosition={5}
                        fontSize={17}
                        itemCount={8}
                        rippleCentered={true}
                        selectedTextStyle={{ textAlign: 'center'}}
                    />
                </View>
                {this.renderCalender()}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.storeScheduleData}
                            renderItem={this.renderStoreSchedule}
                            extraData={this.state}
                            scrollEnabled={this.state.scrollEnabled}
                            onRefresh={this.pullToRefresh}
                            refreshing={this.state.refreshing}
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={() => !this.state.loading &&
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={Styles.errMsgStyle}>No data found!</Text>
                                </View>
                            }
                        />
                    </View>
                </View>
                <LoadWheel visible={this.state.loading} onRequestClose={() => this.setState({ loading: false })} />
            </View >
            </>
        );
    }

    /*  =============>>>>>>>>> Calender <<<<<<<<<<============= */
    renderCalender() {
        let datesWhitelist = [{
            start: moment(),
            end: moment().add(3, 'days')  // total 4 days enabled
        }];
        let datesBlacklist = [moment().add(1, 'days')]; // 1 day disabled
        // console.log('selectedDate-->', this.state.selectedDate)
        return (
            <View style={{ top : -20, }}>
                <CalendarStrip
                    calendarAnimation={{ type: 'sequence', duration: 100 }}
                    startingDate={moment(this.state.selectedDate)}
                    selectedDate={moment(this.state.selectedDate)}
                    // selectedDate={moment(this.state.selectedDate)}
                    daySelectionAnimation={{
                        type: 'border',
                        duration: 500,
                        borderWidth: 1,
                        borderHighlightColor: Colors.APPCOLOR,
                    }}
                    ref={this.calendarRef}
                    style={Styles.calendarStyle}
                    calendarColor={Colors.WHITE}
                    calendarHeaderStyle={{
                        color: Colors.BLACK,
                    }}
                    highlightDateNumberStyle={{
                        color: Colors.APPCOLOR,
                        borderRadius: 10

                    }}
                    highlightDateNameStyle={{
                        color: Colors.APPCOLOR
                    }}
                    onWeekChanged={(data, start, end) => { 
                        console.log('onWeekChanged-->',data); 
                        console.log('sle-->',moment(Global.getDateValue(data._d)).format('MM/DD/YYYY')); 
                        this.setState({ selectedDate: moment(Global.getDateValue(data._d), 'MM-DD-YYYY').format('MM/DD/YYYY'), loading: true });
                        this.props.getStoreSchedule({ StartDate:  moment(Global.getDateValue(data._d), 'MM-DD-YYYY').format('MM/DD/YYYY'), IsMobile: 0 })
                    }}
                    onDateSelected={(data) => {
                        console.log('onDateSelected-->', data);
                        this.setState({ selectedDate: moment(Global.getDateValue(data._d), 'MM-DD-YYYY'), loading: true });
                        this.props.getStoreSchedule({ StartDate:  moment(Global.getDateValue(data._d),'MM-DD-YYYY').format('MM/DD/YYYY'), IsMobile: 0 });
                    }}
                    iconContainer={{ flex: 0.1 }}
                />
                <TouchableOpacity style={{position:"absolute", top:28, right:20}} onPress={()=>this.setState({isDateTimePickerVisible:true})}>
                    <Image style={{ width: Matrics.CountScale(23), height: Matrics.CountScale(21) }} source={`${Images.StoreActiveIcon}`} ></Image>
                </TouchableOpacity>
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
                component: 
                <View
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
                <Swipeout 
                    autoClose={true} buttonWidth={Matrics.CountScale(250)} 
                    right={swipeoutBtns} 
                    disabled={this.state.changeClass} 
                    backgroundColor={'transparent'}
                >

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

