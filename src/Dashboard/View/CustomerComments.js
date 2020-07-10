import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import moment from "moment";

import { Colors, Fonts, Matrics, Images, MasterCss } from '@Assets'

export default class CustomerComments extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        headerTitle: 'Customer Comments',
        headerTitleStyle: MasterCss.headerTitleStyle,
        headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }} >
                <Image source={Images.BackIcon} style={MasterCss.headerIconStyle} />
            </TouchableOpacity>,
        headerRight:
            <View />
    })

    state = {
        cunsomerComments: []
    }

    UNSAFE_componentWillMount() {
        console.log(this.props.navigation.state.params.commentsData)
        this.setState({ cunsomerComments: this.props.navigation.state.params.commentsData })
    }

    renderCustomerComments = ({ item }) => {
        return (
            <View style={Styles.commentContainerStyle}>
                <View style={Styles.bottomBorderStyle}>
                    <Text style={[Styles.labelText, { color: Colors.PARROT }]}>{item.DisplayStoreNumber} - <Text style={Styles.labelText}>{moment(item.VisitTimeStamp).format('DD.MM.YYYY, hh:mm a')}</Text></Text>

                </View>
                <Text style={Styles.commentTextStyle}>{item.Comments}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={Styles.pageContainer}>
                <FlatList
                    data={this.state.cunsomerComments}
                    renderItem={this.renderCustomerComments}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        marginVertical: Matrics.CountScale(5),
        // justifyContent: "center",
        // backgroundColor: Colors.WHITE
    },
    commentContainerStyle: {
        marginVertical: Matrics.CountScale(5),
        marginHorizontal: Matrics.CountScale(10),
        padding: Matrics.CountScale(10),
        borderRadius: Matrics.CountScale(5),
        backgroundColor: 'white'
    },
    commentTextStyle: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular,
        marginTop: Matrics.CountScale(5),
    },
    labelText: {
        fontSize: Matrics.CountScale(16),
        fontFamily: Fonts.NunitoSansRegular,
        color: Colors.GREY,
        margin: Matrics.CountScale(3),
    },
    bottomBorderStyle: {
        borderColor: Colors.BORDERCOLOR,
        borderBottomWidth: 2,
        paddingBottom: Matrics.CountScale(5)
    },
});
