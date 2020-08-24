//LIBRARIES
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

//ASSETS
import { Colors, Fonts, Matrics, Images } from '@Assets'


//====CLASS DECLARATION====//
class Congrats extends React.Component {

    

  //----------->>>Render Method-------------->>>
    render() {
        return (
            <View style = { Styles.msgBox }>
                <Image style = { Styles.capIconStyle } source = { Images.CapIcon } />
                <Text style = { Styles.msgText }>Congrats! Your password has</Text>
                <Text style = { Styles.msgText }>been reset.</Text>
                <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Login') } }>
                    <Text style = { Styles.okText }>
                        OK
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//======STYLES DECLARATION======//

const Styles = StyleSheet.create({
  msgBox: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.WHITE
  },
  capIconStyle: {
    height: Matrics.CountScale(55),
    width:Matrics.CountScale(38),
    marginBottom: Matrics.CountScale(25)
  },
  msgText: {
    alignSelf: "center",
    fontWeight:'400',
    color: Colors.DARK_GREY,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontSize: Matrics.CountScale(22)
  },
  okText: {
    color: Colors.APPTEXTCOLOR,
    fontFamily: Fonts.NunitoSansSemiBold,
    fontSize: Matrics.CountScale(22),
    padding: Matrics.CountScale(30)
  }
});

export default Congrats;