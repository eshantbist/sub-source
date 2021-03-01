//  ====>>>>>>>>>>> Libraries <<<<<<<<<<==========> 
import React from 'react';
import { View, StatusBar, ScrollView, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from "react-native-image-crop-picker";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage';

//  ====>>>>>>>>>>> Assets <<<<<<<<<<==========> 
import { Colors, Fonts, Matrics, Images, MasterCssEmployee } from '@Assets'
import { TextInputView, LoadWheel, ImagePickerModal } from "@Components";
import { getEmployeePersonalDetails, updateEmployeePersonalDetails } from '@Redux/Actions/DashboardEmployeeActions'
import Global from '../../../GlobalFunction'

//  ====>>>>>>>>>>> Header start <<<<<<<<<<==========> 
class EditProfileEmployee extends React.Component {
    state = {
        firstName: '',
        middleName: '',
        lastName: '',
        university: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        email: '',
        cellphone: '',
        homephone: '',
        name: '',
        loading: true,
        coverPhoto: '',
        profilePic: '',
        emergencyNumber: '',
        emergencyName: '',
        countryId: 0,
        stateId: 0,
        loading: false,
        profileImage: {},
        imagePickerModal: false,
    }
    UNSAFE_componentWillMount() {
        console.log(this.props.navigation.state.params.Data)
        const { Address1
            , Address2
            , CellPhone
            , City
            , CountryID
            , CoverPhoto
            , Email
            , EmergencyContactName
            , EmergencyContactNumber
            , FirstName
            , HomePhone
            , LastName
            , MiddleName
            , Position
            , ProfilePicture
            , SaltKey
            , SaltKeyIV
            , State
            , StateID
            , UserStoreGuid
            , ZipCode } = this.props.navigation.state.params.Data
        this.setState({
            university: 'University of ' + State,
            address1: Address1,
            address2: Address2,
            city: City,
            coverPhoto: CoverPhoto,
            profilePic: ProfilePicture,
            state: State,
            zip: ZipCode,
            email: Email,
            cellphone: CellPhone,
            homephone: HomePhone,
            countryId: CountryID,
            stateId: StateID,
            emergencyNumber: EmergencyContactNumber,
            emergencyName: EmergencyContactName,
            name: FirstName + ' ' + MiddleName + ' ' + LastName,
            firstName: FirstName,
            middleName: MiddleName,
            lastName: LastName
        })
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.data.updateEmployeePersonalDetailsSuccess && this.state.loading) {
            await this.setState({ loading: false })
            console.log(nextProps.data.employeePersonalDetailsdata)
            let response = nextProps.data.updateEmployeePersonalDetailsdata
            console.log(response)
            if (response.Status == 1) {
                this.props.navigation.goBack()
                this.props.navigation.state.params.updateInfo()
            }
            else {
                setTimeout(() => { alert(response.Message) }, Global.alert_timeout)

            }
        }
        else if (nextProps.data.updateEmployeePersonalDetailsFail && this.state.loading) {
            this.setState({ loading: false })
            setTimeout(() => { alert(Global.error_msg) }, Global.alert_timeout)
        }
    }

    onPressGallery() {
        this.setState({ imagePickerModal: false })
        setTimeout(() => { this.ChoosePhoto() }, 500)
    }

    onPressCamera() {
        this.setState({ imagePickerModal: false })
        setTimeout(() => { this.TakePhoto() }, 500)
    }


    TakePhoto() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true
        }).then(image => {
            let imgdata = {
                uri: image.path,
                type: image.mime,
                name: image.filename == null ? "IMG1.jpg" : image.filename,
                data: image.data
            };
            this.setState({ profileImage: imgdata });
        });
    }

    ChoosePhoto() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            includeBase64: true,
            cropping: true
        }).then(image => {
            console.log('image-->', image)
            let imgdata = {
                uri: image.path,
                type: image.mime,
                name: image.filename == null ? "IMG1.jpg" : image.filename,
                data: image.data
            };
            this.setState({ profileImage: imgdata });
        });
    }

    // AttachFileAlert() {
    //     return (
    //         Alert.alert(
    //             'Attach Image',
    //             'Choose from gallery or take a photo.',
    //             [
    //                 { text: 'Choose Image', onPress: () => this.ChoosePhoto() },
    //                 { text: 'Take Photo', onPress: () => this.TakePhoto() },
    //             ],
    //             // { cancelable: false }
    //         )
    //     )
    // }

    async onEditProfile() {

        //var phoneNo = ('' + this.state.phone).replace(/\D/g, '')

        await this.setState({
            firstName: this.state.firstName.trim(), lastName: this.state.lastName.trim(),
            middleName: this.state.middleName.trim(),
            name: this.state.name.trim(), address1: this.state.address1.trim(),
            address2: this.state.address2.trim(), city: this.state.city.trim(),
            state: this.state.state.trim(), zip: this.state.zip.trim(),
            email: this.state.email.trim(), university: this.state.university.trim(),
            cellphone: this.state.cellphone.trim(), homephone: this.state.homephone.trim(),
            emergencyName: this.state.emergencyName.trim(), emergencyNumber: this.state.emergencyNumber.trim()
        })

        if (this.state.address1 == '') {
            alert('Please enter value for Address 1')
        }
        else if (this.state.address1 == '') {
            alert('Please enter value for Address 1')
        }
        else if (this.state.city == '') {
            alert('Please enter value for city')
        }
        else if (this.state.state == '') {
            alert('Please enter value for state')
        }
        else if (this.state.zip == '') {
            alert('Please enter value for Zip code')
        }
        else if (this.state.email == '') {
            alert('Please enter value for Email')
        }
        else if (this.state.cellphone == '') {
            alert('Please enter value for Cellphone')
        }
        else if (!Global.validateEmail(this.state.email)) {
            alert('Please Enter valid email')
        }
        else {
            userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
            this.setState({ loading: true })
            //this.props.updateEmployeePersonalDetails({  })
            this.props.updateEmployeePersonalDetails({
                // imageParams: Object.keys(this.state.profileImage).length == 0 ? {} : { UserStoreGuid: userStoreGuid, Image: this.state.profileImage.data, ImageTypeID: 1 },
                imageParams: Object.keys(this.state.profileImage).length == 0 ? {} : {Image: 'data:image/jpeg;base64,'+this.state.profileImage.data, ImageTypeID: 1 },
                detailsParams: {
                    UserStoreGuid: userStoreGuid,
                    FirstName: this.state.firstName,
                    MiddleName: this.state.middleName,
                    LastName: this.state.lastName,
                    Address1: this.state.address1,
                    Address2: this.state.address2,
                    City: this.state.city,
                    ZipCode: this.state.zip,
                    CellPhone: this.state.cellphone,
                    HomePhone: this.state.homephone,
                    Email: this.state.email,
                    CountryID: this.state.countryId,
                    StateID: this.state.stateId,
                    EmergencyContactName: this.state.emergencyName,
                    EmergencyContactNumber: this.state.emergencyNumber
                }
            })
        }
    }

    render() {
        return (
            <View style={Styles.pageBody}>
                {/* <StatusBar barStyle="dark-content"></StatusBar> */}

                {/* ====>>>>>>>>>>> Header start <<<<<<<<<<==========> */}
                <View style={MasterCssEmployee.headerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerLeftTextStyle} >Cancel</Text>
                    </TouchableOpacity>
                    <View style={MasterCssEmployee.centerStyle}>

                    </View>
                    <TouchableOpacity onPress={() => { this.onEditProfile() }}
                        style={MasterCssEmployee.headerTextContainerStyle}>
                        <Text style={MasterCssEmployee.headerRightTextStyle}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* ====>>>>>>>>>>> Header End <<<<<<<<<<==========> */}

                {this.renderPageContent()}
                <ImagePickerModal visible={this.state.imagePickerModal}
                    onPressCamera={() => this.onPressCamera()}
                    onPressGallery={() => this.onPressGallery()}
                    onPressCancel={() => this.setState({ imagePickerModal: false })}
                />
            </View>
        );
    }


    //    ==========>>>>>  Page Container Starts Here <<<<<<<======== 

    renderPageContent() {
        return (
            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView style={{ backgroundColor: Colors.WHITE }}>
                    <View style={Styles.profileImgStyle}>

                        <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                            {Object.keys(this.state.profileImage).length == 0 ?
                                <Image style={Styles.profileImageStyle}
                                    source={this.state.profilePic != '' ? { uri: this.state.profilePic } : Images.ProfileIconPlaceholder}></Image>
                                :
                                <Image source={{ uri: this.state.profileImage.uri }} style={Styles.profileImageStyle} />
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ imagePickerModal: true })}>
                            <Text style={{ color: Colors.APPCOLOR, padding: Matrics.CountScale(5), fontSize: Matrics.CountScale(15), fontFamily: Fonts.NunitoSansRegular }}>Change Profile Picture</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="First name"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.firstName}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ firstName: val })}
                            onSubmitEditing={(event) => this.middleName.focus()}
                            containerStyle={Styles.Input}
                            editable={false}
                            textColor={Colors.DARK_GREY}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Middle Name"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.middleName}
                            refField={(r) => { this.middleName = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ middleName: val })}
                            onSubmitEditing={(event) => this.lastName.focus()}
                            containerStyle={Styles.Input}
                            editable={false}
                            textColor={Colors.DARK_GREY}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Last Name"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.lastName}
                            refField={(r) => { this.lastName = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ lastName: val })}
                            onSubmitEditing={(event) => this.address1.focus()}
                            containerStyle={Styles.Input}
                            editable={false}
                            textColor={Colors.DARK_GREY}
                        />
                    </View>

                    {/* <View style={Styles.inputBox}>
                        <TextInputView
                            label="Nickname"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.name}
                            refField={(r) => { this.name = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ name: val })}
                            onSubmitEditing={(event) => this.address1.focus()}
                            containerStyle={Styles.Input}
                            editable={false}
                            textColor={Colors.DARK_GREY}
                        />
                    </View> */}
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Address1"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.address1}
                            refField={(r) => { this.address1 = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ address1: val })}
                            onSubmitEditing={(event) => this.address2.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Address2"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.address2}
                            refField={(r) => { this.address2 = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ address2: val })}
                            onSubmitEditing={(event) => this.city.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="City"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.city}
                            refField={(r) => { this.city = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ city: val })}
                            onSubmitEditing={(event) => this.stateName.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="State"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.state}
                            refField={(r) => { this.stateName = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ state: val })}
                            onSubmitEditing={(event) => this.zip.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Zip"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.zip}
                            refField={(r) => { this.zip = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ zip: val })}
                            onSubmitEditing={(event) => this.email.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Email"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.email}
                            refField={(r) => { this.email = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ email: val })}
                            onSubmitEditing={(event) => this.university.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>

                    {/* <View style={Styles.inputBox}>
                        <TextInputView
                            label="University of Subway"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.university}
                            refField={(r) => { this.university = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ university: val })}
                            onSubmitEditing={(event) => this.cellphone.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View> */}
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Cell Phone"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.cellphone}
                            refField={(r) => { this.cellphone = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ cellphone: Global.phoneNoFormat(val) })}
                            onSubmitEditing={(event) => this.homephone.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Home Phone"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.homephone}
                            refField={(r) => { this.homephone = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ homephone: Global.phoneNoFormat(val) })}
                            onSubmitEditing={(event) => this.emergencyName.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>

                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Emergency contact name"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.emergencyName}
                            refField={(r) => { this.emergencyName = r; }}
                            returnKeyType={'next'}
                            onChangeText={val => this.setState({ emergencyName: val })}
                            onSubmitEditing={(event) => this.emergencyNumber.focus()}
                            containerStyle={Styles.Input}
                        />
                    </View>
                    <View style={Styles.inputBox}>
                        <TextInputView
                            label="Emergency contact number"
                            labelFontSize={15}
                            fontSize={18}
                            value={this.state.emergencyNumber}
                            refField={(r) => { this.emergencyNumber = r; }}
                            returnKeyType={'done'}
                            onChangeText={val => this.setState({ emergencyNumber: Global.phoneNoFormat(val) })}
                            containerStyle={Styles.Input}
                        />
                    </View>

                </KeyboardAwareScrollView>
                <LoadWheel visible={this.state.loading} />
            </View>
        );
    }
}
{/* ==========>>>>>  Styles For Page <<<<<<<======== */ }
const Styles = {
    pageBody: {
        flex: 1, backgroundColor: Colors.BODYBACKGROUND
    },
    inputBox: {
        marginLeft: Matrics.CountScale(15),
        marginRight: Matrics.CountScale(15),
        margin: Matrics.CountScale(5)
    },
    profileImgStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: Matrics.CountScale(20)
    },
    profileImageStyle: {
        height: Matrics.CountScale(100),
        width: Matrics.CountScale(100),
        borderRadius: Matrics.CountScale(50)
    },
    disableTextStyle: {
        color: 'red'
    }
}
// export default EditProfile;
const mapStateToProps = (state) => {
    return {
        data: state.DashboardEmployee,
    };
}
//======>>>>>>>> Redux Connection <<<<<<=======  
export default connect(mapStateToProps, {
    getEmployeePersonalDetails,
    updateEmployeePersonalDetails
})(EditProfileEmployee);
