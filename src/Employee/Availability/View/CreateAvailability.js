/* =======>>>>>> Libraries <<<<<<<======= */
import React from 'react';
import {
    View, ScrollView, Alert, FlatList, Platform, Picker, Switch, Image,
    Text, TouchableOpacity, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';

/* =======>>>>>> Assets <<<<<<<======= */
import Global from '../../../GlobalFunction';
import { TextInputView, Button, CustomModal, LoadWheel } from "@Components";
import { saveUpdateEmployeeAvailability, deleteEmployeeAvailability } from '@Redux/Actions/AvailabilityActions'
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import moment from "moment";
import { Header } from 'react-navigation';

const d = Dimensions.get("window")
const isX = Platform.OS === "ios" && (d.height == 812 || d.width == 812) ? true : false

// import styles from '../../../Resources/react-native-material-dropdown/src/components/dropdown/styles';
import styles from 'react-native-material-dropdown/src/components/dropdown/styles';

class CreateAvailability extends React.Component {
    state = {
        InHours: '00',
        InMin: '00',
        InStatus: 'am',
        OutHours: '11',
        OutMin: '59',
        OutStatus: 'pm',
        Active: 'from',
        toggled: false,
        notAvailable: false,
        allDay: true,
        add: false,
        modalVisible: false,
        DayData: [],
        shiftTime: [],
        loading: false,
        msgModal: false,
        msg: '',
        currentIndex: 0,
        timeIndex: 0,
        initialData: [],
        selectedTime: '',
        isAddShift: true,
        selectedItemIndex: -1,
        isTimePickerVisible: false,
        InTime: '',
        OutTime: '',

    }

    setTime(InTimeVal, OutTimeVal) {
        // console.log('setTime-->',InTimeVal,'---',OutTimeVal)
        let InTime = (InTimeVal.slice(-2) == 'am' || InTimeVal.slice(-2) == 'pm' ) ? InTimeVal : Global.getTime24to12(InTimeVal);
        let OutTime = (OutTimeVal.slice(-2) == 'am' || OutTimeVal.slice(-2) == 'pm' ) ? OutTimeVal : Global.getTime24to12(OutTimeVal) == '12:00am' ? '11:59pm' : Global.getTime24to12(OutTimeVal);
        // console.log('inTime-->', InTime)
        // InTime = InTime.length < 7 ? `0${InTime}` : InTime
        // console.log('inTime-->', InTime)

        // this.setState({ InHours: InTime.substring(0, 2) })
        // this.setState({ InMin: InTime.substring(3, 5) })
        // this.setState({ InStatus: InTime.substring(5, 7) })

        // this.setState({ InHours: '12' })
        // this.setState({ InMin: '00' })
        // this.setState({ InStatus: 'am' })

        // let OutTime = Global.getTime24to12(OutTimeVal)
        // console.log('OutTime-->', OutTime)
         
        this.setState({
            InTime,
            OutTime,
            // OutTime: '11:59pm'
        })
         
        // OutTime = OutTime.length < 7 ? `0${OutTime}` : OutTime
        // this.setState({ OutHours: OutTime.substring(0, 2) })
        // this.setState({ OutMin: OutTime.substring(3, 5) })
        // this.setState({ OutStatus: OutTime.substring(5, 7) })

        // this.setState({ OutHours: '11' })
        // this.setState({ OutMin: '59' })
        // this.setState({ OutStatus: 'pm' })

        // if(InTime != "00:00:00" && OutTime != "00:00:00" && !InTime.startsWith("00:00") && !OutTime.startsWith("23:59"))
        // {
        //     this.setState({selectedTime: InTime.substring(0, 2) + ':' + InTime.substring(3, 5) + InTime.substring(5, 7) + '-' +  OutTime.substring(0, 2) + ':' + OutTime.substring(3, 5) + OutTime.substring(5, 7)});
        // }

        // setTimeout(() => { console.log('kkk',this.state) }, 3000)
    }

    UNSAFE_componentWillMount() {
        //console.log(this.props.navigation.getParam('DayData')[Object.keys(data)[0]][0])
        let tmp = JSON.parse(JSON.stringify((this.props.navigation.state.params.DayData)));
        let data = tmp[Object.keys(tmp)[0]][0];
        let time = tmp[Object.keys(tmp)[0]];
        console.log('tmp-->', tmp);
        console.log('TIME-->', time);
        this.setTime(data.InTime, data.OutTime);
        let temp = JSON.stringify(time);
        let inidata = JSON.parse(temp);
        this.setState({ DayData: data, shiftTime: time, initialData: inidata, notAvailable: data.InTime == "00:00:00" && data.OutTime == "00:00:00" ? true : false, allDay: data.InTime.startsWith("00:00") && data.OutTime.startsWith("23:59") ? true : false });
        if(data.InTime != "00:00:00" && data.OutTime != "00:00:00"  && !data.InTime.startsWith("00:00") && !data.OutTime.startsWith("23:59"))
        {
            // this.setState({selectedItemIndex: 0});
            // this.setState({selectedTime: data.InTime.substring(0, 2) + ':' + data.InTime.substring(3, 5) + data.InTime.substring(5, 7) + '-' +  data.OutTime.substring(0, 2) + ':' + data.OutTime.substring(3, 5) + data.OutTime.substring(5, 7)});
            // this.setState({ selectedTime: data.InTime + '-' +  data.OutTime });
        }

       
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.saveUpdateEmployeeAvailabilitySuccess) {
            this.setState({ loading: false })
            let response = nextProps.data.saveUpdateEmployeeAvailabilityData

            if (response.Status == 1) {
                this.setState({ loading: false })
                this.props.navigation.state.params.getEmpAvailability()
                this.props.navigation.goBack()
            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.data.deleteEmployeeAvailabilitySuccess) {
            this.setState({ loading: false })
            let response = nextProps.data.deleteEmployeeAvailabilityData

            if (response.Status == 1) {
                this.setState({ loading: false })
                this.props.navigation.state.params.getEmpAvailability()
                this.props.navigation.goBack()

            }
            else {
                this.setState({ msg: response.Message, msgModal: true })
            }
        }
        else if (nextProps.data.saveUpdateEmployeeAvailabilityFail || nextProps.data.deleteEmployeeAvailabilityFail) {
            this.setState({ loading: false, msg: Global.error_msg, msgModal: true })
        }
    }

    _showTimePicker(val) {
        this.setState({ isTimePickerVisible: true, timeFlag: val });
    }
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        this._hideTimePicker();
        console.log('time:-->', time, '--', this.state.timeFlag)
        let val = moment(time).format('hh:mma')
        console.log('val-->', val)
        if(this.state.timeFlag == 'InTime'){
            this.setState({ InTime: val });
        } else if(this.state.timeFlag == 'OutTime'){
            this.setState({ OutTime: val });
        }
    };

    onDeleteClick(EmployeeAvailabilityID){
        Alert.alert('Delete Confirmation', 'Do you want to delete this availability?',
        [
            {
                text: 'OK', onPress: () => {
                    this.props.deleteEmployeeAvailability({ id: EmployeeAvailabilityID });
                }
            },
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
        ],
        { cancelable: false });
    }

    change(data) {
        data.InTime = Global.getTime12To24WithoutSpace(data.InTime);
        data.OutTime = Global.getTime12To24WithoutSpace(data.OutTime);
    };

    onSaveClick(index){
        Alert.alert('', 'Please, understand that if you have updated your availability, management needs two weeks before we can apply your new availability to the schedule, updated availability also needs management approval as it cause scheduling challenge.',
        [
            {
                text: 'OK', onPress: () => {
                    console.log('initialData-->',this.state.initialData)
                    console.log('shiftTime-->',this.state.shiftTime)
                    // console.log('index-->',this.state.shiftTime[1])
                    let data = this.state.shiftTime[index];
                    this.change(data);
                    this.setState({ loading: true });
                    this.props.saveUpdateEmployeeAvailability(data);
                }
            },
        ],
        { cancelable: false }
        )
    }

    render() {
        return (
            <View style={Styles.pageBody}>
                {/* =======>>>>>> Header Start <<<<<<<=======  */}
                <View style={{backgroundColor: 'white',
                        height: isX ? 88 : Header.HEIGHT,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent:'space-between',
                        borderBottomWidth: 0.3,
                        borderBottomColor: Colors.LIGHTGREY,
                        paddingTop: Platform.OS === "ios" ? (isX ? 44 : 20) : 0,}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle} >Cancel</Text>
                    </TouchableOpacity>
                    <Text style={{...MasterCssEmployee.centerTextStyle,marginRight:20}} >
                        My Availability
                    </Text>
                    {this.state.notAvailable && <TouchableOpacity style={MasterCssEmployee.headerTextContainerStyle}
                        onPress={() => {
                            // this.setState({ modalVisible: true })
                            Alert.alert('', 'Please, understand that if you have updated your availability, management needs two weeks before we can apply your new availability to the schedule, updated availability also needs management approval as it cause scheduling challenge.',
                                [
                                    {
                                        text: 'OK', onPress: () => {
                                            // console.log(this.state.initialData)
                                            // console.log(this.state.shiftTime)
                                            this.setState({ loading: true })
                                            let resData = []
                                            let deleteData = []
                                            if (!this.state.notAvailable) {
                                                if (this.state.initialData.length > this.state.shiftTime.length) {
                                                    for (i = 0; i < this.state.initialData.length; i++) {
                                                        if (i < this.state.shiftTime.length) {
                                                            resData.push(Object.assign(this.state.shiftTime[i], { EmployeeAvailabilityID: this.state.initialData[i].EmployeeAvailabilityID }))
                                                            //resData.push({DayID:this.state.shiftTime[i].DayID,EmployeeAvailabilityID:this.state.initialData[i].EmployeeAvailabilityID,InTime:this.state.shiftTime[i].InTime, NameOfDay:this.state.shiftTime[i].NameOfDay,OutTime:this.state.shiftTime[i].OutTime}) 
                                                        }
                                                        else {
                                                            deleteData.push(this.state.initialData[i].EmployeeAvailabilityID)
                                                        }

                                                    }
                                                }
                                                else {
                                                    for (i = 0; i < this.state.shiftTime.length; i++) {
                                                        if (i < this.state.initialData.length) {
                                                            resData.push(Object.assign(this.state.shiftTime[i], { EmployeeAvailabilityID: this.state.initialData[i].EmployeeAvailabilityID }))
                                                        }
                                                        else {
                                                            resData.push(Object.assign(this.state.shiftTime[i], { EmployeeAvailabilityID: 0 }))
                                                        }
                                                    }
                                                }
                                                // this.props.saveUpdateEmployeeAvailability({ UpdateShift: resData, DeleteShift: deleteData })
                                                function change(data) {
                                                    data.InTime = Global.getTime12To24WithoutSpace(data.InTime);
                                                    data.OutTime = Global.getTime12To24WithoutSpace(data.OutTime);
                                                  };
                                                if(resData.length > 0){
                                                    resData.forEach((data) => {
                                                        change(data);
                                                        this.props.saveUpdateEmployeeAvailability(data);
                                                    })
                                                }
                                                // this.props.saveUpdateEmployeeAvailability({
                                                //     "DayID": this.state.shiftTime[0].DayID,
                                                //     "EmployeeAvailabilityID": 0,
                                                //     "InTime": "00:00",
                                                //     "NameOfDay": this.state.shiftTime[0].NameOfDay,
                                                //     "OutTime": "00:00",
                                                // });
                                            }
                                            else {
                                                // let deleteData = []
                                                if(this.state.initialData.length){
                                                    console.warn("here",this.state.initialData);
                                                    for (i = 0; i < this.state.initialData.length; i++) {
                                                        this.props.deleteEmployeeAvailability({ id: this.state.initialData[i].EmployeeAvailabilityID })
                                                    }
                                                }
                                                else{
                                                    this.props.navigation.goBack();

                                                }
                                                // this.props.deleteEmployeeAvailability({ id: EmployeeAvailabilityID });
                                                // 
                                            }
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Save</Text>
                    </TouchableOpacity>}
                </View>
                {/* =======>>>>>> Header End <<<<<<<=======  */}

                {this.renderPageContent()}
                {/* <CustomModal ButtonText={'OK'} title={'Please, understand that if you have updated your availability, management needs two weeks before we can apply your new availability to the schedule, updated availability also needs management approval as it cause scheduling challenge.'} visible={this.state.modalVisible} onPress={() => this.setState({ modalVisible: false })} /> */}
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View>
        );
    }

    updateValue() {
        if (this.state.allDay) {
            this.state.shiftTime[0].InTime = '00:00'
            this.state.shiftTime[0].OutTime = '23:59'
            this.state.shiftTime.splice(1)
        }
        else {
            // let valIn = moment(this.state.InHours + ":" + this.state.InMin + this.state.InStatus, ["h:mm A"]).format("HH:mm");
            // let valOut = moment(this.state.OutHours + ":" + this.state.OutMin + this.state.OutStatus, ["h:mm A"]).format("HH:mm");

            if(this.state.isAddShift === false ) {
                console.log('update val');
                console.log('InTime-->', this.state.InTime);
                console.log('OutTime-->',this.state.OutTime);
                this.state.shiftTime[this.state.selectedItemIndex].InTime = this.state.InTime
                this.state.shiftTime[this.state.selectedItemIndex].OutTime = this.state.OutTime
            }
            this.setState({ shiftTime: this.state.shiftTime, isAddShift: !this.state.isAddShift })
            if (!(this.state.shiftTime[0].InTime.startsWith('00:00') && this.state.shiftTime[0].OutTime.startsWith('23:59')) && this.state.allDay == true)
                this.setState({ allDay: false })
            else if (this.state.shiftTime[0].InTime.startsWith('00:00') && this.state.shiftTime[0].OutTime.startsWith('23:59') && this.state.allDay == false)
                this.setState({ allDay: true })
        }
        console.log('shiftTime-->update-->' + JSON.stringify(this.state.shiftTime));
    }

    renderPageContent() {
        return (
            <ScrollView style={{ flex: 1, padding: Matrics.CountScale(10) }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={Styles.dayTextStyles}>
                            {this.state.DayData.NameOfDay}
                        </Text>
                    </View>
                    {/* {!this.state.notAvailable && !this.state.allDay ? this.renderTime() : null} */}
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={Styles.rowContainer}>
                            <View style={Styles.titleStyle}>
                                <Text style={Styles.rowContentTextStyle}>Not Available</Text>
                            </View>
                            <View style={Styles.rowContentStyle}>
                                <Switch
                                    value={this.state.notAvailable}
                                    onValueChange={async(val) => {
                                        if (this.state.notAvailable == true && this.state.InHours == '12' && this.state.InMin == '00' && this.state.InStatus == 'am' && this.state.OutHours == '11' && this.state.OutMin == '59' && this.state.OutStatus == 'pm') {
                                            this.state.shiftTime[0].OutTime = '23:59:59';
                                            this.setTime('00:00:00', '23:59:59')
                                        }
                                        await this.setState({ notAvailable: !this.state.notAvailable })
                                        if (this.state.notAvailable) {
                                            this.setState({ allDay: false })
                                        }
                                        this.setState({ isAddShift: true })
                                    }}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    backgroundActive={'green'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#30a566'}
                                    circleInActiveColor={'#000000'} />
                            </View>
                        </View>
                        <View style={Styles.rowContainer}>
                            <View style={Styles.titleStyle}>
                                <Text style={Styles.rowContentTextStyle}>All Day</Text>
                            </View>
                            <View style={Styles.rowContentStyle}>
                                <Switch
                                    value={this.state.allDay}
                                    onValueChange={async (val) => {
                                        await this.setState({ allDay: !this.state.allDay })
                                        if (this.state.allDay) {
                                            this.setState({ notAvailable: false })
                                            this.updateValue()
                                        }
                                        this.setState({ isAddShift: true })
                                    }}
                                    disabled={false}
                                    activeText={'On'}
                                    inActiveText={'Off'}
                                    backgroundActive={'green'}
                                    backgroundInactive={'gray'}
                                    circleActiveColor={'#30a566'}
                                    circleInActiveColor={'#000000'} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* =============>>>>>>>>> Time Display  <<<<<<<<<<============= */}
                {
                    !this.state.notAvailable && !this.state.allDay ?
                        <View style={{ marginTop: Matrics.CountScale(40) }}>
                            <View style={Platform.OS === 'ios' ? Styles.timeContainer 
                            : [Styles.timeContainer]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ Active: 'from' });
                                        this._showTimePicker('InTime');
                                    }}
                                    style={this.state.Active == 'from' ? Styles.activeDatePicker : Styles.inActiveDatePicker}>
                                    <Text style={this.state.Active == 'from' ? Styles.activeDatePickerText : Styles.inActiveDatePickerText}>
                                        {/* {this.state.InHours + ':' + this.state.InMin + this.state.InStatus} */}
                                        {this.state.InTime}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, height: Matrics.CountScale(40) }}></View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ Active: 'to' });
                                        this._showTimePicker('OutTime');
                                    }}
                                    style={this.state.Active == 'to' ? Styles.activeDatePicker : Styles.inActiveDatePicker}>
                                    <Text style={this.state.Active == 'to' ? Styles.activeDatePickerText : Styles.inActiveDatePickerText}>
                                        {/* {this.state.OutHours + ':' + this.state.OutMin + this.state.OutStatus} */}
                                        {this.state.OutTime}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.pickerContainer}>
                                {/* <View style={Styles.picker}>
                                    <View style={{ flex: 1 }}>
                                        <Picker
                                            // mode={'dropdown'}
                                            selectedValue={this.selectHours()}
                                            style={{ height: Matrics.CountScale(50), }}
                                            itemStyle={{ textAlign: 'right' }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                               
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InHours: itemValue })
                                                    // this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutHours: itemValue })
                                                    // this.updateValue()
                                                }
                                            }}>
                                            <Picker.Item label="01" value="01" />
                                            <Picker.Item label="02" value="02" />
                                            <Picker.Item label="03" value="03" />
                                            <Picker.Item label="04" value="04" />
                                            <Picker.Item label="05" value="05" />
                                            <Picker.Item label="06" value="06" />
                                            <Picker.Item label="07" value="07" />
                                            <Picker.Item label="08" value="08" />
                                            <Picker.Item label="09" value="09" />
                                            <Picker.Item label="10" value="10" />
                                            <Picker.Item label="11" value="11" />
                                            <Picker.Item label="12" value="12" />
                                        </Picker>
                                    </View>
                                    {Platform.OS == 'ios' && <Picker
                                        style={{ height: Matrics.CountScale(50), width: Matrics.CountScale(60) }}

                                    >
                                        <Picker.Item label=":" value=":" />
                                    </Picker>}
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Picker
                                            selectedValue={this.selectMin()}
                                            style={{ height: Matrics.CountScale(50), flex: 1 }}
                                            itemStyle={{ textAlign: 'left' }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InMin: itemValue })
                                                    // this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutMin: itemValue })
                                                    // this.updateValue()
                                                }
                                            }}>
                                            <Picker.Item label="00" value="00" />
                                            <Picker.Item label="05" value="05" />
                                            <Picker.Item label="10" value="10" />
                                            <Picker.Item label="15" value="15" />
                                            <Picker.Item label="20" value="20" />
                                            <Picker.Item label="25" value="25" />
                                            <Picker.Item label="30" value="30" />
                                            <Picker.Item label="35" value="35" />
                                            <Picker.Item label="40" value="40" />
                                            <Picker.Item label="45" value="45" />
                                            <Picker.Item label="50" value="50" />
                                            <Picker.Item label="55" value="55" />
                                            <Picker.Item label="59" value="59" />
                                        </Picker>
                                        <Picker
                                            selectedValue={this.selectStatus()}
                                            style={{ height: Matrics.CountScale(50), flex: 1 }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InStatus: itemValue })
                                                    // this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutStatus: itemValue })
                                                    // this.updateValue()
                                                }
                                            }}><Picker.Item label="am" value="am" />
                                            <Picker.Item label="pm" value="pm" />
                                        </Picker>
                                    </View>
                                </View> */}
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
                        </View> : null
                }
                {/* ====================>>>>>>>>>> Other Content <<<<<<<<<<<<====================== */}

                {/* <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
                    <View style={Styles.rowContainer}>
                        <View style={Styles.titleStyle}>
                            <Text style={Styles.rowContentTextStyle}>Not Available</Text>
                        </View>
                        <View style={Styles.rowContentStyle}>
                            <Switch
                                value={this.state.notAvailable}
                                onValueChange={async(val) => {
                                    console.log(this.state)
                                    if (this.state.notAvailable == true && this.state.InHours == '12' && this.state.InMin == '00' && this.state.InStatus == 'am' && this.state.OutHours == '12' && this.state.OutMin == '00' && this.state.OutStatus == 'am') {
                                        console.log('1345454')
                                        this.state.shiftTime[0].OutTime = '23:59:59';
                                        this.setTime('00:00:00', '23:59:59')

                                    }
                                    // if (!this.state.notAvailable) {
                                    //     this.setState({ allDay: false })
                                    // }
                                    else if (this.state.shiftTime[0].InTime.startsWith('00:00') && this.state.shiftTime[0].OutTime.startsWith('23:59'))
                                        // this.setState({ allDay: true })
                                    await this.setState({ notAvailable: !this.state.notAvailable })
                                    if (this.state.notAvailable) {
                                        this.setState({ allDay: false })
                                    }
                                }}
                                disabled={false}
                                activeText={'On'}
                                inActiveText={'Off'}
                                backgroundActive={'green'}
                                backgroundInactive={'gray'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'} />
                        </View>
                    </View>
                    <View style={Styles.rowContainer}>
                        <View style={Styles.titleStyle}>
                            <Text style={Styles.rowContentTextStyle}>All Day</Text>
                        </View>
                        <View style={Styles.rowContentStyle}>
                            <Switch
                                value={this.state.allDay}
                                onValueChange={async (val) => {
                                    await this.setState({ allDay: !this.state.allDay })
                                    if (this.state.allDay) {
                                        this.setState({ notAvailable: false })
                                        this.updateValue()
                                    }
                                }}
                                disabled={false}
                                activeText={'On'}
                                inActiveText={'Off'}
                                backgroundActive={'green'}
                                backgroundInactive={'gray'}
                                circleActiveColor={'#30a566'}
                                circleInActiveColor={'#000000'} />
                        </View>
                    </View>
                </View> */}
                {/* {alert(this.state.InHours)} */}
                {/* {this.renderSchedule()} */}
                {
                    // this.state.selectedTime && !this.state.selectedTime.startsWith('12:00')
                    // this.state.selectedTime && !this.state.isAddShift
                    // this.state.selectedTime
                    !this.state.isAddShift
                    ?
                    <View style={[Styles.timeTextContainer, { flexDirection: 'row'  }]}>
                        <Text style={[Styles.timeTextStyle, { color: Colors.APPCOLOR  }]}>
                            {/* {this.state.selectedTime} */}
                            {/* {this.state.InHours + ':' + this.state.InMin + this.state.InStatus +'-'+ this.state.OutHours + ':' + this.state.OutMin + this.state.OutStatus} */}
                            {this.state.InTime +'-'+ this.state.OutTime}
                        </Text>
                        <TouchableOpacity onPress={() => {this.updateValue()}}>
                            <Image 
                                source={Images.CalenderSelectedIcon}
                                style={{ height: Matrics.CountScale(18), width: Matrics.CountScale(18), alignSelf: 'center', marginTop: Matrics.CountScale(5) }}
                            />
                        </TouchableOpacity>
                    </View>
                    : null
                }
               
                {/* {!this.state.notAvailable && !this.state.allDay &&  this.state.InHours === '12' */}
                {
                    !this.state.notAvailable && !this.state.allDay
                    ?
                        // <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        //     <Text style={[Styles.timeTextStyle, { fontWeight: 'bold' }]}>Add Shift</Text>
                        //     <TouchableOpacity onPress={() => { this.addShift() }}>
                        //         <Image style={Styles.addImgStyle} source={Images.AddIcon}></Image>
                        //     </TouchableOpacity>
                        // </View>
                       this.renderTime()
                    : 
                        null
                        // {!this.state.notAvailable && !this.state.allDay ? this.renderTime() : null   }   
                }
                        

            </ScrollView >
        )
    }
    renderSchedule() {
        //this.props.navigation.state.params.allData.
        return this.props.navigation.state.params.allData.map((data, index) => {
            let status = data[Object.keys(data)[0]][0]
            return (
                index > this.props.navigation.state.params.curIndex && <View style={Styles.dayContainer}>
                    <View style={Styles.rowContainer}>
                        <View style={Styles.titleStyle}>
                            <Text style={Styles.rowContentTextStyle}>{Object.keys(data)[0]}</Text>
                        </View>
                        <View style={Styles.rowContentStyle}>
                            <Text style={status.InTime == "00:00:00" && status.OutTime == "00:00:00" ? Styles.notAvailableTextStyle : Styles.availableTextStyle}>
                                {status.InTime == "00:00:00" && status.OutTime == "00:00:00" ? `Not Available` : 'All Day'}
                            </Text>
                        </View>
                    </View>
                </View>)
        })

    }
    selectStatus() {
        if (this.state.Active == 'from') {
            return this.state.InStatus
        }
        else {
            return this.state.OutStatus
        }
    }
    selectHours() {
        // console.log(this.state.InHours.toString(), this.state.OutHours);

        if (this.state.Active == 'from') {
            return this.state.InHours
        }
        else {
            return this.state.OutHours.toString()
        }
    }
    selectMin() {
        if (this.state.Active == 'from') {
            return this.state.InMin.toString()
        }
        else {
            return this.state.OutMin.toString()
        }
    }

    addShift() {
        // let InTime = '00:00:00'
        // let OutTime = '23:59:59'
        // if(this.state.InHours != '12' || this.state.InMin != '00' || this.state.InStatus != 'am' || this.state.OutHours != '11' || this.state.OutMin != '59' || this.state.OutStatus != 'pm'){
        //     InTime = this.state.InHours + ':' + this.state.InMin;
        //     OutTime = this.state.OutHours + ':' + this.state.OutMin;   
        // }
        // let InTime = this.state.InHours + ':' + this.state.InMin;
        // let OutTime = this.state.OutHours + ':' + this.state.OutMin;
        this.state.shiftTime.push({ 
            DayID: this.state.shiftTime[0].DayID, 
            EmployeeAvailabilityID: 0, 
            NameOfDay: this.state.shiftTime[0].NameOfDay, 
            InTime: this.state.InTime, 
            OutTime:  this.state.OutTime,
        })
        // this.setTime(this.state.InTime, this.state.OutTime)
        this.setState({ shiftTime: this.state.shiftTime, timeIndex: this.state.timeIndex + 1, Active: 'from' })
        setTimeout(() => {
            this.setState({
                InTime: '12:00am',
                OutTime: '11:59pm',
            })
        }, 500);
    }

    deleteShift(removeIndex) {
        if(this.state.shiftTime.length > 1){
            this.state.shiftTime.splice(removeIndex, 1);
            this.setTime(this.state.shiftTime[0].InTime, this.state.shiftTime[0].OutTime)
            this.setState({ shiftTime: this.state.shiftTime, timeIndex: this.state.timeIndex - 1 })
            //this.setState({ shiftTime: _.remove(this.state.shiftTime, function(res) { return res.id != item.id; }) });
            this.setState({ selectedItemIndex: -1, selectedTime: '', isAddShift: true});
        } else {
            alert('please add minimum one shift');
        }
    }

    /* =======>>>>>>  Time display Class  <<<<<<======== */
    renderTime() {
        // console.warn('shiftTime-->', this.state.shiftTime);
        // console.log('isAddShift-->', this.state.isAddShift);
        // console.log('isAddShift-->f->', !this.state.isAddShift);

        return (
            <View>
                {
                    // this.state.selectedTime && this.state.isAddShift
                    !this.state.isAddShift
                    ? null
                    :
                    <View style={{ flexDirection: 'row', alignSelf: 'center'}}>
                        <Text style={[Styles.timeTextStyle, { fontWeight: 'bold' }]}>Add Shift</Text>
                        <TouchableOpacity onPress={() => { this.addShift() }}>
                            <Image style={Styles.addImgStyle} source={Images.AddIcon}></Image>
                        </TouchableOpacity>
                    </View>          
                }
                <FlatList
                    data={this.state.shiftTime}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={[Styles.renderTimeContainer, { backgroundColor: index == this.state.selectedItemIndex && !this.state.isAddShift  ? Colors.APPCOLOR : 'white' }]}>
                         {/* <View style={[Styles.renderTimeContainer, { backgroundColor: 'white' }]}>  */}
                            <TouchableOpacity 
                                onPress={() => { 
                                    (index == this.state.selectedItemIndex && !this.state.isAddShift) ? this.setState({ isAddShift: true}) : this.setState({ isAddShift: false})
                                    // (index == this.state.selectedItemIndex) ? !this.state.isAddShift : this.setState({ isAddShift: false})
                                    this.setState({ 
                                        timeIndex: index, 
                                        selectedTime: Global.getTime24to12(item.InTime) + '-' + Global.getTime24to12(item.OutTime),
                                        selectedItemIndex: index,
                                        InTime: (item.InTime.slice(-2) == 'am' || item.InTime.slice(-2) == 'pm' ) ? item.InTime : Global.getTime24to12(item.InTime),
                                        OutTime: (item.OutTime.slice(-2) == 'am' || item.OutTime.slice(-2) == 'pm' ) ? item.OutTime : Global.getTime24to12(item.OutTime) == '12:00am' ? '11:59pm' : Global.getTime24to12(item.OutTime)
                                        // isAddShift: !this.state.isAddShift,
                                    });
                                        const SelectedInTime = Global.getTime24to12(item.InTime).length === 7 ? Global.getTime24to12(item.InTime) : 0+Global.getTime24to12(item.InTime);
                                        const SelectedOutTime = Global.getTime24to12(item.OutTime).length === 7 ? Global.getTime24to12(item.OutTime) : 0+Global.getTime24to12(item.OutTime);
                                        this.setState({ InHours: SelectedInTime.substring(0, 2) });
                                        this.setState({ InMin: SelectedInTime.substring(3, 5) });
                                        this.setState({ InStatus: SelectedInTime.substring(5, 7) });
                                        this.setState({ OutHours: SelectedOutTime.substring(0, 2) });
                                        this.setState({ OutMin: SelectedOutTime.substring(3, 5) });
                                        this.setState({ OutStatus: SelectedOutTime.substring(5, 7) });
                                }}
                                style={{ flexDirection: 'row', flex: 1}}
                            >
                                <View style={Styles.timeTextContainer}>
                                    {/* <Text style={[Styles.timeTextStyle, { color: index == this.state.timeIndex ? 'white' : Colors.APPCOLOR }]}> */}
                                    <Text style={[Styles.timeTextStyle, { color: index == this.state.selectedItemIndex && !this.state.isAddShift ? 'white' : Colors.APPCOLOR }]}>
                                        {/* {Global.getTime24to12(item.InTime)} - {Global.getTime24to12(item.OutTime) == '12:00am' ? '11:59pm' : Global.getTime24to12(item.OutTime)} */}
                                        {(item.InTime.slice(-2) == 'am' || item.InTime.slice(-2) == 'pm' ) ? item.InTime : Global.getTime24to12(item.InTime)} 
                                        - {(item.OutTime.slice(-2) == 'am' || item.OutTime.slice(-2) == 'pm' ) ? item.OutTime :
                                        Global.getTime24to12(item.OutTime) == '12:00am' ? '11:59pm' : Global.getTime24to12(item.OutTime)}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => this.onSaveClick(index)}>
                                    <Image source={Images.RoundedDoneIcon} style={Styles.DoneIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => { this.deleteShift(index) }} 
                                    style={Styles.imageContainer}
                                >
                                    <Image style={Styles.minusImgStyle} source={Images.RedMinusIcon}></Image>
                                </TouchableOpacity>
                                {
                                    item.EmployeeAvailabilityID != 0 &&
                                    <TouchableOpacity onPress={() => this.onDeleteClick(item.EmployeeAvailabilityID)}>
                                        <Image source={index == this.state.selectedItemIndex && !this.state.isAddShift ? Images.WhiteTrashIcon : Images.TrashIcon} style={[Styles.DoneIcon, {
                                            marginRight: Matrics.CountScale(5),
                                        }]} />
                                    </TouchableOpacity>
                                }
                            </TouchableOpacity>
                            {/* {
                                index == this.state.timeIndex
                                ? this.setState({ selectedTime: Global.getTime24to12(item.InTime) - Global.getTime24to12(item.OutTime) })
                                : null
                            } */}
                            {/* {
                                (index == this.state.timeIndex )
                                ?
                                    <View style={[Styles.timeTextContainer, { flexDirection: 'row' }]}>
                                        <Text style={[Styles.timeTextStyle, { color: Colors.APPCOLOR  }]}>
                                            {Global.getTime24to12(item.InTime)} - {Global.getTime24to12(item.OutTime)}
                                        </Text>
                                        <Image 
                                            source={Images.CalenderSelectedIcon}
                                            style={{ height: Matrics.CountScale(20), width: Matrics.CountScale(20) }}
                                        />
                                    </View>
                                :
                                    <View style={Styles.timeTextContainer}>
                                        <Text style={[Styles.timeTextStyle, { color: 'black' }]}>
                                            {Global.getTime24to12(item.InTime)} - {Global.getTime24to12(item.OutTime)}
                                        </Text>
                                    </View>
                            } */}
                            {/* <View style={Styles.addImgContainer}>
                                {this.state.shiftTime.length == 1 ?
                                    <TouchableOpacity onPress={() => { this.addShift() }}>
                                        <Image style={Styles.addImgStyle} source={Images.AddIcon}></Image>
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => { this.deleteShift(index) }}>
                                        <Image style={Styles.minusImgStyle} source={Images.RedMinusIcon}></Image>
                                    </TouchableOpacity>
                                }
                            </View> */}
                        </View >}
                    />
                </View>
            );
        }   
}

