import React from 'react';
import { View, Text, Platform, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
import DocumentPicker from 'react-native-document-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default class Minor extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Minor-Under 18 Years',
    headerTitleStyle: MasterCss.headerTitleStyle,
    headerLeft:
        <TouchableOpacity onPress={() => { navigation.goBack() }} >
            <Image source={Images.BackIcon} style={MasterCss.headerIconStyle} />
        </TouchableOpacity>,
    headerRight: navigation.state.params && navigation.state.params.headerRight,
  });

  state = {
    HSGchecked: false,
    issueDate: '',
    expirationDate: '',
    offSessionChecked: false,
    permitFile: '',
    PermitFilePath: '',
    startDate: '',
    endDate: '',
    InTime: '',
    OutTime: '',
    anyHoursCheckedWe: false,
    anyHoursCheckedTh: false,
    anyHoursCheckedFr: false,
    anyHoursCheckedSa: false,
    anyHoursCheckedSu: false,
    anyHoursCheckedMo: false,
    anyHoursCheckedTu: false,
    tableHead: ['Day', 'Any Hours', 'Hours', 'Working Hours'],
    tableTitle: ['We', 'Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu',],
    hoursWe: '',
    hoursTh: '',
    hoursFr: '',
    hoursSa: '',
    hoursSu: '',
    hoursMo: '',
    hoursTu: '',
    workingHoursWe1: '',
    workingHoursWe2: '',
    workingHoursTh1: '',
    workingHoursTh2: '',
    workingHoursFr1: '',
    workingHoursFr2: '',
    workingHoursSa1: '',
    workingHoursSa2: '',
    workingHoursSu1: '',
    workingHoursSu2: '',
    workingHoursMo1: '',
    workingHoursMo2: '',
    workingHoursTu1: '',
    workingHoursTu2: '',
    weeklyMax: '',
    startDateError: '',
    endDateError: '',
    issueDateError: '',
    expirationDateError: '',
    permitFileError: '',
    InTimeError: '',
    OutTimeError: '',
  };

  UNSAFE_componentWillMount() {
   
  }
  componentDidMount() {
    this.props.navigation.setParams({
      headerRight: (
          <TouchableOpacity onPress={() => { this.onClickOfSubmit() }} >
              <Text style={MasterCss.headerRightTextStyle}>Submit</Text>
          </TouchableOpacity>
      )
    });
    const minorData = this.props.navigation.getParam('minorData');
    if(Object.keys(minorData).length > 0){
      this.setState({
        HSGchecked: minorData.MinorData.IsGraduate,
        permitFile: minorData.MinorData.PermitFile,
        PermitFilePath: minorData.MinorData.PermitFilePath,
        issueDate: minorData.MinorData.PermitDate != 'Invalid date' ? moment(minorData.MinorData.PermitDate).format('MM/DD/YYYY') : '',
        expirationDate: minorData.MinorData.ExpirationDate != 'Invalid date' ? moment(minorData.MinorData.ExpirationDate).format('MM/DD/YYYY') : '',
        offSessionChecked: minorData.MinorData.IsOffSession,
        startDate: minorData.MinorData.StartDate != 'Invalid date' ?  moment(minorData.MinorData.StartDate).format('MM/DD/YYYY') : '',
        endDate: minorData.MinorData.EndDate != 'Invalid date' ?  moment(minorData.MinorData.EndDate).format('MM/DD/YYYY') : '',
        InTime: minorData.MinorData.InTime,
        OutTime: minorData.MinorData.OutTime,
      });
      if(minorData.MinorData._weekList.length > 0){
        console.log('in if')
        minorData.MinorData._weekList.forEach(element => {
          console.log('element-->', element);
          if(element.WeekDayName == 'Wednesday'){
            this.setState({
              anyHoursCheckedWe: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursWe1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursWe2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursWe: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Thursday'){
            this.setState({
              anyHoursCheckedTh: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursTh1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursTh2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursTh: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Friday'){
            this.setState({
              anyHoursCheckedFr: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursFr1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursFr2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursFr: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Saturday'){
            this.setState({
              anyHoursCheckedSa: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursSa1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursSa2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursSa: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Sunday'){
            this.setState({
              anyHoursCheckedSu: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursSu1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursSu2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursSu: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Monday'){
            this.setState({
              anyHoursCheckedMo: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursMo1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursMo2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursMo: element.HoursAllowed,
            })
          } else if(element.WeekDayName == 'Tuesday'){
            this.setState({
              anyHoursCheckedTu: element.PlaceHolderInTime == '12:00' ? true : false,
              // workingHoursTu1: element.PlaceHolderInTime == '12:00' ? '12:00' : element.InTime,
              // workingHoursTu2: element.PlaceHolderOutTime == '11:59' ?  '11:59' : element.OutTime,
              hoursTu: element.HoursAllowed,
            })
          }
        });
      }
    }
  }

  _showDateTimePicker = (val) => this.setState({ isDateTimePickerVisible: true, dateFlag: val });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._hideDateTimePicker();
    if(this.state.dateFlag == 'issueDate'){
        this.setState({ issueDate: moment(date).format('MM/DD/YYYY'), issueDateError: '' });
    } else if(this.state.dateFlag === 'expirationDate') {
      this.setState({ expirationDate: moment(date).format('MM/DD/YYYY'), expirationDateError: '' });
    } else if(this.state.dateFlag === 'Form') {
      this.setState({ startDate: moment(date).format('MM/DD/YYYY'), startDateError: '' });
    }  else if(this.state.dateFlag === 'To') {
      if(moment(date).format('MM/DD/YYYY') <= this.state.StartDate) {
        this.setState({ endDateError: 'End date should be greater than start date' });
      } else {
        this.setState({ endDate: moment(date).format('MM/DD/YYYY'), endDateError: '' });
      }
    }
    
  };

  async onSelectFile() {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log('***name', res);
        if (res != null)
          this.setState({ permitFile: res.name, PermitFilePath: res.uri, permitFileError: '' })
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('cancel');
        } else {
            throw err;
        }
    }
  }

  onClickOfSubmit() {
    let reg = /^(0[1-9]|[1][0-2]):([0-5][0-9])((a|p|A|P)(m|M))$/;

    const MinorData = {
      "MinorID":0,
      "UserStoreID":"",
      "UserStoreGUID":"",
      "IsGraduate": this.state.HSGchecked,
      "PermitFile": this.state.permitFile,
      "PermitFilePath": this.state.PermitFilePath,
      "PermitDate": moment(this.state.issueDate).format(),
      "ExpirationDate": moment(this.state.expirationDate).format(),
      "IsOffSession": this.state.offSessionChecked,
      "StartDate": moment(this.state.startDate).format(),
      "EndDate": moment(this.state.endDate).format(),
      "InTime": this.state.InTime,
      "OutTime": this.state.OutTime,
      "WeeklyHoursAllowed":0,
      "_weekList":[
        {
            "DayID":4,
            "WeekDayName":"Wednesday",
            "HoursAllowed": this.state.hoursWe,
            "IsAnyHours": this.state.anyHoursCheckedWe,
            "InTime": this.state.workingHoursWe1,
            "OutTime": this.state.workingHoursWe2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedWe ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedWe ? '11:59' : "HH:MM",
        },
        {
            "DayID":5,
            "WeekDayName":"Thursday",
            "HoursAllowed": this.state.hoursTh,
            "IsAnyHours": this.state.anyHoursCheckedTh,
            "InTime": this.state.workingHoursTh1,
            "OutTime": this.state.workingHoursTh2,
            "disabled":true,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedTh ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedTh ? '11:59' : "HH:MM",
        },
        {
            "DayID":6,
            "WeekDayName":"Friday",
            "HoursAllowed": this.state.hoursFr,
            "IsAnyHours": this.state.anyHoursCheckedFr,
            "InTime": this.state.workingHoursFr1,
            "OutTime": this.state.workingHoursFr2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedFr ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedFr ? '11:59' : "HH:MM",
        },
        {
            "DayID":7,
            "WeekDayName":"Saturday",
            "HoursAllowed": this.state.hoursSa,
            "IsAnyHours": this.state.anyHoursCheckedSa,
            "InTime": this.state.workingHoursSa1,
            "OutTime": this.state.workingHoursSa2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedSa ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedSa ? '11:59' : "HH:MM",
        },
        {
            "DayID":1,
            "WeekDayName":"Sunday",
            "HoursAllowed": this.state.hoursSu,
            "IsAnyHours": this.state.anyHoursCheckedSu,
            "InTime": this.state.workingHoursSu1,
            "OutTime": this.state.workingHoursSu2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedSu ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedSu ? '11:59' : "HH:MM",
        },
        {
            "DayID":2,
            "WeekDayName":"Monday",
            "HoursAllowed": this.state.hoursMo,
            "IsAnyHours": this.state.anyHoursCheckedMo,
            "InTime": this.state.workingHoursMo1,
            "OutTime": this.state.workingHoursMo2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedMo ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedMo ? '11:59' : "HH:MM",
        },
        {
            "DayID":3,
            "WeekDayName":"Tuesday",
            "HoursAllowed": this.state.hoursTu,
            "IsAnyHours": this.state.anyHoursCheckedTu,
            "InTime": this.state.workingHoursTu1,
            "OutTime": this.state.workingHoursTu2,
            "disabled":false,
            "IsValidInTime":true,
            "IsValidOutTime":true,
            "PlaceHolderInTime": this.state.anyHoursCheckedTu ? '12:00' : "HH:MM",
            "PlaceHolderOutTime": this.state.anyHoursCheckedTu ? '11:59' : "HH:MM",
        }
      ],
      "MinorFileName":"",
      "MinorFilePath":""
    }

    const IssueDate = new Date(this.state.issueDate);
    const ExpiryDate = new Date(this.state.expirationDate);

    var date1 = new Date('01/01/2011 '+ moment(this.state.OutTime, "h:mm A").format('h:mm A')); 
    var date2 = new Date('01/01/2011 '+ moment(this.state.InTime, "h:mm A").format('h:mm A'));

   let We1We2NotBlank = (this.state.workingHoursWe1 != '' || this.state.workingHoursWe2 != '') ? true : false;
   let Th1Th2NotBlank = (this.state.workingHoursTh1 != '' || this.state.workingHoursTh2 != '') ? true : false;
   let Fr1Fr2NotBlank = (this.state.workingHoursFr1 != '' || this.state.workingHoursFr2 != '') ? true : false;
   let Sa1Sa2NotBlank = (this.state.workingHoursSa1 != '' || this.state.workingHoursSa2 != '') ? true : false;
   let Su1Su2NotBlank = (this.state.workingHoursSu1 != '' || this.state.workingHoursSu2 != '') ? true : false;
   let Mo1Mo2NotBlank = (this.state.workingHoursMo1 != '' || this.state.workingHoursMo2 != '') ? true : false;
   let Tu1Tu2NotBlank = (this.state.workingHoursTu1 != '' || this.state.workingHoursTu2 != '') ? true : false;
 console.log('We1We2NotBlank-->', We1We2NotBlank)
 console.log('workingHoursWe1-->', this.state.workingHoursWe1)
 console.log('workingHoursWe1-->', this.state.workingHoursWe2)
 console.log('Th1Th2NotBlank-->', Th1Th2NotBlank)
 console.log('workingHoursTh1-->', this.state.workingHoursTh1)
 console.log('workingHoursTh2-->', this.state.workingHoursTh2)

    if(this.state.HSGchecked === false) {
      if( this.state.issueDate === '') {
        this.setState({ issueDateError: 'Please select the issue date' });
      } else if (this.state.expirationDate === ''){
        this.setState({ expirationDateError: 'Please select the expiration date'});
      }
      else if(IssueDate >= ExpiryDate){
        this.setState({ expirationDateError: 'Expiration date should be greater than two issue Date'});
      }
      else if(this.state.offSessionChecked === true) {
        console.log('else if')
        if(this.state.startDate === ''){
          this.setState({ startDateError: 'Please select the start date' });
        } else if (this.state.endDate === ''){
          this.setState({ endDateError: 'Please select the end date' });
        } else if(this.state.endDate  <= this.state.startDate){
          this.setState({ endDateError: 'End date should be greater than to start date' });
        } else if(this.state.InTime === ''){
          this.setState({ InTimeError: 'please select InTime' });
        } else if(this.state.OutTime === ''){
          this.setState({ OutTimeError: 'please select OutTime' });
        } else if(reg.test(this.state.InTime) === false){
          alert('Invalid InTime! Time should be in HH:MMam/pm format. There should not be space in between MM(minutes) and AM/PM');
          // this.setState({ InTimeError: 'Invalid InTime!\n Time should be in HH:MMam/pm\n Format. There should not\n be space in between \nMM(minutes) and AM/PM' });
        } else if(reg.test(this.state.OutTime)=== false) {
          alert('Invalid OutTime! Time should be in HH:MMam/pm format. There should not be space in between MM(minutes) and AM/PM');
          // this.setState({ OutTimeError: 'Invalid OutTime!\n Time should be in HH:MMam/pm\n Format. There should not\n be space in between \nMM(minutes) and AM/PM' });
        } else if(date2 >= date1){
          this.setState({ OutTimeError: 'To time should be greater than From time' });
        } 
        else if(
          (!this.state.anyHoursCheckedWe) &&
          (!this.state.anyHoursCheckedTh) &&
          (!this.state.anyHoursCheckedFr) &&
          (!this.state.anyHoursCheckedSa) &&
          (!this.state.anyHoursCheckedSu) &&
          (!this.state.anyHoursCheckedMo) &&
          (!this.state.anyHoursCheckedTu) &&
          (this.state.workingHoursWe1 == '') &&
          (this.state.workingHoursWe2 == '') &&
          (this.state.workingHoursTh1 == '') &&
          (this.state.workingHoursTh2 == '') &&
          (this.state.workingHoursFr1 == '') &&
          (this.state.workingHoursFr2 == '') &&
          (this.state.workingHoursSa1 == '') &&
          (this.state.workingHoursSa2 == '') &&
          (this.state.workingHoursSu1 == '') &&
          (this.state.workingHoursSu2 == '') &&
          (this.state.workingHoursMo1 == '') &&
          (this.state.workingHoursMo2 == '') &&
          (this.state.workingHoursTu1 == '') &&
          (this.state.workingHoursTu2 == '') 
        ) {
          alert('Working hours are required');
        } else if( We1We2NotBlank == true &&
          ((this.state.workingHoursWe1 == '' && reg.test(this.state.workingHoursWe1) === false) ||
          (this.state.workingHoursWe2 == '' && reg.test(this.state.workingHoursWe2) === false) )
        ) {
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Th1Th2NotBlank == true &&
          ((this.state.workingHoursTh1 == '' || reg.test(this.state.workingHoursTh1) === false) ||
          (this.state.workingHoursTh2 == '' || reg.test(this.state.workingHoursTh2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Fr1Fr2NotBlank == true &&
          ((this.state.workingHoursFr1 == '' || reg.test(this.state.workingHoursFr1) === false) ||
          (this.state.workingHoursFr2 == '' || reg.test(this.state.workingHoursFr2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Sa1Sa2NotBlank == true &&
          ((this.state.workingHoursSa1 == '' || reg.test(this.state.workingHoursSa1) === false) ||
          (this.state.workingHoursSa2 == '' || reg.test(this.state.workingHoursSa2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Su1Su2NotBlank == true &&
          ((this.state.workingHoursSu1 == '' || reg.test(this.state.workingHoursSu1) === false) ||
          (this.state.workingHoursSu2 == '' || reg.test(this.state.workingHoursSu2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Mo1Mo2NotBlank == true &&
          ((this.state.workingHoursMo1 == '' || reg.test(this.state.workingHoursMo1) === false) ||
          (this.state.workingHoursMo2 == '' || reg.test(this.state.workingHoursMo2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else if( Tu1Tu2NotBlank == true &&
          ((this.state.workingHoursTu1 == '' || reg.test(this.state.workingHoursTu1) === false) ||
          (this.state.workingHoursTu2 == '' || reg.test(this.state.workingHoursTu2) === false) )
        ){
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        }
        else {
          console.log('save Data');
          this.props.navigation.goBack();
          this.props.navigation.state.params.callbackData({ MinorData });
        }
      } 
      else if(
        (!this.state.anyHoursCheckedWe) &&
        (!this.state.anyHoursCheckedTh) &&
        (!this.state.anyHoursCheckedFr) &&
        (!this.state.anyHoursCheckedSa) &&
        (!this.state.anyHoursCheckedSu) &&
        (!this.state.anyHoursCheckedMo) &&
        (!this.state.anyHoursCheckedTu) &&
        (this.state.workingHoursWe1 == '') &&
        (this.state.workingHoursWe2 == '') &&
        (this.state.workingHoursTh1 == '') &&
        (this.state.workingHoursTh2 == '') &&
        (this.state.workingHoursFr1 == '') &&
        (this.state.workingHoursFr2 == '') &&
        (this.state.workingHoursSa1 == '') &&
        (this.state.workingHoursSa2 == '') &&
        (this.state.workingHoursSu1 == '') &&
        (this.state.workingHoursSu2 == '') &&
        (this.state.workingHoursMo1 == '') &&
        (this.state.workingHoursMo2 == '') &&
        (this.state.workingHoursTu1 == '') &&
        (this.state.workingHoursTu2 == '') 
      ) {
        alert('Working hours are required');
      } else if( We1We2NotBlank == true &&
        ((this.state.workingHoursWe1 == '' && reg.test(this.state.workingHoursWe1) === false) ||
        (this.state.workingHoursWe2 == '' && reg.test(this.state.workingHoursWe2) === false) )
      ) {
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Th1Th2NotBlank == true &&
        ((this.state.workingHoursTh1 == '' || reg.test(this.state.workingHoursTh1) === false) ||
        (this.state.workingHoursTh2 == '' || reg.test(this.state.workingHoursTh2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Fr1Fr2NotBlank == true &&
        ((this.state.workingHoursFr1 == '' || reg.test(this.state.workingHoursFr1) === false) ||
        (this.state.workingHoursFr2 == '' || reg.test(this.state.workingHoursFr2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Sa1Sa2NotBlank == true &&
        ((this.state.workingHoursSa1 == '' || reg.test(this.state.workingHoursSa1) === false) ||
        (this.state.workingHoursSa2 == '' || reg.test(this.state.workingHoursSa2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Su1Su2NotBlank == true &&
        ((this.state.workingHoursSu1 == '' || reg.test(this.state.workingHoursSu1) === false) ||
        (this.state.workingHoursSu2 == '' || reg.test(this.state.workingHoursSu2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Mo1Mo2NotBlank == true &&
        ((this.state.workingHoursMo1 == '' || reg.test(this.state.workingHoursMo1) === false) ||
        (this.state.workingHoursMo2 == '' || reg.test(this.state.workingHoursMo2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
      else if( Tu1Tu2NotBlank == true &&
        ((this.state.workingHoursTu1 == '' || reg.test(this.state.workingHoursTu1) === false) ||
        (this.state.workingHoursTu2 == '' || reg.test(this.state.workingHoursTu2) === false) )
      ){
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      }
       else {
        this.props.navigation.goBack();
        this.props.navigation.state.params.callbackData({ MinorData });
      }
    }
    else {
      console.log('save Data else');
      this.props.navigation.goBack();
      this.props.navigation.state.params.callbackData({ MinorData });
    }
  }

  render() {
    return (
      <View style={Styles.pageContainer}>
        <ScrollView>

          <View style={Styles.chkContainer}>
            <CheckBox
              checkedIcon={<Image source={Images.CheckBoxChecked} />}
              uncheckedIcon={<Image source={Images.CheckBoxUnchecked} />}
              checked={this.state.HSGchecked}
              onPress={() => this.setState({HSGchecked: !this.state.HSGchecked})}
            />
            <View style={{flex:1, marginTop: Matrics.CountScale(10)}}>
              <Text style={Styles.text}>
                Minor is a high school graduate and does need a work permit. Minor has provided a copy of his/her school diploma.
              </Text>
            </View>
          </View>

          <Text style={Styles.cardHeaderText}>Work Permit Restrictions</Text>
          {/* <DateTimePickerModal
            isVisible={true}
            mode="time"
            onConfirm={(data)=>{console.warn(data);}}
            onCancel={()=>{}}
          /> */}
          {
            this.state.HSGchecked
            ? null
            :
              <View>
                <TouchableOpacity onPress={() => this._showDateTimePicker('issueDate')} style={Styles.cardContainer}>
                  <Text style={Styles.cardText}>{this.state.issueDate == '' ? 'Issue Date' : moment(this.state.issueDate).format('MM.DD.YYYY')}</Text>
                </TouchableOpacity>
                <Text style={Styles.errorText}>{this.state.issueDateError}</Text>
                <TouchableOpacity onPress={() => this._showDateTimePicker('expirationDate')} style={Styles.cardContainer}>
                  <Text style={Styles.cardText}>{this.state.expirationDate == '' ? 'Expiration Date' : moment(this.state.expirationDate).format('MM.DD.YYYY')}</Text>
                </TouchableOpacity>
                <Text style={Styles.errorText}>{this.state.expirationDateError}</Text>
              </View>
          }
            <View style={[Styles.cardContainer, { flexDirection: 'row' }]}>
              <Text style={[Styles.cardText,{ flex: 1 }]}>Select Permit File</Text>
              <Text style={Styles.rowLabelText} numberOfLines={1} onPress={() => { this.onSelectFile() }}>
                {this.state.permitFile ? this.state.permitFile : `Choose file`}
              </Text>
            </View>
            <Text style={Styles.errorText}>{this.state.permitFileError}</Text>

          {
            this.state.HSGchecked
            ? null
            :
            <View>
              <View style={Styles.chkContainer}>
                <CheckBox
                  checkedIcon={<Image source={Images.CheckBoxChecked} />}
                  uncheckedIcon={<Image source={Images.CheckBoxUnchecked} />}
                  checked={this.state.offSessionChecked}
                  onPress={() => this.setState({offSessionChecked: !this.state.offSessionChecked})}
                />
                <Text style={[Styles.text, {alignSelf: 'center', fontSize: Matrics.CountScale(18) }]}>
                  Off Session
                </Text>
              </View> 

              {
                this.state.offSessionChecked
                ?
                  <View style={{ }}>
                    <Text style={Styles.cardHeaderText}>Select Date</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'  }}>
                      <View style={{ width: '50%'}}>
                        <TouchableOpacity 
                          onPress={() => this._showDateTimePicker('Form')} 
                          style={[Styles.cardContainer, { width: Matrics.CountScale(160) }]}
                        >
                          <Text style={Styles.cardText}>{this.state.startDate == '' ? 'Form' : moment(this.state.startDate).format('MM.DD.YYYY')}</Text>
                        </TouchableOpacity>
                        <Text style={Styles.errorText}>{this.state.startDateError}</Text>
                      </View>
                      <View style={{ width: '50%',}}>
                        <TouchableOpacity 
                          onPress={() => this._showDateTimePicker('To')} 
                          style={[Styles.cardContainer, { width: Matrics.CountScale(160), marginLeft: Matrics.CountScale(9) }]}
                        >
                          <Text style={Styles.cardText}>{this.state.endDate == '' ? 'To' : moment(this.state.endDate).format('MM.DD.YYYY')}</Text>
                        </TouchableOpacity>
                        <Text style={[Styles.errorText, { marginLeft: Matrics.CountScale(9)}]}>{this.state.endDateError}</Text>
                      </View>
                    </View>

                    <Text style={Styles.cardHeaderText}>Working Hours</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{width: '50%'}}>
                        <TextInput 
                          autoCorrect={false}
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160)}]}
                          placeholder={'InTime'}
                          placeholderTextColor = {Colors.GREY}
                          onChangeText={(text) => this.setState({InTime: text, InTimeError: ''})}
                          value={this.state.InTime}
                        />
                        <Text style={Styles.errorText}>{this.state.InTimeError}</Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <TextInput 
                          autoCorrect={false}
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160),  marginLeft: Matrics.CountScale(9)}]}
                          placeholder={'OutTime'}
                          placeholderTextColor = {Colors.GREY}
                          onChangeText={(text) => this.setState({OutTime: text, OutTimeError: ''})}
                          value={this.state.OutTime}
                        />
                        <Text style={[Styles.errorText,{ marginLeft: Matrics.CountScale(9)}]}>
                          {this.state.OutTimeError}
                        </Text>
                      </View>
                    </View>
                  </View>
                : null
              }
              <Text style={Styles.cardHeaderText}>Maximum Work Hours</Text>
              <KeyboardAwareScrollView 
                contentContainerStyle={{ flex: 1 }} 
                enableOnAndroid={true}
                enableAutoAutomaticScroll={true}
              >
                {this.workHoursTable()}
              </KeyboardAwareScrollView>
            </View>
          }
        </ScrollView>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          date={
            this.state.dateFlag == 'issueDate'
            ? this.state.issueDate ? new Date(this.state.issueDate) : new Date()
            : this.state.dateFlag == 'expirationDate'
                ? this.state.expirationDate ? new Date(this.state.expirationDate) : new Date()
                : this.state.dateFlag == 'Form'
                  ? this.state.startDate ? new Date(this.state.startDate) : new Date()
                  : this.state.endDate ? new Date(this.state.endDate) : new Date()
            
          }
        />
      </View>
    );
  }

  workHoursTable() {
    let tableData = [
      [ 
        <CheckBox
          checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
          uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
          checked={this.state.anyHoursCheckedWe}
          onPress={() => this.setState({anyHoursCheckedWe: !this.state.anyHoursCheckedWe})}
          containerStyle={{ alignSelf: 'center'}}
        />
        , 
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputStyle,{
            // backgroundColor: this.state.anyHoursCheckedWe ? '#e7e7e7' : '#ffffff'
          }]}
          onChangeText={(text) => this.setState({hoursWe: text})}
          value={this.state.hoursWe}
          keyboardType='numeric'
        />
        , 
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput 
            autoCorrect={false}
            style={[Styles.inputWorkStyle,{
              backgroundColor: this.state.anyHoursCheckedWe ? '#e7e7e7' : '#ffffff'
            }]}
            placeholder={this.state.anyHoursCheckedWe ? '12:00am ' :'HH:MM'}
            onChangeText={(text) => this.setState({workingHoursWe1: text})}
            value={this.state.workingHoursWe1}
            editable={this.state.anyHoursCheckedWe ? false : true}
          />
          <TextInput 
            autoCorrect={false}
            style={[Styles.inputWorkStyle,{
              backgroundColor: this.state.anyHoursCheckedWe ? '#e7e7e7' : '#ffffff'
            }]}
            placeholder={this.state.anyHoursCheckedWe ? '11:59pm' :'HH:MM'}
            onChangeText={(text) => this.setState({workingHoursWe2: text})}
            value={this.state.workingHoursWe2}
            editable={this.state.anyHoursCheckedWe ? false : true}
          />
        </View>
      ],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedTh}
        onPress={() => this.setState({anyHoursCheckedTh: !this.state.anyHoursCheckedTh})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedTh ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursTh: text})}
        value={this.state.hoursTh}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedTh ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedTh ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursTh1: text})}
          value={this.state.workingHoursTh1}
          editable={this.state.anyHoursCheckedTh ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedTh ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedTh ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursTh2: text})}
          value={this.state.workingHoursTh2}
          editable={this.state.anyHoursCheckedTh ? false : true}
        />
      </View>],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedFr}
        onPress={() => this.setState({anyHoursCheckedFr: !this.state.anyHoursCheckedFr})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedFr ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursFr: text})}
        value={this.state.hoursFr}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedFr ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedFr ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursFr1: text})}
          value={this.state.workingHoursFr1}
          editable={this.state.anyHoursCheckedFr ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedFr ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedFr ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursFr2: text})}
          value={this.state.workingHoursFr2}
          editable={this.state.anyHoursCheckedFr ? false : true}
        />
      </View>],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedSa}
        onPress={() => this.setState({anyHoursCheckedSa: !this.state.anyHoursCheckedSa})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedSa ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursSa: text})}
        value={this.state.hoursSa}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedSa ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedSa ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursSa1: text})}
          value={this.state.workingHoursSa1}
          editable={this.state.anyHoursCheckedSa ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedSa ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedSa ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursSa2: text})}
          value={this.state.workingHoursSa2}
          editable={this.state.anyHoursCheckedSa ? false : true}
        />
      </View>],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedSu}
        onPress={() => this.setState({anyHoursCheckedSu: !this.state.anyHoursCheckedSu})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedSu ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursSu: text})}
        value={this.state.hoursSu}
        containerStyle={{ alignSelf: 'center'}}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedSu ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedSu ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursSu1: text})}
          value={this.state.workingHoursSu1}
          containerStyle={{ alignSelf: 'center'}}
          editable={this.state.anyHoursCheckedSu ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedSu ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedSu ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursSu2: text})}
          value={this.state.workingHoursSu2}
          editable={this.state.anyHoursCheckedSu ? false : true}
        />
      </View>],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedMo}
        onPress={() => this.setState({anyHoursCheckedMo: !this.state.anyHoursCheckedMo})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedMo ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursMo: text})}
        value={this.state.hoursMo}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedMo ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedMo ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursMo1: text})}
          value={this.state.workingHoursMo1}
          editable={this.state.anyHoursCheckedMo ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedMo ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedMo ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursMo2: text})}
          value={this.state.workingHoursMo2}
          editable={this.state.anyHoursCheckedMo ? false : true}
        />
      </View>],
      [<CheckBox
        checkedIcon={<Image source={Images.CheckBoxChecked} style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        uncheckedIcon={<Image source={Images.CheckBoxUnchecked}  style={{ height:20, width: 20, borderColor: '#b8b8b8', borderWidth: 1, }} />}
        checked={this.state.anyHoursCheckedTu}
        onPress={() => this.setState({anyHoursCheckedTu: !this.state.anyHoursCheckedTu})}
        containerStyle={{ alignSelf: 'center'}}
      />
      , 
      <TextInput 
        autoCorrect={false}
        style={[Styles.inputStyle,{
          // backgroundColor: this.state.anyHoursCheckedTu ? '#e7e7e7' : '#ffffff'
        }]}
        onChangeText={(text) => this.setState({hoursTu: text})}
        value={this.state.hoursTu}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedTu ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedTu ? '12:00am' :'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursTu1: text})}
          value={this.state.workingHoursTu1}
          editable={this.state.anyHoursCheckedTu ? false : true}
        />
        <TextInput 
          autoCorrect={false}
          style={[Styles.inputWorkStyle,{
            backgroundColor: this.state.anyHoursCheckedTu ? '#e7e7e7' : '#ffffff'
          }]}
          placeholder={this.state.anyHoursCheckedTu ? '11:59pm':'HH:MM'}
          onChangeText={(text) => this.setState({workingHoursTu2: text})}
          value={this.state.workingHoursTu2}
          editable={this.state.anyHoursCheckedTu ? false : true}
        />
      </View>]
    ];

    return (
      <View style={Styles.tableContainer}>
        <Table borderStyle={{borderColor: '#C1C0B9',  borderRadius: 10}}>
          <Row data={this.state.tableHead} flexArr={[1, 1, 2, 3]} style={Styles.tableHead} textStyle={Styles.tableHeadText}/>
          <TableWrapper style={Styles.tableWrapper}>
            <Col data={this.state.tableTitle} style={Styles.tableTitle}  textStyle={Styles.tableText}/>
            <Rows data={tableData} flexArr={[1, 2, 3]} style={Styles.tableRow} heightArr={Platform.OS === 'ios' ? [50,50,50,50,50,50,50] : [45,45,45,45,45,45,45]} textStyle={Styles.tableText}/>
          </TableWrapper>
          <Row 
            data={['Weekly Maximum', 
              <TextInput 
                autoCorrect={false}
                style={[Styles.inputWorkStyle, {alignSelf: 'flex-end', right: Matrics.CountScale(5)}]}
                onChangeText={(text) => this.setState({weeklyMax: text})}
                value={this.state.weeklyMax}
              />]} 
            flexArr={[4, 3]} style={{ height: Platform.OS === 'ios' ? 50 : 45 }} textStyle={Styles.tableText}/>
        </Table>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    marginHorizontal: Matrics.CountScale(15),
  },
  chkContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: Fonts.NunitoSansRegular,
    fontSize: Matrics.CountScale(14),
    flexWrap: 'wrap',
  },
  cardHeaderText: {
    fontFamily: Fonts.NunitoSansRegular,
    paddingTop: Matrics.CountScale(10),
    fontSize: Matrics.CountScale(18),
    paddingBottom: Matrics.CountScale(10)
  },
  cardContainer: {
    backgroundColor: Colors.WHITE,
    borderRadius: 3,
    marginVertical: Matrics.CountScale(5),
    padding: Matrics.CountScale(10),
  },
  cardText: {
    fontFamily: Fonts.NunitoSansRegular,
    color: Colors.GREY,
    fontSize: Matrics.CountScale(15),
  },
  rowLabelText: {
    fontFamily: Fonts.NunitoSansRegular,
    color: Colors.APPCOLOR,
    fontSize: Matrics.CountScale(15),
    alignSelf: 'flex-end',
    flexWrap: 'wrap',
    flex: 1,
    textAlign: 'right'
  },
  tableContainer: { 
    flex: 1, 
    backgroundColor: '#fff',
    bottom: Matrics.CountScale(20),
  },
  tableInnerContainer: {
    borderRadius: 5,
  },
  tableHead: {  
    height: Matrics.CountScale(65),  
    backgroundColor: '#979797'  
  },
  tableWrapper: { 
    flexDirection: 'row' 
  },
  tableTitle: { 
    flex: 1, 
  },
  tableRow: {  
    height: Matrics.CountScale(50) ,
    alignItems: 'center' 
  },
  tableHeadText:{
    textAlign: 'center',
    color: Colors.WHITE,
    fontFamily: Fonts.NunitoSansRegular,
    flexWrap: 'wrap',
    marginTop: Matrics.CountScale(10)
  },
  tableText: { 
    textAlign: 'center',
    fontFamily: Fonts.NunitoSansRegular, 
  },
  inputStyle: {
    borderColor: '#b8b8b8',
    borderWidth: 1,
    marginHorizontal: Matrics.CountScale(5),
    height: Matrics.CountScale(40),
  },
  inputWorkStyle: {
    borderColor: '#b8b8b8',
    borderWidth: 1,
    width: Matrics.CountScale(65),
    height: Matrics.CountScale(40),
    textAlign: 'center'
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.NunitoSansRegular,
    fontSize: 12,
    marginLeft: Matrics.CountScale(15)
  },
});
