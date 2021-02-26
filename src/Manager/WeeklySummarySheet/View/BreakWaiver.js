import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { 
    FetchBreakWaiversDetailRequest,
  } from '@Redux/Actions/WeeklySummarySheetActions';
import { LoadWheel } from "@Components";

class BreakWaiver extends React.Component {

    constructor(props){
        super(props);
        const { navigation } = this.props;
        const empName = navigation.getParam('empName');
        const DailyDetailID = navigation.getParam('DailyDetailID');
        const DayID = navigation.getParam('DayID');
        const Weekstartdate = navigation.getParam('Weekstartdate');
        const PosId = navigation.getParam('PosId');
        const date = navigation.getParam('date');
        const previousDay = moment(date, 'YYYY/MM/DD').subtract(1, 'days')
        this.state = {empName, date, PosId, previousDay, DailyDetailID,DayID, Weekstartdate, loading: true, };

    }
    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Break Waiver',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                <Image source={Images.BackIcon} style={MasterCss.headerIconStyle} />
            </TouchableOpacity>,
        headerRight:
            <View />
    });

    state = {
        displayReason: false,
        reasonData: ['reason1', 'reason2', 'reason3'],
        selectedReason: '',
        warningDate: '',
        shiftInTimeFrom: '',
        shiftInTimeTo: '',
        shiftOutTimeFrom: '',
        shiftOutTimeTo: '',
    }

    UNSAFE_componentWillMount() {
        console.log('in break');
        this.props.FetchBreakWaiversDetailRequest({ DailyDetailID: this.state.DailyDetailID, DayID: this.state.DayID, DayDate: this.state.date, Weekstartdate: this.state.Weekstartdate });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.resSummarySheet.getFetchBreakWaiversDetailSuccess && this.state.loading) {
            let data = nextProps.resSummarySheet.data;
            this.setState({ loading: false });
        }
    }

    renderReason = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.setState({ selectedReason: item, displayReason: false })}>
                <Text>{item}</Text>
            </TouchableOpacity>
        )
    }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (date) => {
        this._hideDateTimePicker();
        this.setState({ warningDate: moment(date).format('MMM DD, ddd') })
    };

    _showTimePicker(val) {
        this.setState({ isTimePickerVisible: true, timeFlag: val });
    }
    _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

    _handleTimePicked = (time) => {
        let val = moment(time).format('HH:mm')
        this._hideTimePicker();
        if (this.state.timeFlag == 'InFrom') {
            this.setState({ shiftInTimeFrom: val })
        }
        else if (this.state.timeFlag == 'InTo') {
            this.setState({ shiftInTimeTo: val })
        }
        else if (this.state.timeFlag == 'OutFrom') {
            this.setState({ shiftOutTimeFrom: val })
        }
        else if (this.state.timeFlag == 'OutTo') {
            this.setState({ shiftOutTimeTo: val })
        }
        
    };

    render() {
        return (
            <View style={Styles.pageContainer}>
                <ScrollView>
                    <View style={{ backgroundColor: 'white', padding: Matrics.CountScale(15) }}>
                        <Text style={Styles.titleFontStyle}>Name : <Text style={Styles.basicFontStyle}>{this.state.empName}</Text></Text>
                        <Text style={Styles.titleFontStyle}>POS ID : <Text style={Styles.basicFontStyle}>{this.state.PosId}</Text></Text>
                        <Text style={Styles.titleFontStyle}>Day Name : <Text style={Styles.basicFontStyle}>{moment(this.state.previousDay).format('dddd')}</Text></Text>
                        <Text style={Styles.titleFontStyle}>Date : <Text style={Styles.basicFontStyle}>{moment(this.state.date).format('MMM DD, ddd')}</Text></Text>
                    </View>
                    <Text style={[Styles.contentStyle, { marginLeft: Matrics.CountScale(10), padding: Matrics.CountScale(5) }]}>Reason</Text>
                    <View style={Styles.containerStyle}>
                        <Text style={Styles.basicFontStyle}>Employee's Choice</Text>
                        <Text style={Styles.contentStyle}>The employee acknowledges that despite given a fair opportunity to take a full and undisturbed 30-minute meal period. The employee chose not to take the Meal period at his/her sole discreation Note that this secrion only applies if employee's total hours worked exceed 6 hours, and if the meal period  was not taken before the 5th hour of work.</Text>
                    </View>
                    <View style={[Styles.containerStyle, { marginTop: Matrics.CountScale(10) }]}>
                        <Text style={Styles.basicFontStyle}>Not Employee's Choice</Text>
                        <Text style={Styles.contentStyle}>The employee acknowledges that despite given a fair opportunity to take a full and undisturbed 30-minute meal period. The employee chose not to take the Meal period at his/her sole discreation Note that this secrion only applies if employee's total hours worked exceed 6 hours, and if the meal period  was not taken before the 5th hour of work.</Text>
                    </View>
                    <Text style={[Styles.contentStyle, { marginLeft: Matrics.CountScale(10), padding: Matrics.CountScale(5) }]}>Warning Date</Text>
                    <TouchableOpacity onPress={this._showDateTimePicker} style={Styles.containerStyle}><Text style={Styles.basicFontStyle}>{this.state.warningDate == '' ? 'Select Date' : this.state.warningDate}</Text></TouchableOpacity>

                    <Text style={Styles.labelStyle}>Shift Time</Text>
                    <View style={Styles.containerStyle}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: Colors.BORDERCOLOR, paddingBottom: Matrics.CountScale(10), justifyContent: 'space-between' }}>
                            <Text style={{ flex: 1 }}>In</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }} onPress={() => this._showTimePicker('InFrom')}>{this.state.shiftInTimeFrom ? this.state.shiftInTimeFrom : 'From'}</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }} onPress={() => this._showTimePicker('InTo')}>{this.state.shiftInTimeTo ? this.state.shiftInTimeTo : 'To'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: Colors.BORDERCOLOR, paddingVertical: Matrics.CountScale(10), justifyContent: 'space-between' }}>
                            <Text style={{ flex: 1 }}>Out</Text>
                            <Text style={{ flex: 1, textAlign: 'center' }} onPress={() => this._showTimePicker('OutFrom')}>{this.state.shiftOutTimeFrom ? this.state.shiftOutTimeFrom : 'From'}</Text>
                            <Text style={{ flex: 1, textAlign: 'right' }} onPress={() => this._showTimePicker('OutTo')}>{this.state.shiftOutTimeTo ? this.state.shiftOutTimeTo : 'To'}</Text>
                        </View>
                        <Text style={{ alignSelf: 'flex-end', marginTop: Matrics.CountScale(10), color: Colors.TEXTGREY, fontFamily: Fonts.NunitoSansRegular, fontSize: Matrics.CountScale(10) }}>Missed Break(MB)</Text>
                    </View>

                    <Text style={Styles.labelStyle}>Warning Reason</Text>
                    <View style={Styles.containerStyle}>
                        <TouchableOpacity onPress={() => { this.setState({ displayReason: !this.state.displayReason }) }}
                            style={[{ flexDirection: 'row', alignItems: 'center', }]}>
                            <Text style={[Styles.basicFontStyle, { flex: 1 }]}>{this.state.selectedReason == '' ? 'Select Reason' : this.state.selectedReason}</Text>
                            <Image source={this.state.displayReason ? Images.UpArrow : Images.DownArrow} style={{ tintColor: Colors.GREY }} /></TouchableOpacity>
                        {this.state.displayReason ? <View style={{ borderColor: Colors.BORDERCOLOR, borderTopWidth: 1, marginTop: 10, paddingTop: 10 }}>
                            <FlatList
                                data={this.state.reasonData}
                                renderItem={this.renderReason}
                            />
                        </View> : null}

                    </View>


                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this._handleDatePicked}
                        onCancel={this._hideDateTimePicker}
                    />

                    <DateTimePicker
                        isVisible={this.state.isTimePickerVisible}
                        onConfirm={this._handleTimePicked}
                        onCancel={this._hideTimePicker}
                        mode={'time'}
                    />

                    <Text style={Styles.labelStyle}>File</Text>
                    <View style={{ flexDirection: "row", marginHorizontal: Matrics.CountScale(8), marginBottom: Matrics.CountScale(15), }}>
                        <TouchableOpacity style={Styles.btnViewStyle}>
                            <View><Text style={Styles.btnTextStyle}>Upload</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.btnViewStyle}>
                            <View><Text style={Styles.btnTextStyle}>Sign</Text></View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <LoadWheel visible={this.state.loading} />
            </View>
        )
    }
}

