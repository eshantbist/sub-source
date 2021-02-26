import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";

import styles from "./Calendar.style.js";

class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    datesForWeek: PropTypes.array.isRequired,
    allowHeaderTextScaling: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(datesForWeek, calendarHeaderFormat, selectedDate) {
    if (!datesForWeek || datesForWeek.length === 0) {
      return "";
    }

    let firstDay = datesForWeek[0];
    let lastDay = datesForWeek[datesForWeek.length - 1];
    let monthFormatting = "";
    //Parsing the month part of the user defined formating
    if ((calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
      monthFormatting = "Mo";
    } else {
      if ((calendarHeaderFormat.match(/M/g) || []).length > 0) {
        for (
          let i = (calendarHeaderFormat.match(/M/g) || []).length;
          i > 0;
          i--
        ) {
          monthFormatting += "M";
        }
      }
    }

    if (selectedDate.month() === lastDay.month()) {
      return selectedDate.format(calendarHeaderFormat);
    } else if (selectedDate.year() !== selectedDate.year()) {
      return ` ${selectedDate.format(
        calendarHeaderFormat
      )}`;
    }

    return `${selectedDate.format(
      calendarHeaderFormat
    )}`;
  }

  render() {
    const headerText = this.formatCalendarHeader(
      this.props.datesForWeek,
      this.props.calendarHeaderFormat,
      this.props.selectedDate
    );
    return (
      <Text
        style={[
          styles.calendarHeader,
          { fontSize: this.props.fontSize },
          this.props.calendarHeaderStyle
        ]}
        allowFontScaling={this.props.allowHeaderTextScaling}
      >
        {headerText}
      </Text>
    );
  }
}

export default CalendarHeader;
