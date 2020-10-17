// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Modal, Dimensions,Platform,
    FlatList, RefreshControl, Alert,
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalendarPicker from '../../../CustomComponent/react-native-calendar-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import moment from 'moment';
import {
  getWeatherDetailsListRequest,
  CreateEmployeeTimeOff,
  GetEmployeeTimeOffRequest,
  getTimeOffReasonsListRequest,
  getWeekDatesRequest
} from '@Redux/Actions/WeeklyScheduleActions';
import { 
  getWeeklySummaryWeekDayStatusList,
  getWeeklySummarySheetDataRequest,
  getEmployeePunchDetailRequest,
  DeleteEmployeePunchDetail,
  UpdateEmployeePunchDetailRequest,
  ManageWeeklySummaryWeekDayStatus,
} from '@Redux/Actions/WeeklySummarySheetActions';
import { getHeaderFilterValuesRequest } from '@Redux/Actions/HirePacketsActions';
// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Matrics, MasterCss, Images } from '@Assets'
import { TextInputView, Button, LoadWheel } from "@Components";
import Global from '../../../GlobalFunction';
// import styles from '../../Resources/react-native-material-dropdown/src/components/dropdown/styles';
import styles from 'react-native-material-dropdown/src/components/dropdown/styles';
import Header from '../../../Components/Common/Header';
import { colors } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';


const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const SLIDER_WIDTH = viewportWidth;
let self = '';

export const TextColumn = ({ name, RG, OT, DT, BW, bgColor, nullRecord, onBWPress, onRGPress, onRGLongPress, onAbsencePress, onRgDisable, onBwDisable }) => {
    return (
        <View style={[Styles.rowContainer, { backgroundColor: bgColor }]}>
            <View style={{ width: '48%' }}><Text style={Styles.headingStyle} >{name}</Text></View>

            {
                nullRecord ? 
                    <View style={[Styles.columnContentStyle, { flex: 1 }]}>
                        <TouchableOpacity onPress={onAbsencePress}><Image source={Images.NullRecord} /></TouchableOpacity>
                    </View> 
                :
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <TouchableOpacity onPress={onRGPress} onLongPress={onRGLongPress} style={Styles.columnContentStyle} disabled={onRgDisable}>
                            <Text style={Styles.columnContentTextStyle}>{RG}</Text>
                        </TouchableOpacity>
                            <View style={Styles.columnContentStyle}><Text style={Styles.columnContentTextStyle} >{OT}</Text></View>
                            <View style={Styles.columnContentStyle}><Text style={Styles.columnContentTextStyle}>{DT}</Text></View>
                        <TouchableOpacity onPress={onBWPress} style={Styles.columnContentStyle} disabled={onBwDisable}>
                            <Text style={Styles.columnContentTextStyle}>{BW}</Text>
                        </TouchableOpacity>
                    </View>
            }

        </View>
    )
}

export const TextRow = ({ labelText, contentText, bgColor, contentbgColor }) => {
    return (
        <View style={[Styles.rowContainer, { backgroundColor: bgColor, alignItems: 'center' }]}>
            <View style={Styles.rowTitleStyle}>
                <Text style={Styles.mainContainerLabel}>{labelText}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ 
                    backgroundColor: contentbgColor === 'green' ? Colors.PARROT : contentbgColor === 'red' ? Colors.TEXTRED : 'white', 
                    paddingHorizontal: Matrics.CountScale(25), paddingVertical: Matrics.CountScale(3), borderRadius: 25 }}>
                    <Text style={[Styles.fontStyle, { textAlign: 'center', color: contentbgColor ? 'white' : null }]}>{contentText}</Text>
                </View>
            </View>
        </View>
    )
}


