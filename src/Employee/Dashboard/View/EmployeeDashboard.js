// =======>>>>>>>>  Libraries   <<<<<<<<<<<=========
import React from 'react';
import {
    View,
    StyleSheet,
    PanResponder, Platform, 
    BackAndroid, BackHandler, Dimensions, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback, Image, Text
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import moment from "moment";
import _ from 'lodash';

// =======>>>>>>>>  Assets   <<<<<<<<<<<=========
import { TextInputView, Button, LoadWheel, ResignModal } from "@Components";
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import FeedbackCards from './Templetes/FeedbackCards';
import {
    getEmployeeTotalWorkedHours,
    getEmployeeBasicDetails,
    getEmployeePersonalDetails,
    getEmployeeGuestFeedback,
    getNotificationListDetails,
    SaveUpdateUserDevices
} from '@Redux/Actions/DashboardEmployeeActions'
import {
    getMyScheduleRequest
} from '@Redux/Actions/MyScheduleActions'
const { width } = Dimensions.get('window');
import Global from '../../../GlobalFunction'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
currentDate = '';
class EmployeeDashboard extends React.Component {
    state = {
        entries: [],
        activeSlide: 0,
        loading: true,
        modalVisible: false,
        markedDates: {},
        workedHours: '0',
        totalFeedback: 0,
        schedule: {},
        feedbackAction: true,
        hoursLoading: false,
        totalNotifications: ''
    }
    constructor(props) {
        super(props)
        date = new Date;
        this.currentDate = date

        //this.currentDate = moment(date).format('YYYY-MM-DD');
    }

    // ======>>>>>>> Life Cycle Methods  <<<<<<<========
    async UNSAFE_componentWillMount() {
        const UserId = await AsyncStorage.getItem('UserID');
        console.log('userId-->', UserId);
        console.log('DeviceInfo-->', DeviceInfo);
        let DeviceId = '';

        const currentDate = moment(new Date()).format("MM/DD/YYYY");
        let WeekEndingDate = '';
        if(moment(currentDate).format('dddd') === 'Tuesday'){
            WeekEndingDate = currentDate;
        } else if(moment(currentDate).format('dddd') === 'Monday'){
            WeekEndingDate = moment(currentDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")
        } else {
            WeekEndingDate = moment(currentDate).add(1,'weeks').isoWeekday(2).format("MM/DD/YYYY")
        }
        // await DeviceInfo.getUniqueId().then(uniqueId => {
        //     DeviceId = uniqueId;
        // });
        DeviceId = DeviceInfo.getUniqueId();
        console.log('DeviceInfo123-->', DeviceId);
        // ======>>>>>>> API CALLS  <<<<<<<========
        this.props.getEmployeeTotalWorkedHours({
            WeekEndDate: WeekEndingDate
        });
        this.props.getEmployeeGuestFeedback({
            FeedBackType: '1',
            PageSize: '7',
            PageNo: '1'
        });
        this.props.getEmployeePersonalDetails()

        this.props.SaveUpdateUserDevices({
            "UserID": UserId,
            "DeviceID": DeviceId,
            "IsDeleted": 0
        })
        console.log('4 api call -->');
        let sdate = new Date();
        // let startDate = Global.getDateValue(sdate)
        // let endDate = Global.getDateAfterSomeMonth(sdate, 2)

        let startDate = '11-21-2018'
        let endDate = '12-06-2018'

        this.props.getMyScheduleRequest({ StartDate: startDate, EndDate: endDate })

        this.props.getNotificationListDetails({
            MessageType: 4,
            IsInbox: true, PageSize: 1, PageNo: 1
        })
    }

    componentDidMount() {
        this.profileflag = false
        this.feedbackflag = false
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.employeeWorkHourSuccess) {
            this.feedbackflag = true
            if (this.profileflag && this.feedbackflag) {}
                this.setState({ loading: false })
            console.log('workhours-->', nextProps.data.employeeWorkHourdata)
            if(nextProps.data.employeeWorkHourdata.Data != null)
                this.setState({ workedHours: nextProps.data.employeeWorkHourdata.Data.TotalHours })
        }
        else if (nextProps.data.employeePersonalDetailsSuccess) {
            this.profileflag = true
            if (this.profileflag && this.feedbackflag)
                this.setState({ loading: false })
            let response = nextProps.data.employeePersonalDetailsdata
            console.log('response-->', response.Status);
            if (response.Status == 1) {
                const data = nextProps.data.employeePersonalDetailsdata.Data
                console.log('userDetails-->', data);
                this.setState({
                    university: 'University of ' + data.State,
                    address1: data.Address1,
                    address2: data.Address2,
                    city: data.City,
                    Profile: data.ProfilePicture,
                    coverPhoto: data.CoverPhoto,
                    state: data.State,
                    zip: data.ZipCode,
                    email: data.Email,
                    cellphone: data.CellPhone,
                    homephone: data.HomePhone,
                    name: data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName,
                    Position: data.Position,
                })
            }
            else {
                console.log('in else logout');
                AsyncStorage.clear();
                // this.navigateToScreen('Login')
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction)
                //setTimeout(() => { alert(response.Message) }, Global.alert_timeout)
            }

            // if (this.state.ProfilePicture) {
            // this.setState({ loading: false })
            //  } 
        }
        else if (nextProps.data.employeeGuestFeedbackSuccess && this.state.feedbackAction) {
            this.setState({ feedbackAction: false })
            let data = nextProps.data.employeeGuestFeedbackdata
            console.log('feedback-->' + JSON.stringify(data));
            if(data.Status === 1){
                this.setState({ entries: data.Data.FeedBack, totalFeedback: data.Data.TotalRecords })
            }
            
        }
        else if (nextProps.data.getNotificationDetailsSuccess) {
            let data = nextProps.data.notificationDetailsdata.Data
            // console.log(data)
            this.setState({ totalNotifications: data.TotalRecords })
        }
        else if (nextProps.data.SaveUpdateUserDevicesSuccess) {
            // let data = nextProps.data.SaveUpdateUserDevicesSuccess.data
            let data = nextProps.data.data
            console.log('data-->', data);
        }
        else if (nextProps.data.employeePersonalDetailsFail || nextProps.data.employeeGuestFeedbackFail || nextProps.data.getNotificationDetailsFail || nextProps.mySchedule.getMyScheduleFailed || nextProps.data.SaveUpdateUserDevicesFail) {
            this.setState({ loading: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }



        if (nextProps.mySchedule.getMyScheduleSuccess) {
            //this.setState({ loading: false })
            let response = nextProps.mySchedule.data
            if (response.Status == 1) {

                this.setState({ schedule: response.Data[0] })
                console.log('today', response.Data[0])
            }
        }
        // else if (nextProps.mySchedule.getMyScheduleFailed) {

        // }

    }

    navigateToScreen(route) {
        const navigateAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(navigateAction);

    }

    // ==========>>>>> Rendering Slider Card  <<<<<<<===========
    _renderItem({ item, index }) {
        return (
            <FeedbackCards
                date={`${moment.parseZone(item.FeedbackDate).format('MMM DD, ddd [at] hh:mma')}  •  ${item.StoreNumber}`}
                content={item.Feedback}
            />
        );
    }

    // ==========>>>>> Pagination for Slider  <<<<<<<===========

    get pagination() {
        const { entries, activeSlide } = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                dotContainerStyle={{ height: Matrics.CountScale(10), padding: 0 }}
                containerStyle={{ paddingTop: 0, paddingBottom: Matrics.CountScale(10) }}
                tappableDots={true}
                dotStyle={{
                    width: Matrics.CountScale(10),
                    height: Matrics.CountScale(10),
                    borderRadius: Matrics.CountScale(5),
                    marginHorizontal: Matrics.CountScale(-10),
                    backgroundColor: 'grey'
                }}
                inactiveDotStyle={{
                    width: Matrics.CountScale(10),
                    height: Matrics.CountScale(10),
                    borderRadius: Matrics.CountScale(5),
                    marginHorizontal: Matrics.CountScale(-10),
                    borderWidth: 1,
                    borderRadius: Matrics.CountScale(5),
                    backgroundColor: 'white'
                }}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.9}
            />
        );
    }

    // ==========>>>>> Render Method  <<<<<<<===========
    render() {
        return (
            <View style={Styles.pageBody}>

                {/* ==========>>>>> Modal For calendar <<<<<<<======== */}

                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { console.log("Modal has been closed.") }}>
                    <View style={styles.modal}>
                        <View style={styles.calendarContainer}>
                            <Calendar
                                style={styles.calendar}
                                onDayPress={(selectedDate) => {
                                    //console.log(selectedDate)

                                    var dayOfWeek = 3;//friday
                                    var date = new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day);
                                    var sDate = date.setDate(date.getDate() + (dayOfWeek - 7 - date.getDay()) % 7);
                                    var startdt = new Date(sDate)
                                    //console.log('std', startdt);

                                    var dt = date.setDate(date.getDate() + 6)
                                    //console.log('***', dt)

                                    var arr = [];
                                    var start = startdt

                                    var i = 0

                                    var end = dt
                                    //alert(moment(end).format('MM-DD-YYYY'))
                                    this.hoursEndDate = moment(end).format('MM-DD-YYYY')
                                    // var day = new Date(selectedDate.dateString);
                                    //nextDay.setDate(day.getDate() + 1);
                                    // console.log('End...', end)
                                    // console.log('new...', Global.getYearToDate(dt))


                                    while (start <= end) {

                                        var mm = ((start.getMonth() + 1) >= 10) ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1);
                                        var dd = ((start.getDate()) >= 10) ? (start.getDate()) : '0' + (start.getDate());
                                        var yyyy = start.getFullYear();
                                        var date = yyyy + "-" + mm + "-" + dd; //yyyy-mm-dd

                                        //console.log(date);
                                        if (i == 0)
                                            arr[date] = { startingDay: true, selected: true, color: Colors.APPCOLOR, textColor: 'white' }
                                        else if (date == Global.getYearToDate(dt))
                                            arr[date] = { endingDay: true, color: Colors.APPCOLOR, textColor: 'white' }
                                        else
                                            arr[date] = { color: 'rgb(224,243,234)', textColor: 'black' }

                                        start = new Date(start.setDate(start.getDate() + 1));

                                        i++; //date increase by 1
                                        //console.log(start)
                                    }
                                    // alert(new Date(end))


                                    // for (let index = 0; index <= selectedDate.day - this.currentDate.getDate(); index++) {
                                    //     if (index == 0) {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { startingDay: true, selected: true, color: 'green', textColor: 'white' }
                                    //     }
                                    //     else if (index == selectedDate.day - this.currentDate.getDate()) {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { endingDay: true, color: 'green', textColor: 'white' }
                                    //     }
                                    //     else {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { color: 'lightgreen', textColor: 'black' }
                                    //     }
                                    //     console.log(Object.assign({}, arr));
                                    // }

                                    // for (let index = 0; index <= selectedDate.day - this.currentDate.getDate(); index++) {
                                    //     if (index == 0) {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { startingDay: true, selected: true, color: 'green', textColor: 'white' }
                                    //     }
                                    //     else if (index == selectedDate.day - this.currentDate.getDate()) {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { endingDay: true, color: 'green', textColor: 'white' }
                                    //     }
                                    //     else {
                                    //         arr[this.currentDate.getFullYear() + '-' + `0${(this.currentDate.getMonth() + 1)}` + '-' + (this.currentDate.getDate() + index)] = { color: 'lightgreen', textColor: 'black' }
                                    //     }
                                    //     console.log(Object.assign({}, arr));
                                    // }
                                    this.setState({ markedDates: Object.assign({}, arr) })
                                }}
                                markedDates={this.state.markedDates}
                                markingType={'period'}
                                theme={{
                                    backgroundColor: 'red'
                                }}
                            />
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ flex: 1, marginBottom: Matrics.CountScale(30), marginHorizontal: Matrics.CountScale(30), alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.setState({ modalVisible: false, markedDates: {} })}>
                                        <Image style={styles.calCloseIcon} source={Images.CalenderCloseIcon}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginBottom: Matrics.CountScale(30), marginHorizontal: Matrics.CountScale(30), alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ modalVisible: false, hoursLoading: true, loading: true })
                                        this.props.getEmployeeTotalWorkedHours({
                                            WeekEndDate: this.hoursEndDate
                                        });
                                    }}>
                                        <Image style={styles.calSelectIcon} source={Images.CalenderSelectedIcon}></Image>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>

                {/* ==========>>>>>  Profile Image Container <<<<<<<======== */}                 
                <View style={Styles.imageBox}>
                    <TouchableWithoutFeedback
                        // style={{marginTop: Platform.OS == 'ios' ? (Matrics.screenHeight == 812 ? 900 : 20) : 0 }}
                        onPress={() => {
                            this.props.navigation.navigate('ProfileEmployee');
                        }}>
                        <Image style={Styles.profileImg}
                            source={this.state.Profile != '' ? { uri: this.state.Profile } : Images.ProfileIconPlaceholder} 
                        />
                    </TouchableWithoutFeedback>
                </View>


                {/* ==========>>>>>  Page Container Starts Here <<<<<<<======== */}

                <ScrollView style={{ flex: 1 }}>
                    <View style={Styles.cardsContainer}>

                        {/* ==========>>>>>  Works Hours Card <<<<<<<======== */}

                        <TouchableOpacity onPress={() => {
                            this.setState({ modalVisible: true })
                        }} style={Styles.Card}>
                            <View style={Styles.headerIcon}>
                                <Image style={Styles.clockIcon} source={Images.EmpClockIcon}></Image>
                            </View>
                            <View style={Styles.cardBody}>
                                <Text style={Styles.hoursText}>{this.state.workedHours}</Text>
                                <Text style={Styles.labelText}>Hours worked</Text>
                            </View>
                        </TouchableOpacity>

                        {/* ==========>>>>>  Notification Card <<<<<<<======== */}

                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Notification');
                            }}
                            style={Styles.Card}
                        >
                            <View style={Styles.headerIcon}>
                                <Image style={Styles.bellIcon} source={Images.BellIcon}></Image>
                            </View>
                            <View style={Styles.cardBody}>
                                <Text style={Styles.hoursText}>{this.state.totalNotifications}</Text>
                                <Text style={Styles.labelText}>Notifications</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* ==========>>>>>  Availability Card <<<<<<<======== */}
                    {_.isEmpty(this.state.schedule) == false ?
                        <TouchableOpacity style={Styles.availabilityCard}
                            onPress={() => {
                                this.props.navigation.navigate('MySchedule');
                            }}
                        >
                            <View style={Styles.headerIcon}>
                                <Image style={Styles.storeIcon} source={Images.StoreIcon}></Image>
                            </View>
                            <View>
                                <Text style={Styles.shopTextStle}>
                                    Shop #{this.state.schedule.StoreNumber}
                                </Text>
                                <Text style={Styles.dateTextStyle}>
                                    {moment.parseZone(this.state.schedule.ScheduleDate).format('MMM DD, ddd')}  •  {Global.getTime24to12(this.state.schedule.InTime)} - {Global.getTime24to12(this.state.schedule.OutTime)}
                                </Text>

                                <Text style={Styles.shiftTextStyle}>
                                    Next Shift
                             </Text>

                            </View>
                        </TouchableOpacity>
                        : null}


                    {/* ==========>>>>>  Feedback Header <<<<<<<======== */}

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('FeedbackHistory');
                        }}
                        style={Styles.guestHeader}>
                        <Text style={Styles.guestHeaderText}>
                            {`Guest Feedback (${this.state.totalFeedback})`}
                        </Text>
                    </TouchableOpacity>


                    {/* ==========>>>>>  GuestFeedback Slider Cards <<<<<<<======== */}
                    {
                        this.state.entries.length > 0
                        ?
                        <View style={Styles.sliderContainer}>
                            <Carousel
                                style={Styles.guestHeader}
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.entries}
                                renderItem={this._renderItem}
                                sliderWidth={width - Matrics.CountScale(20)}
                                itemWidth={width - Matrics.CountScale(20)}
                                onSnapToItem={(index) => this.setState({ activeSlide: index })}
                            />
                            <View>
                                {this.pagination}
                            </View>
                        </View>
                        : <Text style={[Styles.guestHeaderText, { marginLeft: Matrics.CountScale(10), fontSize: Matrics.CountScale(14)}]}>No Guest Feedback Available.</Text>
                    }
                    
                </ScrollView>

                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }
}

