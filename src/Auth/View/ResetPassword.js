//LIBRARIES
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from 'react-redux';
//ASSETS
import { Colors, Fonts, Matrics, Images } from '@Assets'
import { TextInputView, Button, LoadWheel } from "@Components";
import { ResetPasswordRequest } from '@Redux/Actions/AuthActions'


//========CLASS DECLARATION========//

class ResetPassword extends React.Component {


  //--------->>>State Initilization----------->>>
  state = {
    userId: '',
    errorMsg: '',
    loading: false,
  };

  //------------>>>LifeCycle Methods------------->>>

  UNSAFE_componentWillMount() { }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps.auth.forgotPasswordSuccess && this.state.loading) {
      this.setState({ loading: false })
      const { data } = nextProps.auth
      if(data.Status === 1) {
        this.props.navigation.navigate("LinkSent")
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

  onResetPassword() {
    if (this.state.userId == '') {
      this.setState({ errorMsg: 'Please Enter The UserID' })
    }
    else {
      this.setState({ loading: true })
      this.props.ResetPasswordRequest({ UserName: this.state.userId, PassMail: '' })
    }
    // this.props.navigation.navigate("LinkSent")
    
  }


  //----------->>>Render Method-------------->>>

  render() {
    return (
      <View style={Styles.loginBox}>
        <KeyboardAwareScrollView contentContainerStyle={Styles.loginBox} enableOnAndroid={true}>
          <View style={Styles.msgBox}>
            <Text style={Styles.msgText}>Enter your UserID</Text>
            <Text style={Styles.msgText}>to reset the password</Text>
          </View>
          <View style={Styles.inputBox}>
            <TextInputView
              label="UserID"
              fontSize={18}
              value={this.state.userId}
              clearButtonMode={'while-editing'}
              onChangeText={val => this.setState({ userId: val, errorMsg: '' })}
              error={this.state.errorMsg}
            />
          </View>
         

          <View style={Styles.buttonView}>
            <Button
              onPress={() => this.onResetPassword()}
              title="Reset Password"
            />
          </View>

          <TouchableOpacity onPress={() => { this.props.navigation.pop() }}>
            <Text style={Styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <LoadWheel visible={this.state.loading} />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  loginBox: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: "center"
  },
  inputBox: {
    marginLeft: Matrics.CountScale(20),
    marginRight: Matrics.CountScale(20),
    marginBottom: Matrics.CountScale(30)
  },
  cancelText: {
    alignSelf: "center",
    color: Colors.APPCOLOR,
    fontFamily: Fonts.NunitoSansRegular,
    top: Matrics.CountScale(20),
    fontSize: Matrics.CountScale(20),
    justifyContent: "center"
  },
  buttonView: {

    marginTop: Matrics.CountScale(40)
  },
  msgText: {
    fontSize: Matrics.CountScale(20),
    alignSelf: "center",
    color: Colors.DARK_GREY,
    fontFamily: Fonts.NunitoSansSemiBold
  },
  msgBox: {
    paddingBottom: Matrics.CountScale(50),
    alignItems: "center"
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

export default connect(mapStateToProps, { ResetPasswordRequest })(ResetPassword);

