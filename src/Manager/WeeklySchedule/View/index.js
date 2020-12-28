// ======>>>>> Libraries <<<<<=========
import React from 'react';
import {
    View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, Platform,
    Dimensions, TextInput, Alert, RefreshControl
} from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SearchableDropdown from '../../../CustomComponent/react-native-searchable-dropdown';

// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Images, Matrics, MasterCss } from '@Assets'
import { connect } from 'react-redux';
import { TextInputView, Button, LoadWheel } from "@Components";
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../../../Components/Common/Header';
import Collapsible from 'react-native-collapsible';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarPicker from '../../../CustomComponent/react-native-calendar-picker';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment'
import {Picker} from '@react-native-community/picker';
import _ from 'lodash'
import {
    getPayrollTaxListRequest, getWeeklyScheduleInfoRequest, getWeatherDetailsListRequest, getWeeklyScheduleEmployeeRequest,
    getWeeklyScheduleEmployeeReturnRequest, DeleteEmployeeSchedule, CreateUpdateEmployeeSchedule,
    getTimeOffReasonsListRequest, CreateEmployeeTimeOff, getIdleEmployeesReportRequest, getWeeklyScheduleEmployeeCountRequest,
    getweeklyScheduleSharedEmployeeRequest, getweeklyScheduleSharedEmployeeScheduleRequest, getLinkedEmployeeDetailsRequest,
    getweeklyScheduleHoursRequest, ChangeEmployeeStatusRequest, DeleteEmployeeTimeOffDayWise
} from '@Redux/Actions/WeeklyScheduleActions';
import { getHeaderFilterValuesRequest } from '@Redux/Actions/HirePacketsActions';
import Global from '../../../GlobalFunction';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const SLIDER_WIDTH = viewportWidth;

let repeatType = [
    { value: 'Day' },
    { value: 'Week' }
];
let self = ''


export const TextRow = ({ labelText, contentText, bgColor }) => {
    return (
        <View style={[Styles.rowContainer, { backgroundColor: bgColor }]}>
            <View style={Styles.rowTitleStyle}>
                <Text style={Styles.mainContainerLabel}>{labelText}</Text>
            </View>
            <Text style={[Styles.fontStyle, { flex: 1, textAlign: 'center' }]}>{contentText}</Text>
        </View>
    )
}


export const ManagerArtistTextRow = ({ experience, labelText,employeeStatus,ContactNumber, shiftData, time, hour, bgColor, selectedDate, onPress, index, TotalfinalRoleEmployeeData, IsLinked, onLinkPress, onLayout, selectedJumpEmpName}) => {
    // if( selectedDate == 'Total')
    //     console.log('TotalfinalRoleEmployeeData-->',TotalfinalRoleEmployeeData.length)
    // console.log('selectedJumpEmpName-->', selectedJumpEmpName)
    return (
        <View style={[Styles.rowContainer, { backgroundColor: bgColor, borderBottomColor: Colors.BORDERCOLOR, borderBottomWidth: 2 }]}
            onLayout={(e) => {selectedJumpEmpName != '' ? onLayout(e.nativeEvent.layout.height) : onLayout(0) }}
            key={selectedJumpEmpName}
        >
            <View style={Styles.rowTitleStyle}>
                <Text style={Styles.mainContainerLabel}>{labelText}</Text>
                <Text style={Styles.mainContainerLabel}>{employeeStatus}</Text>
                {
                    employeeStatus == 'Active' && ContactNumber != '' &&
                    <Text style={Styles.mainContainerLabel}>{ContactNumber}</Text>
                }
                <View style={{ flexDirection: 'row'}}>
                <View style={{ flexDirection: 'row', marginTop: Matrics.CountScale(5), marginLeft: Matrics.CountScale(10), borderRadius: 15, alignItems: 'center', backgroundColor: Colors.BGYELLOW, alignSelf: 'flex-start', padding: Matrics.CountScale(4) }}>
                    <Image source={Images.Star} />
                    <Text style={{ fontSize: 8, marginHorizontal: Matrics.CountScale(3) }}>{experience}</Text>
                </View>
                {
                    IsLinked == true &&
                    <Icon
                        style={{ alignSelf: 'center', marginLeft: Matrics.CountScale(5) }}
                        name="link" color="#03AAEE" size={15}
                        onPress={() => onLinkPress() }
                    />
                }
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center',paddingVertical: shiftData.length == 0 ? Matrics.CountScale(20) : 0 }}>
                {
                    selectedDate !== 'Total'
                    ? shiftData.length > 0
                        ?
                        shiftData.map(res => {
                            // console.log('date-->1->', res );
                            // console.log('date-->2->', selectedDate);
                            return (
                                res.ScheduleDate === selectedDate
                                    ? res.DailyScheduleID !== 0
                                        ? 
                                            <View style={{ paddingTop: Matrics.CountScale(10)}}>
                                                <TouchableOpacity
                                                    onPress={() => onPress(res)}
                                                    style={{ borderWidth: 1, borderRadius: 3, backgroundColor: Global.getShiftBgColor(res.DayPartColor), borderColor: Global.getShiftBorderColor(res.DayPartColor) }}
                                                >
                                                    <Text style={[Styles.fontStyle, { marginHorizontal: Matrics.CountScale(5), fontSize: Matrics.CountScale(12), color: Colors.BLACK }]} >
                                                        {`${moment(res.InTime, "h:mm A").format('hh:mm a')} - ${moment(res.OutTime, "h:mm A").format('hh:mm a')}`}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(12) }]}>
                                                    {/* {Global.getTimeDiff(res.InTime, res.OutTime)} */}
                                                    {res.HoursCount}
                                                </Text>
                                            </View>
                                        : 
                                            <View style={{ paddingTop: Matrics.CountScale(10) }}>
                                                 <TouchableOpacity
                                                    onPress={() => onPress(res)}
                                                    style={{ borderWidth: 1, borderRadius: 3, backgroundColor: Global.getShiftBgColor(res.DayPartColor), borderColor: Global.getShiftBorderColor(res.DayPartColor) }}
                                                >
                                                    <Text style={[Styles.fontStyle, { marginHorizontal: Matrics.CountScale(5), fontSize: Matrics.CountScale(12), color: Colors.BLACK }]} >
                                                        {res.Reason}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                    :
                                    // <TouchableOpacity onPress={() => onPress()}>
                                    //     <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(14), }]}>                                      </Text>
                                    //     {/* <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(14) }]}>No shift data available</Text> */}
                                    // </TouchableOpacity>
                                    null
                            )
                        })
                        :
                        <TouchableOpacity onPress={() => onPress()}>
                            <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(14), }]}>                                      </Text>
                            {/* <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(14) }]}>No shift data available</Text> */}
                        </TouchableOpacity>
                    : 
                    <View style={{ padding: Matrics.CountScale(10) }}>
                        <Text style={[Styles.fontStyle, { textAlign: 'center', fontSize: Matrics.CountScale(12) }]}>
                            {TotalfinalRoleEmployeeData.length > 0 
                                // ?  TotalfinalRoleEmployeeData[index].FullName == labelText
                                //     ? TotalfinalRoleEmployeeData[index].TotalShiftHours.toFixed(2) 
                                //     : 0.00
                                // : 0.00}
                                ? 
                                    TotalfinalRoleEmployeeData.map(data => {
                                        return(
                                            data.FullName == labelText
                                            ?  data.TotalShiftHours.toFixed(2)
                                            :  null
                                        )
                                    })
                                : null
                            }
                        </Text>
                    </View>
                }
            </View>
        </View>
    )
}

