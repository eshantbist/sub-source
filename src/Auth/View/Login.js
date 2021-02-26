//LIBRARIES
import React from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';


//ASSETS
import { Colors, Fonts, Matrics, Images } from '@Assets'
import { TextInputView, LoadWheel, Button, CustomModal } from "@Components";
import { loginRequest } from '@Redux/Actions/AuthActions'


//============CLASS DECLARATION============//

class Login extends React.Component {


    //--------->>>State Initilization----------->>>
    state = {
        username: '',
        password: '',
        loading: false,
        errorUserName: '',
        errorPassword: '',
        modalVisible: false
    };

    //------------>>>LifeCycle Methods------------->>>
    constructor(props) {
        super(props)

    }
    UNSAFE_componentWillMount() {
        console.log(this.props);

    }


    componentWillUnmount() { }

    navigateToScreen(route) {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(navigateAction);
    }



    async UNSAFE_componentWillReceiveProps(nextProps) {
        clearTimeout(this.state.clearId)
        if (nextProps.auth.loginSuccess && this.state.loading) {
            this.setState({ loading: false })
            const { data } = nextProps.auth

            if (data.access_token) {
                AsyncStorage.setItem('tokenDetails', JSON.stringify(data));
                AsyncStorage.setItem('login', 'true');

                let res = JSON.parse(data.LoginObject);
                AsyncStorage.setItem('AuthToken', data.access_token)
               
                
                global.user = data;
                global.loginResponse = JSON.parse(data.LoginObject).Login //userDetails.LoginObject.Login

                if(global.loginResponse.UserGUID === null && isNaN(global.loginResponse.UserName)){
                    console.log('manager')
                    AsyncStorage.setItem('subsourceModule', 'Manager')
                    this.navigateToScreen('TabBar')
                } else if(global.loginResponse.UserGUID !== null) {
                    console.log('employee-->', res.Login)
                    AsyncStorage.setItem('subsourceModule', 'Employee')
                    AsyncStorage.setItem('UserID', res.Login.UserID.toString())
                    AsyncStorage.setItem('UserGUID', res.Login.UserGUID)
                    AsyncStorage.setItem('UserStoreGuid', res.Login.UserStoreGuid)
                    this.navigateToScreen('EmpTabBar')
                }
            }
            else {
                this.setState({ loading: false, modalVisible: true })
            }
        }
        else if (nextProps.auth.isRequestFailed && this.state.loading) {
            this.setState({ loading: false, modalVisible: true })
        }
    }


    //------------->>>Controllers/Functions------------>>>>


    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
            let ref = this[name];

            if (ref && ref.isFocused()) {
                delete errors[name];
            }
        }

        this.setState({ errors });
    }


    onLoginSubmit() {
        if (this.state.username != '' && this.state.password != '') {
            this.props.loginRequest({ grant_type: 'password', username: this.state.username.trim(), password: this.state.password.trim(), module: 'admin' })
            this.setState({ loading: true })
        }
        else {
            if (this.state.username == '') {
                this.setState({ loading: false, errorUserName: 'UserID cannot be left blank.' })
            }
            if (this.state.password == '') {
                this.setState({ loading: false, errorPassword: 'Password cannot be left blank.' })
            }
        }
    }
    //----------->>>Render Method-------------->>>

    render() {
        return (
            // <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={Styles.loginBox1} enableOnAndroid={true}>
            <View style={Styles.loginBox}>
                <Image 
                    source={Images.Logo}
                    style={Styles.logoImage}
                />
                <View style={Styles.inputBox}>
                    <TextInputView
                        label="UserID"
                        fontSize={18}
                        value={this.state.username}
                        returnKeyType={"next"}
                        onChangeText={val => this.setState({ username: val, errorUserName: '' })}
                        error={this.state.errorUserName}
                    />
                    <TextInputView
                        label="Password"
                        value={this.state.password}
                        secureTextEntry
                        returnKeyType={"done"}
                        fontSize={18}
                        refField={componentRef => (this.Password = componentRef)}
                        onChangeText={val => this.setState({ password: val, errorPassword: '' })}
                        containerStyle={Styles.Input}
                        error={this.state.errorPassword}

                    />
                </View>

                <View style={Styles.buttonView}>
                    <Button
                        onPress={() =>
                            this.onLoginSubmit()
                        }
                        title="Log In"
                    />

                </View>

                <TouchableOpacity style={Styles.resetView} 
                    onPress={() => { 
                        this.setState({ errorPassword: '', errorUserName: ''})
                        this.props.navigation.navigate("ResetPassword") 
                    }}
                >
                    <Text style={Styles.resetText}>Can't access your account?</Text>
                    {/* <Text style={{ justifyContent: 'center', alignSelf: 'center', fontSize: 18 ,color:Colors.APPTEXTCOLOR}}></Text> */}
                </TouchableOpacity>
                <LoadWheel onOkPress={() => console.log('press ok')
                } visible={this.state.loading} onRequestClose={() => this.setState({ loading: false })} />

                <CustomModal
                    onPress={() => this.setState({ modalVisible: false })}
                    visible={this.state.modalVisible}
                    title={'Invalid UserId or Password'}
                    ButtonText={'OK'}
                />
            </View >
        );
    }



}

//=======>>>>>>>>>  Styles for Modal <<<<<<<<=========
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
    }
})


//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
    loginBox: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    loginBox1: {
        flex: 1,
        backgroundColor: 'white',
    },
    logoImage: {
        alignSelf: 'center',
        height: Matrics.CountScale(100),
        width: Matrics.CountScale(100),
        marginBottom: Matrics.CountScale(20),
    },
    inputBox: {
        marginHorizontal: Matrics.CountScale(20),
        marginBottom: Matrics.CountScale(20),
    },
    Input: {
        marginTop: Matrics.CountScale(60),
    },
    buttonView: {
        marginTop: Matrics.CountScale(70),
    },
    resetView: {
        top: Matrics.CountScale(20),
    },
    resetText: {
        alignSelf: 'center',
        color: Colors.APPTEXTCOLOR,
        fontFamily: Fonts.NunitoSansRegular,
        fontSize: Matrics.CountScale(17),
        justifyContent: 'center'
    }
});

//Props Connection
const mapStateToProps = (state) => {
    return {
        auth: state.Auth,
    };
} 
export default connect(mapStateToProps, { loginRequest })(Login);

