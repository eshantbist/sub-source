{/* ====>>>>>>>>>>>   Libraries   <<<<<<<<<<========== */ }
import React from 'react';
import { View, ScrollView, StatusBar, ImageBackground, StyleSheet, Modal, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';

{/* ====>>>>>>>>>>>    Assets   <<<<<<<<<<========== */ }
import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'
import { TextInputView, Button, ResignModal } from "@Components";
import { getEmployeeBasicDetails, getEmployeePersonalDetails } from '../../../Redux/Actions/DashboardActions';
import { LoadWheel } from "@Components";
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
        loading: true,
        homephone: '',
        name: '',
        modalVisible: false,
        Profile: '',
        coverPhoto: '',
        Position: '',
    }
    UNSAFE_componentWillMount() {
        this.props.getEmployeePersonalDetails({
            UserStoreGuid: '96E4C851-DBC4-466F-B2A6-618113D6E3E5'
        })
        this.props.getEmployeeBasicDetails({
            UserStoreGuid: '96E4C851-DBC4-466F-B2A6-618113D6E3E5'
        })

    }
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log('nextProps-->',nextProps)
        if (nextProps.data.getEmployeeBasicDetailSuccess) {
            if(nextProps.data.data.Status === 1) {
                const basicData = nextProps.data.data.Data
                this.setState({
                    Position: basicData.Position,
                    Experience: basicData.Experience,
                    UserGUID: basicData.UserGUID
                })
            }
        }
        if (nextProps.data.getEmployeePersonalDetailSuccess) {
            if(nextProps.data.data.Status === 1) {
                const data = nextProps.data.data.Data
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
                    loading: false,
                    name: data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName,
                    Position: data.Position,
                })
            } else {
                this.setState({ loading: false });
            }
        }
    }
    navToEdit() {
        let arr = {
            university: this.state.university,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            Profile: this.state.Profile,
            coverPhoto: this.state.coverPhoto,
            state: this.state.state,
            zip: this.state.zip,
            email: this.state.email,
            cellphone: this.state.cellphone,
            homephone: this.state.homephone,
            name: this.state.name,
            Position: this.state.Position,
            Experience: this.state.Experience,
            UserGUID: this.state.UserGUID,
        }
        this.props.navigation.navigate('EditProfile', { profileData: arr })
    }
    render() {
        console.log('coverphoto-->', this.state.coverPhoto)
        console.log('Profile-->', this.state.Profile)
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={Styles.pageBody}>
                    <StatusBar barStyle="light-content"></StatusBar>

                    {/* ====>>>>>>>>>>>    Profile Image Container   <<<<<<<<<<========== */}
                    <ImageBackground
                        blurRadius={3}
                        source={this.state.coverPhoto && { uri: this.state.coverPhoto }}
                        style={{ flex: 2, backgroundColor: 'black' }}
                    >
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                            <View style={[MasterCss.headerContainer, MasterCss.headerStyle, { backgroundColor: 'transparent' }]}>

                                <View style={[MasterCss.headerTextIconStyle, { alignItems: 'flex-start' }]}>
                                    <TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
                                        <Image style={MasterCss.headerIconStyle} source={Images.WhiteBackIcon}></Image>
                                    </TouchableOpacity>
                                </View>
                                <View style={MasterCss.centerStyle}>
                                    <Text style={[MasterCss.centerTextStyle, { color: Colors.WHITE }]}>{this.state.name ? `@${this.state.name}` : null}</Text>
                                </View>
                                <TouchableOpacity style={MasterCss.headerTextContainerStyle} onPress={() => this.navToEdit()}>
                                    <Text style={[MasterCss.headerRightTextStyle, { color: 'white' }]} >Edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={Styles.profileImgContainer}>
                                <Image style={Styles.profileImgStyle}
                                    source={ this.state.Profile ? { uri: this.state.Profile } : Images.ProfileIconPlaceholder}></Image>
                                <Text style={Styles.nameTextStyle}>
                                    {this.state.name}
                                </Text>
                                <Text style={Styles.yearTextStyle}>
                                    {this.state.Experience ? `${this.state.Experience} months` : null}
                                </Text>
                                <Text style={Styles.positionTextStyle}>
                                    {this.state.Position}
                                </Text>
                            </View>

                        </View>
                    </ImageBackground>

                    {this.renderPageContent()}

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

                </ScrollView>
                <LoadWheel visible={this.state.loading} />
            </View>
        );
    }
    //   ====>>>>>>>>>>>    User Details Content   <<<<<<<<<<========== 
    renderPageContent() {
        return (
            <ScrollView style={{ paddingTop: Matrics.CountScale(10), backgroundColor: Colors.WHITE }}>

                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="University of Subway"
                        value={this.state.university}
                        labelFontSize={15}
                        fontSize={18}
                        onChangeText={val => this.setState({ university: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
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
                        onChangeText={val => this.setState({ homephone: val })}
                        containerStyle={Styles.Input}
                    />
                </View>

                <View style={Styles.inputBox}>
                    <TextInputView
                        editable={false}
                        label="Emergency contact name"
                        labelFontSize={15}
                        fontSize={18}
                        value={this.state.name}
                        onChangeText={val => this.setState({ name: val })}
                        containerStyle={Styles.Input}
                    />
                </View>
                <View style={Styles.logoutEmpContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            AsyncStorage.clear();
                            // this.props.navigation.navigate('Login')
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Login' })],
                            });
                            this.props.navigation.dispatch(resetAction)
                        }}
                        style={{ borderBottomColor: Colors.LIGHTGREY, borderBottomWidth: 1 }}>
                        <Text style={Styles.logoutText}>
                            Logout
                    </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        );
    }
}

//   ====>>>>>>>>>>>    StyleSheet for Profile Container  <<<<<<<<<<========== 
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
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
    logoutEmpContainer: {
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
        fontSize: Matrics.CountScale(17)
    },
    imgStyle: {
        height: Matrics.CountScale(20),
        width: Matrics.CountScale(10)
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
        data: state.Dashboard,
    };
}

//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getEmployeePersonalDetails,
    // updateEmployeePersonalDetails,
    getEmployeeBasicDetails
})(Profile);
// export default connect(mapStateToProps, null)(Profile);
