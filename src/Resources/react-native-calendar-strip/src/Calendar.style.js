/**
 * Created by bogdanbegovic on 8/26/16.
 */
// Custom Changes here
import { StyleSheet } from "react-native";
// import { Colors, Fonts, Matrics, Images, MasterCss } from '../../../src/Assets'
import { Colors, Fonts, Matrics, Images, MasterCss } from './Assets'

export default StyleSheet.create({
  //CALENDAR STYLES
  calendarContainer: {
    overflow: "hidden"
  },
  datesStrip: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between"
  },
  calendarDates: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  calendarHeader: {
    fontFamily: Fonts.NunitoSansRegular,
    textAlign: "center",
    // fontWeight: "bold",
    alignSelf: "center"
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  icon: {
    resizeMode: "contain"
  },

  //CALENDAR DAY
  dateContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  dateName: {
    textAlign: "center",
    paddingBottom: 10,
    color: 'green'
  },
  weekendDateName: {
    color: "#A7A7A7",
    textAlign: "center"
  },
  dateNumber: {

    // fontWeight: "bold",
    // backgroundColor: 'red',
    fontFamily: Fonts.NunitoSansRegular,
    textAlign: "center"
  },
  weekendDateNumber: {
    color: "#A7A7A7",
    fontWeight: "bold",
    textAlign: "center"
  }
});