// ======>>>>> Class Declaration <<<<<=========
class WeeklySchedule extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    //--------->>>State Initilization----------->>>
    state = {
        password: "",
        repeatPassword: "",
        showMore: true,
        managerContentShow: true,
        sandwichArtistShow: true,
        timingModal: false,
        endingDate: '',
        isTimePickerVisible: false,
        shiftinTime: '',
        shiftoutTime: '',
        selectedVal: 'shift',
        selectedDayIndex: 0,
        loading: true,
        daysData: [],
        dayIndex: 0,
        weatherListData: [],
        employeeData: [],
        employeeRerurnData: [],
        timeoffResonsData: [],
        selectedDate: '',
        // userRole: userRole,
        repeatEvery: false,
        timeoffStartDate: '',
        timeoffEndDate: '',
        absenceReason: [],
        selectedReasonId: '',
        selectedReasonName: '',
        attachFile: '',
        attachFilePath: '',
        timeoffNotes: '',
        repeatEveryType: 'Day',
        startDateError: '',
        endDateError: '',
        resonError: '',
        resonDetailError: '',
        endingDateError: '',
        filterModal: false,
        weekendDate: '',
        userRole: [],
        Stores: [],
        IdleEmployeeList: [],
        IdleShow: false,
        weekEndDateError: '',
        ofEmployeeScheduleData: [],
        TaxValue: 0,
        sharedEmployee: [],
        sharedEmployeeSchedule: [],
        finalSharedEmployeeData: [],
        LinkedDetailsArr: [],
        linkDetailModal: false,
        linkUsername: '',
        ScheduleHoursArr: [],
        confirmationModal: false,
        YearID: '',
        selectedRoleId: 0,
        selectedStoreId: -1,
        getFilterData: false,
        currentWeekEndDate: '',
        lastFilterselectedRoleId: -1,
        TotalofEmployeeScheduleData: [],
        TotalfinalRoleEmployeeData: [],
        TotalfinalSharedEmployeeData: [],
        TotalScheduleHours: 0,
        refreshing: false,
        selectedUsers: 0,
        Users: [],
        selectedRoleName: '',
        lastFilterselectedUserId: 0,
        JumtoEmpModal: false,
        empShiftWise: [],
        selectedJumpEmpName: '',
        selectedEmpIndex: 0,
        disableEditDeleteShiftButton: false,
        upperSectionHeight: 1,
        headContainerHeight: 1,
        prevIndex: 0,
        isLoad: true,
        selectedStoreIndex: -1,
        lastFilterselectedIndex: -1,
        resetFilter: false,
    };

    //------------>>>LifeCycle Methods------------->>>

    async UNSAFE_componentWillMount() {
        self = this
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            // console.log('will global.selectedStore-->', parseInt(global.selectedStore,10))
            // console.log('will global.weekenddate-->', global.WeekendDate)
            await this.setState({ 
                selectedStoreId: parseInt(global.selectedStore,10), 
                lastFilterselectedStoreId: parseInt(global.selectedStore,10), 
                isLoad: true,
                loading: true,
                getFilterData: false
            });
            const currentDate = moment(new Date()).format("MM/DD/YYYY");
            let WeekEndingDate = '';
            if(global.WeekendDate != ''){
                if(moment(global.WeekendDate).format('dddd') === 'Tuesday'){
                    WeekEndingDate = global.WeekendDate;
                } else if(moment(global.WeekendDate).format('dddd') === 'Monday'){
                    WeekEndingDate = moment(global.WeekendDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")
                } else {
                    WeekEndingDate = moment(global.WeekendDate).add(1,'weeks').isoWeekday(2).format("MM/DD/YYYY")
                }
            } else {
                if(moment(currentDate).format('dddd') === 'Tuesday'){
                    WeekEndingDate = currentDate;
                } else if(moment(currentDate).format('dddd') === 'Monday'){
                    WeekEndingDate = moment(currentDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")
                } else {
                    WeekEndingDate = moment(currentDate).add(1,'weeks').isoWeekday(2).format("MM/DD/YYYY")
                }
            }
            const YearID = WeekEndingDate !== '' ? WeekEndingDate.split('/')[2] : '';
            

            await this.setState({ weekendDate: WeekEndingDate,currentWeekEndDate: WeekEndingDate, YearID, lastFilterweekendDate: WeekEndingDate  })
            if(this.state.isLoad) {
                this.headerfilterFlag = false;
                this.timeOffReasonsFlag = false;

                this.props.getHeaderFilterValuesRequest({ StoreId: this.state.selectedStoreId, RoleId: this.state.selectedRoleId, FilterId: -1, BusinessTypeId: 1 });
                this.props.getTimeOffReasonsListRequest();

            }
        });
            console.log('will mount-->', this.state.selectedStoreId, '--isload--',this.state.isLoad )
            // if(this.state.isLoad) {
            //     this.headerfilterFlag = false;
            //     this.timeOffReasonsFlag = false;

            //     this.props.getHeaderFilterValuesRequest({ StoreId: this.state.selectedStoreId, RoleId: this.state.selectedRoleId, FilterId: -1, BusinessTypeId: 1 });
            //     this.props.getTimeOffReasonsListRequest();

            // } else 
            if(this.state.selectedStoreId !== -1) {
                this.taxListFlag = false;
                this.infoFlag = false;
                this.detailsListFlag = false;
                this.scheduleEmployeeFlag = false;
                this.scheduleEmployeeReturnFlag = false;
                this.idleEmployeeReportFlag = false;
                this.employeeCountFlag = false;
                this.sharedEmployeeFlag = false;
                this.sharedEmployeeScheduleFlag = false;
                this.ScheduleHoursFlag = false;
                this.props.getPayrollTaxListRequest({ BusinessTypeId: 1, PayrollTaxGUID: '', YearID: this.state.YearID });
                this.props.getWeeklyScheduleInfoRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getWeatherDetailsListRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
                // this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20 });
                this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20, orderByColumnName: 'StoreNumber', orderByValue: false});
                this.props.getWeeklyScheduleEmployeeCountRequest({ StoreId: this.state.selectedStoreId, Type: 1, WeekEnding: this.state.weekendDate });
                this.props.getweeklyScheduleSharedEmployeeRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getweeklyScheduleSharedEmployeeScheduleRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getweeklyScheduleHoursRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
            }
        
    }

    componentDidMount() {
        setTimeout(() => {
            this.myComponent.measure((fx, fy, width, height, px, py) => {
                this.topSpace = py - 10
                this.setState({ topSpace: this.topSpace })
            })
        }, 100);
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.headerFiltervalues.getHeaderFilterValuesSuccess && this.state.loading && !this.headerfilterFlag && !this.state.getFilterData) {
            this.headerfilterFlag = true;
            console.log('filter success')
            // if (this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false })

            let data = nextProps.headerFiltervalues.data
            if (data.Status === 1) {
                const roleSelect = {
                    RoleID: 0,
                    RoleName: 'shops'
                }
                if(data.Report.user_list.length > 0){
                    const userSelect = {
                        UserID: 0,
                        UserName: `Select ${this.state.selectedRoleName} User`
                    }
                    data.Report.user_list.unshift(userSelect);
                }
                data.Report.role_list.unshift(roleSelect);
                if (data.Report.store_list.length > 0) {
                    var i;
                    for (i = 0; i < data.Report.store_list.length; i++) {
                        data.Report.store_list[i].name = data.Report.store_list[i]['DisplayStoreNumber'];
                        delete data.Report.store_list[i].key1;
                    }
                }
                let selectedStoreArr = data.Report.store_list.filter(S => S.StoreID == parseInt(global.selectedStore,10));
                let index = -1;
                if(parseInt(global.selectedStore,10) != -1){
                    index = data.Report.store_list.length > 0 && data.Report.store_list.findIndex(s => s.StoreID === parseInt(global.selectedStore,10));
                } else {
                    index = data.Report.store_list.length > 0 && data.Report.store_list.findIndex(s => s.StoreID === data.Report.store_list[0].StoreID);
                }
                console.log('kkindex-->', index)
                await this.setState({
                    userRole: data.Report.role_list,
                    Stores: data.Report.store_list,
                    getFilterData: true,
                    selectedStoreId: parseInt(global.selectedStore,10) != -1 ? parseInt(global.selectedStore,10) : data.Report.store_list[0].StoreID,
                    selectedStoreName: selectedStoreArr.length > 0 ? selectedStoreArr[0].DisplayStoreNumber : data.Report.store_list[0].DisplayStoreNumber,
                    lastFilterselectedStoreId: parseInt(global.selectedStore,10) != -1 ? parseInt(global.selectedStore,10) : data.Report.store_list[0].StoreID,
                    lastFilterselectedStoreName: selectedStoreArr.length > 0 ? selectedStoreArr[0].DisplayStoreNumber : data.Report.store_list[0].DisplayStoreNumber,
                    Users: data.Report.user_list,
                    isLoad: false,
                    selectedStoreIndex: index,
                    lastFilterselectedIndex: index,
                });
                if(this.state.getFilterData) {
                    console.log('will mount call')
                    this.UNSAFE_componentWillMount();
                }
            }

        }

        if (nextProps.response.GetPayrollTaxListSuccess && (this.state.loading || this.state.refreshing)) {
            this.taxListFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false, refreshing: false })

            let data = nextProps.response.data;
            if (data.Status == 1 && data.Data.length > 0) {
                this.setState({ TaxValue: data.Data[0].TaxValue });
            }
        } 
        else if (nextProps.response.weeklyScheduleInfoSuccess && (this.state.loading || this.state.refreshing)) {
            this.infoFlag = true
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false, refreshing: false })

            let data = nextProps.response.data;
            console.log('info-->', data);
            if (data.Status == 1) {
                data.Average.push({DayDate: 'Total'});
                await this.setState({ 
                    daysData: data.Average,
                    timeoffEndDate: moment(data.Average[0].DayDate).format('MM-DD-YYYY'), 
                    timeoffStartDate: moment(data.Average[0].DayDate).format('MM-DD-YYYY') 
                });
                if(this.state.selectedDate != 'Total') {
                    this.setState({ selectedDate: data.Average[0].DayDate });
                }
                if(this.state.daysData.length > 0 ) {
                    this.calculateTotalDaysData();
                }
                // console.log('DaysData', data.Average)
            }

        }
        else if (nextProps.response.getWeatherDetailsListSuccess && (this.state.loading || this.state.refreshing)) {
            this.detailsListFlag = true
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false, refreshing: false })

            let data = nextProps.response.data

            if (data.Status == 1) {
                this.setState({ weatherListData: data.List })
            }

        }
        else if (nextProps.response.getWeeklyScheduleEmployeeSuccess && (this.state.loading || this.state.refreshing)) {
            this.scheduleEmployeeFlag = true

            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false, refreshing: false })

            let data = nextProps.response.data
            if (data.Status == 1) {
                console.log('getWeeklyScheduleEmployeeSuccess-->',data.Data._shiftsList )
                await this.setState({ employeeData: data.Data._shiftsList })
                if (this.state.employeeData.length > 0 && this.state.employeeRerurnData.length > 0) {
                    this.setEmpData()
                }
            }
        }
        else if (nextProps.response.getWeeklyScheduleEmployeeReturnSuccess && (this.state.loading || this.state.refreshing)) {
            this.scheduleEmployeeReturnFlag = true
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false})

            let data = nextProps.response.data
            if (data.Status == 1) {
                console.log('getWeeklyScheduleEmployeeReturnSuccess-->',data.Data )
                await this.setState({ employeeRerurnData: data.Data })
                if (this.state.employeeRerurnData.length > 0) {
                    this.setEmpData()
                }
            }

        }
        else if (nextProps.response.getTimeoffReasonsSuccess && this.state.loading) {
            this.timeOffReasonsFlag = true
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false })
            let data = nextProps.response.data
            if (data.Status == 1) {
                await this.setState({ absenceReason: data.Data });
            }
        }
        else if (nextProps.response.GetIdleEmployeesReportSuccess && (this.state.loading || this.state.refreshing)) {
            this.idleEmployeeReportFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false})
            let data = nextProps.response.data
            if (data.Status == 1) {
                await this.setState({ IdleEmployeeList: data.Report.Data });
            }
        }
        else if (nextProps.response.GetWeeklyScheduleEmployeeCountSuccess && (this.state.loading || this.state.refreshing)) {
            this.employeeCountFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false})
            let data = nextProps.response.data;
            
            if (data.Status == 1) {
                await this.setState({ ofEmployeeScheduleData: data.Data });
            }
            if(this.state.ofEmployeeScheduleData.length > 0){
                this.calculateTotalOfEmployeeSchedule()
            }
        }
        else if (nextProps.response.GetweeklyScheduleSharedEmployeeSuccess && (this.state.loading || this.state.refreshing)) {
            this.sharedEmployeeFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false})
            let data = nextProps.response.data;
            if (data.Status == 1) {
                await this.setState({ sharedEmployee: data.Data });

            }
        }
        else if (nextProps.response.GetweeklyScheduleSharedEmployeeScheduleSuccess && (this.state.loading || this.state.refreshing)) {
            this.sharedEmployeeScheduleFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false})
            let data = nextProps.response.data;
            if (data.Status == 1) {
                // console.log('sharedEmployeeschedule-->', data);
                await this.setState({ sharedEmployeeSchedule: data.Data._shiftsList });

            }
        } else if (nextProps.response.GetweeklyScheduleHoursSuccess && (this.state.loading || this.state.refreshing)) {
            this.ScheduleHoursFlag = true;
            if (this.taxListFlag && this.idleEmployeeReportFlag && this.headerfilterFlag && this.infoFlag && this.detailsListFlag && this.scheduleEmployeeFlag && this.scheduleEmployeeReturnFlag && this.timeOffReasonsFlag && this.employeeCountFlag && this.sharedEmployeeFlag && this.sharedEmployeeScheduleFlag && this.ScheduleHoursFlag)
                this.setState({ loading: false , refreshing: false })
            let data = nextProps.response.data;
            if (data.Status == 1) {
                await this.setState({ ScheduleHoursArr: data.Data });
                console.log('ScheduleHoursArr-->', this.state.ScheduleHoursArr);
                if(this.state.ScheduleHoursArr.length > 0 ) {
                    this.calculateTotalHoursSchedule();
                }
            }
        } else if (nextProps.response.GetLinkedEmployeeDetailsSuccess) {
            console.log('linkdetails-->', nextProps.response.data)
            let data = nextProps.response.data;
            if (data.Status == 1) {
                this.setState({ LinkedDetailsArr: data.Basic });
            }
        }
        else if (nextProps.response.deleteEmployeeScheduleSuccess) {
            let data = nextProps.response.data;
            if (data.Status == 1) {
                this.scheduleEmployeeFlag = false;
                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                this.setState({ timingModal: false, loading: true });
            }
        }
        else if (nextProps.response.createUpdateEmployeeScheduleSuccess) {
            let data = nextProps.response.data;
            if (data.Status == 1) {
                this.scheduleEmployeeFlag = false;
                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                this.setState({ timingModal: false, loading: true });
            } else {
                await setTimeout(() => {
                    Alert.alert(
                        '',
                        data.Message,
                        [
                            { text: 'OK', onPress: () => this.setState({ timingModal: false }) },
                        ],
                        { cancelable: false },
                    );
                }, 1000);

            }
        }
        else if (nextProps.response.ChangeEmployeeStatusSuccess) {
            let data = nextProps.response.data;
            // console.log('change status-->', data);
            if (data.Status == 1) {
                this.setState({ addToScheduleStatusId: '', addToScheduleUserStoreID: '', confirmationModal: false, loading: true });
                this.idleEmployeeReportFlag = false;
                this.scheduleEmployeeReturnFlag = false;
                // this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20 });
                this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20, orderByColumnName: 'StoreNumber', orderByValue: false});
                this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
            } else {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        { text: 'OK', onPress: () => this.setState({ confirmationModal: false }) },
                    ],
                    { cancelable: false },
                );
            }
        }
        else if (nextProps.response.createTimeoffSuccess) {
            let data = nextProps.response.data;
            // if (data.Status == 1) {
            if(data.Message == 'Employee absence reason saved successfully!') {
                this.scheduleEmployeeFlag = false;
                this.scheduleEmployeeReturnFlag = false;
                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
                this.setState({
                    timingModal: false,
                    selectedReasonId: '',
                    selectedReasonName: '',
                    timeoffNotes: '',
                    UserStoreGUID: '',
                    attachFile: '',
                    attachFilePath: '',
                    loading: true,
                });

            // } else if (data.Status == 0) {
            } else {
                await setTimeout(() => {
                    Alert.alert(
                        '',
                        data.Message,
                        [
                            { text: 'OK', onPress: () => this.setState({ timingModal: false }) },
                        ],
                        { cancelable: false },
                    );
                }, 1000);

            }
        } else if(nextProps.response.deleteEmployeeTimeoffDaywiseSuccess) {
            let data = nextProps.response.data;
            console.log('timeoff success-->', data)
            if (data.Status == 1) {
                this.scheduleEmployeeFlag = false;
                this.scheduleEmployeeReturnFlag = false;
                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
                this.setState({
                    timingModal: false,
                    loading: true,
                });
            } else {
                await setTimeout(() => {
                    Alert.alert(
                        '',
                        data.Message,
                        [
                            { text: 'OK', onPress: () => this.setState({ timingModal: false }) },
                        ],
                        { cancelable: false },
                    );
                }, 1000);
            }
        }
        
        if (this.state.sharedEmployee.length > 0 && this.state.sharedEmployeeSchedule.length > 0) {
            this.setSharedEmpData()
        }
    }

    componentWillUnmount() {
        console.log('unmount weekly')
        this.focusListener.remove();
    }


    //------------->>>Controllers/Functions------------>>>>

    calculateTotalDaysData() {
        let TotalAVGSales6Weeks = 0;
        let TotalAVGUnitsWeeks = 0;
        let TotalLabourGoals = 0;
        let TotalHoursScheduled = 0;
        let TotalScheduledProductivity = 0;
        let TotalProductivityGoal = 0;
        let TotalGrossPayroll = 0;
        let TotalNetPayroll = 0;
        this.state.daysData.forEach( child => {
            if(child.DayDate !== 'Total') {
                TotalAVGSales6Weeks = TotalAVGSales6Weeks + child.AVGSales6Weeks;
                TotalAVGUnitsWeeks = TotalAVGUnitsWeeks + child.AVGUnitsWeeks;
                TotalLabourGoals = TotalLabourGoals + child.AVGUnitsWeeks != 0 && child.ProductivityGoal != 0 ? Number((child.AVGUnitsWeeks / child.ProductivityGoal).toFixed(2)) : 0;
                TotalHoursScheduled = TotalHoursScheduled + Number((child.TotalHoursScheduled).toFixed(2));
                if((child.AVGSales6Weeks / child.TotalHoursScheduled).toFixed(2) !== 'Infinity'){
                    TotalScheduledProductivity = TotalScheduledProductivity + Number((child.AVGSales6Weeks / child.TotalHoursScheduled).toFixed(2));
                }
                TotalProductivityGoal = TotalProductivityGoal + Number((child.ProductivityGoal).toFixed(2));
                TotalGrossPayroll = TotalGrossPayroll + Number(((child.AVGSales6Weeks * (this.state.TaxValue / 100)) + child.NetPayroll).toFixed(2));
                TotalNetPayroll = TotalNetPayroll + Number((child.NetPayroll).toFixed(2));
            }
        });
        this.setState({
            TotalAVGSales6Weeks,
            TotalAVGUnitsWeeks,
            TotalLabourGoals,
            TotalHoursScheduled,
            TotalScheduledProductivity,
            TotalProductivityGoal,
            TotalGrossPayroll,
            TotalNetPayroll
        });
    }
    calculateTotalHoursSchedule() {
        let TotalScheduleHours = 0;
        this.state.ScheduleHoursArr.forEach( child => {
            TotalScheduleHours = TotalScheduleHours + child.ScheduleHours
        });
        this.setState({ TotalScheduleHours });
    }
    calculateTotalOfEmployeeSchedule() {
        let kerArr = [];
        let TotalofEmployeeScheduleData = [];
        this.state.ofEmployeeScheduleData.forEach( child => {
            if (child.WeekDate == this.state.ofEmployeeScheduleData[0].WeekDate) {
                kerArr.push({'Timing': child.Timing, "EmployeesCount": child.EmployeesCount});
            }
        });

        kerArr.forEach( data => {
            let EmployeesCount = 0;
            this.state.ofEmployeeScheduleData.forEach( child => {
                if (data.Timing == child.Timing) {
                    EmployeesCount = EmployeesCount + child.EmployeesCount;
                }
            });
            TotalofEmployeeScheduleData.push({'Timing': data.Timing, "EmployeesCount": (EmployeesCount / 7).toFixed(2) });
        });
       
        console.log('TotalofEmployeeScheduleData-->', TotalofEmployeeScheduleData);
        this.setState({ TotalofEmployeeScheduleData })
    }
    setEmpData() {
    //    console.log('empdata***', this.state.employeeRerurnData)
    //    console.log('empdata***', this.state.employeeData)
        //common array
        let empShiftWise = [];
        this.state.employeeRerurnData.forEach((parent) => {
            let shiftData = [];
            if(this.state.employeeData.length > 0){
                this.state.employeeData.forEach((child) => {
                    if (parent.UserStoreID === child.UserStoreID) {
                        const shiftTime = {
                            "InTime": child.InTime,
                            "OutTime": child.OutTime,
                            "Notes": child.Notes,
                            "EndingDate": child.EndingDate,
                            "ScheduleDate": child.ScheduleDate,
                            "DailyScheduleID": child.DailyScheduleID,
                            "RepeatType": child.RepeatType,
                            "TimeOffCombineID": child.TimeOffCombineID,
                            "Reason": child.Reason,
                            "HoursCount": child.HoursCount,
                            "DayPartColor": child.DayPartColor
                        }
                        shiftData.push(shiftTime);
                    }
                })
            }
            let EmpData = parent;
            EmpData['ShiftData'] = shiftData;
            empShiftWise.push(EmpData);
        });
        this.setState({ empShiftWise });
        // console.log('empShiftWise-->', JSON.stringify(empShiftWise));
        //end of common array

        let empRoleData = [];
        _.forEach(empShiftWise, (res) => {
            if (_.some(empRoleData, { 'RoleName': res.RoleName })) {
                var index = empRoleData.findIndex(data => data.RoleName == res.RoleName);
                empRoleData[index].data.push(res)
            }
            else {
                let tmproledata = []
                tmproledata.push(res)
                empRoleData.push({ 'RoleName': res.RoleName, 'expand': true, 'data': tmproledata })
            }
        })
        
        // console.log('empRoleData-->', JSON.stringify(empRoleData));

        let TotalfinalRoleEmployeeData = [];
        empRoleData.forEach(child => {
            child.data.forEach(data => {
                let TotalShiftHours = 0;
                if(data.ShiftData.length > 0) {
                    data.ShiftData.forEach( innerdata => {
                        TotalShiftHours = TotalShiftHours + innerdata.HoursCount;
                    });
                }
                TotalfinalRoleEmployeeData.push({
                    "EmployeeNumber": data.EmployeeNumber,
                    "FullName": data.FullName,
                    "TotalShiftHours": TotalShiftHours,
                });
            });
        });

        this.setState({ empRoleData, TotalfinalRoleEmployeeData })
        // console.log('TotalfinalRoleEmployeeData-->', TotalfinalRoleEmployeeData);

    }

    setSharedEmpData() {
        console.log('this.state.sharedEmployee-->',this.state.sharedEmployee)
        console.log('this.state.sharedEmployeeSchedule-->',this.state.sharedEmployeeSchedule)
        let finalSharedEmployeeData = [];
        let TotalfinalSharedEmployeeData = [];
        _.forEach(this.state.sharedEmployee, (res) => {
            let shiftData = [];
            _.forEach(this.state.sharedEmployeeSchedule, (child) => {
                // if (res.UserStoreID === child.UserStoreID) {
                    const tmpshiftData = {
                        "DisplayStoreNumber": child.DisplayStoreNumber,
                        "InTime": child.InTime,
                        "OutTime": child.OutTime,
                        "ScheduleDate": child.ScheduleDate,
                        "HoursCount": child.HoursCount
                    }
                    shiftData.push(tmpshiftData);
                // }
            });
            let sharedEmpList = res;
            let sharedEmpShift = {
                "shiftData": shiftData
            }
            let merged = { ...sharedEmpList, ...sharedEmpShift };
            finalSharedEmployeeData.push(merged)
        });
        
        console.log('sharedEmployeefinal-->', finalSharedEmployeeData)

        finalSharedEmployeeData.forEach(child => {
            let TotalSharedEmpShiftHours = 0;
            child.shiftData.forEach( data => {
                // console.log('typeoff-->', Global.getTimeDiff(data.InTime, data.OutTime).replace(/:/g, "."));
                TotalSharedEmpShiftHours = TotalSharedEmpShiftHours + data.HoursCount;
            });
            TotalfinalSharedEmployeeData.push({
               "EmpNumber": child.EmpNumber,
               "FirstName": child.FirstName,
               "LastName": child.LastName,
               "TotalSharedEmpShiftHours": TotalSharedEmpShiftHours,
            });
        });
        this.setState({ finalSharedEmployeeData, TotalfinalSharedEmployeeData });
        // console.log('TotalfinalSharedEmployeeData-->', TotalfinalSharedEmployeeData)
    }

    getTimeoff = (UserStoreGuid,TimeOffCombineID) => {
        // console.log('getTimeOff-->', UserStoreGuid);
        return new Promise(resolve => {
          fetch(`https://api.subsource.com/GetEmployeeTimeOff/?UserStoreGuid=${UserStoreGuid}&TimeOffCombineID=${TimeOffCombineID}&PageNumber=1&PageSize=20`,{ 
            method: 'GET', 
            headers: new Headers({
            'Authorization': 'Bearer ' + global.user.access_token,
            'Content-Type': 'application/json'
            })
          }).then(json => json.json()) 
        .then(function(response) {
            resolve(response);
          }).catch((error) => {
            console.error(error);
          });
        });
    }

    getRole() {
        let data = []
        for (i = 0; i < this.state.userRole.length; i++) {
            data.push(<Picker.Item label={this.state.userRole[i].RoleName} value={this.state.userRole[i].RoleID} />);
        }
        return data;
    }

    getUsers() {
        let data = []
        for (i = 0; i < this.state.Users.length; i++) {
            data.push(<Picker.Item label={this.state.Users[i].UserName} value={this.state.Users[i].UserID} />)
        }
        return data
    }

    getStores() {
        let data = []
        for (i = 0; i < this.state.Stores.length; i++) {
            data.push(<Picker.Item label={this.state.Stores[i].DisplayStoreNumber} value={this.state.Stores[i].StoreID} />);
        }
        return data;
    }

    _showDateTimePicker = (val) => this.setState({ isDateTimePickerVisible: true, dateFlag: val });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        // if(this.state.selectedVal == 'shift' && this.state.dateFlag == 'endingDate'){
        //     this.setState({ endingDate: moment(date).format('MM/DD/YYYY'), endingDateError: '' })
        // } else {
        this._hideDateTimePicker();
        if (this.state.dateFlag == 'startDate') {
            this.setState({ timeoffStartDate: moment(date).format('MM/DD/YYYY'), startDateError: '' });
        } else {
            if (moment(date).format('MM/DD/YYYY') < this.state.timeoffStartDate) {
                this.setState({ endDateError: 'End date should be greater than Start date' });
            } else {
                this.setState({ timeoffEndDate: moment(date).format('MM/DD/YYYY'), endDateError: '' });
            }

        }

        // }

        if (this.state.dateFlag === 'weekending') {
            if (moment(date).format('dddd') === 'Tuesday') {
                this.setState({ weekendDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: '' })
            } else {
                this.setState({ weekendDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: 'Please Select Valid Weekend Date' })
            }
        }

        
    };

    _showTimePicker(val) {
        this.setState({ isTimePickerVisible: true, timeFlag: val });
    }
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        this._hideTimePicker();
        let val = moment(time).format('hh:mm:ssa')
        if (this.state.timeFlag == 'InTime') {
            this.setState({ shiftinTime: val, InTimeError: '' })
            var date1 = new Date('01/01/2011 '+ moment(this.state.shiftoutTime, "h:mm A").format('h:mm A')); 
            var date2 = new Date('01/01/2011 '+ moment(val, "h:mm A").format('h:mm A'));
            if(date2 >= date1){
                this.setState({ outTimeError: 'Out Time ShouldBe GraterThan To InTime', shiftoutTime: '' })
            } else {
                this.setState({ outTimeError: '' })
            }
        }
        else if (this.state.timeFlag == 'OutTime') {
            var date1 = new Date('01/01/2011 '+ moment(val, "h:mm A").format('h:mm A')); 
            var date2 = new Date('01/01/2011 '+ moment(this.state.shiftinTime, "h:mm A").format('h:mm A'));
            // console.log('date1-->', date1)
            // console.log('date2-->', date2)
            if(date2 >= date1){
                this.setState({ outTimeError: 'Out Time ShouldBe GraterThan To InTime', shiftoutTime: '' })
            } else {
                this.setState({ shiftoutTime: val, outTimeError: '' })
            }
            
        }
        // this._hideTimePicker();
    };

    _renderItem({ item, index }) {
        // if(self.state.weatherListData.length > 0 )
            // console.log('weatherListData-->',self.state.weatherListData);

        return (
            <TouchableOpacity onPress={() => { 
                self.setState({ dayIndex: index, selectedDate: item.DayDate }) 
                if(index >= 6){
                    self.setState({ prevIndex: index-1 });
                }
            }}>
                <View style={[{ backgroundColor: self.state.dayIndex == index ? Colors.SKYBLUE : null, width: Matrics.screenWidth / 2 - Matrics.CountScale(10), alignItems: 'center', paddingVertical: item.DayDate === 'Total' ? Matrics.CountScale(43) : Matrics.CountScale(10), borderColor: Colors.BORDERCOLOR, borderRightWidth: self.state.daysData.length - 1 != index ? 1 : 0 }]}>
                    {
                        item.DayDate != 'Total' ?
                            <Text style={[Styles.fontStyle, self.state.dayIndex == index ? Styles.selectedDayfontStyle : null]}>
                                {moment(item.DayDate).format('MMM DD, ddd')}
                                {/* {moment(item.DayDate).format('MMM DD, YYYY ddd')} */}
                            </Text>
                        :
                            <Text style={[Styles.fontStyle, self.state.dayIndex == index ? Styles.selectedDayfontStyle : null]}>{item.DayDate}</Text>
                    }
                   
                    {
                        item.DayDate != 'Total' ?
                        self.state.weatherListData[index] !== void 0
                            ?   <Image source={self.state.dayIndex == index ? Images.CloudIcon2 : Images.CloudIcon1} style={{ marginVertical: Matrics.CountScale(10) }} />
                            : <View style={{ paddingVertical: Platform.OS == 'ios' ? Matrics.CountScale(28) : Matrics.CountScale(35) }}/>
                        : null
                    }
                    
                    <Text style={[Styles.SmallFontStyle, self.state.dayIndex == index ? Styles.selectedDayfontStyle : null]}>
                        {
                            self.state.weatherListData.length > 0 && item.DayDate != 'Total' ? 
                                self.state.weatherListData[index] !== void 0
                                ? `${self.state.weatherListData[index].High}, ${self.state.weatherListData[index].WeatherTypeName}` 
                                : null
                            : null
                        }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderUserRoleItem = ({ item, index }) => {
        // console.log('renderUserRoleItem--> EmployeeStatus-->',item.EmployeeStatus );
        const fullnameArr = item.FullName != undefined && item.FullName != '' && item.FullName.split(' ');
        let ContactNumber = '';
        if(item.ContactNumber != undefined && item.ContactNumber != ''){
            var x = item.ContactNumber;
            x = x.replace(/\D+/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            ContactNumber = x;
        }
        return (
            <ManagerArtistTextRow
                labelText={item.FullName}
                employeeStatus={item.EmployeeStatus}
                ContactNumber={ContactNumber}
                shiftData={item.ShiftData}
                experience={Global.getYearMonthDiff(item.DoH)}
                selectedDate={this.state.selectedDate}
                index={index}
                TotalfinalRoleEmployeeData = {this.state.TotalfinalRoleEmployeeData}
                IsLinked={item.IsLinked}
                onLinkPress={() => this.onLinkClick(item.UserStoreGUID, fullnameArr.length > 0 ? fullnameArr[0] : '', fullnameArr.length > 0 ? fullnameArr[2] : '')}
                onPress={async (data) => {
                    console.log('timedata-->', data);
                    // 
                    
                    if (data !== undefined) {
                        if(data.DailyScheduleID === 0) {
                            await this.getTimeoff(item.UserStoreGUID, data.TimeOffCombineID).then(data => {
                                console.log('getTimeOff-->timeOffData-->',data);
                                Timeoffdata = [];
                                if(data.Status == 1) {
                                    console.log('timedatalen-->', data.Basic.Data.length);
                                    if( data.Basic.Data.length > 1) {
                                        Timeoffdata = data.Basic.Data[0];
                                        startDtae = data.Basic.Data[data.Basic.Data.length - 1];
                                        this.setState({  
                                            timeoffEndDate: moment(Timeoffdata.TimeOffDate).format('MM-DD-YYYY'), 
                                            timeoffStartDate: moment(startDtae.TimeOffDate).format('MM-DD-YYYY'),
                                            TimeOffID: Timeoffdata.TimeOffID,  
                                        });
                                    } else {
                                        Timeoffdata = data.Basic.Data[0];
                                        this.setState({  
                                            timeoffEndDate: moment(Timeoffdata.TimeOffDate).format('MM-DD-YYYY'), 
                                            timeoffStartDate: moment(Timeoffdata.TimeOffDate).format('MM-DD-YYYY'),
                                            TimeOffID: Timeoffdata.TimeOffID, 
                                        });
                                    }
                                   
                                }
                                this.setState({ Timeoffdata, selectedReasonId: Timeoffdata.ReasonID, selectedReasonName: Timeoffdata.ReasonName, timeoffNotes: Timeoffdata.ReasonDetail });
                                // console.log('Timeoffdata-->', Timeoffdata);
                            });
                            this.setState({ timingModal: true, selectedVal: 'time-off', disableEditDeleteShiftButton: false, resonError: '' });
                        } else {
                            this.setState({
                                timingModal: true,
                                selectedVal: 'shift',
                                shiftinTime: moment(data.InTime, "h:mm A").format('hh:mm:ssa'),
                                shiftoutTime: moment(data.OutTime, "h:mm A").format('hh:mm:ssa'),
                                shiftWeek: '',
                                endingDate: moment(data.EndingDate).format('MM/DD/YYYY'),
                                DailyScheduleID: data.DailyScheduleID,
                                UserStoreGUID: item.UserStoreGUID,
                                UserStoreID: item.UserStoreID,
                                Notes: data.Notes,
                                ScheduleDate: data.ScheduleDate,
                                repeatEvery: data.RepeatType == 0 || data.RepeatType == -1 ? false : true,
                                repeatEveryType: data.RepeatType == 1 ? 'Week' : 'Day',
                                disableEditDeleteShiftButton: false,
                                InTimeError: '',
                                outTimeError: '',
                            });
                        }
                    } 
                    else {
                        this.setState({
                            timingModal: true,
                            selectedVal: 'shift',
                            shiftinTime: '',
                            shiftoutTime: '',
                            shiftWeek: '',
                            endingDate: '',
                            DailyScheduleID: '',
                            UserStoreGUID: item.UserStoreGUID,
                            UserStoreID: item.UserStoreID,
                            disableEditDeleteShiftButton: true,
                            InTimeError: '',
                            outTimeError: '',
                            resonError: '',
                        });
                    }
                }}
                bgColor={index % 2 == 0 ? Colors.ROWBGCOLOR : null} 
                onLayout={(height) => { 
                    // console.log('height-->', height); 
                    // console.log('item-->', this.state.selectedJumpEmpName == item.FullName ? item : {}); 
                    // this.flatList.scrollToItem({
                    //     animated: false,
                    //     item: this.state.selectedJumpEmpName == item.FullName ? item : {} ,
                    //     viewPosition: height
                    // })
                    if(this.state.selectedJumpEmpName == item.FullName){
                        console.log('index-->', index, height, this.state.selectedEmpIndex); 
                        console.log('upperSectionHeight-->', this.state.upperSectionHeight); 
                        console.log('headContainerHeight-->', this.state.headContainerHeight); 
                        console.log('y-->', (this.state.selectedEmpIndex*height)+this.state.upperSectionHeight); 
                        this.scrollview.scrollTo({
                            // y: index == 0 ? (this.state.selectedEmpIndex*2)*(height) : (this.state.selectedEmpIndex*2)*(index*height), 
                            y: (this.state.selectedEmpIndex*height)+this.state.upperSectionHeight+this.state.headContainerHeight, 
                            animated: true
                        });
                    }
                    
                }}
                selectedJumpEmpName={this.state.selectedJumpEmpName}
            />
        );
    }

    async onSelectFile() {
        // DocumentPicker.show({
        //     filetype: [DocumentPickerUtil.allFiles()],
        // }, (error, res) => {
        //     console.log('***name', res);
        //     if (res != null)
        //         this.setState({ attachFile: res.fileName, attachFilePath: res.uri })
        // });
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('***name', res);
            if (res != null)
            this.setState({ attachFile: res.name, attachFilePath: res.uri })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('cancel');
            } else {
                throw err;
            }
        }
    }

    onLinkClick(UserStoreGUID, FirstName, LastName) {
        this.props.getLinkedEmployeeDetailsRequest({ UserStoreGUID: UserStoreGUID });
        this.setState({ linkDetailModal: true, linkUsername: `${FirstName} ${LastName}` });
    }

    async onSelectReason(value, index, data) {
        await this.setState({ selectedReasonId: data[index].ReasonID, resonError: '', selectedReasonName: value })
    }

    async onSelectStore(value, index, data) {
        await this.setState({ selectedStoreId: data[index].StoreID, selectedStoreName: value });
    }

    renderSharedEmployee = ({ item, index }) => {
        if(this.state.selectedDate == 'Total')
            console.log('TotalfinalSharedEmployeeData-->', this.state.TotalfinalSharedEmployeeData)

        let ContactNumber = '';
        if(item.ContactNumber != undefined && item.ContactNumber != ''){
            var x = item.ContactNumber;
            x = x.replace(/\D+/g, '')
                .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            ContactNumber = x;
        }

        return (
            <View style={[Styles.rowContainer, { backgroundColor: index % 2 == 0 ? Colors.ROWBGCOLOR : null }]}>
                <View style={Styles.rowTitleStyle}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name="user-circle-o" size={20} color="#FF7B2A" />
                        <Text style={[Styles.mainContainerLabel, { color: '#FF7B2A' }]}>{item.FirstName}{item.LastName}</Text>
                    </View>
                    {/* <Text style={Styles.roleText}>({item.RoleCode})</Text> */}
                    <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(25) }}>
                        <Text style={{ flex: 1, fontFamily: Fonts.NunitoSansRegular }}>{ContactNumber}</Text>
                        <Icon
                            style={{ alignSelf: 'flex-end', marginRight: Matrics.CountScale(5) }}
                            name="link" color="#03AAEE" size={20}
                            onPress={() => { this.onLinkClick(item.UserStoreGUID, item.FirstName, item.LastName) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: Matrics.CountScale(25) }}>
                        <Image style={{ height: Matrics.CountScale(15), width: Matrics.CountScale(15) }} source={Images.Star} />
                        <Text style={{ marginLeft: Matrics.CountScale(5), fontFamily: Fonts.NunitoSansRegular }}>{Global.getYearMonthDiff(item.DoH)}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, textAlign: 'center' }}>
                    {
                        this.state.selectedDate != 'Total' && item.shiftData.length > 0
                        ?   item.shiftData.map((data) => {
                                if (data.ScheduleDate === this.state.selectedDate) {
                                    return (
                                        <View style={Styles.shistContainer}>
                                            <Text style={Styles.shopText}>Shop #{data.DisplayStoreNumber}</Text>
                                            <View style={Styles.shiftText}>
                                                <Text style={[Styles.fontStyle, { flex: 1 }]}>{`${moment(data.InTime, "h:mm A").format('hh:mm a')} - ${moment(data.OutTime, "h:mm A").format('hh:mm a')}`}</Text>
                                                <Text style={[Styles.fontStyle, { alignSelf: 'flex-end' }]}>{data.HoursCount.toFixed(2)}</Text>
                                            </View>
                                        </View>
                                    )
                                } 
                            })
                        : 
                        this.state.TotalfinalSharedEmployeeData.length > 0
                        ?    this.state.TotalfinalSharedEmployeeData.map((child) => {
                                return (
                                    child.EmpNumber == item.EmpNumber
                                    ? <Text style={Styles.text}>{child.TotalSharedEmpShiftHours.toFixed(2)}</Text>
                                    : null
                                );
                            })
                        : null
                    }
                </View>

            </View>
        )
    }

    renderLinkEmpDetails = ({ item, index }) => {
        return (
            <View style={Styles.linkContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.linkLeftText}>Date:</Text>
                    <Text style={Styles.linkRightText}>{moment(item.CreatedDate).format('MM/DD/YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.linkLeftText}>From Shop:</Text>
                    <Text style={Styles.linkRightText}>{item.FromStore}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.linkLeftText}>To Shop:</Text>
                    <Text style={Styles.linkRightText}>{item.ToStore}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.linkLeftText}>Status:</Text>
                    <Text style={Styles.linkRightText}>{item.StoreStatus}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={Styles.linkLeftText}>Transaction Details:</Text>
                    <Text style={Styles.linkRightText}>By {item.CreatedByName} On {moment(item.TransactionDate).format('MM/DD/YYYY')}</Text>
                </View>
            </View>
        )
    }

    renderUserRole = ({ item, index }) => {
        // console.log('item-->', item);
        // console.log('roleindex-->', index, '-----', item.RoleName);
        return (
            <View style={Styles.containerStyle} >
                <TouchableOpacity 
                    onPress={() => {
                        this.state.empRoleData[index].expand = !this.state.empRoleData[index].expand
                        this.setState({ empRoleData: this.state.empRoleData })
                    }}
                >
                    <View style={Styles.headingStyle}>
                        <Text style={{ color: 'white' }}>{item.RoleName.toUpperCase()}</Text>
                        <Image source={item.expand ? Images.DownArrow : Images.UpArrow} style={{ marginLeft: Matrics.CountScale(10) }} />
                    </View>
                </TouchableOpacity>
                {
                    item.expand ?
                        <View>
                            <FlatList
                                data={item.data}
                                renderItem={this.renderUserRoleItem}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                ref={(ref) => this.flatList = ref}
                            />
                        </View>
                        : null
                }
            </View>
        );
    }

    renderIdleEmployee = ({ item, index }) => {
        return (
            <View style={{ flex: 1, backgroundColor: index % 2 == 0 ? Colors.ROWBGCOLOR : null }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1 }}>
                        <Text style={Styles.idleFont}>{item.FirstName} {item.LastName}</Text>
                        <Text style={Styles.idleFont}>{item.EmployeeNumber}</Text>
                    </View>
                    <TouchableOpacity style={Styles.idleButton} onPress={() => {
                        this.setState({ confirmationModal: true, addToScheduleUserStoreID: item.UserStoreID, addToScheduleStatusId: item.EmployeeStatusID })
                    }}>
                        <Text style={Styles.idlebtnText}>Add To Schedule</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        borderBottomColor: Colors.BORDERCOLOR,
                        borderBottomWidth: 2,
                        marginHorizontal: Matrics.CountScale(20),
                    }}
                />
            </View>
        );
    }

    resetFilterClick() {
        // const storesArr =  this.state.Stores[0].StoreID;
        this.setState({
            selectedRoleId : 0,
            selectedStoreId : this.state.Stores.length > 0 ? this.state.Stores[0].StoreID : -1,
            selectedStoreName : this.state.Stores.length > 0 ? this.state.Stores[0].DisplayStoreNumber : -1,
            weekendDate : this.state.currentWeekEndDate,
            selectedUsers: 0,
            selectedStoreIndex: -1,
            resetFilter: true
        })
        setTimeout(() => {
            this.setState({ resetFilter: false })
        }, 10);
    }

    async onAddshift(button) {
        let repeatType = '';
        let repeatDays = '';
        if (this.state.repeatEvery) {
            if (this.state.repeatEveryType === 'Day') {
                repeatType = 2;
            } else if (this.state.repeatEveryType === 'Week') {
                repeatType = 1;
                repeatDays = "1,2,3,4,5,6,7";
            }
        } else {
            repeatType = -1;
        }

        if (this.state.shiftinTime === '') {
            this.setState({ InTimeError: 'Please Select Form Time' });
        } else if (this.state.shiftoutTime === '') {
            this.setState({ outTimeError: 'Please Select To Time' });
        } else if (this.state.UserStoreID === '' &&
            repeatType === '' &&
            this.state.UserStoreGUID === ''
        ) {
            this.setState({ endingDateError: 'Something Wrong Try Again!' });
        } else {
            if (button === 'Add') {
                const dataAdd = {
                    "DailyScheduleID": 0,
                    "EndingDate": moment(this.state.selectedDate).format('MM/DD/YYYY'),
                    "InTime": Global.getTime12To24(this.state.shiftinTime),
                    "OutTime": Global.getTime12To24(this.state.shiftoutTime),
                    "IsChecked": false,
                    "Notes": "",
                    "RepeatType": repeatType,
                    "RepeatDays": repeatDays,
                    "StoreID": this.state.selectedStoreId,
                    "UserStoreID": this.state.UserStoreID,
                    "ScheduleDate": moment(this.state.selectedDate).format('MM/DD/YYYY'),
                    "ShiftValue": 0,
                    "UserStoreGUID": this.state.UserStoreGUID
                };
                // console.log('dataADD-->', dataAdd);
                this.props.CreateUpdateEmployeeSchedule(dataAdd);
            } else {
                if (this.state.DailyScheduleID === '' && this.state.ScheduleDate === '') {
                    await this.setState({ endingDateError: 'Something Wrong Try Again!' });
                } else {
                    const dataEdit = {
                        "DailyScheduleID": this.state.DailyScheduleID,
                        "EndingDate": moment(this.state.selectedDate).format('MM/DD/YYYY'),
                        "InTime": Global.getTime12To24(this.state.shiftinTime),
                        "OutTime": Global.getTime12To24(this.state.shiftoutTime),
                        "IsChecked": false,
                        "Notes": this.state.Notes,
                        "RepeatType": repeatType,
                        "RepeatDays": repeatDays,
                        "StoreID": this.state.selectedStoreId,
                        "UserStoreID": this.state.UserStoreID,
                        "ScheduleDate": moment(this.state.ScheduleDate, 'YYYY.MM.DD HH:mm').format('MM/DD/YYYY'),
                        "ShiftValue": 0,
                        "UserStoreGUID": this.state.UserStoreGUID
                    }
                    // console.log('dataEdit-->', dataEdit);
                    this.props.CreateUpdateEmployeeSchedule(dataEdit);
                }
            }
        }
    }

    onRefresh = () => {
        this.setState({refreshing: true});
        this.taxListFlag = false;
        this.infoFlag = false;
        this.detailsListFlag = false;
        this.scheduleEmployeeFlag = false;
        this.scheduleEmployeeReturnFlag = false;
        this.idleEmployeeReportFlag = false;
        this.employeeCountFlag = false;
        this.sharedEmployeeFlag = false;
        this.sharedEmployeeScheduleFlag = false;
        this.ScheduleHoursFlag = false;
        this.props.getPayrollTaxListRequest({ BusinessTypeId: 1, PayrollTaxGUID: '', YearID: this.state.YearID });
        this.props.getWeeklyScheduleInfoRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
        this.props.getWeatherDetailsListRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
        this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
        this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
        // this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20 });
        this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20, orderByColumnName: 'StoreNumber', orderByValue: false});
        this.props.getWeeklyScheduleEmployeeCountRequest({ StoreId: this.state.selectedStoreId, Type: 1, WeekEnding: this.state.weekendDate });
        this.props.getweeklyScheduleSharedEmployeeRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
        this.props.getweeklyScheduleSharedEmployeeScheduleRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
        this.props.getweeklyScheduleHoursRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
    }

    onDeleteTimeoff() {
        Alert.alert(
            'Are you sure you want to delete this?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
              {
                text: 'Yes', 
                onPress: () => {
                    this.props.DeleteEmployeeTimeOffDayWise({ TimeOffID: this.state.TimeOffID });
                },
              },
            ],
            {cancelable: false},
        );
    }

    onCreateTimeOff() {
        if (this.state.timeoffStartDate === '') {
            this.setState({ startDateError: 'Please Select The StartDate' });
        } else if (this.state.timeoffEndDate === '') {
            this.setState({ endDateError: 'Please Select The EndDate' });
        } else if (this.state.timeoffEndDate < this.state.timeoffStartDate) {
            this.setState({ endDateError: 'End date should be greater than Start date' });
        } else if (this.state.selectedReasonId === '') {
            this.setState({ resonError: 'Please Select The Reson' });
        }
        // else if (this.state.timeoffNotes === ''){
        //     this.setState({ resonDetailError: 'Please Enter The Reason Detail' });
        // } 
        else if (this.state.UserStoreGUID === '') {
            this.setState({ resonDetailError: 'Something wrong please try again!' });
        } else {
            // const dataTimeoff = {
            //     "StartDate": this.state.timeoffStartDate ? moment(this.state.timeoffStartDate).format('MM-DD-YYYY') : moment(this.state.selectedDate).format('MM-DD-YYYY'),
            //     "EndDate": this.state.timeoffEndDate ? moment(this.state.timeoffEndDate).format('MM-DD-YYYY') : moment(this.state.selectedDate).format('MM-DD-YYYY'),
            //     "ReasonID": this.state.selectedReasonId,
            //     "ReasonDetail": this.state.timeoffNotes,
            //     "AttachmentName": this.state.attachFile,
            //     "UserStoreGuid": this.state.UserStoreGUID,
            //     "OldTimeOffCombineID": 0,
            //     "IsFromSchedule": 0
            // }
            const dataTimeoff = {
                "CreatedByFirstName": "",
                "CreatedByLastName": "",
                "CreatedByMiddleName": "",
                "CreatedOn": "",
                "EndDate": this.state.timeoffEndDate ,
                "IsFormSchedule": true,
                "OldTimeOffCombineID": 0,
                "ReasonDetail": this.state.timeoffNotes,
                "ReasonID": this.state.selectedReasonId,
                "ReasonName": this.state.selectedReasonName,
                "StartDate": this.state.timeoffStartDate,
                "TimeOffCombineID": 0,
                "TimeOffDate": "",
                "TimeOffID": 0,
                "TimeOffStatusID": 0,
                "TimeOffStatusName": "",
                "Updated": "",
                "UserStoreGuid": this.state.UserStoreGUID
            }
            // console.log('dataTimeoff-->', dataTimeoff);
            this.props.CreateEmployeeTimeOff(dataTimeoff);
            this.setState({
                startDateError: '',
                endDateError: '',
                resonError: '',
                resonDetailError: '',
            });
        }
    }

    deleteShift(){
        Alert.alert(
            'Are you sure you want to delete this shift?',
            '',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
              },
              {
                text: 'Yes', 
                onPress: () => {
                    this.props.DeleteEmployeeSchedule({ DailyScheduleID: this.state.DailyScheduleID })
                },
              },
            ],
            {cancelable: false},
        );
    }

    renderJumEmpItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={Styles.itemContainerStyle} 
                onPress={() => {
                    this.setState({ JumtoEmpModal: false, selectedJumpEmpName: item.FullName, selectedEmpIndex: index+1 });
                }}
            >
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
                                    {/* <Text style={Styles.timingStyle}>Mar 30, Sat 10.00pm - 12.00pm</Text> */}
                                    <Text style={Styles.timingStyle}>{moment(item.ScheduleDate).format('MMM DD, ddd')} {`${moment(data.InTime, "h:mm A").format('hh:mm a')} - ${moment(data.OutTime, "h:mm A").format('hh:mm a')}`}</Text>
                                </View>
                            </View>
                        )
                    })
                }
            </TouchableOpacity>
        )
    }
    //----------->>>Render Method-------------->>>

    render() {
        // console.log('empRoleData-->', this.state.empRoleData);
        // console.log('selectedDate-->', this.state.selectedDate);
        console.log('Stores-->', this.state.Stores);
        // console.log('dayIndex-->', this.state.dayIndex);
        // if(this.state.selectedDate == 'Total')
        //     console.log('TotalofEmployeeScheduleData-->', this.state.TotalofEmployeeScheduleData);


        // console.log('TotalScheduleHours-->',this.state.TotalScheduleHours);

        return (
            <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: Colors.WHITE, paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight == 812 ? 30 : 20) : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} />
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, fontFamily: Fonts.NunitoSansRegular }}>Weekly Schedule</Text>
                        {/* <Dropdown
                            containerStyle={{ justifyContent: 'center' }}
                            pickerStyle={{ top: Matrics.headerHeight }}
                            data={this.state.Stores}
                            value={this.state.selectedStoreName}
                            onChangeText={(value, index, data) => this.onSelectStore(value, index, data)}
                            valueExtractor={({ DisplayStoreNumber }) => DisplayStoreNumber}
                            inputContainerStyle={{ borderBottomColor: 'transparent' }}
                            overlayStyle={{ borderWidth: 2 }}
                            dropdownOffset={{ left: 0 }}
                            // dropdownPosition={5}
                            fontSize={17}
                            itemCount={8}
                            rippleColor='white'
                            rippleCentered={true}
                            selectedTextStyle={{ textAlign: 'center'}}
                        /> */}
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, marginBottom: 10, fontFamily: Fonts.NunitoSansRegular }}>{this.state.selectedStoreName}</Text>
                        {/* <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, marginBottom: 10, fontFamily: Fonts.NunitoSansRegular }}>{`W/E ${this.state.weekendDate}`}</Text> */}
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, marginBottom: 10, fontFamily: Fonts.NunitoSansRegular }}>{`W/E ${moment(this.state.weekendDate).format('MM/DD/YY')}`}</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => { self.setState({ filterModal: true, isDateTimePickerVisible: false }) }}
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: Matrics.CountScale(10) }}
                    >
                        <Image source={Images.FilterIcon} style={{ height: Matrics.CountScale(25), width: Matrics.CountScale(25), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh}
                        />
                    }
                    ref={ref => this.scrollview = ref}
                >
                    <View style={Styles.headContainer} onLayout={(e) => { this.setState({ headContainerHeight: e.nativeEvent.layout.height }) }}>
                        <TouchableOpacity style={Styles.jumpEmpContainer} onPress={() => {
                            this.setState({ JumtoEmpModal: true });
                            // this.props.navigation.navigate('EmployeeList', {employeeData: this.state.empShiftWise, ShopName: this.state.selectedStoreName})
                        }}>
                            <Image source={Images.SmallUserIcon} style={{ marginHorizontal: Matrics.CountScale(5) }}></Image>
                            <Text style={Styles.jumpEmpTextStyle}>Jump To Employee</Text>
                        </TouchableOpacity>
                        <View style={Styles.publishOuterContainer}>
                            <TouchableOpacity style={Styles.publishContainer} onPress={() => {
                                this.props.navigation.navigate('Publish', { 
                                    empData: JSON.stringify(this.state.empShiftWise), 
                                    WeekEndingDate: this.state.weekendDate,
                                    selectedStoreId: this.state.selectedStoreId,
                                    selectedStoreName: this.state.selectedStoreName,
                                })
                            }}>
                                <Text style={Styles.publishTextStyle}>Publish</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: Matrics.CountScale(5) }} >
                        <View style={Styles.containerStyle} ref={view => { this.myComponent = view; }} 
                            onLayout={(e) => { this.setState({ upperSectionHeight: e.nativeEvent.layout.height }) }}
                        >
                            <Carousel
                                ref={(c) => { this._carousel = c; }}
                                data={this.state.daysData}
                                renderItem={this._renderItem}
                                sliderWidth={SLIDER_WIDTH}
                                itemWidth={Matrics.screenWidth / 2 - Matrics.CountScale(10)}
                                activeSlideAlignment={'start'}
                                inactiveSlideScale={1}
                                inactiveSlideOpacity={1}
                                extraData={this.state}
                                onSnapToItem={(index) => {this.setState({ dayIndex: index, selectedDate: this.state.daysData[index].DayDate })}}
                                // scrollEnabled={this.state.dayIndex == 6 || this.state.dayIndex == 7 ? false : true}
                                scrollEnabled={ (this.state.dayIndex == 6 || this.state.dayIndex == 7) && this.state.prevIndex == 5 ? true : (this.state.dayIndex == 6 || this.state.dayIndex == 7) ? false  : true}
                            />

                            <View style={{ alignItems: 'center', marginHorizontal: Matrics.CountScale(5) }}>
                                <TextRow labelText={'AVG Sales 6 Weeks'} contentText={this.state.daysData.length > 0 ? this.state.selectedDate !== 'Total' ? this.state.daysData[this.state.dayIndex].AVGSales6Weeks : this.state.TotalAVGSales6Weeks.toFixed(2) : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'AVG Units 6 Weeks'} contentText={this.state.daysData.length > 0 ? this.state.selectedDate !== 'Total' ? this.state.daysData[this.state.dayIndex].AVGUnitsWeeks : this.state.TotalAVGUnitsWeeks.toFixed(2) : null} />
                                <TextRow labelText={'Labor Goals(Hours)'} contentText={
                                    this.state.daysData.length > 0 ?
                                        this.state.selectedDate !== 'Total' ?
                                        this.state.daysData[this.state.dayIndex].AVGUnitsWeeks != 0 && this.state.daysData[this.state.dayIndex].ProductivityGoal != 0
                                            ? (this.state.daysData[this.state.dayIndex].AVGUnitsWeeks / this.state.daysData[this.state.dayIndex].ProductivityGoal).toFixed(2)
                                            : 0.00
                                            : (this.state.TotalLabourGoals).toFixed(2)
                                        : null
                                } bgColor={Colors.ROWBGCOLOR} />
                                {this.state.showMore ?
                                    <View>
                                        <TextRow labelText={'Total Hours Scheduled'} contentText={this.state.daysData.length > 0 ? this.state.selectedDate !== 'Total' ? (this.state.daysData[this.state.dayIndex].TotalHoursScheduled).toFixed(2) : (this.state.TotalHoursScheduled).toFixed(2) : null} />
                                        <TextRow labelText={'Scheduled Productivity'} 
                                        contentText={
                                            this.state.daysData.length > 0 
                                            ? this.state.selectedDate !== 'Total' 
                                            ? (this.state.daysData[this.state.dayIndex].AVGSales6Weeks / this.state.daysData[this.state.dayIndex].TotalHoursScheduled).toFixed(2) !== 'Infinity' 
                                                ? this.state.daysData[this.state.dayIndex].AVGSales6Weeks != 0 && this.state.daysData[this.state.dayIndex].TotalHoursScheduled !== 0 
                                                ? (this.state.daysData[this.state.dayIndex].AVGSales6Weeks / this.state.daysData[this.state.dayIndex].TotalHoursScheduled).toFixed(2)
                                                : 0
                                                : null
                                            : this.state.TotalScheduledProductivity != 0 ? this.state.TotalScheduledProductivity.toFixed(2) : null
                                            : null
                                        } 
                                        bgColor={Colors.ROWBGCOLOR} />

                                        <TextRow labelText={'Productivity Goal'} contentText={this.state.daysData.length > 0 ? this.state.selectedDate !== 'Total' ? (this.state.daysData[this.state.dayIndex].ProductivityGoal).toFixed(2) : (this.state.TotalProductivityGoal).toFixed(2) : null} />
                                        <TextRow labelText={'Scheduled Net Payroll ($)'} 
                                            contentText={this.state.daysData.length > 0 ? this.state.selectedDate !== 'Total' ? (this.state.daysData[this.state.dayIndex].NetPayroll).toFixed(2) : (this.state.TotalNetPayroll).toFixed(2) : null} />
                                        <TextRow labelText={'Estimated Payroll Tax ($)'} 
                                           contentText={
                                            this.state.daysData.length > 0 ?
                                                this.state.selectedDate !== 'Total' ?
                                                ((this.state.daysData[this.state.dayIndex].AVGSales6Weeks * (this.state.TaxValue / 100)) + this.state.daysData[this.state.dayIndex].NetPayroll).toFixed(2)
                                                : (this.state.TotalGrossPayroll).toFixed(2)
                                            : null
                                            }
                                        />
                                        <TextRow labelText={'Scheduled Gross Pay ($)'} contentText={
                                            this.state.daysData.length > 0 ?
                                                this.state.selectedDate !== 'Total' ?
                                                ((this.state.daysData[this.state.dayIndex].AVGSales6Weeks * (this.state.TaxValue / 100)) + this.state.daysData[this.state.dayIndex].NetPayroll).toFixed(2)
                                                : (this.state.TotalGrossPayroll).toFixed(2)
                                            : null
                                        } bgColor={Colors.ROWBGCOLOR} />
                                        <TextRow labelText={'Scheduled Payroll %'} contentText={
                                            this.state.daysData.length > 0 ?
                                                this.state.selectedDate !== 'Total' ?
                                                (this.state.TaxValue).toFixed(2)
                                                : (this.state.TaxValue).toFixed(2)
                                            : null
                                            } 
                                        />
                                    </View>
                                    : null}
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ showMore: !this.state.showMore })} style={{ alignItems: 'center', marginHorizontal: Matrics.CountScale(5) }}>
                                <Text style={[Styles.fontStyle, { color: Colors.APPCOLOR, paddingVertical: Matrics.CountScale(10) }]}>{this.state.showMore ? 'Show Less' : 'Show More'}</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={this.state.empRoleData}
                            extraData={this.state}
                            renderItem={this.renderUserRole}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <View style={Styles.containerStyle} >
                            <View style={Styles.headingStyle}>
                                <Text style={{ color: 'white' }}>HOURS SCHEDULED</Text>
                            </View>
                            {
                                this.state.ScheduleHoursArr.length > 0
                                ? this.state.selectedDate !== 'Total'
                                    ? this.state.ScheduleHoursArr.map(data => {
                                            if (this.state.selectedDate === data.WeekDate) {
                                                return <Text style={Styles.hoursText}>{(data.ScheduleHours).toFixed(2)}</Text>
                                            }
                                        })
                                    : <Text style={Styles.hoursText}>{(this.state.TotalScheduleHours).toFixed(2)}</Text>
                                : <Text style={Styles.hoursText}>0.00</Text>
                            }
                        </View>

                        {
                            this.state.finalSharedEmployeeData.length > 0 &&
                            <View style={Styles.containerStyle} >
                                <View style={Styles.headingStyle}>
                                    <Text style={{ color: 'white' }}>SHARED EMPLOYEE SCHEDULE</Text>
                                </View>
                                <FlatList
                                    data={this.state.finalSharedEmployeeData}
                                    extraData={this.state}
                                    renderItem={this.renderSharedEmployee}
                                    keyExtractor={(item, index) => item.UserStoreID.toString()}
                                    ListEmptyComponent={() => <Text style={[Styles.fontStyle, { padding: Matrics.CountScale(10) }]}>Oops! Their Is Nothing To Display</Text>}
                                />
                            </View>
                        }

                        <View style={Styles.containerStyle} >

                            <View style={Styles.headingStyle}>
                                <Text style={{ color: 'white' }}># OF EMPLOYEES SCHEDULED</Text>
                            </View>

                            <View>
                                {
                                    this.state.selectedDate !== 'Total'
                                        ?  this.state.ofEmployeeScheduleData.length > 0
                                            ?   this.state.ofEmployeeScheduleData.map((empdata, index) => {
                                                    let TimeArr = empdata.Timing.split('-');
                                                    if (empdata.WeekDate == this.state.selectedDate) {
                                                        return (
                                                            <TextRow
                                                                labelText={`${Global.getTime24to12(TimeArr[0]).toUpperCase()} To ${Global.getTime24to12(TimeArr[1]).toUpperCase()}`}
                                                                contentText={empdata.EmployeesCount.toFixed(2)}
                                                                bgColor={index % 2 == 0 ? Colors.ROWBGCOLOR : null}
                                                            />
                                                        )
                                                    }
                                                })
                                            : this.state.TotalofEmployeeScheduleData.length > 0
                                                ? this.state.TotalofEmployeeScheduleData.map((empdata, index) => {
                                                    let TimeArr = empdata.Timing.split('-');
                                                        return (
                                                            <TextRow
                                                                labelText={`${Global.getTime24to12(TimeArr[0]).toUpperCase()} To ${Global.getTime24to12(TimeArr[1]).toUpperCase()}`}
                                                                contentText={empdata.EmployeesCount.toFixed(2)}
                                                                bgColor={index % 2 == 0 ? Colors.ROWBGCOLOR : null}
                                                            />
                                                        )
                                                    })
                                                : null
                                        :
                                        <Text style={{ textAlign: 'center', fontFamily: Fonts.NunitoSansRegular, marginVertical: Matrics.CountScale(10) }}>Oops! Their Is Nothing To Display</Text>
                                }
                            </View>

                        </View>
                        <View style={Styles.containerStyle}>
                            {
                                this.state.IdleEmployeeList.length > 0 &&
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', alignItems: 'center', padding: Matrics.CountScale(12) }}
                                    onPress={() => { this.setState({ IdleShow: !this.state.IdleShow }) }}
                                >
                                    <Text style={[Styles.fontStyle, { flex: 1, color: Colors.APPCOLOR }]}>IDLE EMPLOYEE(S)</Text>
                                    <Image source={this.state.IdleShow ? Images.DownArrow : Images.NextArrow} style={{ tintColor: Colors.TEXTGREY, height: 20, width: 20 }} />
                                </TouchableOpacity> 
                            }
                            {
                                this.state.IdleShow
                                    ?
                                    <View>
                                        <View style={{ borderColor: Colors.APPCOLOR, borderWidth: 0.8, marginHorizontal: Matrics.CountScale(10) }} />
                                        <FlatList
                                            data={this.state.IdleEmployeeList}
                                            extraData={this.state}
                                            renderItem={this.renderIdleEmployee}
                                            ListEmptyComponent={
                                                <Text style={Styles.text}>No Data Found!</Text>
                                            }
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>
                                    : null
                            }
                        </View>
                    </View>

                </ScrollView>
                <Modal
                    visible={this.state.timingModal}
                    transparent={true}
                >
                    <View style={Styles.modalViewContainer}>

                        <View style={Styles.viewContainer}>
                            <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => { this.setState({ selectedVal: 'shift' }) }}>
                                    <Image source={this.state.selectedVal == 'shift' ? Images.RadioBtn : Images.RadioBtnUnselect} style={{ margin: Matrics.CountScale(15) }} />
                                </TouchableOpacity>
                                <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>Shift</Text>
                                <TouchableOpacity onPress={() => { 
                                    this.setState({ 
                                        selectedVal: 'time-off',
                                        timeoffNotes: '',
                                        timeoffStartDate: moment(this.state.selectedDate).format('MM-DD-YYYY'),
                                        timeoffEndDate: moment(this.state.selectedDate).format('MM-DD-YYYY'),
                                        selectedReasonName: 'Select Reason',
                                        selectedReasonId: '',
                                    }) 
                                }}>
                                    <Image source={this.state.selectedVal == 'time-off' ? Images.RadioBtn : Images.RadioBtnUnselect} style={{ margin: Matrics.CountScale(15) }} /></TouchableOpacity>
                                <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>Time-off</Text>

                                <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => this.setState({ timingModal: false })}>
                                    <Image source={Images.Close} style={{ margin: Matrics.CountScale(15) }} />
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.selectedVal == 'shift'
                                    ?
                                    <View>
                                        <View style={{ margin: Matrics.CountScale(15) }}>
                                            <Text style={Styles.labelTextStyle}>Time Period</Text>
                                            <View style={Styles.rowViewStyle}>
                                                <Text style={Styles.fontStyle} onPress={() => this._showTimePicker('InTime')}>{this.state.shiftinTime ? this.state.shiftinTime : 'From'}<Text onPress={() => this._showTimePicker('OutTime')}> {this.state.shiftoutTime ? this.state.shiftoutTime : 'To'}</Text></Text>
                                                <Image source={Images.DownArrow} style={{ tintColor: Colors.TEXTGREY }} />
                                            </View>
                                            <Text style={Styles.errorText}>{this.state.InTimeError}{this.state.outTimeError}</Text>

                                            <View style={{ flexDirection: 'row', marginVertical: Matrics.CountScale(15) }}>
                                                <TouchableOpacity onPress={() => { this.setState({ repeatEvery: !this.state.repeatEvery }) }} style={{ marginRight: Matrics.CountScale(5) }}>
                                                    <Image source={this.state.repeatEvery == true ? Images.RadioBtn : Images.RadioBtnUnselect} style={{ tintColor: 'grey' }} />
                                                </TouchableOpacity>
                                                <Text>Repeat every</Text>
                                            </View>
                                            {
                                                this.state.repeatEvery
                                                    ?
                                                    <View style={Styles.rowViewStyle}>
                                                        <Text style={Styles.labelTextStyle}>Select</Text>
                                                        <Dropdown
                                                            containerStyle={{ alignSelf: 'center' }}
                                                            pickerStyle={{ top: Matrics.headerHeight }}
                                                            data={repeatType}
                                                            value={this.state.repeatEveryType}
                                                            inputContainerStyle={{ borderBottomColor: 'transparent', }}
                                                            overlayStyle={{ top: this.state.topSpace + 150, borderWidth: 0 }}
                                                            dropdownOffset={{ top: 0, left: 0 }}
                                                            fontSize={17}
                                                            itemCount={8}
                                                            rippleCentered={true}
                                                            rippleColor='white'
                                                            onChangeText={(val) => {
                                                                this.setState({ repeatEveryType: val })
                                                            }}
                                                            selectedTextStyle={{ textAlign: 'center'}}
                                                        />
                                                    </View>
                                                    :
                                                    null
                                            }
                                            <View style={{ marginVertical: Matrics.CountScale(15) }}>
                                                <Text style={Styles.labelTextStyle}>Ending</Text>
                                                {/* <TouchableOpacity onPress={() => this._showDateTimePicker('endingDate')} style={Styles.rowViewStyle}>
                                                    <Text>{this.state.endingDate == '' ? 'Select Date' : this.state.endingDate}</Text>
                                                </TouchableOpacity> */}
                                                <Text style={{ fontFamily: Fonts.NunitoSansRegular }}>{moment(this.state.selectedDate).format('MM/DD/YYYY')}</Text>
                                                <Text style={Styles.errorText}>{this.state.endingDateError}</Text>
                                            </View>
                                        </View>

                                        {/* <View style={{ flexDirection: "row", marginHorizontal: Matrics.CountScale(8), marginBottom: Matrics.CountScale(15), }}>
                                            <TouchableOpacity
                                                style={Styles.btnViewStyle}
                                                onPress={() => this.onAddshift('Add')}
                                            >
                                                <View><Text style={Styles.btnTextStyle}>Add Shift</Text></View>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                disabled={this.state.disableEditDeleteShiftButton}
                                                style={Styles.btnViewStyle} onPress={() => this.deleteShift()}
                                            >
                                                <View><Text style={Styles.btnTextStyle}>Delete Shift</Text></View>
                                            </TouchableOpacity>
                                        </View> */}
                                        {
                                            this.state.disableEditDeleteShiftButton
                                            ?
                                                <TouchableOpacity
                                                    style={Styles.btnViewStyle}
                                                    onPress={() => this.onAddshift('Add')}
                                                >
                                                    <View><Text style={Styles.btnTextStyle}>Add Shift</Text></View>
                                                </TouchableOpacity>
                                            : 
                                                <View>
                                                    <TouchableOpacity 
                                                        // disabled={this.state.disableEditDeleteShiftButton}
                                                        style={Styles.btnViewStyle} 
                                                        onPress={() => this.deleteShift()}
                                                    >
                                                        <View><Text style={Styles.btnTextStyle}>Delete Shift</Text></View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        // disabled={this.state.disableEditDeleteShiftButton}
                                                        style={Styles.btnViewStyle2}
                                                        onPress={() => this.onAddshift('Edit')}
                                                    >
                                                        <View><Text style={[Styles.btnTextStyle, { color: 'white' }]}>Save Changes</Text></View>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                                    :
                                    <KeyboardAwareScrollView >
                                        <View style={{ margin: Matrics.CountScale(15) }}>
                                            <View style={{ marginVertical: Matrics.CountScale(15) }}>
                                                <Text style={Styles.labelTextStyle}>Start Date</Text>
                                                <TouchableOpacity onPress={() => this._showDateTimePicker('startDate')} style={Styles.rowViewStyle}>
                                                    <Text>{this.state.timeoffStartDate}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={Styles.errorText}>{this.state.startDateError}</Text>
                                            <View style={{ marginVertical: Matrics.CountScale(15) }}>
                                                <Text style={Styles.labelTextStyle}>End Date</Text>
                                                <TouchableOpacity onPress={() => this._showDateTimePicker('endDate')} style={Styles.rowViewStyle}>
                                                    <Text>{this.state.timeoffEndDate}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <Text style={Styles.errorText}>{this.state.endDateError}</Text>

                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[Styles.labelTextStyle, { marginLeft: Matrics.CountScale(15), marginTop: Matrics.CountScale(4) }]}>Reason:</Text>
                                                <Dropdown
                                                    containerStyle={{ alignSelf: 'center' }}
                                                    containerWidth={180}
                                                    data={this.state.absenceReason}
                                                    // value={'Select Reason'}
                                                    value={this.state.selectedReasonId ? this.state.selectedReasonName : 'Select Reason'}
                                                    onChangeText={(value, index, data) => this.onSelectReason(value, index, data)}
                                                    valueExtractor={({ ReasonName }) => ReasonName}
                                                    inputContainerStyle={{ borderBottomColor: 'transparent', alignSelf: 'stretch', padding: 0, margin: 0 }}
                                                    itemTextStyle={{ textAlign: 'left' }}
                                                    overlayStyle={{ top: this.state.topSpace + 150, borderWidth: 0 }}
                                                    dropdownOffset={{ top: 0, left: 0 }}
                                                    fontSize={17}
                                                    itemCount={8}
                                                    rippleCentered={true}
                                                    rippleColor='white'
                                                    error={this.state.resonError}
                                                    selectedTextStyle={{ textAlign: 'center'}}
                                                />
                                            </View>
                                            <Text style={Styles.labelTextStyle}>Notes :</Text>
                                            <View style={{ margin: Matrics.CountScale(15), borderColor: Colors.BORDERCOLOR, borderWidth: 1, paddingHorizontal: Matrics.CountScale(10), paddingVertical: Matrics.CountScale(5) }}>
                                                <TextInput
                                                    multiline={true}
                                                    value={this.state.timeoffNotes}
                                                    autoCorrect={false}
                                                    style={{ height: Matrics.CountScale(120), fontFamily: Fonts.NunitoSansRegular }}
                                                    placeholder={'Type here....'}
                                                    onChangeText={(text) => this.setState({ timeoffNotes: text, resonDetailError: '' })}
                                                />
                                                <Text style={Styles.errorText}>{this.state.resonDetailError}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Matrics.CountScale(15) }}>
                                                <TouchableOpacity style={{ borderWidth: 1, borderColor: Colors.APPCOLOR, borderRadius: 5, padding: 3 }} onPress={() => { this.onSelectFile() }}>
                                                    <Text style={[Styles.rowLabelText, { color: Colors.APPCOLOR }]}>Choose file</Text>
                                                </TouchableOpacity>
                                                <Text style={[Styles.rowLabelText, { flex: 1, marginLeft: Matrics.CountScale(15) }]}>{this.state.attachFile ? this.state.attachFile : null}</Text>
                                            </View>
                                            {/* <View style={{ flexDirection: "row",marginTop: Matrics.CountScale(15), marginBottom: Matrics.CountScale(15), }}>
                                                <TouchableOpacity
                                                    style={Styles.btnViewStyle}
                                                    onPress={() => this.onCreateTimeOff()}
                                                >
                                                    <View><Text style={Styles.btnTextStyle}>Add</Text></View>
                                                </TouchableOpacity>
                                                <TouchableOpacity 
                                                    disabled={this.state.disableEditDeleteShiftButton}
                                                    style={Styles.btnViewStyle} 
                                                    onPress={() => {this.onDeleteTimeoff()}}>
                                                    <View><Text style={Styles.btnTextStyle}>Delete</Text></View>
                                                </TouchableOpacity>
                                            </View> */}
                                            {
                                                this.state.disableEditDeleteShiftButton 
                                                ? 
                                                    <TouchableOpacity
                                                        style={[Styles.btnViewStyle, {marginTop: Matrics.CountScale(15)}]}
                                                        onPress={() => this.onCreateTimeOff()}
                                                    >
                                                        <View><Text style={Styles.btnTextStyle}>Add</Text></View>
                                                    </TouchableOpacity>
                                                :
                                                    <TouchableOpacity 
                                                        // disabled={this.state.disableEditDeleteShiftButton}
                                                        style={[Styles.btnViewStyle,{ marginTop: Matrics.CountScale(15)}]} 
                                                        onPress={() => {this.onDeleteTimeoff()}}>
                                                        <View><Text style={Styles.btnTextStyle}>Delete</Text></View>
                                                    </TouchableOpacity>
                                            } 
                                        </View>
                                    </KeyboardAwareScrollView>

                            }


                           
                        </View>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            date={
                                // this.state.dateFlag == 'endingDate'
                                // ? this.state.endingDate ? new Date(this.state.endingDate) : new Date()
                                this.state.dateFlag == 'startDate'
                                    ? new Date(this.state.timeoffStartDate)
                                    : new Date(this.state.timeoffEndDate)

                            }
                        />
                        {/* {console.log('SelINtime-->', this.state.shiftinTime)}
                        {console.log('SelINtime-->', moment(this.state.shiftinTime, "h:mm A").format('hh:mm a'))}
                        {console.log('SelINtime-->', moment(this.state.shiftinTime, "h:mm A").format('hh:mm A'))}
                        {console.log('SelINtime-->', moment(`2000/10/1 ${moment(this.state.shiftinTime, "h:mm A").format('hh:mm A')}`).toDate())} */}

                        <DateTimePicker
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this._handleTimePicked}
                            onCancel={this._hideTimePicker}
                            mode={'time'}
                            date={this.state.timeFlag === 'InTime'
                                ? this.state.shiftinTime
                                    ? moment(`2000/10/1 ${moment(this.state.shiftinTime, "h:mm A").format('hh:mm A')}`).toDate()
                                    : new Date()
                                : this.state.shiftoutTime
                                    ? moment(`2000/10/1 ${moment(this.state.shiftoutTime, "h:mm A").format('hh:mm A')}`).toDate()
                                    : new Date()
                            }
                        />
                    </View>
                </Modal>
                <Modal
                    visible={this.state.filterModal}
                >
                    <View style={{ flex: 1 }}>
                        <Header centerText='Filter'
                            rightText='Save'
                            leftText='Cancel'
                            onLeftPress={() => this.setState({ 
                                filterModal: false,
                                WeekEndingDate: this.state.lastFilterweekendDate,
                                selectedRoleId: this.state.lastFilterselectedRoleId,
                                selectedStoreId: this.state.lastFilterselectedStoreId,
                                selectedStoreName: this.state.lastFilterselectedStoreName,
                                selectedUsers: this.state.lastFilterselectedUserId,
                                Users: this.state.lastFilterselectedUserId == 0 ? [] : this.state.Users,
                                selectedStoreIndex: this.state.lastFilterselectedIndex
                            })}
                            onRightPress={() => {
                                // console.log('save'); 
                                // console.log('save', this.state.weekendDate); 
                                // console.log('save', this.state.selectedRoleId); 
                                // console.log('save', this.state.selectedStoreId); 
                                const index = this.state.Stores.length > 0 && this.state.Stores.findIndex(s => s.StoreID === this.state.selectedStores);
                                this.taxListFlag = false;
                                this.infoFlag = false;
                                this.detailsListFlag = false;
                                this.scheduleEmployeeFlag = false;
                                this.scheduleEmployeeReturnFlag = false;
                                this.idleEmployeeReportFlag = false;
                                this.employeeCountFlag = false;
                                this.sharedEmployeeFlag = false;
                                this.sharedEmployeeScheduleFlag = false;
                                this.ScheduleHoursFlag = false;
                        
                                this.props.getPayrollTaxListRequest({ BusinessTypeId: 1, PayrollTaxGUID: '', YearID: this.state.YearID });
                                this.props.getWeeklyScheduleInfoRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                                this.props.getWeatherDetailsListRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                                this.props.getWeeklyScheduleEmployeeRequest({ StoreId: this.state.selectedStoreId, UserStoreID: -1, DayID: -1, WeekEnding: this.state.weekendDate });
                                this.props.getWeeklyScheduleEmployeeReturnRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });
                                // this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20 });
                                this.props.getIdleEmployeesReportRequest({ RoleId: this.state.selectedRoleId, FilterId: -1, StoreId: this.state.selectedStoreId, BusinessTypeId: 1, PageNumber: 1, PageSize: 20, orderByColumnName: 'StoreNumber', orderByValue: false});
                                this.props.getWeeklyScheduleEmployeeCountRequest({ StoreId: this.state.selectedStoreId, Type: 1, WeekEnding: this.state.weekendDate });
                                this.props.getweeklyScheduleSharedEmployeeRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                                this.props.getweeklyScheduleSharedEmployeeScheduleRequest({ StoreId: this.state.selectedStoreId, DayID: -1, WeekEnding: this.state.weekendDate });
                                this.props.getweeklyScheduleHoursRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.weekendDate });

                                this.setState({ 
                                    filterModal: false,
                                    loading: true, 
                                    lastFilterweekendDate: this.state.weekendDate,
                                    lastFilterselectedRoleId: this.state.selectedRoleId,
                                    lastFilterselectedStoreId: this.state.selectedStoreId,
                                    lastFilterselectedStoreName: this.state.selectedStoreName,
                                    lastFilterselectedUserId: this.state.selectedUsers,
                                    lastFilterselectedIndex: index,
                                })
                            }}
                        />
                        <View style={{ flex: 1, padding: Matrics.CountScale(10) }}>
                            <KeyboardAwareScrollView
                                extraScrollHeight={100}
                                keyboardShouldPersistTaps={'handled'}
                                enableOnAndroid={true}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={[Styles.pickerLabelStyle, { paddingVertical: Matrics.CountScale(10) }]}>W/E</Text>
                                    <TouchableOpacity onPress={() => this._showDateTimePicker('weekending')}>
                                        <Text>{this.state.weekendDate ? this.state.weekendDate : 'Select Date'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.isDateTimePickerVisible && this.state.dateFlag === 'weekending'
                                        ?
                                        <CalendarPicker
                                            onDateChange={this._handleDatePicked}
                                            enableWeek="Tue"
                                            previousTitle="<"
                                            nextTitle=">"
                                            initialDate={this.state.weekendDate}
                                            selectedDayColor={Colors.APPCOLOR}
                                            selectedDayTextColor={Colors.WHITE}
                                            customDatesStyles={[
                                                {date: this.state.weekendDate,
                                                style: {backgroundColor: Colors.APPCOLOR},
                                                textStyle: {color: Colors.WHITE}, 
                                                containerStyle: [],
                                            }]}
                                        />
                                        : null
                                }
                                <Text style={[Styles.errorText, { textAlign: 'right', fontSize: Matrics.CountScale(14) }]}>{this.state.weekEndDateError}</Text>
                                <View style={Styles.labelBorderStyle}>
                                    <Text style={Styles.pickerLabelStyle}>Role</Text>
                                </View>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedRoleId}
                                    onValueChange={value => {
                                        const roleNameArr = this.state.userRole.filter(R => R.RoleID == value);
                                        this.setState({ selectedRoleId: value, loading: true, getFilterData: false, selectedRoleName: roleNameArr.length > 0 && roleNameArr[0].RoleName })
                                        this.headerfilterFlag = false;
                                        this.props.getHeaderFilterValuesRequest({
                                            StoreId: this.state.selectedStoreId, RoleId: value, FilterId: -1, BusinessTypeId: 1
                                        });
                                    }}
                                >
                                    {this.getRole()}
                                </Picker>
                                {
                                    this.state.Users != '' &&
                                    <View>
                                        <View style={Styles.labelBorderStyle}>
                                            <Text style={Styles.pickerLabelStyle}>Users</Text>
                                        </View>
                                        <Picker
                                            itemStyle={Styles.pickerItemStyle}
                                            selectedValue={this.state.selectedUsers}
                                            onValueChange={value => {
                                                this.setState({ selectedUsers: value, loading: true, getFilterData: false });
                                                this.headerfilterFlag = false;
                                                this.props.getHeaderFilterValuesRequest({ StoreId: this.state.selectedStoreId, RoleId: this.state.selectedRoleId, FilterId: value, BusinessTypeId: 1 });
                                            }}
                                        >
                                            {this.getUsers()}
                                        </Picker>
                                    </View>
                                }
                                <Text style={Styles.pickerLabelStyle}>Stores</Text>
                                {/* <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedStoreId}
                                    onValueChange={value => {
                                        const selectedStoreNameArr =  this.state.Stores.filter(s => s.StoreID == value);
                                        this.setState({ selectedStoreId: value, selectedStoreName: selectedStoreNameArr[0].DisplayStoreNumber})
                                    }}
                                >
                                    {this.getStores()}
                                </Picker> */}
                                {!this.state.resetFilter ?
                                    <SearchableDropdown
                                        onItemSelect={(item) => {
                                            const index = this.state.Stores.findIndex(s => s.StoreID === item.StoreID);
                                            this.setState({ selectedStores: item.StoreID, selectedStoreName: item.DisplayStoreNumber, selectedStoreIndex: index });
                                        }}
                                        containerStyle={{ padding: 5, marginBottom: Matrics.CountScale(10) }}
                                        onRemoveItem={(item, index) => {
                                            console.log('on remove-->', item, '--', index)
                                        }}
                                        itemStyle={{
                                            padding: 10,
                                            marginTop: 2,
                                            backgroundColor: '#ddd',
                                            borderColor: '#bbb',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                        itemTextStyle={{ color: '#222' }}
                                        itemsContainerStyle={{ maxHeight: Matrics.CountScale(150), marginBottom: Matrics.CountScale(20) }}
                                        items={this.state.Stores}
                                        defaultIndex={this.state.selectedStoreIndex}
                                        resetValue={false}
                                        textInputProps={
                                            {
                                                placeholder: "Select Store",
                                                underlineColorAndroid: "transparent",
                                                style: {
                                                    padding: 12,
                                                    borderWidth: 1,
                                                    borderColor: '#ccc',
                                                    borderRadius: 5,
                                                },
                                                onTextChange: text => console.log(text)
                                            }
                                        }
                                        listProps={
                                            {
                                                nestedScrollEnabled: true,
                                            }
                                        }
                                    />
                                    : null}
                                <TouchableOpacity onPress={() => this.resetFilterClick()} style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'red', borderRadius: 5, padding: 10, margin: 40 }}>
                                    <Image source={Images.Close} style={{ tintColor: 'red', marginHorizontal: 10 }} />
                                    <Text style={{ color: 'red' }}>Reset Filter</Text>
                                </TouchableOpacity>
                            </KeyboardAwareScrollView>
                        </View>
                        {
                            this.state.dateFlag !== 'weekending' ?
                                <DateTimePicker
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />
                                : null
                        }
                    </View>
                    <LoadWheel visible={this.state.loading} />
                </Modal>
                <Modal
                    visible={this.state.linkDetailModal}
                    transparent={true}
                >
                    <View style={Styles.modalViewContainer}>
                        <View style={Styles.viewContainer}>
                            <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={[Styles.titleFontStyle, { marginLeft: Matrics.CountScale(10), fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>Employee Link</Text>
                                <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => this.setState({ linkDetailModal: false })}>
                                    <Image source={Images.Close} style={{ margin: Matrics.CountScale(15) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'white', padding: Matrics.CountScale(15) }}>
                                <Text style={Styles.titleFontStyle}>Name : <Text style={Styles.fontStyle}>{this.state.linkUsername}</Text></Text>
                                <Text style={Styles.titleFontStyle}>Main Shop : <Text style={Styles.fontStyle}>{this.state.LinkedDetailsArr.MainShop}</Text></Text>
                                <Text style={Styles.titleFontStyle}>Linked Shop(s) : <Text style={Styles.fontStyle}>{this.state.LinkedDetailsArr.LinkedShops}</Text></Text>
                            </View>
                            <FlatList
                                data={this.state.LinkedDetailsArr.Details}
                                extraData={this.state}
                                renderItem={this.renderLinkEmpDetails}
                                ListEmptyComponent={() => <Text style={[Styles.fontStyle, { padding: Matrics.CountScale(10) }]}>Oops! Their Is Nothing To Display</Text>}
                                style={{ height: Matrics.CountScale(400) }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.confirmationModal}
                    transparent={true}
                >
                    <View style={Styles.modalViewContainer}>
                        <View style={Styles.viewContainer}>
                            <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center', flexDirection: 'row' }}>
                                <Text style={[Styles.titleFontStyle, { marginLeft: Matrics.CountScale(10), fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>SCHEDULE CONFIRMATION</Text>
                                <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => this.setState({ confirmationModal: false })}>
                                    <Image source={Images.Close} style={{ margin: Matrics.CountScale(15) }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ backgroundColor: 'white', padding: Matrics.CountScale(15) }}>
                                <Text style={Styles.titleText}>Do you want to add this employee to schedule?</Text>
                                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginTop: Matrics.CountScale(10) }}>
                                    <TouchableOpacity style={Styles.confirmBtn} onPress={() => {
                                        // console.log('adduid-->', this.state.addToScheduleUserStoreID)
                                        // console.log('addsid-->', this.state.addToScheduleStatusId)
                                        this.props.ChangeEmployeeStatusRequest({ UserStoreID: this.state.addToScheduleUserStoreID, StatusId: 6561, UserStoreGuid: '' });
                                    }}>
                                        <Text style={Styles.confirmBtnText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Styles.confirmBtn, { marginLeft: Matrics.CountScale(5) }]} onPress={() => this.setState({ confirmationModal: false })}>
                                        <Text style={Styles.confirmBtnText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.JumtoEmpModal}
                    transparent={true}
                >
                    <View style={[Styles.modalViewContainer, { justifyContent: 'flex-start', }]}>
                        <View style={[Styles.viewContainer, { flex: 1, marginTop: Matrics.CountScale(30),  backgroundColor: 'lightgrey'}]}>
                            <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center', flexDirection: 'row',  }}>
                                <TouchableOpacity  onPress={() => this.setState({ JumtoEmpModal: false })}>
                                    <Image source={Images.BackIcon} style={{ 
                                        height: Matrics.CountScale(15),
                                        width: Matrics.CountScale(15),
                                        marginLeft: Matrics.CountScale(20), 
                                        tintColor: 'white' }} />
                                </TouchableOpacity>
                                <Text style={[Styles.titleFontStyle, { marginLeft: Matrics.CountScale(10), fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>EMPLOYEES</Text>
                            </View>
                        
                        <View style={{ flex: 1, paddingVertical: Matrics.CountScale(5) }}>
                            <FlatList
                                data={this.state.empShiftWise}
                                renderItem={this.renderJumEmpItem}
                                keyExtractor={(item,index) => index.toString()}
                                contentContainerStyle={{ flexGrow: 1, 
                                    justifyContent: this.state.empShiftWise.length == 0 ? 'center' : 'flex-start', 
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
                        </View>
                    </View>
                    
                </Modal>
                <LoadWheel visible={this.state.loading} />
            </View>
        );
    }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.WHITE
    },
    headContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    jumpEmpContainer: {
        // flex: 0.6,
        backgroundColor: Colors.APPCOLOR,
        borderRadius: 30,
        padding: Matrics.CountScale(5),
        margin: Matrics.CountScale(15),
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    publishContainer: {
        padding: Matrics.CountScale(5),
        backgroundColor: Colors.APPCOLOR,
        borderRadius: 25,
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15)
    },
    publishOuterContainer: {
        margin: Matrics.CountScale(15),
    },
    publishTextStyle: {
        color: Colors.WHITE,
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular

    },
    jumpEmpTextStyle: {
        fontSize: Matrics.CountScale(18),
        color: Colors.WHITE,
        fontFamily: Fonts.NunitoSansRegular
    },
    containerStyle: {
        backgroundColor: 'white',
        margin: Matrics.CountScale(5),
        borderRadius: 5,
        overflow: 'hidden'
        // padding: Matrics.CountScale(5),
    },
    idleFont: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        padding: Matrics.CountScale(5),
        marginHorizontal: Matrics.CountScale(20),
    },
    idleButton: {
        backgroundColor: Colors.APPCOLOR,
        borderRadius: 10,
        padding: Matrics.CountScale(10),
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginRight: Matrics.CountScale(20)
    },
    idlebtnText: {
        color: 'white',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        textAlign: 'center',
    },
    fontStyle: {
        fontFamily: Fonts.NunitoSansRegular
    },
    shistContainer: {
        borderRadius: Matrics.CountScale(10),
        margin: Matrics.CountScale(5)
    },
    shopText: {
        fontFamily: Fonts.NunitoSansRegular,
        backgroundColor: '#9B9B9B',
        color: '#FFFFFF',
        padding: Matrics.CountScale(5),
        fontWeight: 'bold'
    },
    shiftText: {
        backgroundColor: '#DDDDDD',
        flexDirection: 'row',
        padding: Matrics.CountScale(5)
    },
    text: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        textAlign: 'center',
        marginVertical: Matrics.CountScale(10)
    },
    SmallFontStyle: {
        fontSize: Matrics.CountScale(12),
        fontFamily: Fonts.NunitoSansRegular
    },
    borderStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderRightWidth: 1,

    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(12),
        marginLeft: Matrics.CountScale(15)
    },
    rowContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
        width: '100%',
        alignItems: 'center'
    },
    rowTitleStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderRightWidth: 1,
        paddingVertical: Matrics.CountScale(10),
        flex: 1
    },
    roleText: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(25),
    },
    mainContainerLabel: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(10),
    },
    headingStyle: {
        backgroundColor: Colors.APPCOLOR,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Matrics.CountScale(12)
    },
    hoursText: {
        fontFamily: Fonts.NunitoSansRegular,
        textAlign: 'center',
        fontSize: Matrics.CountScale(18),
        paddingVertical: Matrics.CountScale(5)
    },
    modalViewContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
    },
    viewContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
        margin: Matrics.CountScale(15),
        // padding: Matrics.CountScale(15),
        //width: '75%'
    },
    
    btnViewStyle: {
        marginHorizontal: Matrics.CountScale(15),
        // flex: 1,
        borderRadius: 5,
        borderColor: Colors.SKYBLUE,
        borderWidth: 1,
        padding: Matrics.CountScale(10),
        alignItems: 'center',
        marginBottom: Matrics.CountScale(15)
    },
    titleText: {
        fontFamily: Fonts.NunitoSansSemiBold,
    },
    confirmBtn: {
        backgroundColor: Colors.APPCOLOR,
        borderRadius: Matrics.CountScale(5),
        padding: Matrics.CountScale(10),
        width: Matrics.CountScale(80),
    },
    confirmBtnText: {
        color: Colors.WHITE,
        fontFamily: Fonts.NunitoSansSemiBold,
        textAlign: 'center'
    },
    btnTextStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
        color: Colors.SKYBLUE,
        fontSize: Matrics.CountScale(18)
    },
    btnViewStyle2: {
        marginHorizontal: Matrics.CountScale(15),
        marginBottom: Matrics.CountScale(15),
        backgroundColor: Colors.SKYBLUE,
        borderRadius: 5,
        borderColor: Colors.SKYBLUE,
        borderWidth: 1,
        padding: Matrics.CountScale(10),
        alignItems: 'center'
    },
    rowViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Matrics.CountScale(8),
        borderBottomWidth: 1,
        borderColor: Colors.BORDERCOLOR
    },
    labelTextStyle: {
        color: Colors.TEXTGREY,
        fontFamily: Fonts.NunitoSansRegular,
    },
    selectedDayfontStyle: {
        color: 'white', fontWeight: 'bold'
    },
    linkContainer: {
        borderRadius: Matrics.CountScale(10),
        marginHorizontal: Matrics.CountScale(10),
        borderWidth: 2,
        borderColor: "#FF7B2A",
        marginVertical: Matrics.CountScale(5)
    },
    linkRightText: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(5),
    },
    linkLeftText: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(10),
        fontWeight: 'bold'
    },
    itemContainerStyle: {
        backgroundColor: 'white', borderRadius: Matrics.CountScale(5),
        marginVertical: Matrics.CountScale(5), marginHorizontal: Matrics.CountScale(15),
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
const mapStateToProps = (state) => {
    // console.log('headerFiltervalues-->', state);
    // console.log('headerFiltervalues-->', state.HirePacket);
    return {
        response: state.WeeklySchedule,
        headerFiltervalues: state.HirePacket,
    };
}
//Redux Connection  
export default connect(mapStateToProps, { getPayrollTaxListRequest, getWeeklyScheduleInfoRequest, getWeatherDetailsListRequest, getWeeklyScheduleEmployeeRequest, getWeeklyScheduleEmployeeReturnRequest, DeleteEmployeeSchedule, CreateUpdateEmployeeSchedule, getTimeOffReasonsListRequest, CreateEmployeeTimeOff, getHeaderFilterValuesRequest, getIdleEmployeesReportRequest, getWeeklyScheduleEmployeeCountRequest, getweeklyScheduleSharedEmployeeRequest, getweeklyScheduleSharedEmployeeScheduleRequest, getLinkedEmployeeDetailsRequest, getweeklyScheduleHoursRequest, ChangeEmployeeStatusRequest, DeleteEmployeeTimeOffDayWise })(WeeklySchedule);

