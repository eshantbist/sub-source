import moment from "moment";

const Global = {
    error_msg: 'Request Failed....',
    alert_timeout: 200,
    getTimeDiff(start, end) {
        console.log('start-->', start)
        console.log('end-->', end)
        this.start = start.split(":");
        this.end = end.split(":");
        var time1 = ((parseInt(this.start[0]) * 60) + parseInt(this.start[1]))
        var time2 = ((parseInt(this.end[0]) * 60) + parseInt(this.end[1]));
        var time3 = ((time2 - time1) / 60);
        var timeHr = parseInt("" + time3);
        var timeMin = ((time2 - time1) % 60);

        return `${Math.abs(timeHr)}:${timeMin.toString().length == 1 ? (`0${timeMin}`) : timeMin}`
    },

    getYearMonthDiff(start) {
        var starts = moment(start);
        var ends = moment();

        var duration = moment.duration(ends.diff(starts))._data;
        return `${duration.years}YR ${duration.months}M`
        //console.log(duration)
    },

    getTime24to12(val) {
        var timeString = val;
        var H = +timeString.substr(0, 2);
        var h = H % 12 || 12;
        var ampm = (H < 12 || H === 24) ? "am" : "pm";
        timeString = h + timeString.substr(2, 3) + ampm;

        return timeString;
    },

    getTime12To24(time) {
        var PM = time.match('pm') ? true : false
    
        time = time.split(':')
        var min = time[1]
        
        if (PM) {
            var hour = 12 + parseInt(time[0],10)
            var sec = time[2].replace('pm', '')
        } else {
            var hour = time[0]
            var sec = time[2].replace('am', '')       
        }
        console.log(hour + ':' + min + ':' + sec);
        return hour + ':' + min;
    }

}

export default Global;