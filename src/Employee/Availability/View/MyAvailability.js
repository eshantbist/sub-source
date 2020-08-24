{/*  =============>>>>>>>>> Libraries  <<<<<<<<<<============= */ }
import React from 'react'
import { View, Platform, FlatList, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, Text } from 'react-native'
import { connect } from 'react-redux';
import _ from 'lodash';

{/*  =============>>>>>>>>> Asssets  <<<<<<<<<<============= */ }
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { LoadWheel, CustomModal } from "@Components";
import { getEmployeeAvailability } from '@Redux/Actions/AvailabilityActions'
import Global from '../../../GlobalFunction';
import moment from "moment";

{/* =============>>>>>>>>> Class Declaration  <<<<<<<<<<============= */ }
class MyAvailability extends React.Component {
    state = {
        info: true,
        DaysAvailability: [],
        loading: true,
        msgModal: false,
        msg: ''
    }
    getEmpAvailability() {
        this.setState({ loading: true })
        this.props.getEmployeeAvailability()
    }

    componentWillMount() {
        this.getEmpAvailability()
    }
    async componentWillReceiveProps(nextProps) {
        console.log(nextProps, "Receive Props")

        if (nextProps.data.employeeAvailabilitySuccess) {
            this.setState({ loading: false })
            console.log(nextProps.data.employeeAvailabilityData.Data);
            //await this.setState({ DaysAvailability: nextProps.data.employeeAvailabilityData.Data })
            let data = nextProps.data.employeeAvailabilityData.Data
            let filterData = []
            let day = []
            day[0] = "Sunday";
            day[1] = "Monday";
            day[2] = "Tuesday";
            day[3] = "Wednesday";
            day[4] = "Thursday";
            day[5] = "Friday";
            day[6] = "Saturday";
            for (i = 1; i < 8; i++) {
                const tmp = _.filter(data, (res) => {
                    return res.DayID == i
                });
                filterData.push({ [day[i - 1]]: tmp })
            }
            console.log('***3')
            console.log(filterData)
            this.setState({ DaysAvailability: filterData })
        }
        else if (nextProps.data.employeeAvailabilityFail) {
            this.setState({ loading: false, msgModal: true, msg: Global.error_msg })
        }
    }
    render() {
        return (
            <View style={Styles.pageBody}>

                {/* =============>>>>>>>>> Header Start  <<<<<<<<<<============= */}
                <View style={MasterCssEmployee.headerContainer}>
                    <View style={MasterCssEmployee.centerStyle}>
                        <Text style={MasterCssEmployee.centerTextStyle} >
                            My Availability
                        </Text>
                    </View>
                </View>
                {/* =============>>>>>>>>> Header End  <<<<<<<<<<============= */}



                {/* =============>>>>>>>>> Page Content  <<<<<<<<<<============= */}
                <ScrollView style={{ margin: Matrics.CountScale(15) }}>
                    {this.state.info &&
                        <View style={Styles.requestBtn}>
                            <Text style={Styles.infoText}>
                                Tap on the weekday to create your first availability.
                            </Text>
                            <View style={Styles.gotItContainer}>
                                <TouchableOpacity onPress={() => this.setState({ info: false })}>
                                    <Text style={Styles.gotItTextStyle}>Got it</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {
                        this.renderDayCards()
                    }

                </ScrollView>
                <LoadWheel visible={this.state.loading} />
                <CustomModal visible={this.state.msgModal} title={this.state.msg}
                    ButtonText={'OK'} onPress={() => this.setState({ msgModal: false })} />
            </View >
        );
    }

    /* =============>>>>>>>>> Render Method for Day Cards <<<<<<<<<<============= */
    renderDayCards() {
        // return this.state.DaysAvailability.map((data, index) => {
        //     return (
        //         <View><Text>{data.NameOfDay}</Text></View>
        //     )
        // })

        console.log('DaysAVAILABLE-->' + JSON.stringify(this.state.DaysAvailability));

        return this.state.DaysAvailability.map((data, index) => {
            //console.log(data[Object.keys(data)[0]])
            console.log(data[Object.keys(data)[0]][0])
            let status = data[Object.keys(data)[0]][0]
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.navigate('CreateAvailability', { DayData: data, curIndex: index, allData: this.state.DaysAvailability, getEmpAvailability: this.getEmpAvailability.bind(this) });
                    }} >
                    <View style={Styles.daysCard}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: Matrics.CountScale(18), color: Colors.BLACK, fontFamily: Fonts.NunitoSansSemiBold }}>
                                {Object.keys(data)[0]}
                            </Text>
                        </View>
                        <View style={{  }}>
                            {(status.InTime == "00:00:00" && status.OutTime == "00:00:00") 
                            ?
                                <Text style={{ color: Colors.LIGHTRED, fontSize: Matrics.CountScale(18), fontFamily: Fonts.NunitoSansSemiBold, textAlign: 'right' }}>
                                    Not Available
                                </Text>
                            : 
                                (status.InTime.startsWith('00:00') && status.OutTime.startsWith('23:59')) 
                                    ? <Text style={{ color: Colors.APPCOLOR, fontSize: Matrics.CountScale(18), fontFamily: Fonts.NunitoSansSemiBold, textAlign: 'right' }}>All Day</Text>
                                    : 
                                        data[Object.keys(data)[0]].map(res => {
                                            return (
                                                <Text style={{ color: Colors.APPCOLOR, fontSize: Matrics.CountScale(18), fontFamily: Fonts.NunitoSansSemiBold, textAlign: 'right' }}>
                                                    {`${moment(res.InTime, ["HH:mm"]).format("hh:mm a")} - ${moment(res.OutTime, ["HH:mm"]).format("hh:mm a")}`}
                                                </Text>
                                            )
                                        })}
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            )
        })

    }
}

/* =============>>>>>>>>> StyleSheet <<<<<<<<<<============= */
const Styles = {
    HeaderContainer: {
        resizeMode: 'contain',
        backgroundColor: 'white',
        height: Matrics.headerHeight,
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Matrics.CountScale(15),
        paddingLeft: Matrics.CountScale(15),
        paddingRight: Matrics.CountScale(15)
    },
    centerStyle: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    pageBody:
    {
        backgroundColor: 'white',
        flex: 1,
    },
    requestBtn: {
        borderRadius: Matrics.CountScale(4),
        justifyContent: 'center',
        padding: Matrics.CountScale(5),
        flexDirection: 'row',
        backgroundColor: Colors.APPCOLOR,
    },
    daysCard: {
        flex: 1,
        paddingTop: Matrics.CountScale(23),
        paddingBottom: Matrics.CountScale(23),
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        flexDirection: 'row'
    },
    infoText: {
        flex: 1,
        lineHeight: 25,
        fontSize: Matrics.CountScale(18),
        paddingBottom: Matrics.CountScale(15),
        paddingLeft: Matrics.CountScale(10),
        paddingTop: Matrics.CountScale(15),
        color: 'white',
        fontFamily: Fonts.NunitoSansSemiRegular,
        alignSelf: 'center'
    },
    gotItContainer: {
        flex: 0.4,
        padding: Matrics.CountScale(10),
        alignItems: "flex-end",
        justifyContent: 'flex-end'
    },
    gotItTextStyle: {
        color: 'white',
        fontSize: Matrics.CountScale(18),
        fontFamily: Fonts.NunitoSansRegular
    }

}
// export default MyAvailability

const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        data: state.Availability,

    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getEmployeeAvailability,
})(MyAvailability);

