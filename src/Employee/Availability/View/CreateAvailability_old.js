/* =======>>>>>> Libraries <<<<<<<======= */
import React from 'react';
import {
    View, ScrollView, Alert, FlatList, Platform, Picker, Switch, Image,
    Text, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

/* =======>>>>>> Assets <<<<<<<======= */
import Global from '../../../GlobalFunction';
import { TextInputView, Button, CustomModal, LoadWheel } from "@Components";
import { saveUpdateEmployeeAvailability, deleteEmployeeAvailability } from '@Redux/Actions/AvailabilityActions'
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import moment from "moment";

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
        initialData: []
    }

    setTime(InTimeVal, OutTimeVal) {
        let InTime = Global.getTime24to12(InTimeVal)
        InTime = InTime.length < 7 ? `0${InTime}` : InTime

        this.setState({ InHours: InTime.substring(0, 2) })
        this.setState({ InMin: InTime.substring(3, 5) })
        this.setState({ InStatus: InTime.substring(5, 7) })

        let OutTime = Global.getTime24to12(OutTimeVal)
        OutTime = OutTime.length < 7 ? `0${OutTime}` : OutTime

        this.setState({ OutHours: OutTime.substring(0, 2) })
        this.setState({ OutMin: OutTime.substring(3, 5) })
        this.setState({ OutStatus: OutTime.substring(5, 7) })

        setTimeout(() => { console.log(this.state) }, 3000)
    }

    UNSAFE_componentWillMount() {
        //console.log(this.props.navigation.getParam('DayData')[Object.keys(data)[0]][0])
        let tmp = JSON.parse(JSON.stringify((this.props.navigation.state.params.DayData)))
        console.log(tmp)
        let data = tmp[Object.keys(tmp)[0]][0]
        let time = tmp[Object.keys(tmp)[0]]
        this.setTime(data.InTime, data.OutTime)
        let temp = JSON.stringify(time)
        let inidata = JSON.parse(temp)
        this.setState({ DayData: data, shiftTime: time, initialData: inidata, notAvailable: data.InTime == "00:00:00" && data.OutTime == "00:00:00" ? true : false, allDay: data.InTime.startsWith("00:00") && data.OutTime.startsWith("23:59") ? true : false })

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

    render() {
        return (
            <View style={Styles.pageBody}>

                {/* =======>>>>>> Header Start <<<<<<<=======  */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle} >Cancel</Text>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle} >
                            My Availability
                        </Text>
                    </View>
                    <TouchableOpacity style={MasterCssEmployee.headerTextContainerStyle}
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

                                            // if(this.state.notAvailable)
                                            // {

                                            // }else{

                                            // }



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
                                                console.log('final')
                                                console.log(resData)
                                                console.log(deleteData)
                                                this.props.saveUpdateEmployeeAvailability({ UpdateShift: resData, DeleteShift: deleteData })
                                            }
                                            else {
                                                let deleteData = []
                                                for (i = 0; i < this.state.initialData.length; i++) {
                                                    deleteData.push(this.state.initialData[i].EmployeeAvailabilityID)
                                                }
                                                console.log(deleteData)
                                                this.props.deleteEmployeeAvailability({ DeleteShift: deleteData })
                                            }

                                            //     if (this.state.OutStatus == 'pm') {
                                            //         var OutTime = (parseInt(this.state.OutHours) + (this.state.OutHours == 12 ? 0 : 12)) + ':' + this.state.OutMin
                                            //     }
                                            //     else {
                                            //         var OutTime = (this.state.OutHours == 12 ? '00' : this.state.OutHours) + ':' + this.state.OutMin

                                            //     }
                                            //     if (this.state.InStatus == 'pm') {
                                            //         var InTime = (parseInt(this.state.InHours) + (this.state.InHours == 12 ? 0 : 12)) + ':' + this.state.InMin
                                            //     }
                                            //     else {
                                            //         var InTime = (this.state.InHours == 12 ? '00' : this.state.InHours) + ':' + this.state.InMin
                                            //     }
                                            //     console.log(InTime, OutTime)

                                            //     this.setState({ loading: true })
                                            //     if (this.state.toggled) {
                                            //         console.log(InTime, 'change...')
                                            //         console.log(OutTime, 'changeout...')
                                            // this.props.saveUpdateEmployeeAvailability({
                                            //     DayID: this.state.DayData.DayID,
                                            //     EmployeeAvailabilityID: this.state.DayData.EmployeeAvailabilityID,
                                            //     NameOfDay: this.state.DayData.NameOfDay,
                                            //     InTime: InTime,
                                            //     OutTime: OutTime
                                            // })
                                            //     }
                                            //     else {
                                            //         this.props.deleteEmployeeAvailability({ EmployeeAvailabilityID: this.state.DayData.EmployeeAvailabilityID })
                                            //     }

                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Save</Text>
                    </TouchableOpacity>
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
            // console.log(this.state.shiftTime, 'allday...true')
            // let tmp =  []
            // tmp.push()
            // this.state.shiftTime[0].InTime = 
        }
        else {
            let val = this.state.Active == 'from' ? moment(this.state.InHours + ":" + this.state.InMin + this.state.InStatus, ["h:mm A"]).format("HH:mm") :
                moment(this.state.OutHours + ":" + this.state.OutMin + this.state.OutStatus, ["h:mm A"]).format("HH:mm")

            console.log(val)
            this.state.Active == 'from' ? (this.state.shiftTime[this.state.timeIndex].InTime = val) : (this.state.shiftTime[this.state.timeIndex].OutTime = val)
            this.setState({ shiftTime: this.state.shiftTime })
            if (!(this.state.shiftTime[0].InTime.startsWith('00:00') && this.state.shiftTime[0].OutTime.startsWith('23:59')) && this.state.allDay == true)
                this.setState({ allDay: false })
            else if (this.state.shiftTime[0].InTime.startsWith('00:00') && this.state.shiftTime[0].OutTime.startsWith('23:59') && this.state.allDay == false)
                this.setState({ allDay: true })
        }

        console.log(this.state.shiftTime)
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
                    {!this.state.notAvailable && !this.state.allDay ? this.renderTime() : null}

                </View>
                {/* =============>>>>>>>>> Time Display  <<<<<<<<<<============= */}
                {
                    !this.state.notAvailable && !this.state.allDay ?
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ Active: 'from' })
                                    }}
                                    style={this.state.Active == 'from' ? Styles.activeDatePicker : Styles.inActiveDatePicker}>
                                    <Text style={this.state.Active == 'from' ? Styles.activeDatePickerText : Styles.inActiveDatePickerText}>
                                        {/* {this.state.DayData.InTime.substring(0,5)} */}
                                        {this.state.InHours + ':' + this.state.InMin + this.state.InStatus}

                                    </Text>
                                </TouchableOpacity>

                                <View style={{ flex: 1, height: Matrics.CountScale(40) }}></View>

                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ Active: 'to' })
                                    }}
                                    style={this.state.Active == 'to' ? Styles.activeDatePicker : Styles.inActiveDatePicker}>
                                    <Text style={this.state.Active == 'to' ? Styles.activeDatePickerText : Styles.inActiveDatePickerText}>
                                        {/* {this.state.DayData.OutTime.substring(0,5)} */}
                                        {this.state.OutHours + ':' + this.state.OutMin + this.state.OutStatus}

                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={Styles.pickerContainer}>
                                <View style={Styles.picker}>

                                    {/*  =============>>>>>>>>> Hours  <<<<<<<<<<=============*/}
                                    <View style={{ flex: 1 }}>

                                        <Picker
                                            // mode={'dropdown'}
                                            selectedValue={this.selectHours()}
                                            style={{ height: Matrics.CountScale(50), }}
                                            itemStyle={{ textAlign: 'right' }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InHours: itemValue })
                                                    this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutHours: itemValue })
                                                    this.updateValue()
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

                                    {/*  =============>>>>>>>>> minutes  <<<<<<<<<<============= */}
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <Picker
                                            selectedValue={this.selectMin()}
                                            style={{ height: Matrics.CountScale(50), flex: 1 }}
                                            itemStyle={{ textAlign: 'left' }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InMin: itemValue })
                                                    this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutMin: itemValue })
                                                    this.updateValue()
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

                                        {/* =============>>>>>>>>> Am / Pm  <<<<<<<<<<============= */}
                                        <Picker
                                            selectedValue={this.selectStatus()}
                                            style={{ height: Matrics.CountScale(50), flex: 1 }}
                                            onValueChange={async (itemValue, itemIndex) => {
                                                if (this.state.Active == 'from') {
                                                    await this.setState({ InStatus: itemValue })
                                                    this.updateValue()
                                                }
                                                else {
                                                    await this.setState({ OutStatus: itemValue })
                                                    this.updateValue()
                                                }
                                            }}><Picker.Item label="am" value="am" />
                                            <Picker.Item label="pm" value="pm" />
                                        </Picker>
                                    </View>
                                </View>
                            </View>


                        </View> : null
                }
                {/* ====================>>>>>>>>>> Other Content <<<<<<<<<<<<====================== */}

                <View style={{ flex: 1, flexDirection: 'column', borderBottomColor: '#ccc', borderBottomWidth: 1 }}>
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
                </View>

                {this.renderSchedule()}


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
        console.log(this.state.InHours.toString(), this.state.OutHours);

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
        let InTime = '00:00:00'
        let OutTime = '23:59:59'
        this.state.shiftTime.push({ DayID: this.state.shiftTime[0].DayID, EmployeeAvailabilityID: 0, NameOfDay: this.state.shiftTime[0].NameOfDay, InTime: InTime, OutTime: OutTime })
        this.setTime(InTime, OutTime)
        this.setState({ shiftTime: this.state.shiftTime, timeIndex: this.state.timeIndex + 1, Active: 'from' })
    }

    deleteShift(removeIndex) {
        this.state.shiftTime.splice(removeIndex, 1);
        this.setTime(this.state.shiftTime[0].InTime, this.state.shiftTime[0].OutTime)
        this.setState({ shiftTime: this.state.shiftTime, timeIndex: this.state.timeIndex - 1 })
        //this.setState({ shiftTime: _.remove(this.state.shiftTime, function(res) { return res.id != item.id; }) });
    }

    /* =======>>>>>>  Time display Class  <<<<<<======== */
    renderTime() {


        return (
            <FlatList
                data={this.state.shiftTime}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                    <View style={Styles.renderTimeContaiener}>
                        <TouchableOpacity onPress={() => { this.setTime(item.InTime, item.OutTime); this.setState({ timeIndex: index }) }}>
                            <View style={Styles.timeTextContainer}>
                                <Text style={[Styles.timeTextStyle, { color: index == this.state.timeIndex ? Colors.APPCOLOR : 'black' }]}>
                                    {Global.getTime24to12(item.InTime)} - {Global.getTime24to12(item.OutTime)}
                                </Text>

                            </View>
                        </TouchableOpacity>
                        <View style={Styles.addImgContainer}>
                            {/* {this.state.add &&
                                <View>
                                    <TouchableOpacity onPress={() => { this.setState({ add: false }) }}>
                                        <Image style={Styles.minusImgStyle} source={Images.RedMinusIcon}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ add: false }) }}>
                                        <Image style={Styles.minusImgStyle} source={Images.RedMinusIcon}></Image>
                                    </TouchableOpacity>
                                </View>
                            } */}
                            {this.state.shiftTime.length == 1 ?
                                <TouchableOpacity onPress={() => { this.addShift() }}>
                                    <Image style={Styles.addImgStyle} source={Images.AddIcon}></Image>
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={() => { this.deleteShift(index) }}>
                                    <Image style={Styles.minusImgStyle} source={Images.RedMinusIcon}></Image>
                                </TouchableOpacity>
                            }
                        </View>
                    </View >}
            />

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
        fontSize: Matrics.CountScale(16)
    },
    dayTextStyles: {
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(18),
        color: Colors.BLACK,
        fontWeight: '400'
    },
    pickerContainer: {
        borderTopColor: '#ccc',
        marginTop: Matrics.CountScale(5),
        borderTopWidth: Matrics.CountScale(1)
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
    renderTimeContaiener: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    timeTextContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    timeTextStyle: {
        fontFamily: Fonts.NunitoSansRegular,
        margin: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(15),
        fontWeight: '400',
        paddingHorizontal: Matrics.CountScale(3),
    },
    addImgContainer: {
        justifyContent: 'center',
        paddingLeft: Matrics.CountScale(5),
        alignItems: 'flex-end'
    },
    minusImgStyle: {
        height: Matrics.CountScale(18),
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(18)
    },
    addImgStyle: {
        height: Matrics.CountScale(18),
        margin: Matrics.CountScale(5),
        width: Matrics.CountScale(18)
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

