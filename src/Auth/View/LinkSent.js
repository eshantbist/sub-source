//LIBRARIES
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
//ASSETS
import { Colors, Fonts, Images, Matrics } from '@Assets'

//====CLASS DECLARATION====//
class LinkSent extends React.Component {


  //----------->>>Render Method-------------->>>
  render() {
    return (
      <View style={Styles.msgBox}>
        <Image
          style={Styles.ImageStyle}
          source={Images.MessageIcon}
        />
        <Text style={Styles.msgText}>The link to restore password has</Text>
        <Text style={Styles.msgText}>been sent to your email.</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("ConfirmPassword");
          }}
        >
          <Text style={Styles.okText}>OK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//======STYLES DECLARATION======//
const Styles = {
  msgBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  ImageStyle: {
    height: Matrics.CountScale(30),
    width: Matrics.CountScale(65),
    marginBottom: Matrics.CountScale(25),
  },
  msgText: {
    alignSelf: "center",
    color: Colors.DARK_GREY,
    fontWeight:'400',
    fontFamily: Fonts.NunitoSansSemiBold,
    fontSize: Matrics.CountScale(20)
  },
  okText: {
    fontWeight:'400',
    color: Colors.APPTEXTCOLOR,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontSize: Matrics.CountScale(22),
    padding: Matrics.CountScale(30)
  }
};

export default LinkSent;
