// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NotifyEmployeeSchedulesOnPublishRequest } from '@Redux/Actions/WeeklyScheduleActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoadWheel } from "@Components";

// ======>>>>> Assets <<<<<=========
import { Colors, Fonts, Images, Matrics, MasterCss } from '@Assets';

// ======>>>>> Class Declaration <<<<<=========

let NotifyEmployeeSchedule = false;
class Publish extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Publish',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerLeft:
            <TouchableOpacity onPress={() => {
                navigation.pop()
            }} >
                <Image source={Images.Close} style={[MasterCss.headerIconStyle, { tintColor: Colors.APPCOLOR }]} />
            </TouchableOpacity>,
        headerRight: navigation.state.params && navigation.state.params.headerRight,
    })

    state = {
        // recipientsData: [{ name: 'abc@gmail.com' }, { name: 'xyz@gmail.com' }, { name: 'pqr@gmail.com' }],
        recipientsData: [],
        message: '',
        emailId: '',
        // isAdded: false,
        emailError: '',
        messageError: '',
        loading: false,
    }

    UNSAFE_componentWillMount() {
        self = this
        // const employeeData = this.props.navigation.getParam('empData');
        if (this.props.navigation.state.params) {
            console.log('employeeData', this.props.navigation.state.params)
            this.setState({ recipientsData: JSON.parse(this.props.navigation.state.params.empData) });
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            headerRight: (
                <TouchableOpacity onPress={() => { this.onClickOfDone() }} >
                    <Text style={MasterCss.headerRightTextStyle}>Done</Text>
                </TouchableOpacity>
            )
        });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.response.NotifyEmployeeSchedulesOnPublishSuccess && !NotifyEmployeeSchedule) {
            NotifyEmployeeSchedule = true;
            let data = nextProps.response.data
            // console.log('publishdata-->', data);
            // console.log(' this.NotifyEmployeeSchedule-->',  NotifyEmployeeSchedule);
            if (data.Status === 1) {
                this.setState({ loading: false });
                Alert.alert(
                    '',
                    `${data.Message}`,
                    [
                        { text: 'OK', onPress: () => this.props.navigation.goBack() },
                    ],
                );
            } else {
                this.setState({ loading: false });
                alert('SomeThing Wrong Please Try Again!')
            }
        }
    }

    onClickOfDone() {
        if (this.state.message !== '') {
            const empListArr = [];
            this.state.recipientsData.forEach((child) => {
                let empList = {
                    "UserStoreID": child.UserStoreID,
                    "EmployeeNumber": child.EmployeeNumber,
                    "FullName": child.FullName,
                    "EmailID": child.EmailID,
                    "IsScheduled": child.IsScheduled,
                    "IsChecked": true,
                    "SMSEmailID": child.SMSEmailID,
                    "ReceipientsMessage": this.state.message
                }
                empListArr.push(empList);
            });
            // console.log('emplistarr-->', empListArr);
            this.setState({ loading: true });
            this.props.NotifyEmployeeSchedulesOnPublishRequest({
                'StoreId': "41", 'DisplayStoreNumber': "457", 'BusinessTypeId': 1, 'WeekEnding': '11/20/2018', 'DayID': -1,
                '_employeeList': empListArr
            });
        } else {
            this.setState({ messageError: 'Please Enter The Message' });
        }

    }

    // addShift() {
    //     const tempArr = {
    //       'EmailID': this.state.emailId,
    //       'IsChecked': true,
    //     }
    //     if(this.state.emailId !== '') {
    //         const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    //         if (reg.test(this.state.emailId) == false) 
    //         {
    //             this.setState({ emailError:'Please Enter Valid Email Address'});
    //         } else {
    //             this.state.recipientsData.push(tempArr);
    //             this.setState({ emailError: '' });
    //             this.setState({ recipientsData: this.state.recipientsData, isAdded: false })
    //         }
    //     } else {
    //         this.setState({ emailError: 'Please Enter Email Address'});
    //     }
    // }

    removeRecipients(email) {
        this.state.recipientsData.forEach((child, index) => {
            if (email === child.EmailID) {
                const removeIndex = index;
                // console.log('myIndex-->', removeIndex);
                this.state.recipientsData.splice(removeIndex, 1);
                this.setState({ recipientsData: this.state.recipientsData })
            }
        });
    }

    // addShiftContainer = () => {
    //     return (
    //         <View>
    //             <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Matrics.CountScale(10), marginVertical: Matrics.CountScale(5) }}>
    //             <TextInput 
    //                 placeholder={'Enter Emailid'}
    //                 onChangeText={(text) => {this.setState({ emailId: text })}}
    //                 autoFocus={true}
    //                 style={{ padding: Matrics.CountScale(15)}}
    //                 keyboardType='email-address'
    //                 // onBlur={() => {this.setState({ isAdded: false }); }}
    //             />
    //             <Icon
    //                 onPress={() => this.addShift()}
    //                 size={20}
    //                 name='done'
    //                 tintColor={Colors.GREY}
    //             />
    //             </View>
    //             <Text style={{ color: 'red' }}>{this.state.emailError}</Text>
    //         </View>
    //     );
    // }

    renderRecipients = ({ item, index }) => {
        return (
            item.EmailID
                ?
                <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Matrics.CountScale(10), marginVertical: Matrics.CountScale(5) }}>
                    <Text>{item.EmailID}</Text>
                    <TouchableOpacity onPress={() => this.removeRecipients(item.EmailID)}>
                        <Image style={{
                            width: Matrics.CountScale(15), height: Matrics.CountScale(30),
                            margin: Matrics.CountScale(10), tintColor: Colors.GREY
                        }} source={Images.Minus} />
                    </TouchableOpacity>
                </View>
                : null
        )
    }

    render() {
        console.log('recipientsData', this.state.recipientsData)
        return (
            <View style={{ flex: 1, paddingHorizontal: Matrics.CountScale(15) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={Styles.labelText}>Recipients:</Text>
                    {/* <TouchableOpacity onPress={() => {this.setState({ isAdded: true })}}>
                        <Image style={{
                            height: Matrics.CountScale(20), width: Matrics.CountScale(20),
                            tintColor: Colors.APPCOLOR
                        }}
                            source={Images.AddBtn} />
                    </TouchableOpacity> */}
                </View>
                {/* {
                    this.state.isAdded
                    ? this.addShiftContainer()
                    : null
                } */}
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
                    <FlatList
                        style={{ flexGrow: 0 }}
                        data={this.state.recipientsData}
                        renderItem={this.renderRecipients}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={[Styles.labelText, { bottom: Matrics.CountScale(30), marginTop: Matrics.CountScale(20) }]}>Message:</Text>
                    <TextInput
                        multiline={true}
                        autoCorrect={false}
                        style={Styles.textinput}
                        placeholder={'Type here....'}
                        onChangeText={(text) => { this.setState({ message: text, messageError: '' }) }}
                    />
                    <Text style={Styles.errorText}>{this.state.messageError}</Text>
                </KeyboardAwareScrollView>
                <LoadWheel visible={this.state.loading} />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    labelText: {
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        paddingTop: Matrics.CountScale(15),
        fontSize: Matrics.CountScale(15),
        paddingBottom: Matrics.CountScale(15)
    },
    textinput: {
        height: Matrics.CountScale(120),
        borderRadius: Matrics.CountScale(5),
        paddingLeft: Matrics.CountScale(10),
        backgroundColor: 'white',
        fontFamily: Fonts.NunitoSansRegular,
        bottom: Matrics.CountScale(30)
    },
    errorText: {
        color: 'red',
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(16),
        bottom: Matrics.CountScale(30)
    },
});

const mapStateToProps = (state) => {
    return {
        response: state.WeeklySchedule,
    };
}

export default connect(mapStateToProps, { NotifyEmployeeSchedulesOnPublishRequest })(Publish);