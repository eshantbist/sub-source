import React from 'react';
import { View, Text, Platform, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets';
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import DocumentPicker from 'react-native-document-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  }

  _showDateTimePicker = (val) => this.setState({ isDateTimePickerVisible: true, dateFlag: val });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    // console.log('A date has been picked: ', moment(date).format('MMM DD, ddd'));
    if(this.state.dateFlag == 'issueDate'){
        this.setState({ issueDate: moment(date).format('MM/DD/YYYY'), issueDateError: '' });
    } else if(this.state.dateFlag === 'expirationDate') {
      this.setState({ expirationDate: moment(date).format('MM/DD/YYYY'), expirationDateError: '' });
    } else if(this.state.dateFlag === 'Form') {
      this.setState({ startDate: moment(date).format('MM/DD/YYYY'), startDateError: '' });
    }  else if(this.state.dateFlag === 'To') {
      if(moment(date).format('MM/DD/YYYY') <= this.state.StartDate) {
        this.setState({ endDateError: 'End date should be greater than Start date' });
      } else {
        this.setState({ endDate: moment(date).format('MM/DD/YYYY'), endDateError: '' });
      }
    }
    this._hideDateTimePicker();
  };

  // _showTimePicker(val) {
  //   this.setState({ isTimePickerVisible: true, timeFlag: val });
  // } 
  // _hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  // _handleTimePicked = async (time) => {
  //     console.log('A date has been picked: ', time);
  //     let val = moment.parseZone(time).format('HH:mm')
  //     if (this.state.timeFlag == 'InTime') {
  //         await this.setState({ InTime: val, InTimeError: '' })
  //     }
  //     else if (this.state.timeFlag == 'OutTime') {
  //         await this.setState({ OutTime: val, OutTimeError: '' })
  //     }
  //     this._hideTimePicker();
  // };


  async onSelectFile() {
    // DocumentPicker.show({
    //     filetype: [DocumentPickerUtil.allFiles()],
    // }, (error, res) => {
    //     console.log('***name', res);
    //     if (res != null)
    //         this.setState({ permitFile: res.fileName, PermitFilePath: res.uri, permitFileError: '' })
    // });
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
    // console.log('offsession-->', this.state.offSessionChecked)
    // let reg = /^\d{1,2}:\d{2}([ap]m)?$/;
    // let reg = /^(\d{1,2}):(\d{2})([ap]m)?$/;
    // let reg = /(0[1-9])|(1[0-2]):([0-5][0-9])\s((a|p|A|P)(m|M))/;
    // let reg = /^(\d{1,2}):(\d{2})(:00)?([ap]m)?$/;
    let reg = /^(0[1-9]|[1][0-2]):([0-5][0-9])((a|p|A|P)(m|M))$/;

    console.log('checkreg-->RE-->',reg.test(this.state.InTime));
    // const xIn = moment(this.state.InTime, 'HH:mmA',true);
    // const xOut = moment(this.state.InTime, 'HH:mmA',true);
    // console.log('checkreg-->',xIn.isValid());

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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
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
            "IsValidOutTime":true
        }
      ],
      "MinorFileName":"",
      "MinorFilePath":""
    }

    if(this.state.HSGchecked === false) {
      // console.log('if');
      if( this.state.issueDate === '') {
        this.setState({ issueDateError: 'Please Select The IssueDate' });
      } else if (this.state.expirationDate === ''){
        this.setState({ expirationDateError: 'Please Select The Expiration Date'});
      } else if(this.state.offSessionChecked === true) {
        // console.log('else if')
        if(this.state.startDate === ''){
          this.setState({ startDateError: 'Please Select The Start Date' });
        } else if (this.state.endDate === ''){
          this.setState({ endDateError: 'Please  Select The End Date' });
        } else if(this.state.endDate  <= this.state.startDate){
          this.setState({ endDateError: 'End Date should be greater than Start Date' });
        } else if(this.state.InTime === ''){
          this.setState({ InTimeError: 'please select InTime' });
        } else if(this.state.OutTime === ''){
          this.setState({ OutTimeError: 'please select OutTime' });
        } else if(reg.test(this.state.InTime) === false){
          alert('Invalid InTime! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
          // this.setState({ InTimeError: 'Invalid InTime!\n Time should be in HH:MMam/pm\n Format. There should not\n be space in between \nMM(minutes) and AM/PM' });
        } else if(reg.test(this.state.OutTime)=== false) {
          alert('Invalid OutTime! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
          // this.setState({ OutTimeError: 'Invalid OutTime!\n Time should be in HH:MMam/pm\n Format. There should not\n be space in between \nMM(minutes) and AM/PM' });
        } else if(
          (this.state.workingHoursWe1 && reg.test(this.state.workingHoursWe1) === false) ||
          (this.state.workingHoursWe2 && reg.test(this.state.workingHoursWe2) === false) ||
          (this.state.workingHoursTh1 && reg.test(this.state.workingHoursTh1) === false) ||
          (this.state.workingHoursTh2 && reg.test(this.state.workingHoursTh2) === false) ||
          (this.state.workingHoursFr1 && reg.test(this.state.workingHoursFr1) === false) ||
          (this.state.workingHoursFr2 && reg.test(this.state.workingHoursFr2) === false) ||
          (this.state.workingHoursSa1 && reg.test(this.state.workingHoursSa1) === false) ||
          (this.state.workingHoursSa2 && reg.test(this.state.workingHoursSa2) === false) ||
          (this.state.workingHoursSu1 && reg.test(this.state.workingHoursSu1) === false) ||
          (this.state.workingHoursSu2 && reg.test(this.state.workingHoursSu2) === false) ||
          (this.state.workingHoursMo1 && reg.test(this.state.workingHoursMo1) === false) ||
          (this.state.workingHoursMo2 && reg.test(this.state.workingHoursMo2) === false) ||
          (this.state.workingHoursTu1 && reg.test(this.state.workingHoursTu1) === false) ||
          (this.state.workingHoursTu2 && reg.test(this.state.workingHoursTu2) === false) 
        ) {
          alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
        } else {
          console.log('save Data');
          this.props.navigation.goBack();
          this.props.navigation.state.params.callbackData({ MinorData });
        }
      } else if(
        (this.state.workingHoursWe1 && reg.test(this.state.workingHoursWe1) === false) ||
        (this.state.workingHoursWe2 && reg.test(this.state.workingHoursWe2) === false) ||
        (this.state.workingHoursTh1 && reg.test(this.state.workingHoursTh1) === false) ||
        (this.state.workingHoursTh2 && reg.test(this.state.workingHoursTh2) === false) ||
        (this.state.workingHoursFr1 && reg.test(this.state.workingHoursFr1) === false) ||
        (this.state.workingHoursFr2 && reg.test(this.state.workingHoursFr2) === false) ||
        (this.state.workingHoursSa1 && reg.test(this.state.workingHoursSa1) === false) ||
        (this.state.workingHoursSa2 && reg.test(this.state.workingHoursSa2) === false) ||
        (this.state.workingHoursSu1 && reg.test(this.state.workingHoursSu1) === false) ||
        (this.state.workingHoursSu2 && reg.test(this.state.workingHoursSu2) === false) ||
        (this.state.workingHoursMo1 && reg.test(this.state.workingHoursMo1) === false) ||
        (this.state.workingHoursMo2 && reg.test(this.state.workingHoursMo2) === false) ||
        (this.state.workingHoursTu1 && reg.test(this.state.workingHoursTu1) === false) ||
        (this.state.workingHoursTu2 && reg.test(this.state.workingHoursTu2) === false) 
      ) {
        alert('Invalid Time! Time should be in HH:MMam/pm Format. There should not be space in between MM(minutes) and AM/PM');
      } else {
        console.log('save Data');
        this.props.navigation.goBack();
        this.props.navigation.state.params.callbackData({ MinorData });
      }
    }
    else if(this.state.permitFile === '') {
      this.setState({ permitFileError: 'please select permitfile' });
    } 
    else {
      console.log('save Data');
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

          <Text style={Styles.cardHeaderText}>Work Restrictions per Work Permit</Text>
          {/* <View style={Styles.cardContainer}> */}
          {
            this.state.HSGchecked
            ? null
            :
              <View>
                <TouchableOpacity onPress={() => this._showDateTimePicker('issueDate')} style={Styles.cardContainer}>
                  <Text style={Styles.cardText}>{this.state.issueDate == '' ? 'Issue Date' : this.state.issueDate}</Text>
                </TouchableOpacity>
                <Text style={Styles.errorText}>{this.state.issueDateError}</Text>
                <TouchableOpacity onPress={() => this._showDateTimePicker('expirationDate')} style={Styles.cardContainer}>
                  <Text style={Styles.cardText}>{this.state.expirationDate == '' ? 'Expiration Date' : this.state.expirationDate}</Text>
                </TouchableOpacity>
                <Text style={Styles.errorText}>{this.state.expirationDateError}</Text>
              </View>
          }
            <View style={[Styles.cardContainer, { flexDirection: 'row' }]}>
              <Text style={[Styles.cardText,{ flex: 1 }]}>Select Permit File</Text>
              <Text style={Styles.rowLabelText} onPress={() => { this.onSelectFile() }}>{this.state.permitFile ? this.state.permitFile : `Choose file`}</Text>
            </View>
            <Text style={Styles.errorText}>{this.state.permitFileError}</Text>
            
          {/* </View> */}

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
                  <View>
                    <Text style={Styles.cardHeaderText}>Select Date</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <TouchableOpacity 
                          onPress={() => this._showDateTimePicker('Form')} 
                          style={[Styles.cardContainer, { width: Matrics.CountScale(160) }]}
                        >
                          <Text style={Styles.cardText}>{this.state.startDate == '' ? 'Form' : this.state.startDate}</Text>
                        </TouchableOpacity>
                        <Text style={Styles.errorText}>{this.state.startDateError}</Text>
                      </View>
                      <View>
                        <TouchableOpacity 
                          onPress={() => this._showDateTimePicker('To')} 
                          style={[Styles.cardContainer, { width: Matrics.CountScale(160) }]}
                        >
                          <Text style={Styles.cardText}>{this.state.endDate == '' ? 'To' : this.state.endDate}</Text>
                        </TouchableOpacity>
                        <Text style={Styles.errorText}>{this.state.endDateError}</Text>
                      </View>
                    </View>

                    <Text style={Styles.cardHeaderText}>Working Hours</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View>
                        <TextInput 
                          autoCorrect={false}
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160)}]}
                          placeholder={'InTime'}
                          placeholderTextColor = {Colors.GREY}
                          onChangeText={(text) => this.setState({InTime: text, InTimeError: ''})}
                          value={this.state.InTime}
                        />
                        {/* <TouchableOpacity 
                          onPress={() => this._showTimePicker('InTime')} 
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160)}]}
                        >
                        <Text style={Styles.cardText}>{this.state.InTime == '' ? 'In Time' : this.state.InTime}</Text>
                        </TouchableOpacity> */}
                        <Text style={Styles.errorText}>{this.state.InTimeError}</Text>
                      </View>
                      <View>
                        <TextInput 
                          autoCorrect={false}
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160)}]}
                          placeholder={'OutTime'}
                          placeholderTextColor = {Colors.GREY}
                          onChangeText={(text) => this.setState({OutTime: text, OutTimeError: ''})}
                          value={this.state.OutTime}
                        />
                        {/* <TouchableOpacity 
                          onPress={() => this._showTimePicker('OutTime')} 
                          style={[Styles.cardContainer,{ width: Matrics.CountScale(160)}]}
                        >
                          <Text style={Styles.cardText}>{this.state.OutTime == '' ? 'Out Time' : this.state.OutTime}</Text>
                        </TouchableOpacity> */}
                        <Text style={Styles.errorText}>{this.state.OutTimeError}</Text>
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
          // date={
          //   this.state.dateFlag == 'issueDate'
          //   ? this.state.issueDate ? new Date(this.state.issueDate) : new Date()
          //   : this.state.expirationDate ? new Date(this.state.expirationDate) : new Date()
          // }

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
        {/* <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode={'time'}
          date={this.state.timeFlag === 'InTime' 
          ? this.state.InTime 
              ? moment(`2000/10/1 ${moment(this.state.InTime, "h:mm A").format('hh:mm A')}`).toDate() 
              : new Date()
          : this.state.OutTime 
              ? moment(`2000/10/1 ${moment(this.state.OutTime, "h:mm A").format('hh:mm A')}`).toDate()
              : new Date()
          }
        /> */}
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
          style={Styles.inputStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({hoursWe: text})}
          value={this.state.hoursWe}
          keyboardType='numeric'
        />
        , 
        <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextInput 
            autoCorrect={false}
            style={Styles.inputWorkStyle}
            // placeholder={'Type here'}
            onChangeText={(text) => this.setState({workingHoursWe1: text})}
            value={this.state.workingHoursWe1}
          />
          <TextInput 
            autoCorrect={false}
            style={Styles.inputWorkStyle}
            // placeholder={'Type here'}
            onChangeText={(text) => this.setState({workingHoursWe2: text})}
            value={this.state.workingHoursWe2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursTh: text})}
        value={this.state.hoursTh}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursTh1: text})}
          value={this.state.workingHoursTh1}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursTh2: text})}
          value={this.state.workingHoursTh2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursFr: text})}
        value={this.state.hoursFr}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursFr1: text})}
          value={this.state.workingHoursFr1}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursFr2: text})}
          value={this.state.workingHoursFr2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursSa: text})}
        value={this.state.hoursSa}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursSa1: text})}
          value={this.state.workingHoursSa1}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursSa2: text})}
          value={this.state.workingHoursSa2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursSu: text})}
        value={this.state.hoursSu}
        containerStyle={{ alignSelf: 'center'}}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursSu1: text})}
          value={this.state.workingHoursSu1}
          containerStyle={{ alignSelf: 'center'}}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursSu2: text})}
          value={this.state.workingHoursSu2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursMo: text})}
        value={this.state.hoursMo}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursMo1: text})}
          value={this.state.workingHoursMo1}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursMo2: text})}
          value={this.state.workingHoursMo2}
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
        style={Styles.inputStyle}
        // placeholder={'Type here'}
        onChangeText={(text) => this.setState({hoursTu: text})}
        value={this.state.hoursTu}
        keyboardType='numeric'
      />
      , 
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursTu1: text})}
          value={this.state.workingHoursTu1}
        />
        <TextInput 
          autoCorrect={false}
          style={Styles.inputWorkStyle}
          // placeholder={'Type here'}
          onChangeText={(text) => this.setState({workingHoursTu2: text})}
          value={this.state.workingHoursTu2}
        />
      </View>]
    ];

    return (
      <View style={Styles.tableContainer}>
        <Table borderStyle={{borderColor: '#C1C0B9',  borderRadius: 10}}>
          <Row data={this.state.tableHead} flexArr={[1, 1, 2, 3]} style={Styles.tableHead} textStyle={Styles.tableHeadText}/>
          <TableWrapper style={Styles.tableWrapper}>
            <Col data={this.state.tableTitle} style={Styles.tableTitle} heightArr={Platform.OS === 'ios' ? [50,50] : [45,45]} textStyle={Styles.tableText}/>
            <Rows data={tableData} flexArr={[1, 2, 3]} style={Styles.tableRow} heightArr={Platform.OS === 'ios' ? [50,50,50,50,50,50,50] : [45,45,45,45,45,45,45]} textStyle={Styles.tableText}/>
          </TableWrapper>
          <Row 
            data={['Weekly Maximum', 
              <TextInput 
                autoCorrect={false}
                style={[Styles.inputWorkStyle, {alignSelf: 'flex-end', right: Matrics.CountScale(5)}]}
                // placeholder={'Type here'}
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
    alignItems: 'flex-end',
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
    backgroundColor: '#e7e7e7',
    // width: Matrics.CountScale(30),
    borderColor: '#b8b8b8',
    borderWidth: 1,
    marginHorizontal: Matrics.CountScale(5),
    height: Matrics.CountScale(40),
  },
  inputWorkStyle: {
    backgroundColor: '#e7e7e7',
    borderColor: '#b8b8b8',
    borderWidth: 1,
    width: Matrics.CountScale(65),
    height: Matrics.CountScale(40),
  },
  errorText: {
    color: 'red',
    fontFamily: Fonts.NunitoSansRegular,
    fontSize: 12,
    marginLeft: Matrics.CountScale(15)
  },
});
