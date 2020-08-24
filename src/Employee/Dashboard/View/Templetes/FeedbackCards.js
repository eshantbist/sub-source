{/* ====>>>>>>>>>>>    Libraries  <<<<<<<<<<========== */ }
import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import ViewMoreText from 'react-native-view-more-text';

{/* ====>>>>>>>>>>>    Assets   <<<<<<<<<<========== */ }
import { Colors, Fonts, Matrics, Images } from '@Assets'

{/* ====>>>>>>>>>>>    Class Declaration   <<<<<<<<<<========== */ }
class FeedbackCards extends React.Component {
    renderViewMore(onPress) {
        return (
            <Text style={Styles.ReadMoreTextStyle} onPress={onPress}>Read More</Text>
        )
    }
    renderViewLess(onPress) {
        return (
            <Text style={Styles.ReadMoreTextStyle} onPress={onPress}>Read Less</Text>
        )
    }

    render() {
        return (
            // <ScrollView style={Styles.feedbackCard}>
            <View style={Styles.feedbackCard}>
                <Text style={Styles.dateTextStyle}>
                    {this.props.date}
                </Text>

                <ViewMoreText
                    numberOfLines={4}
                    renderViewMore={this.renderViewMore}
                    renderViewLess={this.renderViewLess}
                >
                    <Text style={Styles.textContainer}>
                        {this.props.content}
                    </Text>
                </ViewMoreText>
            </View>
            // </ScrollView>
        );
    }
}

{/* ====>>>>>>>>>>>  StyleSheets for Feedback Card  <<<<<<<<<<========== */ }
const Styles = {
    feedbackCard: {
        //marginTop: Matrics.CountScale(7),
        margin: Matrics.CountScale(5),
        flex: 1,
        borderRadius: Matrics.CountScale(3),
        padding: Matrics.CountScale(5),
    },
    dateTextStyle: {
        color: 'grey',
        paddingVertical: Matrics.CountScale(5),
        fontSize: Matrics.CountScale(14),
        fontFamily: Fonts.NunitoSansSemiBold
    },
    textContainer: {
        fontSize: Matrics.CountScale(16),
        padding: Matrics.CountScale(5),
        fontFamily: Fonts.NunitoSansSemiBold,
        //fontWeight: '700',
        color: Colors.BLACK,
        //lineHeight: Matrics.CountScale(22)
    },
    ReadMoreTextStyle: {
        fontSize: Matrics.CountScale(16),

        fontFamily: Fonts.NunitoSansSemiBold,
        color: Colors.GREY
    }
}
export default FeedbackCards;