//=======>>>>>>>>>  Styles for Modal <<<<<<<<=========
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
    },
    text: {
        color: '#3f2949',
        marginTop: Matrics.CountScale(10)
    },
    calendar: {
        paddingTop: Matrics.CountScale(5),
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(5),
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: Matrics.CountScale(10),
        backgroundColor: '#eee'
    },
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
    calendarContainer: {
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(5),
        backgroundColor: Colors.WHITE
    },
    calCloseIcon: {
        alignSelf: "center",
        height: Matrics.CountScale(40),
        width: Matrics.CountScale(40),
        resizeMode: 'contain',
    },
    calSelectIcon: {
        alignSelf: "center",
        height: Matrics.CountScale(40),
        width: Matrics.CountScale(40),
        resizeMode: 'contain',
    }
})

//=======>>>>>>>>> Styles for Dashboard Container <<<<<<<<<<<=========
const Styles = {
    pageBody: {
        flex: 1,
        // padding: Matrics.CountScale(5),
        backgroundColor: Colors.BODYBACKGROUND
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBox: {
        alignSelf: 'center',
        padding: Matrics.CountScale(25),
        flex: 0.1,
        paddingBottom: Matrics.CountScale(20),
        // paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight >= 812 ? Matrics.CountScale(35) : Matrics.CountScale(20)) : 0
        marginTop: Platform.OS == 'ios' ? Matrics.CountScale(20) : 0
    },
    cardsContainer: {
        flexDirection: 'row',
        height: Matrics.CountScale(160),
        justifyContent: 'center'
    },
    Card: {
        flex: 1,
        margin: Matrics.CountScale(5),
        borderRadius: Matrics.CountScale(5),
        backgroundColor: 'white',
        padding: Matrics.CountScale(10)
    },
    headerIcon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

    },
    hoursText: {
        fontSize: Matrics.CountScale(60),
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansSemiBold
    },
    labelText: {
        fontFamily: Fonts.NunitoSansSemiBold,
        fontSize: Matrics.CountScale(15),
        color: 'grey'
    },
    cardBody: {
        paddingLeft: Matrics.CountScale(5)
    },
    availabilityCard: {
        marginTop: Matrics.CountScale(7),
        margin: Matrics.CountScale(5),
        borderRadius: Matrics.CountScale(3),
        flex: 0.5,
        padding: Matrics.CountScale(10),
        // justifyContent: 'center',
        height: Matrics.CountScale(130),
        backgroundColor: 'white',

    },
    guestHeader: {
        padding: Matrics.CountScale(10),
        height: Matrics.CountScale(40),
        flex: 1,
        justifyContent: 'center'
    },
    guestHeaderText: {
        color: 'grey',
        fontFamily: Fonts.NunitoSansSemiBold,
        fontSize: Matrics.CountScale(15)
    },
    feedbackCard: {
        marginTop: Matrics.CountScale(7),
        margin: Matrics.CountScale(5),
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(10),
        backgroundColor: 'white',
    },
    profileImg: {
        height: Matrics.CountScale(65),
        width: Matrics.CountScale(65),
        borderRadius: Matrics.CountScale(33)
    },
    clockIcon: {
        height: Matrics.CountScale(19),
        width: Matrics.CountScale(19)
    },
    bellIcon: {
        height: Matrics.CountScale(19),
        width: Matrics.CountScale(16)
    },
    storeIcon: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(18)
    },
    shopTextStle: {
        color: 'grey',
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    dateTextStyle: {
        paddingTop: Matrics.CountScale(8),
        paddingBottom: Matrics.CountScale(8),
        color: 'black',
        fontSize: Matrics.CountScale(17),
        fontFamily: Fonts.NunitoSansBold
    },
    shiftTextStyle: {
        color: 'grey',
        fontSize: Matrics.CountScale(15),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    sliderContainer: {
        //height: Matrics.CountScale(180),
        backgroundColor: 'white',
        flex: 1,
        margin: Matrics.CountScale(5),
        alignItems: 'center'
    }
}
const mapStateToProps = (state) => {
    return {
        data: state.DashboardEmployee,
        mySchedule: state.MySchedule
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getEmployeeBasicDetails,
    getEmployeePersonalDetails,
    getEmployeeTotalWorkedHours,
    getEmployeeGuestFeedback,
    getMyScheduleRequest,
    getNotificationListDetails,
    SaveUpdateUserDevices
})(EmployeeDashboard);

