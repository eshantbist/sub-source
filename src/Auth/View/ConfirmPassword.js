//LIBRARIES
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from 'react-redux';
//ASSETS
import { Colors, Fonts, Matrics } from '@Assets'
import { TextInputView, Button, LoadWheel } from "@Components";
import { ChangePasswordRequest } from '@Redux/Actions/AuthActions'

//====CLASS DECLARATION====//
class ConfirmPassword extends React.Component {


  //--------->>>State Initilization----------->>>
  state = {
    password: "",
    repeatPassword: "",
    PasswordError: "",
    repeatPasswordError: "",
    loading: false,
  };

  //------------>>>LifeCycle Methods------------->>>

  componentWillMount() { }

  async componentWillReceiveProps(nextProps) {
    if(nextProps.auth.changePasswordSuccess && this.state.loading) {
      this.setState({ loading: false })
      const { data } = nextProps.auth
      console.log('data-->', data);
      if(data.Status === 1) {
        this.props.navigation.navigate("Congrats")
      } else {
        Alert.alert(
          '',
          data.Message,
          [
              { text: 'OK', onPress: () => this.setState({ timingModal: false }) },
          ],
          { cancelable: false },
        );
      }
    }
  }

  componentWillUnmount() { }


  //------------->>>Controllers/Functions------------>>>>

  onRsetPassword(){
    // navigation.navigate("Congrats")
    if (this.state.password == '') {
      this.setState({ PasswordError: "Please Enter The Password" })
    } else if(this.state.repeatPassword == '') {
      this.setState({ repeatPasswordError: "Please Enter The RepeatPassword" })
    } else {
      this.setState({ loading: true });
      this.props.ChangePasswordRequest({ PassKey: this.state.password, NewPassKey: this.state.repeatPassword, ConfirmPassKey: this.state.repeatPassword })
    }
  }


  //----------->>>Render Method-------------->>>

  render() {
    const { navigation } = this.props;
    return (
      <View style={Styles.pageContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'handled'} contentContainerStyle={Styles.pageContainer} enableOnAndroid={true}>
          <View style={Styles.textView}>
            <Text style={Styles.msgText}>Please enter your new password</Text>
          </View>
          <View style={Styles.inputBox}>
             <TextInputView
              label="Password"
              fontSize={18}
              value={this.state.password}
              returnKeyType={"done"}
              secureTextEntry={true}
              clearButtonMode={'while-editing'}
              onChangeText={val => this.setState({ password: val, PasswordError: '' })}
              containerStyle={Styles.PasswordInput}
              error={this.state.PasswordError}
            />
          </View>
          <View style={Styles.inputBox} >
            <TextInputView
              label="Repeat Password"
              fontSize={18}
              value={this.state.repeatPassword}
              returnKeyType={"done"}
              secureTextEntry={true}
              clearButtonMode={'while-editing'}
              onChangeText={val => this.setState({ repeatPassword: val, repeatPasswordError: '' })}
              containerStyle={Styles.PasswordInput}
              error={this.state.repeatPasswordError}
            />
          </View>

          <View style={Styles.buttonView}>
            <Button
              onPress={() => this.onRsetPassword()}
              title="Reset Password"
            />
          </View>

          <TouchableOpacity style={Styles.cancelView} onPress={() => { navigation.popToTop() }}>
            <Text style={Styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <LoadWheel visible={this.state.loading} />
      </View>
    );
  }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.WHITE
  },
  inputBox: {
    marginLeft: Matrics.CountScale(20),
    marginRight: Matrics.CountScale(20),
    marginBottom: Matrics.CountScale(30)
  },
  // inputBox: {
  //   marginHorizontal: Matrics.CountScale(20)
  // },
  PasswordInput: {
    marginTop: Matrics.CountScale(60)
  },
  buttonView: {
    marginTop: Matrics.CountScale(70)
  },
  msgText: {
    color: Colors.DARK_GREY,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontSize: Matrics.CountScale(22),
    fontWeight:'400'
  },
  textView: {
    alignItems: "center",
    marginBottom: Matrics.CountScale(60)
  },
  cancelText: {
    alignSelf: "center",
    color: Colors.APPCOLOR,
    fontFamily: Fonts.NunitoSansRegular,
    fontSize: Matrics.CountScale(22),
    justifyContent: "center"
  },
  cancelView: {
    marginTop: Matrics.CountScale(20),
    alignSelf: "center"
  },
  errormsg: {
    color: Colors.RED,
    fontFamily: Fonts.NunitoSansRegular,
    fontSize: Matrics.CountScale(16),
    marginTop: Matrics.CountScale(10),
    marginHorizontal: Matrics.CountScale(10),
  },
});

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
  };
}

export default connect(mapStateToProps, { ChangePasswordRequest })(ConfirmPassword);

