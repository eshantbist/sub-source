/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========> */
import React from 'react'
import {
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    BackHandler,
    PanResponder,
    StyleSheet,
    Text,
    Modal,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { Calendar } from 'react-native-calendars'
import DocumentPicker from 'react-native-document-picker';
import moment from "moment";

/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========> */
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { createEmployeeTimeOff, getLeaveTypeListRequest } from '@Redux/Actions/MyScheduleActions'
import Global from '../../../GlobalFunction'
import { LoadWheel } from "@Components";

const deviceWidth = Dimensions.get('window').width;
/* ====>>>>>>>>>>> Class Declaration <<<<<<<<<<==========> */
class CreateRequest extends React.Component {

    state = {
        leaveRequstType: [],
        selectedReasonId: '',
        modalVisible: false,
        beginDate: '',
        endDate: '',
        selectedDate: {},
        selectedDt: '',
        dateMode: '',
        attachFile: {},
        notes: '',
        loading: false,
        resonError: '',
    }

    UNSAFE_componentWillMount() {
        date = new Date;
        dt = moment(date).format('YYYY-MM-DD')
        selectedDate = { [dt]: { selected: true, selectedColor: Colors.APPCOLOR } }
        this.setState({ beginDate: date, endDate: date, selectedDate: selectedDate })
        this.props.getLeaveTypeListRequest()


    }
    componentDidMount() {
        setTimeout(() => {
            this.myComponent.measure((fx, fy, width, height, px, py) => {
                console.log('Component width is: ' + width)
                console.log('Component height is: ' + height)
                console.log('X offset to frame: ' + fx)
                console.log('Y offset to frame: ' + fy)
                //this.topSpace = fy
                console.log('X offset to page: ' + px)
                console.log('Y offset to page: ' + py)
                this.topSpace = py - 10
                this.setState({ topSpace:  this.topSpace})
            })
        }, 100)

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.mySchedule.getLeaveTypeListSuccess) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data
            if (response.Status == 1) {
              
                this.setState({ leaveRequstType: response.Data })
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)

            }
        }
        else if (nextProps.mySchedule.createEmployeeTimeOffSuccess && this.state.loading) {
            this.setState({ loading: false })
            let response = nextProps.mySchedule.data
            if (response.Status == 1) {
                this.props.navigation.goBack()
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)
            }
        }
        else if (nextProps.mySchedule.getLeaveTypeListFail) {
            this.setState({ loading: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }
    }

    getDateValue(dateVal) {
        var date = new Date(dateVal)
        getYear = date.getFullYear().toString()
        month = date.getMonth() + 1
        getMonth = month < 10 ? `0${month}` : month
        dt = date.getDate()
        getDate = dt < 10 ? `0${dt}` : dt
        return Number(getYear.toString() + getMonth.toString() + getDate.toString())
    }


    render() {
        return (
            <View style={Styles.pageBody} >

                {/* ====>>>>>>>>>>> Header Start <<<<<<<<<<==========> */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity style={MasterCssEmployee.headerTextContainerStyle}
                        onPress={() => {
                            this.props.navigation.navigate('MySchedule');
                        }}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle} >Cancel</Text>

                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle} >Request Day(s) Off</Text>
                    </View>
                    <TouchableOpacity style={MasterCssEmployee.headerTextContainerStyle} onPress={() => {
                       
                        let startDate = moment(this.state.beginDate).format('MM-DD-YYYY')
                        let endDate = moment(this.state.endDate).format('MM-DD-YYYY')

                        date = new Date;
                        console.log('startDate-->', this.getDateValue(this.state.beginDate));
                        console.log('endDate-->', this.getDateValue(this.state.endDate));
                        console.log('date-->', this.getDateValue(date));
                        if (this.getDateValue(this.state.beginDate) < this.getDateValue(date)) {
                            alert('Leave begin date is invalid. Please select valid date')
                        }
                        else if (this.getDateValue(this.state.endDate) < this.getDateValue(date)) {
                            alert('Leave end date is invalid. Please select valid date')
                        }
                        else if (this.getDateValue(this.state.beginDate) > this.getDateValue(this.state.endDate)) {
                            alert('Leave end date is invalid. Please select valid date')
                        } else if(this.state.selectedReasonId === ''){
                            this.setState({ resonError: 'Please Select The Reson' });
                        } 
                        else {
                            this.setState({ loading: true })
                            const  TimeoffArr = {
                                StartDate: startDate,
                                EndDate: endDate,
                                ReasonID: this.state.selectedReasonId,
                                ReasonDetail: this.state.notes,
                                AttachmentName: this.state.attachFile.name ? this.state.attachFile.name : '',
                                OldTimeOffCombineID: 0,
                                IsFromSchedule: 0 
                            }
                            console.log('TimeoffArr123->', TimeoffArr);
                            this.props.createEmployeeTimeOff(TimeoffArr)
                        }

                    }} >
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Done</Text>
                    </TouchableOpacity>
                </View>
                {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

                <ScrollView>
                    {this.renderPageContent()}

                </ScrollView>

                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.modal}>
                        <View style={styles.calendarContainer}>
                            <Calendar
                                style={styles.calendar}
                                onDayPress={(selectedDate) => {
                                    console.log(selectedDate)


                                    date = { [selectedDate.dateString]: { selected: true, selectedColor: Colors.APPCOLOR } }
                                    this.setState({ selectedDate: date, selectedDt: selectedDate.dateString })

                                }}
                                markedDates={this.state.selectedDate}
                            // markedDates={{
                            //     '2019-02-16': { selected: true, marked: true },

                            // }}

                            //markingType={'period'}
                            // theme={{
                            //     backgroundColor: 'red'
                            // }}
                            />
                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                <View style={{ flex: 1, marginBottom: Matrics.CountScale(30), marginHorizontal: Matrics.CountScale(30), alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                                        <Image style={styles.calCloseIcon} source={Images.CalenderCloseIcon} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginBottom: Matrics.CountScale(30), marginHorizontal: Matrics.CountScale(30), alignItems: 'flex-start' }}>
                                    <TouchableOpacity onPress={() => this.onConfirm()}>
                                        <Image style={styles.calSelectIcon} source={Images.CalenderSelectedIcon} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
                <LoadWheel visible={this.state.loading} />
            </View >
        );
    }

    onConfirm() {
        this.setState({ modalVisible: false })
        if (this.state.dateMode == 'BEGIN') {
            this.setState({ beginDate: this.state.selectedDt })
        }
        else {
            this.setState({ endDate: this.state.selectedDt })
        }
    }

    async onAttach() {
        // DocumentPicker.show({
        //     filetype: [DocumentPickerUtil.allFiles()],
        // }, (error, res) => {
        //     console.log('***name', res);
        //     if (res != null)
        //         this.setState({ attachFile: res })
        // });
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('***name', res);
            if (res != null)
            this.setState({ attachFile: res })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('cancel');
            } else {
                throw err;
            }
        }
    }

    async onSelectReason(value, index, data) {
        console.log(value, index, data)
        await this.setState({ selectedReasonId: data[index].ReasonID, resonError: '', })
        console.log(data[index].ReasonID)
    }

    /* ====>>>>>>>>>>> Render Page Container Class <<<<<<<<<<==========> */
    renderPageContent() {
        // alert('kk' + JSON.stringify(this.state.leaveRequstType ))
        return (
            <View style={{ margin: Matrics.CountScale(10) }}>

                {/* ====>>>>>>>>>>> Leave Dates Picker <<<<<<<<<<==========> */}
                <TouchableOpacity style={Styles.rowStyle}
                    onPress={() => { this.setState({ modalVisible: true, dateMode: 'BEGIN', selectedDt: moment(this.state.beginDate).format('YYYY-MM-DD'), selectedDate: { [moment(this.state.beginDate).format('YYYY-MM-DD')]: { selected: true, selectedColor: Colors.APPCOLOR } } }) }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={Styles.labelText}>Leave begin</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={Styles.valueText}>{moment.parseZone(this.state.beginDate).format('MMM DD, ddd')}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={Styles.rowStyle}

                    onPress={() => { this.setState({ modalVisible: true, dateMode: 'END', selectedDt: moment(this.state.endDate).format('YYYY-MM-DD'), selectedDate: { [moment(this.state.endDate).format('YYYY-MM-DD')]: { selected: true, selectedColor: Colors.APPCOLOR } } }) }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <Text style={Styles.labelText}>Leave end</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={Styles.valueText}>{moment.parseZone(this.state.endDate).format('MMM DD, ddd')}</Text>
                    </View>
                </TouchableOpacity>

                {/* ====>>>>>>>>>>> Attached label <<<<<<<<<<==========> */}
                {console.log('file-->',this.state.attachFile)}
                <View style={Styles.rowStyle}>
                    <TouchableOpacity style={Styles.attachContainer} onPress={() => this.onAttach()}>
                        <Image style={Styles.attachImgStyle} source={Images.AttachIcon}></Image>
                        <Text numberOfLines={1} style={Styles.attachTextStyle}>Attach file</Text>
                        <Text style={Styles.attachFileStyle} numberOfLines={1} onPress={() => { this.onSelectFile() }}>
                            {this.state.attachFile.name ? this.state.attachFile.name : ''}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* ====>>>>>>>>>>> Reason textbox <<<<<<<<<<==========> */}
                <View style={Styles.rowStyle} ref={view => { this.myComponent = view; }}>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <Text style={[Styles.labelText,{ flex: 1}]}>Reason:</Text>
                        <Dropdown
                            containerStyle={{alignSelf: 'flex-end',width: deviceWidth/ 2, }}
                            // containerWidth={(Dimensions.get('window').width/ 2)}
                            labelContainerStyle={{ flex: 1, width: '100%', marginBottom: -20 }}
                            data={this.state.leaveRequstType}
                            value={'Select Reason'}
                            onChangeText={(value, index, data) => this.onSelectReason(value, index, data)}
                            valueExtractor={({ ReasonName }) => ReasonName}
                            inputContainerStyle={{ borderBottomColor: 'transparent',alignSelf: 'center', width: deviceWidth/2 }}
                            itemTextStyle={{ textAlign: 'left' }}
                            overlayStyle={{ top: this.state.topSpace, borderWidth: 0}}
                            dropdownOffset={{ top: 0, left: 0 }}
                            fontSize={17}
                            itemCount={8}
                            rippleCentered={true}
                            error={this.state.resonError}
                            labelFontSize={18}
                            rippleColor='white'
                            animationDuration= {300}
                            selectedTextStyle={{ textAlign: 'right'}}
                        />
                    </View>
                    {/* <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TextInput style={{ height: 22, width: Matrics.inspireImageHeight * 2.3 }}></TextInput>
                    </View> */}
                </View>

                {/* ====>>>>>>>>>>> Note textbox <<<<<<<<<<==========> */}
                <View style={Styles.rowStyle}  >
                    <View>
                        <Text style={Styles.labelText}>Note:</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput multiline={true} style={{ height: 100, width: '100%' }}
                            value={this.state.notes}
                            onChangeText={(text) => { this.setState({ notes: text }) }}
                        />
                    </View>
                </View>
            </View>


        )
    }
}