{/*  =============>>>>>>>>> StyleSheet  <<<<<<<<<<=============*/ }
const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: 'white'
    },
    activeDatePicker: {
        flex: 1,
        height: Matrics.CountScale(40),
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(4),
        borderColor: Colors.APPCOLOR,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    activeDatePickerText: {
        color: Colors.APPCOLOR,
        fontFamily: Fonts.NunitoSansRegular
    },
    inActiveDatePicker: {
        flex: 1,
        height: Matrics.CountScale(40),
        margin: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(4),
        borderColor: Colors.BLACK,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inActiveDatePickerText: {
        color: Colors.BLACK,
        fontFamily: Fonts.NunitoSansRegular
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: Matrics.CountScale(5),

    },
    titleStyle: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    rowContentStyle: {
        flex: 1,
        alignItems: 'flex-end'
    },
    rowContentTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        color: Colors.BLACK,
    },
    dayTextStyles: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
        color: Colors.BLACK,
        fontWeight: '400'
    },
    pickerContainer: {
        // borderTopColor: '#ccc',
        marginTop: Matrics.CountScale(5),
        // borderTopWidth: Matrics.CountScale(1),
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1,
        marginBottom: Matrics.CountScale(10),
    },
    picker: {
        flex: 1,
        flexDirection: "row",
        height: Platform.OS === "ios" ? Matrics.CountScale(220) : null,
        borderBottomColor: '#ccc',
        borderBottomWidth: Matrics.CountScale(1)
    },
    dayContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: Matrics.CountScale(10),
        paddingTop: Matrics.CountScale(10),
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    availableTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular
    },
    notAvailableTextStyle: {
        color: 'red',
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular
    },
    renderTimeContainer: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // marginTop: Matrics.CountScale(20),
        // flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.APPCOLOR,
        borderRadius: 5,
        marginVertical: Matrics.CountScale(8),
        paddingVertical: Matrics.CountScale(5),
    },
    timeTextContainer: {
        justifyContent: 'center',
        flex: 1,
        // alignItems: 'flex-end'
    },
    timeTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        margin: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(15),
        fontWeight: '400',
        paddingHorizontal: Matrics.CountScale(3),
        // textAlign: 'center',
    },
    addImgContainer: {
        justifyContent: 'center',
        paddingLeft: Matrics.CountScale(5),
        alignItems: 'flex-end'
    },
    minusImgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(20),
        alignSelf: 'center',
        marginTop: Matrics.CountScale(5),
        marginRight: Matrics.CountScale(5),
    },
    addImgStyle: {
        height: Matrics.CountScale(18),
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(18)
    },
    timeContainer: {
        flex: 1, 
        flexDirection: 'row', 
    },
    imageContainer: {
        paddingLeft: Matrics.CountScale(5),
        alignItems: 'flex-end'
    },
    DoneIcon: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(20),
        alignSelf: 'center',
        marginTop: Matrics.CountScale(5),
        // backgroundColor: 'white'
    }
}
// export default CreateAvailability;

const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        data: state.Availability,

    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    saveUpdateEmployeeAvailability,
    deleteEmployeeAvailability,
})(CreateAvailability);