const Styles = {
    pageContainer: {
        flex: 1,
        backgroundColor: Colors.BODYBACKGROUND,
        justifyContent: 'center',
        alignItems: 'center'
    },
    basicFontStyle: {
        fontFamily: Fonts.NunitoSansRegular,
    },
    titleFontStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
    },
    containerStyle: {
        backgroundColor: 'white',
        marginHorizontal: Matrics.CountScale(15),
        borderRadius: 5,
        overflow: 'hidden',
        padding: Matrics.CountScale(15),
    },
    contentStyle: {
        color: Colors.TEXTGREY,
        fontFamily: Fonts.NunitoSansRegular,
        marginVertical: Matrics.CountScale(10),
    },
    labelStyle: {
        color: Colors.TEXTGREY,
        fontFamily: Fonts.NunitoSansRegular,
        marginVertical: Matrics.CountScale(10),
        marginLeft: Matrics.CountScale(10),
        padding: Matrics.CountScale(5)
    },
    btnViewStyle: {
        marginHorizontal: Matrics.CountScale(8),
        flex: 1,
        borderRadius: 5,
        borderColor: Colors.SKYBLUE,
        borderWidth: 1,
        padding: Matrics.CountScale(15),
        alignItems: 'center'
    },
    btnTextStyle: {
        fontFamily: Fonts.NunitoSansSemiBold,
        color: Colors.SKYBLUE,
        fontSize: Matrics.CountScale(18)
    }

}

const mapStateToProps = (state) => {
    return {
      resSummarySheet: state.WeeklySummarySheet,
    }
}

export default connect(mapStateToProps, { FetchBreakWaiversDetailRequest })(BreakWaiver);