{/* ====>>>>>>>>>>> StyleSheet <<<<<<<<<<==========> */ }
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
        // borderWidth: 5
    }
})

const Styles = {
    pageBody: {
        flex: 1,
        backgroundColor: Colors.WHITE
    },
    rowStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: Matrics.CountScale(15),
        paddingBottom: Matrics.CountScale(15),
        borderBottomColor: Colors.LIGHTGREY,
        borderBottomWidth: 1,
    },
    labelText: {
        fontFamily: Fonts.NunitoSansSemiBold,
        // fontWeight: '400',
        fontSize: Matrics.CountScale(18)
    },
    valueText: {
        fontFamily: Fonts.NunitoSansRegular,
        fontWeight: '400',
        fontSize: Matrics.CountScale(17)
    },
    attachContainer: {
        flex: 1,
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    attachImgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(18),
        paddingLeft: Matrics.CountScale(5)
    },
    attachTextStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.CountScale(17),
        paddingLeft: Matrics.CountScale(10),
        flex:1,
        width: '50%',
    },
    attachFileStyle: {
        color: Colors.APPCOLOR,
        fontSize: Matrics.CountScale(17),
        marginRight: Matrics.CountScale(10),
        alignSelf: 'flex-end',
        width: '50%',
    }
}
// export default CreateRequest;
const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        mySchedule: state.MySchedule,

    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    createEmployeeTimeOff, getLeaveTypeListRequest
})(CreateRequest);