// ======>>>>> Class Declaration <<<<<=========
class WeeklySummarySheet extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null,
    })

    //--------->>>State Initilization----------->>>
    state = {
        password: "",
        repeatPassword: "",
        hoursModal: false,
        inTime: '',
        outTime: '',
        absenceReasonModal: false,
        absenceReason: [],
        selectedReasonId: '',
        selectedReasonName:'',
        attachFile: '',
        loading: true,
        FinalWeekDatesDataArr: [],
        weatherListData: [],
        weekDayStatusArr: [],
        empRoleWiseData: [],
        hoursBasicListArr: [],
        bottomHoursBasicListArr: [],
        basicListArr: [],
        bottomTotalBasicListArr: [],
        puchDetailArr: [],
        dayIndex: 0,
        selectedDayId: -1,
        selectedDate: '',
        nullRecord: false,
        lastPress: 0,
        empName: '',
        timeoffNotes: '',
        timeoffStartDate: '',
        timeoffEndDate: '',
        startDateError: '',
        endDateError: '',
        resonError: '',
        resonDetailError: '',
        refreshing: false,
        filterModal: false,
        WeekEndingDate: '',
        Users: [],
        userRole: [],
        StoresList:[],
        hoursBasicAsUserStoreId: [],
        // newTimeoffDataArr: [],
        weekEndDateError: '',
        showpunchSection: false,
        punchInTime: '',
        punchOutTime: '',
        adjustReason: '',
        punchInArr: [],
        punchOutArr: [],
        TotalHoursArr:[],
        punchDetailLogHistory: [],
        puchDetailIntialLen: 0,
        selectedStoreId: -1,
        selectedRoleId: 0,
        getFilterData: false,
        lastFilterselectedRoleId: -1,
        isFromFilter: false,
        currentWeekEndDate: '',
        weekDatesList: [],
        HoursEmployeeName: '',
        HoursEmployeeNumber: '',
        HoursUserStoreID: '',
    };

    lastTap = null;
    lastPress = '';

    //------------>>>LifeCycle Methods------------->>>

    async UNSAFE_componentWillMount() {
      self = this;
      const currentDate = moment().format("MM/DD/YYYY");
      let WeekEndingDate = '';
      if(moment(currentDate).format('dddd') === 'Tuesday'){
        WeekEndingDate = currentDate;
      } else if(moment(currentDate).format('dddd') === 'Monday'){
        WeekEndingDate = moment(currentDate).add(0,'weeks').isoWeekday(2).format("MM/DD/YYYY")
      } else {
        WeekEndingDate = moment(currentDate).add(1,'weeks').isoWeekday(2).format("MM/DD/YYYY")
      }

      await this.setState({ WeekEndingDate, lastFilterweekendDate: WeekEndingDate, currentWeekEndDate: WeekEndingDate, });


    //   console.log('date-->', moment.utc(WeekEndingDate).format())
    //   console.log('StoreId-->', this.state.selectedStoreId)

      if(this.state.selectedStoreId == -1) {
        this.headerfilterFlag = false;
        this.timeOffReasonsFlag = false;

        this.props.getHeaderFilterValuesRequest({ StoreId: this.state.selectedStoreId, RoleId: this.state.selectedRoleId, FilterId: -1, BusinessTypeId: 1 });
        this.props.getTimeOffReasonsListRequest();
        
      } else if(this.state.selectedStoreId !== -1) {
        this.weatherListFlag = false;
        this.weekDayStatusFlag = false;
        this.WeeklySummarySheetFlag = false;
        this.createTimeofFlag = false;
        this.weekDatesFlag = false;

        this.props.getWeekDatesRequest({ WeekEnding: this.state.WeekEndingDate, DayID: -1 })
        this.props.getWeatherDetailsListRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate });
        this.props.getWeeklySummaryWeekDayStatusList({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate });
        this.props.getWeeklySummarySheetDataRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate, DayId: this.state.selectedDayId });
      }
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log('will receive',this.createTimeofFlag);
        // console.log('header filter loading-->',  this.state.loading)
        // console.log('header filter isFromFilter-->',  this.state.isFromFilter)
        // console.log('header filter headerfilterFlag-->',  this.headerfilterFlag)
        // console.log('header filter weekDayStatusFlag-->',  this.weekDayStatusFlag)
        // console.log('header filter weatherListFlag-->',  this.weatherListFlag)
        // console.log('header filter WeeklySummarySheetFlag-->',  this.WeeklySummarySheetFlag)
        // console.log('header filter timeOffReasonsFlag-->',  this.timeOffReasonsFlag)
        // console.log('header filter getWeeklySummarySheetDataSuccess-->',  nextProps.resSummarySheet.getWeeklySummarySheetDataSuccess)

        if(nextProps.resSummarySheet.getWeeklySummarySheetDataSuccess === undefined && this.state.loading && this.state.isFromFilter){
            this.WeeklySummarySheetFlag = false;
            this.setState({
                isFromFilter: false,
            });
        }

      if(nextProps.headerFiltervalues.getHeaderFilterValuesSuccess && this.state.loading && !this.headerfilterFlag && !this.state.getFilterData) {
        this.headerfilterFlag = true

        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
            this.setState({ loading: false })

        let data = nextProps.headerFiltervalues.data
        if (data.Status === 1) {
            const roleSelect = {
                RoleID: 0,
                RoleName: 'Select Role'
            }
            data.Report.role_list.unshift(roleSelect);
            await this.setState({ 
                userRole: data.Report.role_list,
                StoresList: data.Report.store_list,
                Users: data.Report.user_list,
                selectedStoreId: data.Report.store_list[0].StoreID,
                selectedStoreName: data.Report.store_list[0].DisplayStoreNumber,
                getFilterData: true, 
                lastFilterselectedStoreId: data.Report.store_list[0].StoreID,
                lastFilterselectedStoreName: data.Report.store_list[0].DisplayStoreNumber,
            });
        }
        if(this.state.getFilterData) {
            this.UNSAFE_componentWillMount();
        }
      }
      if(nextProps.resWeeklySchedule.getWeatherDetailsListSuccess && this.state.loading) {

        this.weatherListFlag = true;
        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
          this.setState({ loading: false});

        let data = nextProps.resWeeklySchedule.data;
        if(data.Status == 1) {
            this.setState({ weatherListData: data.List });
        }
      }
      else if(nextProps.resWeeklySchedule.getWeekDatesSuccess && this.state.loading) {
        this.weekDatesFlag = true;
        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
        this.setState({ loading: false});

        let data = nextProps.resWeeklySchedule.data;
        console.log('weekdates-->', data);
        if(data.Status == 1) {
            this.setState({ weekDatesList: data.Days});
        }

      }
      else if(nextProps.resWeeklySchedule.getTimeoffReasonsSuccess && this.state.loading) {
        this.timeOffReasonsFlag = true;
        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
          this.setState({ loading: false });

        let data = nextProps.resWeeklySchedule.data;
        if(data.Status == 1) {
        this.setState({ absenceReason: data.Data });
        }

      }
      else if(nextProps.resWeeklySchedule.createTimeoffSuccess &&  !this.createTimeofFlag) {
        let data = nextProps.resWeeklySchedule.data;
        if(data.Status == 1) {
            this.createTimeofFlag = true;
         this.WeeklySummarySheetFlag = false;    
          this.props.getWeeklySummarySheetDataRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate, DayId: -1 });
          this.setState({ 
            absenceReasonModal: false,
            timeoffStartDate: '',
            timeoffEndDate: '',
            selectedReasonId: '',
            selectedReasonName: '',
            timeoffNotes: '',
            UserStoreGUID: '',
            attachFile: '',
            loading: true,
        });

        } else if(data.Status == 0) {
            this.createTimeofFlag = true;
            await setTimeout(() => {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ absenceReasonModal: false })},
                    ],
                    {cancelable: false},
                );
            },1000);
            
        }
      }

      if(nextProps.resSummarySheet.getweeklySummaryWeekdayStatusListSuccess && this.state.loading) {
        this.weekDayStatusFlag = true;

        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
          this.setState({ loading: false });

        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1) {
            await this.setState({ weekDayStatusArr: data.List });
            if(this.state.weekDayStatusArr.length > 0 && this.state.weekDatesList.length > 0) {
                this.setWeekDatesData()
            }
        } else {
            if(this.state.weekDatesList.length > 0) {
                this.setWeekDatesData()
            }
        }
      }
      else if(nextProps.resSummarySheet.getWeeklySummarySheetDataSuccess  && (this.state.loading || this.state.refreshing)) {
        this.WeeklySummarySheetFlag = true;

        if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
            this.setState({ loading: false, refreshing: false });
        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1) {
            await this.setState({ 
                basicListArr:  data.Data.Employees != null ? data.Data.Employees : [],
                hoursBasicListArr: data.Data.EmployeeHours != null ? data.Data.EmployeeHours : [],
                bottomHoursBasicListArr: data.Data.BottomHours != null ? data.Data.BottomHours : [],
                bottomTotalBasicListArr: data.Data.BottomTotal != null ? data.Data.BottomTotal : [],
               
            });
            if (this.state.basicListArr.length > 0 && this.state.hoursBasicListArr.length > 0) {
                this.setEmpData()
            }
        } 

        // console.log('in summary sheet data');
        // let data = nextProps.resSummarySheet.data;
        // if(data.Status == 1) {
        //     this.WeeklySummarySheetFlag = true;
        //     await this.setState({ 
        //         basicListArr: data.Data.Employees,
        //         hoursBasicListArr: data.Data.EmployeeHours,
        //         bottomHoursBasicListArr: data.Data.BottomHours,
        //         bottomTotalBasicListArr: data.Data.BottomTotal,
        //     });
        //     if (this.state.basicListArr.length > 0 && this.state.hoursBasicListArr.length > 0) {
        //         console.log('after filter')
        //         this.setEmpData()
        //     }
        // } else {
        //     this.WeeklySummarySheetFlag = true;
        // }

        // if(this.headerfilterFlag && this.weekDayStatusFlag && this.weekDatesFlag && this.weatherListFlag && this.WeeklySummarySheetFlag &&  this.timeOffReasonsFlag)
        //     this.setState({ loading: false, refreshing: false });
        
      }
      else if(nextProps.resSummarySheet.getEmployeePunchDetailSuccess) {
        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1) {
          await this.setState({ puchDetailArr: data.Report.Hours, punchDetailLogHistory: data.Report.Log, puchDetailIntialLen: data.Report.Hours.length });
        }
      } 
      else if(nextProps.resSummarySheet.deleteEmployeePunchDetailSuccess) {
        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1){
            this.setState({ hoursModal: false });
        }
      }
      else if(nextProps.resSummarySheet.updateEmployeePunchDetailSuccess) {
        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1){
            this.setState({ hoursModal: false });
        } else if(data.Status == 0) {
            await setTimeout(() => {
                Alert.alert(
                    '',
                    data.Message,
                    [
                        {text: 'OK',onPress: () => this.setState({ hoursModal: false })},
                    ],
                    {cancelable: false},
                );
            }, 1000);
        } else {
            await setTimeout(() => {
                Alert.alert(
                    '',
                    'Something Wrong Please Try Again!!',
                    [
                        {text: 'OK',onPress: () => this.setState({ hoursModal: false })},
                    ],
                    {cancelable: false},
                );
            }, 1000);
        }
      }
      else if(nextProps.resSummarySheet.manageWeeklySummaryWeekdayStatusSuccess) {
        let data = nextProps.resSummarySheet.data;
        if(data.Status == 1){
            this.props.getWeeklySummaryWeekDayStatusList({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate });
            this.setState({ loading: true });
        }
      } 
    }

    componentWillUnmount() { }

    setWeekDatesData() {
        console.log('weekDayStatusArr-->',this.state.weekDayStatusArr)
        console.log('weekDatesList-->',this.state.weekDatesList)
        let FinalWeekDatesDataArr = [];
        if(this.state.weekDayStatusArr.length > 0 && this.state.weekDatesList.length > 0) {
            this.state.weekDatesList.forEach((parent) => {
                let weekStatus = {};
                this.state.weekDayStatusArr.forEach((child) => {
                    if (parent.WeekDate == child.DayDate) {
                       weekStatus = {
                            "StoreID": child.StoreID,
                            "DayID": child.DayID,
                            "WeekEndDate": child.WeekEndDate,
                            "isClosed": child.isClosed,
                        }
                    }
                })
                let weekDatesData = parent;
                let merged = {...weekDatesData, ...weekStatus}; 
                FinalWeekDatesDataArr.push(merged);
            });
        } else if(this.state.weekDatesList.length > 0) {
            FinalWeekDatesDataArr = this.state.weekDatesList;
        }


        
        FinalWeekDatesDataArr.push({WeekDate: 'Total', isClosed: true });
        console.log('FinalWeekDatesDataArr-->', FinalWeekDatesDataArr);
        
        this.setState({ 
            FinalWeekDatesDataArr,
            selectedDayId: FinalWeekDatesDataArr[0].DayID,
            selectedDate: FinalWeekDatesDataArr[0].WeekDate,
        });
    }

    async setEmpData() {
        let empRoleWiseData = [];
        // let newTimeoffDataArr = [];
        // let newTimeoffDataArrLen = 0;
        _.forEach(this.state.basicListArr, async (res) => {
            // console.log('Tdata--> Call', res.UserStoreGUID);
            // this.getTimeoff(res.UserStoreGUID).then(data => {
            //     // console.log('getTimeOff-->timeOffData-->',data);
            //     const timeOffData = {
            //         'UserStoreGUID': res.UserStoreGUID,
            //         'data': data.Data
            //     }
            //     // newTimeoffDataArr.push({timeOffData});
            //     newTimeoffDataArr.push({ 'UserStoreGUID': res.UserStoreGUID, 'data': data.Data })
            //     newTimeoffDataArrLen = newTimeoffDataArr.length;
            //     this.setState({ newTimeoffDataArrLen });
            // });
       
           
            if (_.some(empRoleWiseData, { 'RoleName': res.RoleName })) {
                var index = empRoleWiseData.findIndex(data => data.RoleName == res.RoleName);
                empRoleWiseData[index].data.push(res)
            }
            else {
                let tmproledata = []
                tmproledata.push(res)
                empRoleWiseData.push({ 'RoleName': res.RoleName, 'data': tmproledata })
            }
        });
        empRoleWiseData.push({
            'RoleName': 'Weekly summary',
            'data': [],
        });
        await this.setState({ 
            empRoleWiseData, 
            // newTimeoffDataArr 
        });
        console.log('empRoleWiseData-->setemp-->', empRoleWiseData);
        let hoursBasicAsUserStoreId = [];
        _.forEach(this.state.hoursBasicListArr, (res) => {
            if (_.some(hoursBasicAsUserStoreId, { 'UserStoreID': res.UserStoreID })) {
                var index = hoursBasicAsUserStoreId.findIndex(data => data.UserStoreID == res.UserStoreID);
                hoursBasicAsUserStoreId[index].data.push(res);
            }
            else {
                let tmpHoursBasicdata = [];
                tmpHoursBasicdata.push(res);
                hoursBasicAsUserStoreId.push({ 'UserStoreID': res.UserStoreID, 'data': tmpHoursBasicdata });
            }
        });
        await this.setState({ hoursBasicAsUserStoreId });
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


    onRefresh = () => {
        this.setState({refreshing: true});
        this.props.getWeeklySummarySheetDataRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate, DayId: -1 });
    }

    _showDateTimePicker = (val) => this.setState({ isDateTimePickerVisible: true, dateFlag: val });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        if(this.state.dateFlag == 'startDate') {
            this.setState({ timeoffStartDate: moment(date).format('MM/DD/YYYY'), startDateError: '' });
        } else {
            if(moment(date).format('MM/DD/YYYY') <= this.state.timeoffStartDate) {
                this.setState({ endDateError: 'End date should be greater than Start date' });
            } else {
                this.setState({ timeoffEndDate: moment(date).format('MM/DD/YYYY'), endDateError: '' });
            }
            
        }
        if(this.state.dateFlag === 'weekending'){
            if(moment(date).format('dddd') === 'Tuesday') {
                this.setState({ WeekEndingDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: '' })
            } else {
                this.setState({ WeekEndingDate: moment(date).format('MM/DD/YYYY'), weekEndDateError: 'Please Select Valid Weekend Date'})
            }
        }

        this._hideDateTimePicker();
    };

    _showTimePicker(val, index, punchin, punchout) {
        this.setState({ isTimePickerVisible: true, timeFlag: val, currentIndex: index, selectedPunchIn: punchin, selectedPunchOut: punchout });
    }
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = async (time) => {
        console.log('timeFlag-->',this.state.timeFlag);
        let val = moment.parseZone(time).format('HH:mm')
        console.log('val-->',val);
        if (this.state.timeFlag == 'InTime') {
            await this.setState({ inTime: val })
        }
        else if (this.state.timeFlag == 'OutTime') {
            await this.setState({ outTime: val })
        } else if(this.state.timeFlag == 'punchInTime') {
            let Arr = this.state.punchInArr;
            Arr[this.state.currentIndex] = moment(time, "HH:mm:ss").format('HH:mm:ss');
            await this.setState({ punchInTime: val, punchInArr: Arr })
        } else if(this.state.timeFlag == 'punchOutTime') {
            let Arr = this.state.punchOutArr;
            Arr[this.state.currentIndex] = moment(time, "HH:mm:ss").format('HH:mm:ss');
            await this.setState({ punchOutTime: val, punchOutArr: Arr })
        }
       

        if (this.state.inTime && this.state.outTime) {
            var mins = moment.utc(moment(this.state.outTime, "HH:mm").diff(moment(this.state.inTime, "HH:mm"))).format('HH:mm')
            // console.log(mins)
            await this.setState({ totalHour: mins })
            // rowEntity.TotalHours = endTime.diff(startTime, 'hours') + " Hrs and " + mins + " Mns";

        }
        // console.log('in punchInArr', this.state.punchInArr.length)
        // console.log('in punchOutArr', this.state.punchOutArr.length)
        // console.log('in punchInArr-->', this.state.punchInArr)
        // console.log('in punchOutArr-->', this.state.punchOutArr)
        // console.log('in currentIndex-->', this.state.currentIndex)
        if(this.state.punchInArr.length > 0 && this.state.punchOutArr.length == 0 && this.state.currentIndex !== undefined) {
            var mins = Global.getTimeDiff(moment(this.state.punchInArr[this.state.currentIndex], "HH:mm:ss").format('HH:mm:ss'),this.state.selectedPunchOut) 
            let Arr = this.state.TotalHoursArr;
            Arr[this.state.currentIndex] = mins;
            await this.setState({ TotalHoursArr: Arr })
        } else if(this.state.punchInArr.length > 0 && this.state.punchOutArr.length > 0 && this.state.currentIndex !== undefined) {
            // var mins = moment.utc(moment(this.state.punchInArr[this.state.currentIndex], "HH:mm").diff(moment(this.state.punchOutArr[this.state.currentIndex], "HH:mm"))).format('HH:mm') 
            var mins = Global.getTimeDiff(moment(this.state.punchInArr[this.state.currentIndex], "HH:mm:ss").format('HH:mm:ss'),moment(this.state.punchOutArr[this.state.currentIndex], "HH:mm:ss").format('HH:mm:ss')) 
            let Arr = this.state.TotalHoursArr;
            Arr[this.state.currentIndex] = mins;
            await this.setState({ TotalHoursArr: Arr })
        }



        // this.state.punchInArr.length > 0 && this.state.punchOutArr.length == 0
        // ?   this.state.punchInArr[index] !== undefined
        //     ? Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('hh:mm:ss'),item.PunchOut) 
        //     : Global.getTimeDiff(item.PunchIn, item.PunchOut)
        // : this.state.punchInArr.length > 0 && this.state.punchOutArr.length > 0
        //     ? this.state.punchInArr[index] !== undefined && this.state.punchOutArr[index] !== undefined
        //         ? Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('hh:mm:ss'),
        //             moment(this.state.punchOutArr[index],'hh:mm:ss').format('hh:mm:ss'))
        //         : Global.getTimeDiff(item.PunchIn, item.PunchOut)
            

        this._hideTimePicker();
    };

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
            data.push(<Picker.Item label={this.state.Users[i]} value={this.state.Users[i]} />);
        }
        return data;
    }

    getStores() {
        let data = []
        for (i = 0; i < this.state.StoresList.length; i++) {
            data.push(<Picker.Item label={this.state.StoresList[i].DisplayStoreNumber} value={this.state.StoresList[i].StoreID} />);
        }
        return data;
    }


    //------------->>>Controllers/Functions------------>>>>


    async onSelectReason(value, index, data) {

        await this.setState({ selectedReasonId: data[index].ReasonID, resonError: '', selectedReasonName: value })

    }

    async onSelectStore(value,index,data) {
        await this.setState({ selectedStoreId: data[index].StoreID, selectedStoreName: value });
    }

    onSelectFile() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res != null)
                this.setState({ attachFile: res.fileName })
        });
    }

    _renderItem({ item, index }) {
      return(
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { self.setState({ dayIndex: index, selectedDate: item.WeekDate, selectedDayId: item.DayID }) }}>
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: self.state.dayIndex == index ? Colors.SKYBLUE : null,
        //   paddingVertical: Matrics.CountScale(20)
        //    paddingVertical: item.WeekDate === 'Total' ? Matrics.CountScale(43) : Matrics.CountScale(10) 
            height: Matrics.CountScale(110)
           }}>
            {
                item.WeekDate === "Total"
                ?
                    <View style={{ flex: 1, justifyContent: 'center'}}>
                        <Text style={[Styles.fontStyle, {color: self.state.dayIndex == index ? 'white' : null, fontWeight: 'bold' }]}>{item.WeekDate}</Text>
                    </View>
                :
                    <View style={{ paddingHorizontal: Matrics.CountScale(25), marginTop: Matrics.CountScale(5) }}>
                        <Text style={[Styles.fontStyle, { color: self.state.dayIndex == index ? 'white' : null, fontWeight: 'bold' }]}>{moment(item.WeekDate).format('MMM DD, YYYY ddd')}</Text>
                        {self.state.weatherListData[index] !== void 0
                            ? <Image source={self.state.dayIndex == index ? Images.CloudIcon2 : Images.CloudIcon1} style={{ marginVertical: Platform.OS == 'ios' ? Matrics.CountScale(10) : Matrics.CountScale(13)}} />
                            : <View style={{ paddingVertical: Platform.OS == 'ios' ? Matrics.CountScale(27) : Matrics.CountScale(35) }}/>
                            
                        }
                        <Text style={[Styles.SmallFontStyle, { color: self.state.dayIndex == index ? 'white' : null, fontWeight: 'bold' }]}>
                        { self.state.weatherListData.length > 0 && self.state.weatherListData[index] !== void 0
                            ? `${self.state.weatherListData[index].High},${self.state.weatherListData[index].WeatherTypeName}`
                            : null
                        }   
                        </Text>
                        {
                        !item.isClosed
                        ? 
                            <TouchableOpacity 
                                onPress={() => this.props.ManageWeeklySummaryWeekDayStatus({"StoreID":this.state.selectedStoreId,"DayID": this.state.selectedDayId,"WeekEndDate": moment.utc(this.state.WeekEndingDate).format(),"DayDate": this.state.selectedDate,"isClosed":true})} 
                                style={{ position: 'absolute', right: 0, top: 0, marginRight: Matrics.CountScale(5), }}
                            >
                                <Image source={Images.Lock} />
                            </TouchableOpacity>
                        : null
                        }
                    </View>
            }
           
            
          </View>
        </TouchableOpacity>
      );
    }

    async longPress(UserStoreGUID, TimeOffCombineID, RoleName, FullName, EmployeeNumber) {
        // console.log('UserStoreGUID-->', UserStoreGUID);
        // console.log('TimeOffCombineID-->', TimeOffCombineID);
       
        await this.getTimeoff(UserStoreGUID, TimeOffCombineID).then(data => {
            // console.log('getTimeOff-->timeOffData-longpress->',data);
            let timeoffData = [];
            if(data.Status == 1) {
                const allData = data.Basic.Data;
                timeoffData = allData.filter(p => p.TimeOffDate == this.state.selectedDate);
                // console.log('timeoffData-->', timeoffData);
            }
            this.setState({ Timeoffdata: timeoffData })
            
            // const timeOffData = {
            //     'UserStoreGUID': res.UserStoreGUID,
            //     'data': data.Data
            // }
            // // newTimeoffDataArr.push({timeOffData});
            // newTimeoffDataArr.push({ 'UserStoreGUID': res.UserStoreGUID, 'data': data.Data })
            // newTimeoffDataArrLen = newTimeoffDataArr.length;
            // this.setState({ newTimeoffDataArrLen });
        });
        await this.setState({ 
            absenceReasonModal: true,  
            selectedTimeoffRoleName: RoleName, 
            selectedTimeofEmpName:FullName, 
            selectedTimeofPosid: EmployeeNumber,
            UserStoreGUID: UserStoreGUID   
        })
        
        setTimeout(() => {
            this.myComponent.measure((fx, fy, width, height, px, py) => {

                // this.topSpace = py - 10
                this.setState({ topSpace: py - 20 })
            })

        }, 10)
        this.setState({ UserStoreGUID })
    }

    onUpdatePunchDetails() {
        // console.log('puchDetailArr-->', this.state.puchDetailArr)
        // console.log('punchInArr-->', this.state.punchInArr)
        // console.log('punchOutArr-->', this.state.punchOutArr)
        // console.log('TotalHoursArr-->', this.state.TotalHoursArr)
        if(this.state.adjustReason !== '') {
            let punchData = [];
            if(this.state.puchDetailArr.length > this.state.puchDetailIntialLen){
                this.state.puchDetailArr.forEach((child,key) => {
                    let newChild = Object.assign({
                        "Dayid": this.state.selectedDayId,
                        "BusinessTypeId": 1,
                        "WeekEndDate": this.state.WeekEndingDate,
                        "StoreId": this.state.selectedStoreId
                    }, child);
                    if(newChild.PunchID === "") {
                        newChild.AdjDescription = this.state.adjustReason;
                    }
                    // console.log('finalafter child-->', newChild);
                    punchData.push(newChild);
                });
            } else {
                this.state.puchDetailArr.forEach((child,key) => {
                    let newChild = Object.assign({
                        "Dayid": this.state.selectedDayId,
                        "BusinessTypeId": 1,
                        "WeekEndDate": this.state.WeekEndingDate,
                        "StoreId": this.state.selectedStoreId
                    }, child);
                    if(this.state.punchInArr.length > 0) {
                        this.state.punchInArr.forEach((pInData, k) => {
                            if (k === key) {
                            newChild.PunchIn = this.state.punchInArr[k];
                            newChild.AdjDescription = this.state.adjustReason;
                            }
                        });
                    }
                    if(this.state.punchOutArr.length > 0) {
                        this.state.punchOutArr.forEach((pOutData, k) => {
                            if (k === key) {
                            newChild.PunchOut = this.state.punchOutArr[k];
                            newChild.AdjDescription = this.state.adjustReason;
                            }
                        });
                    }
                    if(this.state.TotalHoursArr.length > 0) {
                        this.state.TotalHoursArr.forEach((TotalHour, k) => {
                            if (k === key) {
                            newChild.TotalHours = this.state.TotalHoursArr[k];
                            }
                        });
                    }
                    punchData.push(newChild);
                });
            }
            console.log('punchData-->', punchData);
            this.props.UpdateEmployeePunchDetailRequest(punchData);
        } else {
            this.setState({adjustReasonError: 'Please Enter The Adjust Reason'});
        }
    }

    onCreateTimeOff() {
        // if( this.state.timeoffStartDate === '') {
        //     this.setState({ startDateError: 'Please Select The StartDate' });
        // } else if (this.state.timeoffEndDate === ''){
        //     this.setState({ endDateError: 'Please Select The EndDate'});
        // } else if(this.state.timeoffEndDate  <= this.state.timeoffStartDate){
        //     this.setState({ endDateError: 'End date should be greater than Start date' });
        // } else 
        if(this.state.selectedReasonId === ''){
            this.setState({ resonError: 'Please Select The Reson' });
        } else if (this.state.timeoffNotes === ''){
            this.setState({ resonDetailError: 'Please Enter The Reason Detail' });
        } else if(this.state.UserStoreGUID === ''){
            this.setState({ resonDetailError: 'Something wrong please try again!' });
        } else {
            // const dataTimeoff = {   
            //     "StartDate": moment(this.state.timeoffStartDate).format('MM-DD-YYYY'),
            //     "EndDate": moment(this.state.timeoffEndDate).format('MM-DD-YYYY'),
            //     "ReasonID": this.state.selectedReasonId,
            //     "ReasonDetail": this.state.timeoffNotes,
            //     "AttachmentName": this.state.attachFile,
            //     "UserStoreGuid": this.state.UserStoreGUID,
            //     "OldTimeOffCombineID": 0,
            //     "IsFromSchedule": 0
            // }
            const dataTimeoff = {
                // "AttachmentFilePath": "",
                "AttachmentName": this.state.attachFile,
                // "EmployeeNumber": this.state.selectedTimeofPosid,
                "EndDate": moment(this.state.selectedDate).format('MM/DD/YYYY'),
                // "Name": this.state.selectedTimeofEmpName,
                "OldTimeOffCombineID": this.state.Timeoffdata ? this.state.Timeoffdata.TimeOffCombineID : 0,
                "ReasonDetail": this.state.timeoffNotes,
                "ReasonID": this.state.selectedReasonId,
                // "RoleName": this.state.selectedTimeoffRoleName,
                "StartDate": moment(this.state.selectedDate).format('MM/DD/YYYY'),
                // "TimeOffCombineID": this.state.Timeoffdata ? this.state.Timeoffdata.TimeOffCombineID : 0,
                "UserStoreGuid": this.state.UserStoreGUID,
                "IsFormSchedule": 0,
            }
            console.log('dataTimeoff-->', dataTimeoff)
            this.createTimeofFlag = false;
            this.props.CreateEmployeeTimeOff(dataTimeoff);
            this.setState({
                startDateError: '',
                endDateError: '',
                resonError: '',
                resonDetailError: ''
            });
        }
    }

    resetFilterClick() {
        // const storesArr =  this.state.Stores[0].StoreID;
        this.setState({
            selectedRoleId : 0,
            selectedStoreId : this.state.StoresList.length > 0 ? this.state.StoresList[0].StoreID : -1,
            selectedStoreName : this.state.StoresList.length > 0 ? this.state.StoresList[0].DisplayStoreNumber : -1,
            WeekEndingDate : this.state.currentWeekEndDate
        })
    }

    logrenderitem = ({item, index}) => {
        return(
            <View style={{borderBottomColor: 'black', borderBottomWidth: 1 }}>
                <View style={{ marginHorizontal: Matrics.CountScale(5), flexDirection: 'row'}}>
                    <View style={{ width: '30%' }}>
                        <Text style={Styles.titleFontStyle}>Previous Shift</Text>
                    </View>
                    <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={Styles.titleFontStyle}>{moment(item.OldShiftInTime,'HH:mm:ss').format('hh:mm a')}</Text>
                        <Text style={Styles.titleFontStyle}>{moment(item.OldShiftOutTime,'HH:mm:ss').format('hh:mm a')}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: Matrics.CountScale(5), flexDirection: 'row'}}>
                    <View style={{ width: '30%' }}>
                        <Text style={Styles.titleFontStyle}>Adjusted</Text>
                    </View>
                    <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={Styles.titleFontStyle}>{moment(item.NewShiftInTime,'HH:mm:ss').format('hh:mm a')}</Text>
                        <Text style={Styles.titleFontStyle}>{moment(item.NewShiftOutTime,'HH:mm:ss').format('hh:mm a')}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: Matrics.CountScale(5), flexDirection: 'row'}}>
                    <View style={{ width: '30%' }}>
                        <Text style={Styles.titleFontStyle}>Details</Text>
                    </View>
                    <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Text style={Styles.titleFontStyle}>{`${item.ActionPerformed} by ${item.CreatedBy}`}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderUserRole = ({item, index})  => {
        // console.log('item-->', item);
        
        let resTotalHours = this.state.bottomHoursBasicListArr.filter(t => t.Header == 'Total Hours' && t.DayID == this.state.selectedDayId && t.DayDate == this.state.selectedDate);
        
        let TotalUnitArr = this.state.bottomTotalBasicListArr.filter(tu => tu.DayID == this.state.selectedDayId && tu.DayDate == this.state.selectedDate);
        
        let resPayrollDollars = this.state.bottomHoursBasicListArr.filter(t => t.Header == 'Payroll Dollars' && t.DayID == this.state.selectedDayId && t.DayDate == this.state.selectedDate);
      
        // console.log('resTotalHours-->', resTotalHours)
        // console.log('item-->', item.data)
        // console.log('hoursBasicListArr-->',JSON.stringify(this.state.hoursBasicListArr));
        // console.log('hoursBasicAsUserStoreId-->', this.state.hoursBasicAsUserStoreId)
        // console.log('length-->', Object.keys(item.data).length);
        // console.log('bottomHoursBasicListArr-->', JSON.stringify(this.state.bottomHoursBasicListArr));
        // console.log('bottomTotalBasicListArr-->', JSON.stringify(this.state.bottomTotalBasicListArr));
        let WeTotalHoursRG = 0;
        let WeTotalHoursOT = 0;
        let WeTotalHoursDT = 0;
        let WeTotalHoursBW = 0;
        let PayrollDollarsRG = 0;
        let PayrollDollarsOT = 0;
        let PayrollDollarsDT = 0;
        let PayrollDollarsBW = 0;
        this.state.bottomHoursBasicListArr.forEach((child) => {
            if(child.Header === 'Total Hours') { 
                WeTotalHoursRG = WeTotalHoursRG + child.RG;
                WeTotalHoursOT = WeTotalHoursOT + child.OT;
                WeTotalHoursDT = WeTotalHoursDT + child.DT;
                WeTotalHoursBW = WeTotalHoursBW + child.BW;
            } else if(child.Header === 'Payroll Dollars') {
                PayrollDollarsRG = PayrollDollarsRG + child.RG;
                PayrollDollarsOT = PayrollDollarsOT + child.OT;
                PayrollDollarsDT = PayrollDollarsDT + child.DT;
                PayrollDollarsBW = PayrollDollarsBW + child.BW;
            }
        });

        let WeTotalUnit = 0;
        let WeProductivity = 0;
        let WeNetPayroll = 0;
        let WePayrollTax = 0;
        let WeGrossPayroll = 0;
        let WePayrollPercentage = 0;
        let WeFoodInvoices = 0;
        let WeFoodInvoiceCredit = 0;
        let WeCoke = 0;
        let WeFoodCostPercentage = 0;
        let WeCokePercentage = 0;
        let WeTotalCOGPercentage = 0;

        this.state.bottomTotalBasicListArr.forEach((child) => {
            WeTotalUnit = WeTotalUnit + child.TotalUnit;
            WeProductivity = WeProductivity + child.Productivity / 7;
            WeNetPayroll = WeNetPayroll + child.NetPayroll;
            WePayrollTax = WePayrollTax + child.PayrollTax;
            WeGrossPayroll = WeGrossPayroll + child.GrossPayroll;
            WePayrollPercentage = WePayrollPercentage + child.PayrollPercentage / 7;
            WeFoodInvoices = WeFoodInvoices + child.FoodInvoices;
            WeFoodInvoiceCredit = WeFoodInvoiceCredit + child.FoodInvoiceCredit;
            WeCoke = WeCoke + child.Coke;
            WeFoodCostPercentage = WeFoodCostPercentage + child.FoodCostPercentage / 7;
            WeCokePercentage = WeCokePercentage + child.CokePercentage / 7;
            WeTotalCOGPercentage = WeTotalCOGPercentage + child.TotalCOGPercentage / 7;
        });
    //    console.log('WeProductivity-->', WeProductivity);
        // console.log('selected date-->', this.state.selectedDate)
        return(
            <View>
                <View style={{ backgroundColor: Colors.APPCOLOR, flexDirection: 'row' }}>
                    <View style={{ width: '48%' }}><Text style={[Styles.headingStyle, { color: 'white', textAlign: 'center' }]} >{item.RoleName}</Text></View>
                    <View style={{ width: '13%', alignItems: 'center' }}><Text style={[Styles.headingStyle, { color: 'white' }]}>RG</Text></View>
                    <View style={{ width: '13%', alignItems: 'center' }}><Text style={[Styles.headingStyle, { color: 'white' }]}>OT</Text></View>
                    <View style={{ width: '13%', alignItems: 'center' }}><Text style={[Styles.headingStyle, { color: 'white' }]}>DT</Text></View>
                    <View style={{ width: '13%', alignItems: 'center' }}><Text style={[Styles.headingStyle, { color: 'white' }]}>BW</Text></View>
                </View>
                {
                    this.state.selectedDate !== 'Total'
                    ?
                        item.data.length > 0
                        ?
                            item.data.map(res => {
                                let resData = this.state.hoursBasicListArr.filter(p => p.UserStoreID == res.UserStoreID && p.DayDate == this.state.selectedDate);
                                console.log('resData-->', resData);
                                console.log('fullname-->', res.FullName);
                                return(
                                    resData.length > 0
                                    // ? resData[0].TimeOffCombineID != 0 
                                    ? resData[0].IsAbsent 
                                        ? // absonse emp
                                            <TextColumn 
                                                name={res.FullName}  
                                                nullRecord={true} 
                                                onAbsencePress={async () => {
                                                await this.setState({ 
                                                    absenceReasonModal: true, 
                                                    selectedTimeoffRoleName: item.RoleName, 
                                                    selectedTimeofEmpName: res.FullName, 
                                                    selectedTimeofPosid: res.EmployeeNumber,
                                                    UserStoreGUID: res.UserStoreGUID  
                                                })
                                                setTimeout(() => {
                                                    this.myComponent.measure((fx, fy, width, height, px, py) => {
                                                        // this.topSpace = py - 10
                                                        this.setState({ topSpace: py - 20 })
                                                        // console.log('112....', this.state.topSpace)
                                                    })
                                                }, 10)
                                                await this.getTimeoff(res.UserStoreGUID, resData[0].TimeOffCombineID).then(data => {
                                                    // console.log('getTimeOff-->timeOffData-->',data);
                                                    Timeoffdata = [];
                                                    if(data.Status == 1) {
                                                        Timeoffdata = data.Basic.Data[0];
                                                    }
                                                    this.setState({ Timeoffdata, selectedReasonId: Timeoffdata.ReasonID, selectedReasonName: Timeoffdata.ReasonName, timeoffNotes: Timeoffdata.ReasonDetail });
                                                    console.log('Timeoffdata-->', Timeoffdata);
                                                });
                                            }} />    
                                        : // emp name shift data
                                            <TextColumn 
                                                name={res.FullName} 
                                                RG={resData[0].RG != undefined ? resData[0].RG != 0 ? resData[0].RG.toFixed(2) : null : null} 
                                                OT={resData[0].OT != undefined ? resData[0].OT != 0 ? resData[0].OT.toFixed(2): null : null} 
                                                DT={resData[0].DT != undefined ? resData[0].DT != 0 ? resData[0].DT.toFixed(2) : null : null} 
                                                BW={resData[0].BW != undefined ? resData[0].BW != 0 ? resData[0].BW.toFixed(2) : null : null} 
                                                onRgDisable={false}
                                                onBwDisable={
                                                    resData[0].BW != undefined 
                                                    ? resData[0].BW != 0
                                                        ? false
                                                        : true
                                                    : true
                                                }
                                                onRGPress={() => {
                                                    if(resData[0].RG != undefined && resData[0].RG != '') {
                                                        this.props.getEmployeePunchDetailRequest({ StoreId: this.state.selectedStoreId, UserStoreID: res.UserStoreID, DayID: this.state.selectedDayId, WeekEnding: this.state.WeekEndingDate });
                                                        this.setState({ 
                                                            hoursModal: true,
                                                            adjustReason: '',
                                                            showpunchSection: false,
                                                            punchInArr: [],
                                                            punchOutArr: [],
                                                            TotalHoursArr: [],
                                                            HoursEmployeeName: res.FullName,
                                                            HoursEmployeeNumber: res.EmployeeNumber,
                                                            HoursUserStoreID: res.UserStoreID,
                                                        }); 
                                                    }
                                                    //  alert(res.UserStoreID)
                                                }}
                                                // onRGPress={() => { this.setState({empName: res.FullName }) }}
                                                onRGLongPress={() => this.longPress(
                                                    res.UserStoreGUID, 
                                                    resData[0].TimeOffCombineID,
                                                    item.RoleName,
                                                    res.FullName,
                                                    res.EmployeeNumber
                                                )}
                                                // onBWPress={() => { this.props.navigation.navigate('BreakWaiver', { date: this.state.selectedDate }) }}
                                                onBWPress={() => { this.props.navigation.navigate('BreakWaiver', { date: this.state.selectedDate, empName: res.FullName, DailyDetailID: resData[0].DailyDetailID, DayID: this.state.selectedDayId, Weekstartdate: this.state.WeekEndingDate, PosId: res.EmployeeNumber }) }}
                                            />

                                    : null
                                );
                            })
                        : // extra data summary section
                            <View>
                                <TextColumn 
                                    name={'Total Hours'} 
                                    RG={resTotalHours.length > 0 ? resTotalHours[0].RG != undefined ? resTotalHours[0].RG != 0 ? resTotalHours[0].RG.toFixed(2) : null : null :  null} 
                                    OT={resTotalHours.length > 0 ? resTotalHours[0].OT != undefined ? resTotalHours[0].OT != 0 ? resTotalHours[0].OT.toFixed(2): null : null : null} 
                                    DT={resTotalHours.length > 0 ? resTotalHours[0].DT != undefined ? resTotalHours[0].DT != 0 ? resTotalHours[0].DT.toFixed(2) : null : null : null} 
                                    BW={resTotalHours.length > 0 ? resTotalHours[0].BW != undefined ? resTotalHours[0].BW != 0 ? resTotalHours[0].BW.toFixed(2) : null : null : null} 
                                    onRgDisable={true}
                                    onBwDisable={true}
                                />
                                {console.log('ProductivityColorCode-->',TotalUnitArr.length > 0 ? TotalUnitArr[0].ProductivityColorCode && TotalUnitArr[0].ProductivityColorCode : 'kk')}
                                <TextRow labelText={'Total Unit'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].TotalUnit ? TotalUnitArr[0].TotalUnit != 0 ? TotalUnitArr[0].TotalUnit.toFixed(2) : null : null : null} />
                                <TextRow labelText={'Productivity'} contentbgColor={TotalUnitArr.length > 0 ? TotalUnitArr[0].ProductivityColorCode ? TotalUnitArr[0].ProductivityColorCode != 'red' ? TotalUnitArr[0].ProductivityColorCode : null : null : null}
                                         contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].Productivity ? TotalUnitArr[0].Productivity != 0 ? TotalUnitArr[0].Productivity.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextColumn 
                                    name={'Payroll Dollars'} 
                                    RG={resPayrollDollars.length > 0 ? resPayrollDollars[0].RG != undefined ? resPayrollDollars[0].RG != 0 ? resPayrollDollars[0].RG.toFixed(2) : null : null : null} 
                                    OT={resPayrollDollars.length > 0 ? resPayrollDollars[0].OT != undefined ? resPayrollDollars[0].OT != 0 ? resPayrollDollars[0].OT.toFixed(2) : null : null : null} 
                                    DT={resPayrollDollars.length > 0 ? resPayrollDollars[0].DT != undefined ? resPayrollDollars[0].DT != 0 ? resPayrollDollars[0].DT.toFixed(2) : null : null : null} 
                                    BW={resPayrollDollars.length > 0 ? resPayrollDollars[0].BW != undefined ? resPayrollDollars[0].BW != 0 ? resPayrollDollars[0].BW.toFixed(2) : null : null : null} 
                                    onRgDisable={true}
                                    onBwDisable={true}
                                />
                                <TextRow labelText={'Net Payroll'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].NetPayroll !== undefined ? TotalUnitArr[0].NetPayroll != 0 ? TotalUnitArr[0].NetPayroll.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'Payroll Tax'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].PayrollTax !== undefined ? TotalUnitArr[0].PayrollTax != 0 ? TotalUnitArr[0].PayrollTax.toFixed(2) : null : null : null} />
                                <TextRow labelText={'Gross Payroll'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].GrossPayroll !== undefined ? TotalUnitArr[0].GrossPayroll != 0 ? TotalUnitArr[0].GrossPayroll.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'Payroll(%)'} contentbgColor={TotalUnitArr.length > 0 ? TotalUnitArr[0].PayrollColorCode ? TotalUnitArr[0].PayrollColorCode : null : null} 
                                        contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].PayrollPercentage !== undefined ?  TotalUnitArr[0].PayrollPercentage != 0 ? TotalUnitArr[0].PayrollPercentage.toFixed(2) : null : null : null} />
    
                                
                                <TextRow labelText={'Food Invoices'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].FoodInvoices !== undefined ? TotalUnitArr[0].FoodInvoices != 0 ? TotalUnitArr[0].FoodInvoices.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'Food/Coke Invoice Credits'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].FoodInvoiceCredit !== undefined ? TotalUnitArr[0].FoodInvoiceCredit != 0 ? TotalUnitArr[0].FoodInvoiceCredit.toFixed(2) : null : null : null} />
                                <TextRow labelText={'Coke'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].Coke !== undefined ? TotalUnitArr[0].Coke != 0 ? TotalUnitArr[0].Coke.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'Food Cost (%)'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].FoodCostPercentage !== undefined ? TotalUnitArr[0].FoodCostPercentage != 0 ? TotalUnitArr[0].FoodCostPercentage.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                <TextRow labelText={'Coke Cost (%)'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].CokePercentage !== undefined ? TotalUnitArr[0].CokePercentage != 0 ? TotalUnitArr[0].CokePercentage.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                                
                                <TextRow labelText={'Total COGS & Labor(%)'} contentText={TotalUnitArr.length > 0 ? TotalUnitArr[0].TotalCOGPercentage ? TotalUnitArr[0].TotalCOGPercentage != 0 ? TotalUnitArr[0].TotalCOGPercentage.toFixed(2) : null : null : null} bgColor={Colors.ROWBGCOLOR} />
                            </View>
                    :item.data.length > 0  // Total Column logic
                        ? 
                            item.data.map(res => {
                                let TotalRG = 0;
                                let TotalOT = 0;
                                let TotalDT = 0;
                                let TotalBW = 0;
                                this.state.hoursBasicAsUserStoreId.forEach((child) => {
                                    if(res.UserStoreID === child.UserStoreID) { 
                                        child.data.forEach((val) => {
                                         TotalRG = TotalRG + val.RG;
                                         TotalOT = TotalOT + val.OT;
                                         TotalDT = TotalDT + val.DT;
                                         TotalBW = TotalBW + val.BW;
                                        });
                                     }
                                })
                                return(
                                    <TextColumn 
                                        name={res.FullName} 
                                        RG={parseFloat(TotalRG).toFixed(2)} 
                                        OT={parseFloat(TotalOT).toFixed(2)} 
                                        DT={parseFloat(TotalDT).toFixed(2)} 
                                        BW={parseFloat(TotalBW).toFixed(2)} 
                                        onRgDisable={true}
                                        onBwDisable={true}
                                    />
                                );
                            })  
                        : 
                        <View>
                            <TextColumn 
                                name={'Total Hours'} 
                                RG={WeTotalHoursRG.toFixed(2)} 
                                OT={WeTotalHoursOT.toFixed(2)} 
                                DT={WeTotalHoursDT.toFixed(2)} 
                                BW={WeTotalHoursBW.toFixed(2)} 
                                onRgDisable={true}
                                onBwDisable={true}
                            />
                            <TextRow labelText={'Total Unit'} contentText={WeTotalUnit.toFixed(2)} />
                            <TextRow labelText={'Productivity'} contentbgColor="green" contentText={WeProductivity.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextColumn 
                                name={'Payroll Dollars'} 
                                RG={PayrollDollarsRG.toFixed(2)} 
                                OT={PayrollDollarsOT.toFixed(2)} 
                                DT={PayrollDollarsDT.toFixed(2)} 
                                BW={PayrollDollarsBW.toFixed(2)} 
                                onRgDisable={true}
                                onBwDisable={true}
                            />
                            <TextRow labelText={'Net Payroll'} contentText={WeNetPayroll.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextRow labelText={'Payroll Tax'} contentText={WePayrollTax.toFixed(2)} />
                            <TextRow labelText={'Gross Payroll'} contentText={WeGrossPayroll.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextRow labelText={'Payroll(%)'} contentbgColor="red" contentText={WePayrollPercentage.toFixed(2)} />

                            
                            <TextRow labelText={'Food Invoices'} contentText={WeFoodInvoices.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextRow labelText={'Food/Coke Invoice Credits'} contentText={WeFoodInvoiceCredit.toFixed(2)} />
                            <TextRow labelText={'Coke'} contentText={WeCoke.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextRow labelText={'Food Cost (%)'} contentText={WeFoodCostPercentage.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            <TextRow labelText={'Coke Cost (%)'} contentText={WeCokePercentage.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                            
                            <TextRow labelText={'Total COGS & Labor(%)'} contentText={WeTotalCOGPercentage.toFixed(2)} bgColor={Colors.ROWBGCOLOR} />
                        </View>
                }
            </View>
        )
    }


    //----------->>>Render Method-------------->>>

    render() {
        // console.log('render');
        // console.log('absenceReason-->', this.state.absenceReason);
        // console.log('empRoleWiseData-->',this.state.empRoleWiseData);
        // console.log('empRoleWiseData-->',this.state.empRoleWiseData.length);
        // console.log('hoursBasicListArr-->',this.state.hoursBasicListArr.length);
        // console.log('bottomHoursBasicListArr-->',this.state.bottomHoursBasicListArr.length);
        // console.log('bottomTotalBasicListArr-->',this.state.bottomTotalBasicListArr.length);
        // console.log('hoursBasicAsUserStoreId-->',this.state.hoursBasicAsUserStoreId.length);
        // console.log('selectedDate-->',this.state.selectedDate);
        // console.log('newTimeoffDataArr-->', this.state.newTimeoffDataArr.length);
        return (
            <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
                <View style={{paddingTop: Platform.OS == 'ios' ? (Matrics.screenHeight == 812 ? 30 : 20) : 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                    <View style={{  flex: 1, flexDirection: 'row',justifyContent: 'flex-start'}} />
                    <View>
                        <Text style={{ textAlign: 'center', fontSize: Matrics.CountScale(18), top: 5, fontFamily: Fonts.NunitoSansRegular }}>Weekly Summary Sheet</Text>
                        {/* <Dropdown
                            containerStyle={{ justifyContent: 'center' }}
                            pickerStyle={{ top: Matrics.headerHeight }}
                            data={this.state.StoresList}
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
                    </View>

                    <TouchableOpacity 
                        onPress={() => { self.setState({ filterModal: true, isDateTimePickerVisible: false }) }}
                        style={{ flexDirection: 'row', justifyContent: 'flex-end', flex: 1, marginRight: Matrics.CountScale(10)}}
                    >
                        <Image source={Images.FilterIcon} style={{ height: Matrics.CountScale(25), width: Matrics.CountScale(25), resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Carousel
                      ref={(c) => { this._carousel = c; }}
                      data={this.state.FinalWeekDatesDataArr}
                      renderItem={this._renderItem.bind(this)}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={Matrics.screenWidth / 2 - Matrics.CountScale(10)}
                      activeSlideAlignment={'start'}
                      inactiveSlideScale={1}
                      inactiveSlideOpacity={1}
                      extraData={this.state}
                      onSnapToItem={(index) => this.setState({ dayIndex: index, selectedDate: this.state.FinalWeekDatesDataArr[index].WeekDate, selectedDayId: this.state.FinalWeekDatesDataArr[index].DayID })}
                  />
                  
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this.onRefresh}
                        />
                    }
                >
                    <View>
                        {
                            this.state.empRoleWiseData.length > 0 &&
                            this.state.hoursBasicListArr.length > 0 &&
                            this.state.bottomHoursBasicListArr.length > 0 &&
                            this.state.bottomTotalBasicListArr.length > 0 &&
                            this.state.hoursBasicAsUserStoreId.length > 0 
                            // this.state.newTimeoffDataArr.length > 0
                            ?
                                <FlatList
                                    data={this.state.empRoleWiseData}
                                    extraData={this.state.selectedDate}
                                    renderItem={this.renderUserRole}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            : this.state.loading === false
                                ? 
                                    <Text style={{ textAlign: 'center',paddingHorizontal:Matrics.CountScale(10) , marginTop: '50%', fontFamily: Fonts.NunitoSansRegular, fontSize: Matrics.CountScale(20) }}>
                                        No Data Found Please Try Again!!!
                                    </Text>
                                : null
                        }
                        
                    </View>
                   
                </ScrollView>
                
                <Modal
                    visible={this.state.hoursModal}
                    transparent={true}
                >
                    <View style={Styles.modalViewContainer}>
                        <View style={[Styles.viewContainer, { height: '80%', backgroundColor: Colors.BODYBACKGROUND}]}>
                            <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center' }}>
                                <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15), }]}>Employee Hours Details</Text>
                                <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => this.setState({ hoursModal: false })}>
                                    <Image source={Images.Close} style={{ margin: 15, }} />
                                </TouchableOpacity>
                            </View>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center' }}>
                                <View style={{ backgroundColor: 'white', padding: Matrics.CountScale(15) }}>
                                    <Text style={Styles.titleFontStyle}>Name : <Text style={Styles.fontStyle}>{this.state.puchDetailArr.length > 0 ? this.state.puchDetailArr[0].EmployeeName : this.state.HoursEmployeeName}</Text></Text>
                                    <Text style={Styles.titleFontStyle}>POS ID : <Text style={Styles.fontStyle}>{this.state.puchDetailArr.length > 0 ? this.state.puchDetailArr[0].EmployeeNumber : this.state.HoursEmployeeNumber}</Text></Text>
                                    <View style={{ flexDirection: 'row'}}>
                                        <Text style={[Styles.titleFontStyle, {flex: 1 }]}>Date : <Text style={Styles.fontStyle}>
                                                {this.state.puchDetailArr.length > 0 
                                                    ? moment(this.state.puchDetailArr[0].DayDate).format('MMM DD YYYY, ddd') 
                                                    : moment(this.state.selectedDate).format('MMM DD YYYY, ddd')
                                                }
                                            </Text>
                                        </Text>
                                        <Icon onPress={() => {this.setState({ showpunchSection: true, inTime: '', outTime: '' })}} style={{ alignSelf: 'flex-end'}} size={20} name="plus-square" color={Colors.APPCOLOR} />
                                    </View>
                                </View>

                                {
                                    this.state.showpunchSection
                                    ?
                                    <View style={{ margin: Matrics.CountScale(15), backgroundColor: 'white', borderRadius: Matrics.CountScale(10) }}>
                                        <View style={Styles.containerStyle}>
                                            <View style={Styles.modalContentRowStyle}>
                                                <Text style={Styles.rowLabelText}>In :</Text>
                                                <Text onPress={() => this._showTimePicker('InTime')}>{this.state.inTime ? this.state.inTime : 'Select'}</Text>
                                            </View>
                                            <View style={Styles.modalContentRowStyle}>
                                                <Text style={Styles.rowLabelText}>Out :</Text>
                                                <Text onPress={() => this._showTimePicker('OutTime')}>{this.state.outTime ? this.state.outTime : 'Select'}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                                }
                            
                                <View style={{ backgroundColor: Colors.BODYBACKGROUND }}>
                                    <View style={{ margin: Matrics.CountScale(15), backgroundColor: 'white', borderRadius: Matrics.CountScale(5) }}>
                                        <View style={{ flexDirection: 'row',borderBottomWidth: 1, borderColor: Colors.BORDERCOLOR, justifyContent: 'space-between', paddingVertical: Matrics.CountScale(5), marginHorizontal: Matrics.CountScale(10)}}>
                                            <Text style={Styles.titleFontStyle}>In</Text>
                                            <Text style={Styles.titleFontStyle}>Out</Text>
                                            <Text style={Styles.titleFontStyle}>Total</Text>
                                        </View>
                                        <FlatList 
                                            data={this.state.puchDetailArr}
                                            style={{ height: Matrics.CountScale(100)}}
                                            renderItem={({ item, index }) => {
                                                return(
                                                    <View style={Styles.modalContentRowStyle}>
                                                        <Text style={Styles.titleFontStyle} onPress={() => {
                                                                this._showTimePicker('punchInTime', index, item.PunchIn,item.PunchOut);
                                                                this.setState({ punchInTime: item.PunchIn })
                                                        }}>
                                                            {
                                                                this.state.punchInArr.length == 0 
                                                                ? moment(item.PunchIn,'hh:mm:ss').format('HH:mm')
                                                                : this.state.punchInArr[index] == undefined
                                                                    ?  moment(item.PunchIn,'hh:mm:ss').format('HH:mm')
                                                                    : moment(this.state.punchInArr[index], 'hh:mm:ss').format('HH:mm')
                                                            }
                                                        </Text>
                                                        <Text style={Styles.titleFontStyle} onPress={() => {
                                                            this._showTimePicker('punchOutTime', index,  item.PunchIn,item.PunchOut);
                                                            this.setState({ punchOutTime: item.PunchOut })
                                                        }}>
                                                            {
                                                                this.state.punchOutArr.length == 0 
                                                                ? moment(item.PunchOut,'hh:mm:ss').format('HH:mm')
                                                                : this.state.punchOutArr[index] == undefined
                                                                    ? moment(item.PunchOut,'hh:mm:ss').format('HH:mm')
                                                                    : moment(this.state.punchOutArr[index], 'hh:mm:ss').format('HH:mm')
                                                            }
                                                        </Text>
                                                        <Text style={Styles.titleFontStyle}>
                                                            {
                                                                // this.state.punchInArr.length == 0 && this.state.punchOutArr.length == 0 
                                                                // ? item.TotalHours
                                                                // : this.state.punchInArr.length > 0 && this.state.punchOutArr.length == 0
                                                                //     ?  this.state.punchInArr[index] !== undefined
                                                                //         ? Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('hh:mm:ss'),item.PunchOut)
                                                                //         : Global.getTimeDiff(item.PunchIn, item.PunchOut)
                                                                //     :  this.state.punchInArr.length > 0 && this.state.punchOutArr.length > 0
                                                                //         ? this.state.punchInArr[index] !== undefined && this.state.punchOutArr[index] !== undefined
                                                                //             : Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('hh:mm:ss'),
                                                                //             moment(this.state.punchOutArr[index],'hh:mm:ss').format('hh:mm:ss'))
                                                                    
                                                                this.state.punchInArr.length > 0 && this.state.punchOutArr.length == 0
                                                                ?   this.state.punchInArr[index] !== undefined
                                                                    ? Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('HH:mm:ss'),item.PunchOut) 
                                                                    : Global.getTimeDiff(item.PunchIn, item.PunchOut)
                                                                : this.state.punchInArr.length > 0 && this.state.punchOutArr.length > 0
                                                                    ? this.state.punchInArr[index] !== undefined && this.state.punchOutArr[index] !== undefined
                                                                        ? Global.getTimeDiff(moment(this.state.punchInArr[index],'hh:mm:ss').format('HH:mm:ss'),
                                                                            moment(this.state.punchOutArr[index],'hh:mm:ss').format('HH:mm:ss'))
                                                                        : Global.getTimeDiff(item.PunchIn, item.PunchOut)
                                                                    : this.state.punchInArr.length == 0 && this.state.punchOutArr.length == 0 
                                                                        ? item.TotalHours
                                                                        : item.TotalHours
                                                            }
                                                        </Text>
                                                    </View>
                                                )
                                            }}
                                            extraData={this.state}
                                            keyExtractor={(item, index) => index.toString()}
                                        />   
                                    
                                    </View>
                                </View>
                                <View style={{ backgroundColor: Colors.BODYBACKGROUND,  marginBottom: this.state.punchDetailLogHistory.length == 0 ? Matrics.CountScale(15) : 0, }}>
                                    <View style={[Styles.containerStyle, { marginHorizontal: Matrics.CountScale(15), padding: Matrics.CountScale(15) }]}>
                                        <TextInput 
                                            multiline={true} 
                                            autoCorrect={false} 
                                            style={{ height: Matrics.CountScale(50), fontFamily: Fonts.NunitoSansRegular }}
                                            placeholder={'Reason for Adjustment'}
                                            value={this.state.adjustReason}
                                            onChangeText={(value) => this.setState({ adjustReason: value, adjustReasonError: '' })}
                                        />
                                        <Text style={Styles.errorText}>{this.state.adjustReasonError}</Text>
                                    </View>
                                </View>

                                {
                                    this.state.punchDetailLogHistory.length > 0
                                    ?
                                        <View style={{ backgroundColor: Colors.BODYBACKGROUND, marginBottom: Matrics.CountScale(15) }}>
                                            <View style={{ margin: Matrics.CountScale(15), backgroundColor: 'white', borderRadius: Matrics.CountScale(5) }}>
                                                <Text style={{ textAlign: 'center', fontFamily: Fonts.NunitoSansSemiBold, fontSize: Matrics.CountScale(18), borderBottomWidth: 1, borderColor: Colors.APPCOLOR}}>Adjustments Log History</Text>
                                                <View style={{ marginHorizontal: Matrics.CountScale(5), flexDirection: 'row',borderTopColor: Colors.APPCOLOR, borderTopWidth: 1 , borderBottomWidth: 1, borderBottomColor: Colors.BORDERCOLOR}}>
                                                    <View style={{ width: '30%' }}>
                                                        <Text></Text>
                                                    </View>
                                                    <View style={{ width: '75%', flexDirection: 'row', justifyContent: 'space-around'}}>
                                                        <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(16)}]}>In</Text>
                                                        <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(16)}]}>Out</Text>
                                                    </View>
                                                </View>
                                                <FlatList 
                                                    data={this.state.punchDetailLogHistory}
                                                    style={{ height: Matrics.CountScale(150)}}
                                                    renderItem={this.logrenderitem}
                                                    keyExtractor={(item, index) => index.toString()}
                                                />
                                            </View>
                                        </View>
                                    : null
                                }
                            </KeyboardAwareScrollView>
                            <View style={{ flexDirection: "row", marginHorizontal: Matrics.CountScale(8), marginTop: Matrics.CountScale(10) }}>
                                <TouchableOpacity 
                                    style={Styles.btnViewStyle} 
                                    onPress={() => {
                                        const TimeinArr = this.state.puchDetailArr.filter(p => moment(p.PunchIn,'hh:mm:ss').format('HH:mm') == this.state.inTime && moment(p.PunchOut,'hh:mm:ss').format('HH:mm') == this.state.outTime);
                                        // console.log('timeinarr-->', TimeinArr);

                                        if(TimeinArr.length > 0)
                                        {
                                            Alert.alert(
                                                '',
                                                'This Shift Time Is Already In A List.',
                                                [
                                                    { text: 'OK', onPress: () => this.setState({ timingModal: false }) },
                                                ],
                                                { cancelable: false },
                                            );
                                        } else {
                                            this.setState({ showpunchSection: false });
                                            const lastPunchDetail =  this.state.puchDetailArr[this.state.puchDetailArr.length - 1];
                                            const newPunchData = {
                                                "PunchIn": this.state.inTime,
                                                "PunchOut": this.state.outTime,
                                                "TotalHours": this.state.totalHour,
                                                "AdjDescription": lastPunchDetail != undefined ? lastPunchDetail.AdjDescription : '',
                                                "DayDate": lastPunchDetail != undefined ? lastPunchDetail.DayDate : this.state.selectedDate,
                                                "EmployeeName": lastPunchDetail != undefined ? lastPunchDetail.EmployeeName : this.state.HoursEmployeeName,
                                                "EmployeeNumber": lastPunchDetail != undefined ? lastPunchDetail.EmployeeNumber : this.state.HoursEmployeeNumber,
                                                "IsAdjusted": false,
                                                "OnJob": lastPunchDetail != undefined ? lastPunchDetail.OnJob : false,
                                                "PunchID": "",
                                                "PunchInAdjusted": false,
                                                "PunchOutAdjusted": false,
                                                "UserStoreID": lastPunchDetail != undefined ? lastPunchDetail.UserStoreID : this.state.HoursUserStoreID,
                                            }
                                            this.state.puchDetailArr.push(newPunchData);
                                            this.setState({ puchDetailArr: this.state.puchDetailArr});
                                        }
                                        
                                    }}
                                    disabled={this.state.inTime == '' || this.state.outTime == '' ? true : false}
                                >
                                    <View><Text style={Styles.btnTextStyle}>Add</Text></View>
                                </TouchableOpacity>
                                <TouchableOpacity style={Styles.btnViewStyle} disabled={true} onPress={() => this.props.DeleteEmployeePunchDetail({ PunchID: this.state.PunchID })}>
                                    <View><Text style={Styles.btnTextStyle}>Delete</Text></View>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={Styles.btnViewStyle2} onPress={() => this.onUpdatePunchDetails() }>
                                <View><Text style={[Styles.btnTextStyle, { color: 'white' }]}>Save</Text></View>
                            </TouchableOpacity>
                        </View>
                    </View>
                   
                    {/* {console.log('timepicker-->',this.state.timeFlag, '----', this.state.punchInTime, '---', this.state.punchOutTime)}             */}
                    <DateTimePicker
                        isVisible={this.state.isTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={this._hideTimePicker}
                        mode={'time'}
                        date = {
                            this.state.showpunchSection && this.state.timeFlag === 'InTime' 
                            ?   this.state.inTime 
                                ? moment(`2000/10/1 ${moment(this.state.inTime, "h:mm A").format('hh:mm A')}`).toDate() 
                                : new Date()
                            : this.state.showpunchSection && this.state.timeFlag === 'OutTime'
                                ? this.state.outTime 
                                    ? moment(`2000/10/1 ${moment(this.state.outTime, "h:mm A").format('hh:mm A')}`).toDate()
                                    : new Date()
                                : this.state.timeFlag === 'punchInTime' 
                                    ? this.state.punchInTime ? moment(`2000/10/1 ${moment(this.state.punchInTime, "h:mm A").format('hh:mm A')}`).toDate() : new Date() 
                                    : this.state.punchOutTime ? moment(`2000/10/1 ${moment(this.state.punchOutTime, "h:mm A").format('hh:mm A')}`).toDate() : new Date()
                        }
                        // date={this.state.timeFlag === 'InTime' 
                        // ? this.state.inTime 
                        //     ? moment(`2000/10/1 ${moment(this.state.inTime, "h:mm A").format('hh:mm A')}`).toDate() 
                        //     : new Date()
                        // : this.state.outTime 
                        //     ? moment(`2000/10/1 ${moment(this.state.outTime, "h:mm A").format('hh:mm A')}`).toDate()
                        //     : new Date()
                        // }
                    />
                </Modal>

                <Modal
                    visible={this.state.absenceReasonModal}
                    transparent={true}
                >
                    <View style={Styles.modalViewContainer}>
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
                            <View style={Styles.viewContainer}>
                                <View style={{ backgroundColor: Colors.APPCOLOR, alignItems: 'center' }}>
                                    <Text style={[Styles.titleFontStyle, { fontSize: Matrics.CountScale(15), color: 'white', paddingVertical: Matrics.CountScale(15) }]}>Absence Reasons</Text>
                                    <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => this.setState({ absenceReasonModal: false })}>
                                        <Image source={Images.Close} style={{ margin: 15, }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ backgroundColor: Colors.BODYBACKGROUND }} ref={view => { this.myComponent = view; }}>
                                    <View style={{ width: '100%', flexDirection: 'row', marginTop: Matrics.CountScale(10) }} renderToHardwareTextureAndroid={true} ref={view => { this.myComponent = view; }}>
                                            <Text style={[Styles.rowLabelText, { marginLeft: Matrics.CountScale(15), marginTop: Matrics.CountScale(4) }]}>Reason:</Text>
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
                                                overlayStyle={{ top: this.state.topSpace, borderWidth: 0 }}
                                                dropdownOffset={{ top: 0, left: 0 }}
                                                fontSize={17}
                                                itemCount={8}
                                                rippleColor='white'
                                                rippleCentered={true}
                                                error={this.state.resonError}
                                                selectedTextStyle={{ textAlign: 'center'}}
                                            />

                                        </View>
                                    <Text style={[Styles.rowLabelText, { marginLeft: Matrics.CountScale(15), marginTop: Matrics.CountScale(10) }]}>Notes :</Text>

                                    <View style={{ margin: Matrics.CountScale(15), borderColor: Colors.BORDERCOLOR, borderWidth: 1, paddingHorizontal: Matrics.CountScale(10), paddingVertical: Matrics.CountScale(5) }}>
                                        <TextInput 
                                            multiline={true} 
                                            autoCorrect={false}
                                            value={this.state.timeoffNotes}
                                            style={{ height: Matrics.CountScale(120), fontFamily: Fonts.NunitoSansRegular }}
                                            placeholder={'Type here....'}
                                            onChangeText={(text) => this.setState({timeoffNotes: text, resonDetailError: '' })}
                                        />
                                        <Text style={Styles.errorText}>{this.state.resonDetailError}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: Matrics.CountScale(15) }}>
                                        <TouchableOpacity style={{ borderWidth: 1, borderColor: Colors.APPCOLOR, borderRadius: 5, padding: 3 }} onPress={() => { this.onSelectFile() }}>
                                            <Text style={[Styles.rowLabelText, { color: Colors.APPCOLOR }]}>Choose file</Text>
                                        </TouchableOpacity>
                                        <Text style={[Styles.rowLabelText, { flex: 1, marginLeft: Matrics.CountScale(15) }]}>{this.state.attachFile ? this.state.attachFile : null}</Text>
                                    </View>

                                    <TouchableOpacity style={Styles.btnViewStyle2} onPress={() => this.onCreateTimeOff()}>
                                        <View><Text style={[Styles.btnTextStyle, { color: 'white' }]}>Save</Text></View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <DateTimePicker
                                isVisible={this.state.isDateTimePickerVisible}
                                onConfirm={this._handleDatePicked}
                                onCancel={this._hideDateTimePicker}
                                date={
                                    this.state.dateFlag == 'startDate'
                                    ? this.state.timeoffStartDate ? new Date(this.state.timeoffStartDate) : new Date()
                                    : this.state.timeoffEndDate ? new Date(this.state.timeoffEndDate) : new Date()
                                }
                            /> */}
                        </KeyboardAwareScrollView>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.filterModal}
                >
                    <View style={{ flex: 1 }}>
                        <Header centerText='Filter'
                            rightText='Save'
                            leftText='Cancel'
                            onLeftPress={() => {
                                this.setState({ 
                                    filterModal: false,
                                    weekendDate: this.state.lastFilterweekendDate, 
                                    selectedRoleId: this.state.lastFilterselectedRoleId,
                                    selectedStoreId: this.state.lastFilterselectedStoreId,
                                    selectedStoreName: this.state.lastFilterselectedStoreName,
                                });
                            }}
                            onRightPress={() => {
                                this.weatherListFlag = false;
                                this.weekDayStatusFlag = false;
                                this.WeeklySummarySheetFlag = false;
                                this.weekDatesFlag = false;

                                this.props.getWeekDatesRequest({ WeekEnding: this.state.WeekEndingDate, DayID: -1 })
                                this.props.getWeatherDetailsListRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate });
                                this.props.getWeeklySummaryWeekDayStatusList({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate });
                                this.props.getWeeklySummarySheetDataRequest({ StoreId: this.state.selectedStoreId, WeekEnding: this.state.WeekEndingDate, DayId: -1 });
                                this.setState({ 
                                    filterModal: false,
                                    isFromFilter: true,
                                    loading: true,
                                    lastFilterweekendDate: this.state.weekendDate,
                                    lastFilterselectedRoleId: this.state.selectedRoleId,
                                    lastFilterselectedStoreId: this.state.selectedStoreId,
                                    lastFilterselectedStoreName: this.state.selectedStoreName,
                                });
                                
                            }}
                        />
                        <View style={{ flex: 1, padding: Matrics.CountScale(10) }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={[Styles.pickerLabelStyle, { paddingVertical: Matrics.CountScale(10) }]}>W/E</Text>
                                    <TouchableOpacity onPress={() => this._showDateTimePicker('weekending')}>
                                        <Text>{this.state.WeekEndingDate ? this.state.WeekEndingDate : 'Select Date'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    this.state.isDateTimePickerVisible && this.state.dateFlag === 'weekending'
                                    ?
                                    <CalendarPicker
                                        onDateChange={this._handleDatePicked}
                                        enableWeek="Tue"
                                        selectedDayColor="#139a46"
                                        previousTitle="<"
                                        nextTitle=">"
                                        initialDate={this.state.WeekEndingDate}
                                        selectedDayColor={Colors.APPCOLOR}
                                        selectedDayTextColor={Colors.WHITE}
                                        customDatesStyles={[
                                            {date: this.state.WeekEndingDate,
                                            style: {backgroundColor: Colors.APPCOLOR},
                                            textStyle: {color: Colors.WHITE}, 
                                            containerStyle: [],
                                        }]}
                                        maxDate={this.state.currentWeekEndDate}
                                    />
                                    : null
                                }
                                <Text style={[Styles.errorText, { textAlign: 'right', fontSize: Matrics.CountScale(14)}]}>{this.state.weekEndDateError}</Text>
                                <View style={Styles.labelBorderStyle}>
                                    <Text style={Styles.pickerLabelStyle}>Role</Text>
                                </View>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedRoleId}
                                    onValueChange={value => this.setState({ selectedRoleId: value })}
                                >
                                    {this.getRole()}
                                </Picker>
                                {/* <View style={Styles.labelBorderStyle}>
                                    <Text style={Styles.pickerLabelStyle}>Users</Text>
                                </View>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedUsers}
                                    onValueChange={value => this.setState({ selectedUsers: value })}
                                >
                                    {this.getUsers()}
                                </Picker> */}
                                <Text style={Styles.pickerLabelStyle}>Stores</Text>
                                <Picker
                                    itemStyle={Styles.pickerItemStyle}
                                    selectedValue={this.state.selectedStoreId}
                                    onValueChange={value => {
                                        const selectedStoreNameArr =  this.state.StoresList.filter(s => s.StoreID == value);
                                        this.setState({ selectedStoreId: value, selectedStoreName: selectedStoreNameArr[0].DisplayStoreNumber })
                                    }}
                                >
                                    {this.getStores()}
                                </Picker>
                                <TouchableOpacity onPress={() => this.resetFilterClick()} style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'red', borderRadius: 5, padding: 5, }}>
                                    <Image source={Images.Close} style={{ tintColor: 'red', marginHorizontal: 10 }} />
                                    <Text style={{ color: 'red' }}>Reset Filter</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                        {/* <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                        /> */}
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
    fontStyle: {
        fontFamily: Fonts.NunitoSansRegular
    },
    SmallFontStyle: {
        fontSize: Matrics.CountScale(12),
        fontFamily: Fonts.NunitoSansRegular
    },
    borderStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderRightWidth: 1,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    rowTitleStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderRightWidth: 1,
        paddingVertical: Matrics.CountScale(10),
        width: '48.2%'
    },
    mainContainerLabel: {
        fontFamily: Fonts.NunitoSansRegular,
        marginLeft: Matrics.CountScale(10),
    },
    headingStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        padding: Matrics.CountScale(10),
    },
    columnContentStyle: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: Colors.BORDERCOLOR,
    },
    columnContentTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        // color: Colors.TEXTRED,
        textAlign: 'center',
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
    },
    titleFontStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: 12,
        marginLeft: Matrics.CountScale(15)
    },
    containerStyle: {
        backgroundColor: 'white',
        overflow: 'hidden',
        paddingHorizontal: Matrics.CountScale(10),
    },
    modalContentRowStyle: {
        flexDirection: 'row', 
        // borderBottomWidth: 1,
        // borderColor: Colors.BORDERCOLOR,
        paddingVertical: Matrics.CountScale(5),
        justifyContent: 'space-between',
        marginHorizontal: Matrics.CountScale(10)
    },
    rowLabelText: {
        fontFamily: Fonts.NunitoSansSemiBold,
        color: Colors.TEXTGREY,
        fontSize: Matrics.CountScale(16),
    },
    btnViewStyle: {
        marginHorizontal: Matrics.CountScale(8),
        flex: 1,
        borderRadius: 5,
        borderColor: Colors.SKYBLUE,
        borderWidth: 1,
        padding: Matrics.CountScale(10),
        alignItems: 'center',
        backgroundColor: 'white'
    },
    btnTextStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
        color: Colors.SKYBLUE,
        fontSize: Matrics.CountScale(18)
    },
    btnViewStyle2: {
        marginHorizontal: Matrics.CountScale(15),
        marginVertical: Matrics.CountScale(15),
        backgroundColor: Colors.SKYBLUE,
        borderRadius: 5,
        borderColor: Colors.SKYBLUE,
        borderWidth: 1,
        padding: Matrics.CountScale(10),
        alignItems: 'center'
    },
});

const mapStateToProps = (state) => {
    return {
      resWeeklySchedule: state.WeeklySchedule,
      resSummarySheet: state.WeeklySummarySheet,
      filterSummarySheet: state.WeeklySummarySheet,
      headerFiltervalues: state.HirePacket,
    }
}

export default connect(mapStateToProps, { getWeeklySummarySheetDataRequest, getTimeOffReasonsListRequest, getWeekDatesRequest,
  DeleteEmployeePunchDetail, UpdateEmployeePunchDetailRequest, ManageWeeklySummaryWeekDayStatus, CreateEmployeeTimeOff,
  getWeatherDetailsListRequest, getWeeklySummaryWeekDayStatusList,  
  getEmployeePunchDetailRequest, getHeaderFilterValuesRequest, GetEmployeeTimeOffRequest  }
  )(WeeklySummarySheet);

