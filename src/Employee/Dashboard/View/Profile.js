{/* ====>>>>>>>>>>>   Libraries   <<<<<<<<<<========== */ }
import React from 'react';
import { View, BackHandler, PanResponder, ScrollView, StatusBar, ImageBackground, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation'

{/* ====>>>>>>>>>>>    Assets   <<<<<<<<<<========== */ }
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { TextInputView, Button, LoadWheel, ResignModal } from "@Components";
import { getEmployeePersonalDetails, getEmployeeBasicDetails, updateEmployeePersonalDetails } from '@Redux/Actions/DashboardEmployeeActions'


{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
class Profile extends React.Component {

    state = {
        university: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        cellphone: '',
        homephone: '',
        emergencyName: '',
        emergencyNumber: '',
        name: '',
        modalVisible: false,
        loading: true,
        Position: '',
        Experience: '',
        Profile: '',
        UserGUID: '',
        userData: {},
        discardModal: false,
        isvisible: false,
    }
    componentDidMount() {
        // BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        global.tabHide = false
        console.log(this.props)
        this.props.navigation.navigate('EmployeeDashboard', { changeData: true });
        // BackHandler.exitApp();
        return true;
    }

    async UNSAFE_componentWillMount() {
        console.log(this.props, "ProfileProp");
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        //====>>>> API CALLING <<<<<=========
        this.props.getEmployeePersonalDetails({
            UserStoreGuid: userStoreGuid,
        })
        this.props.getEmployeeBasicDetails({
            UserStoreGuid: userStoreGuid,
        })
        // this.props.getEmployeeBasicDetails({
        //     UserStoreGuid: '6000FF45-7AD8-4749-8F3F-015AB8E632C9'
        // })


        // this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        //     global.tabHide = false
        //     console.log("Set true");
        //     this.props.navigation.navigate('EmployeeDashboard', { GoDash: true });
        //     // this.props.navigation.navigate('EmployeeDashboard', { changeData: true });
        //     return true;
        // });
        this._panResponder = PanResponder.create({
            onStartShouldSetResponder: (evt, gestureState) => true,
            onStartShouldSetResponderCapture: () => { alert('clicked'); return false },
            onMoveShouldSetResponderCapture: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log("onStartShouldSetPanResponderCapture", gestureState.dx, gestureState.dy);
                return gestureState.dx != 0 && gestureState.dy != 0;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                console.log("onMoveShouldSetPanResponderCapture", gestureState.dx,
                    gestureState.dy);
                return gestureState.dx != 0 && gestureState.dy != 0;
            },

            onPanResponderGrant: (evt, gestureState) => {
            },

            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx > 30) {
                       /*====  Tab Hide======*/ global.tabHide = false /*====  Tab Hide======*/
                    this.props.navigation.navigate('EmployeeDashboard');
                }
            },

            onResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (e, { vx }) => {
            }
        });
    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.data.employeeBasicDetailsSuccess) {
            const basicData = nextProps.data.employeeBasicDetailsdata.Data
            this.setState({
                Position: basicData.Position,
                Experience: basicData.Experience,
                UserGUID: basicData.UserGUID
            })
        }
        if (nextProps.data.employeePersonalDetailsSuccess) {
            const data = nextProps.data.employeePersonalDetailsdata.Data;
            // console.log('profileData-->', data)
            // console.log('data.ProfilePicture-->', data.ProfilePicture)
            this.setState({
                university: 'University of ' + data.State,
                address1: data.Address1,
                address2: data.Address2,
                city: data.City,
                Profile: data.ProfilePicture,
                coverPhoto: data.CoverPhoto,
                state: data.State,
                zip: data.ZipCode,
                email: data.Email,
                cellphone: data.CellPhone,
                homephone: data.HomePhone,
                name: data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName,
                Position: data.Position,
                emergencyName: data.EmergencyContactName,
                emergencyNumber: data.EmergencyContactNumber,
                userData: data
            });
        }
        setTimeout(() => {
            this.setState({ loading: false })
        },2000)
    }
    updateInfo() {
        this.setState({ loading: true })
        this.props.getEmployeePersonalDetails({
            UserStoreGuid: userStoreGuid,
        })
        this.props.getEmployeeBasicDetails({
            UserStoreGuid: userStoreGuid,
        })
    }
    render() {
        return (
            <View style={{ flex: 1 }} >
                {/* <View style={{ flex: 1 }} {...this._panResponder.panHandlers}> */}
                <ScrollView style={Styles.pageBody}>
                    {/* <StatusBar barStyle="light-content"></StatusBar> */}

                    {/* ====>>>>>>>>>>>    Profile Image Container   <<<<<<<<<<========== */}
                    <ImageBackground
                        blurRadius={3}
                        source={this.state.coverPhoto ? { uri: this.state.coverPhoto } : Images.DefCoverBg}
                        style={{ flex: 2, backgroundColor: 'black' }}>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={[MasterCssEmployee.headerContainer, Styles.HeaderContainer]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                    style={MasterCssEmployee.iconContainerStyle}
                                >
                                    <Image style={[Styles.imgStyle, MasterCssEmployee.iconStyle]} source={Images.EmpBackIcon}></Image>
                                </TouchableOpacity>
                                <View style={MasterCssEmployee.centerStyle}>

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('EditProfileEmployee', { Data: this.state.userData, updateInfo: this.updateInfo.bind(this) })
                                    }}
                                    style={MasterCssEmployee.headerTextContainerStyle}>
                                    <Text style={[MasterCssEmployee.headerRightTextStyle, { color: Colors.WHITE }]}>Edit</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={Styles.profileImgContainer}>
                                <Image style={Styles.profileImgStyle}
                                    // source={{ uri: this.state.Profile }}
                                    source={this.state.Profile != '' ? { uri: this.state.Profile } : Images.ProfileIconPlaceholder}
                                />
                                <Text style={Styles.nameTextStyle}>
                                    {this.state.name}
                                </Text>
                                <Text style={Styles.yearTextStyle}>
                                    {this.state.Experience} years
                                </Text>
                                <Text style={Styles.positionTextStyle}>
                                    {this.state.Position == 'NA' ? null : this.state.Position}
                                </Text>
                            </View>

                        </View>
                    </ImageBackground >

                    {!this.state.loading && this.renderPageContent()}

                    {/* ====>>>>>>>>>>>   Resign Modal Container   <<<<<<<<<<========== */}
                    <ResignModal
                        onCancelPress={() => {
                            this.setState({ modalVisible: false })
                        }}
                        onResignPress={() => {
                            this.setState({ modalVisible: false })
                            this.props.navigation.navigate('EndEmployment')
                        }}
                        visible={this.state.modalVisible}
                        title={'Are you sure you want to end your employment within our company? if you have any troubles, please contact your manager for support.'}
                    />
                </ScrollView >
                <LoadWheel visible={this.state.loading} onRequestClose={() => this.setState({ loading: false })} />
            </View >
        );
    }

    navigateToScreen(route) {
        const navigateAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        AsyncStorage.clear();
        this.props.navigation.dispatch(navigateAction);

    }

    //   ====>>>>>>>>>>>    User Details Content   <<<<<<<<<<========== 
    renderPageContent() {
        return (
            <ScrollView style={{ paddingTop: Matrics.CountScale(10), backgroundColor: Colors.WHITE }}>
                {/* <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="University of Subway"
                        value={this.state.university}
                        labelFontSize={15}
                        fontSize={18}
                        onChangeText={val => this.setState({ university: val })}
                        containerStyle={Styles.Input}
                    />
                </View> */}
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Address1"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.address1}
                        onChangeText={val => this.setState({ address1: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Address2"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.address2}
                        onChangeText={val => this.setState({ address2: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="City"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.city}
                        onChangeText={val => this.setState({ city: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="State"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.state}
                        onChangeText={val => this.setState({ state: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Zip"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.zip}
                        onChangeText={val => this.setState({ zip: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Email"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.email}
                        onChangeText={val => this.setState({ email: val })}
                        containerStyle={Styles.Input}
                    />
                </View>

                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Cell Phone"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.cellphone}
                        onChangeText={val => this.setState({ cellphone: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Home Phone"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.homephone}
                        containerStyle={Styles.Input}
                    />
                </View>

                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Emergency contact name"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.emergencyName}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Emergency contact number"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.emergencyNumber}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.endEmpContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                        style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1, }}>
                        <Text style={Styles.endEmpText}>
                            End Employment </Text>
                    </TouchableOpacity>
                    <View style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1, height: Matrics.CountScale(30) }}>

                    </View>
                    <TouchableOpacity
                        onPress={async () => {
                            const asyncStorageKeys = await AsyncStorage.getAllKeys();
                            if (asyncStorageKeys.length > 0) {
                                if (Platform.OS === 'android') {
                                  await AsyncStorage.clear();
                                }
                                if (Platform.OS === 'ios') {
                                  await AsyncStorage.multiRemove(asyncStorageKeys);
                                }
                              }
                            // this.props.navigation.dispatch(StackActions.popToTop());
                            this.navigateToScreen('Login')
                        }}
                        style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1 }}>
                        <Text style={Styles.logoutText}>
                            Logout
                    </Text>
                    </TouchableOpacity>
                    <View style={{ height: Matrics.CountScale(30) }}>

                    </View>
                </View>
            </ScrollView >
        );
    }
}

//   ====>>>>>>>>>>>    StyleSheet for Profile Container  <<<<<<<<<<========== 
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    HeaderContainer: {
        //resizeMode: 'contain',
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        // height: Matrics.CountScale(64),
        // flexDirection: 'row',
        // alignItems: 'center',
        // paddingTop: Matrics.CountScale(25),
        // paddingLeft: Matrics.CountScale(15),
        // paddingRight: Matrics.CountScale(15),
    },
    inputBox: {
        marginLeft: Matrics.CountScale(15),
        marginRight: Matrics.CountScale(15),
        margin: Matrics.CountScale(5)
    },
    profileImgContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    endEmpText: {
        color: Colors.RED,
        fontWeight: '300',
        marginBottom: Matrics.CountScale(10),
        marginTop: Matrics.CountScale(10),
        fontFamily: Fonts.NunitoSansRegular,
        paddingLeft: Matrics.CountScale(15),
        fontSize: Matrics.CountScale(18)
    },
    endEmpContainer: {
        borderTopColor: Colors.LIGHTGREY,
        borderTopWidth: 1,
        marginTop: Matrics.CountScale(10)
    },
    logoutText: {
        marginBottom: Matrics.CountScale(10),
        color: Colors.APPCOLOR,
        fontWeight: '300',
        marginTop: Matrics.CountScale(10),
        fontFamily: Fonts.NunitoSansRegular,
        paddingLeft: Matrics.CountScale(15),
        fontSize: Matrics.CountScale(18)
    },
    imgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(10),
        tintColor: 'white'
        //alignSelf: 'flex-start'
    },
    profileImgStyle: {
        height: Matrics.CountScale(100),
        margin: Matrics.CountScale(15),
        width: Matrics.CountScale(100),
        borderRadius: Matrics.CountScale(50)
    },
    nameTextStyle: {
        margin: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(18),
        color: Colors.WHITE
    },
    yearTextStyle: {
        margin: Matrics.CountScale(5),
        color: Colors.WHITE,
        fontSize: Matrics.CountScale(14)
    },
    positionTextStyle: {
        margin: Matrics.CountScale(5),
        marginBottom: Matrics.CountScale(20),
        color: Colors.WHITE,
        fontSize: Matrics.CountScale(14)
    }
}
const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        data: state.DashboardEmployee,
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getEmployeePersonalDetails,
    updateEmployeePersonalDetails,
    getEmployeeBasicDetails
})(Profile);
