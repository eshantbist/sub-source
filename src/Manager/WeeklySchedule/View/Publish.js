// ======>>>>> Libraries <<<<<=========
import React from 'react';
import { View, Text, Image, TextInput, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { NotifyEmployeeSchedulesOnPublishRequest } from '@Redux/Actions/WeeklyScheduleActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoadWheel } from "@Components";
import { CheckBox, colors } from 'react-native-elements';

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
        recipientsData: [],
        message: '',
        emailId: '',
        emailError: '',
        messageError: '',
        loading: false,
        ReceipientsChecked: [],
        WeekEndingDate: '',
        selectedStoreId: '',
        selectedStoreName: '',
    }

    UNSAFE_componentWillMount() {
        if (this.props.navigation.state.params) {
            if(this.props.navigation.state.params.empData != undefined){
                const Recipients = JSON.parse(this.props.navigation.state.params.empData);
                this.setState({ 
                    WeekEndingDate: this.props.navigation.state.params.WeekEndingDate,
                    selectedStoreId: this.props.navigation.state.params.selectedStoreId,
                    selectedStoreName: this.props.navigation.state.params.selectedStoreName,
                 });
                let ReceipientsChecked = [];
                let recipientsData = [];
                if(Recipients.length > 0){
                    Recipients.forEach((data) => {
                        if(data.ShiftData.length > 0){
                            ReceipientsChecked.push(true);
                            recipientsData.push(data);
                        }
                    });
                    this.setState({recipientsData, ReceipientsChecked});
                }
            }
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
            if(this.state.recipientsData.length > 0 && this.state.ReceipientsChecked.length > 0){
                this.state.recipientsData.forEach((child, index) => {
                    this.state.ReceipientsChecked.forEach((data, key) => {
                        if(index == key && data == true){
                            let empList = {
                                "ContactNumber": child.ContactNumber,
                                "CurriculumName": child.CurriculumName,
                                "CurriculumPercentage": child.CurriculumPercentage,
                                "DOB": child.DOB,
                                "DateCompleted": child.DateCompleted,
                                "DoH": child.DoH,
                                "EmailID": child.EmailID,
                                "EmployeeAge": child.EmployeeAge,
                                "EmployeeNumber": child.EmployeeNumber,
                                "EmployeeStatus": child.EmployeeStatus,
                                "EmployeeStatusID": child.EmployeeStatusID,
                                "Experience": child.Experience,
                                "FullName": child.FullName,
                                "IsAvailability": child.IsAvailability,
                                "IsChecked": true,
                                "IsLinked": child.IsLinked,
                                "IsMinorEmployee": child.IsMinorEmployee,
                                "IsScheduled": child.IsScheduled,
                                "IsSuggested": child.IsSuggested,
                                "IsUosMappingAvailable": child.IsUosMappingAvailable,
                                "ProfilePicture": child.ProfilePicture,
                                "ReceipientsMessage": this.state.message,
                                "RoleCode": child.RoleCode,
                                "RoleID": child.RoleID,
                                "RoleLevel": child.RoleLevel,
                                "RoleName": child.RoleName,
                                "SMSEmailID": child.SMSEmailID,
                                "UosAllEmpID": child.UosAllEmpID,
                                "UserID": child.UserID,
                                "UserStoreGUID": child.UserStoreGUID,
                                "UserStoreID": child.UserStoreID,
                                "isUOS": child.isUOS
                            }
                            empListArr.push(empList);
                        }
                    })
                });
            }
            // console.log('emplistarr-->', empListArr);
            this.setState({ loading: true });
            this.props.NotifyEmployeeSchedulesOnPublishRequest({
                'StoreId': this.state.selectedStoreId, 'DisplayStoreNumber': this.state.selectedStoreName, 'BusinessTypeId': 1, 'WeekEnding': this.state.WeekEndingDate, 'DayID': -1,
                '_employeeList': empListArr
            });
        } else {
            this.setState({ messageError: 'Please enter the message' });
        }
    }

    removeRecipients(email) {
        this.state.recipientsData.forEach((child, index) => {
            if (email === child.EmailID) {
                const removeIndex = index;
                this.state.recipientsData.splice(removeIndex, 1);
                this.setState({ recipientsData: this.state.recipientsData })
            }
        });
    }

    renderRecipients = ({ item, index }) => {
        return (
            // item.EmailID
            //     ?
                <View style={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', paddingLeft: Matrics.CountScale(10), marginVertical: Matrics.CountScale(5) }}>
                    <View style={{ flex: 1}}>
                        <Text>{item.FullName}</Text>
                        <Text style={{ marginTop: Matrics.CountScale(5)}}>{item.EmailID}</Text>
                    </View>
                        <CheckBox
                            checkedIcon={<Image source={Images.CheckBoxChecked} />}
                            uncheckedIcon={<Image source={Images.CheckBoxUncheckedBorder} />}
                            checked={ this.state.ReceipientsChecked[index]}
                            onPress={() => {
                                let Arr = this.state.ReceipientsChecked;
                                Arr[index] = !this.state.ReceipientsChecked[index];
                                this.setState({ ReceipientsChecked: Arr });
                            }}
                            style={{ alignSelf: 'flex-end' }}
                        />
                </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, paddingHorizontal: Matrics.CountScale(15) }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={Styles.labelText}>Recipients:</Text>
                </View>
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