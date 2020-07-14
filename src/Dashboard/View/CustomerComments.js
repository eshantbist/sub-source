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
        const commentsData = this.props.navigation.state.params.commentsData;
        var sortBy = (function () {
            var toString = Object.prototype.toString,
                // default parser function
                parse = function (x) { return x; },
                // gets the item to be sorted
                getItem = function (x) {
                  var isObject = x != null && typeof x === "object";
                  var isProp = isObject && this.prop in x;
                  return this.parser(isProp ? x[this.prop] : x);
                };
            return function sortby (array, cfg) {
              if (!(array instanceof Array && array.length)) return [];
              if (toString.call(cfg) !== "[object Object]") cfg = {};
              if (typeof cfg.parser !== "function") cfg.parser = parse;
              cfg.desc = !!cfg.desc ? -1 : 1;
              return array.sort(function (a, b) {
                a = getItem.call(cfg, a);
                b = getItem.call(cfg, b);
                return cfg.desc * (a < b ? -1 : +(a > b));
              });
            };
        }());
        let sortedcommentsData = [];
        if(commentsData != ''){
            sortedcommentsData = sortBy(commentsData, {
                prop: "VisitTimeStamp",
                desc: true,
                parser: function(item) { return new Date(item); }
            });
        }
        this.setState({ cunsomerComments: sortedcommentsData })
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
