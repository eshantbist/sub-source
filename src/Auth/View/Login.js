//LIBRARIES
import React from 'react';
import { View, ScrollView, AsyncStorage, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation'


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
        console.log('will receive propos call')
        clearTimeout(this.state.clearId)
        if (nextProps.auth.loginSuccess && this.state.loading) {
            this.setState({ loading: false })
            const { data } = nextProps.auth

            if (data.access_token) {
                AsyncStorage.setItem('tokenDetails', JSON.stringify(data));
                AsyncStorage.setItem('login', 'true')

                global.user = data;
                global.loginResponse = JSON.parse(data.LoginObject).Login //userDetails.LoginObject.Login

                this.navigateToScreen('TabBar')


                // if (UserDetails) {
                //     global.user = JSON.parse(UserDetails);
                //     userDetails = JSON.parse(UserDetails);
                //     global.loginResponse = JSON.parse(userDetails.LoginObject).Login
                //     expireDate = Object.keys(global.user)[5]
                //     date = new Date
                //     // date = new Date('Wed Oct 17 2018 21:49:00 GMT+0530 (India Standard Time)')
                //     exDate = new Date(global.user[expireDate])
                //     // exDate = new Date('Wed Oct 18 2018 21:49:00 GMT+0530 (India Standard Time)')
                //     if (date.getTime() > exDate.getTime()) {
                //         AsyncStorage.removeItem('login');
                //         this.navigateToScreen('Login')
                //     }

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
        // this.props.navigation.navigate('Dashboard')
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

                <TouchableOpacity style={Styles.resetView} onPress={() => { this.props.navigation.navigate("ResetPassword") }}>
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
        // justifyContent: 'center',
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
        // backgroundColor: 'red'
    },
    resetText: {
        alignSelf: 'center',
        color: Colors.APPTEXTCOLOR,
        fontFamily: Fonts.NunitoSansRegular,
        // fontWeight: '200',
        fontSize: Matrics.CountScale(17),
        justifyContent: 'center'
    }
});

//Props Connection
const mapStateToProps = (state) => {
    console.log(state, "sstates");

    return {
        auth: state.Auth,
    };
}
//Redux Connection  
export default connect(mapStateToProps, { loginRequest })(Login);

