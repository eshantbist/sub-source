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
    },

    getTime12To24WithoutSpace(time) {
        var PM = time.match('pm') ? true : false
    
        time = time.split(':')
        var min = time[1]
        
        if (PM) {
            var hour = 12 + parseInt(time[0],10)
            var min = time[1].replace('pm', '')
        } else {
            var hour = time[0]
            var min = time[1].replace('am', '')       
        }
        return hour + ':' + min;
    },

    getQuaterMonth(currentMonth) {
        var quaterMonth = [];
        if(currentMonth == '01'){
            quaterMonth=['01','02','03','04'];
        } else if(currentMonth == '02'){
            quaterMonth=['02','03','04','05'];
        } else if(currentMonth == '03'){
            quaterMonth=['03','04','05','06'];
        } else if(currentMonth == '04'){
            quaterMonth=['04','05','06','07'];
        } else if(currentMonth == '05'){
            quaterMonth=['05','06','07','08'];
        } else if(currentMonth == '06'){
            quaterMonth=['06','07','08','09'];
        } else if(currentMonth == '07'){
            quaterMonth=['07','08','09','10'];
        } else if(currentMonth == '08'){
            quaterMonth=['08','09','10','11'];
        } else if(currentMonth == '09'){
            quaterMonth=['09','10','11','12'];
        } else if(currentMonth == '10'){
            quaterMonth=['10','11','12','01'];
        } else if(currentMonth == '11'){
            quaterMonth=['11','12','01','02'];
        } else if(currentMonth == '12'){
            quaterMonth=['12','01','02','03'];
        }
        return quaterMonth;
    },
    getShiftBgColor(DayPartColor){
        let bgColor = 'white';
        if('-c-1' == DayPartColor){
            bgColor = '#f6e8e8';
        } else if('-c-2' == DayPartColor){
            bgColor = '#e7d8f9';
        } else if('-c-3' == DayPartColor){
            bgColor = '#bddbed';
        } else if('-c-4' == DayPartColor){
            bgColor = '#d0f9cc';
        } else if('-c-5' == DayPartColor){
            bgColor = '#fff5c9';
        } else if('-c-6' == DayPartColor){
            bgColor = '#fff5c9';
        } else if('-c-7' == DayPartColor){
            bgColor = '#fff5c9';
        } else if('-c-8' == DayPartColor){
            bgColor = '#bee2fe';
        } else if('-c-9' == DayPartColor){
            bgColor = '#a5e4bf';
        } else if('-c-10' == DayPartColor){
            bgColor = '#ffeee5';
        } else if('-c-11' == DayPartColor){
            bgColor = '#fda9a7';
        } else if('-c-12' == DayPartColor){
            bgColor = '#d2c1e6';
        } else if('-c-13' == DayPartColor){
            bgColor = '#c0f2f8';
        } else if('-c-14' == DayPartColor){
            bgColor = '#bef4e0';
        } else if('-c-15' == DayPartColor){
            bgColor = '#fcd7b3';
        }
        return bgColor;
    },
    getShiftBorderColor(DayPartColor){
        let borderColor = 'rgb(201,232,217)';
        if('-c-1' == DayPartColor){
            borderColor = '#e0b1b1';
        } else if('-c-2' == DayPartColor){
            borderColor = '#be96ef';
        } else if('-c-3' == DayPartColor){
            borderColor = '#81badd';
        } else if('-c-4' == DayPartColor){
            borderColor = '#a6f49e';
        } else if('-c-5' == DayPartColor){
            borderColor = '#ffec96';
        } else if('-c-6' == DayPartColor){
            borderColor = '#ffec96';
        } else if('-c-7' == DayPartColor){
            borderColor = '#ffec96';
        } else if('-c-8' == DayPartColor){
            borderColor = '#8cccfd';
        } else if('-c-9' == DayPartColor){
            borderColor = '#6ad295';
        } else if('-c-10' == DayPartColor){
            borderColor = '#ffcdb2';
        } else if('-c-11' == DayPartColor){
            borderColor = '#fc7875';
        } else if('-c-12' == DayPartColor){
            borderColor = '#b89dd7';
        } else if('-c-13' == DayPartColor){
            borderColor = '#7be4f0';
        } else if('-c-14' == DayPartColor){
            borderColor = '#92edcb';
        } else if('-c-15' == DayPartColor){
            borderColor = '#fabd82';
        }
        return borderColor;
    },
    getDateValue(dateVal) {
        var date = new Date(dateVal)
        getYear = date.getFullYear().toString()
        month = date.getMonth() + 1
        getMonth = month < 10 ? `0${month}` : month
        dt = date.getDate()
        getDate = dt < 10 ? `0${dt}` : dt
        return `${getMonth.toString()}-${getDate.toString()}-${getYear.toString()}`
    },
    getDateAfterSomeMonth(dateVal, addMonth) {
        var date = new Date(new Date(dateVal).setMonth(dateVal.getMonth() + addMonth));
        getYear = date.getFullYear().toString()
        month = date.getMonth() + 1
        getMonth = month < 10 ? `0${month}` : month
        dt = date.getDate()
        getDate = dt < 10 ? `0${dt}` : dt
        return `${getMonth.toString()}-${getDate.toString()}-${getYear.toString()}`
    },
    getDateFromDate(dateVal) {
        // var date = new Date(dateVal)
        // return date.getDate()
        return moment(dateVal).format('DD')
    },
    getMonthValue(dateVal) {
        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";
        var date = new Date(dateVal)
        monthValue = date.getMonth()
        return month[monthValue]
    },
    getDayValue(dateVal) {
        var day = new Array();
        day[0] = "Sun";
        day[1] = "Mon";
        day[2] = "Tue";
        day[3] = "Wed";
        day[4] = "Thu";
        day[5] = "Fri";
        day[6] = "Sat";
    
        var date = new Date(dateVal)
        dayValue = date.getDay()
        return day[dayValue]
    },
    getTime(dateVal) {
        //console.log(dateVal)
        var date = new Date(dateVal)
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ampm;
        //console.log(strTime)
        return strTime;
    },
    getYearToDate(dateVal) {
        var date = new Date(dateVal)
        getYear = date.getFullYear().toString()
        month = date.getMonth() + 1
        getMonth = month < 10 ? `0${month}` : month
        dt = date.getDate()
        getDate = dt < 10 ? `0${dt}` : dt
        return `${getYear.toString()}-${getMonth.toString()}-${getDate.toString()}`
    },
    getDt(dateVal) {
        var date = new Date(dateVal)
        getYear = date.getFullYear().toString()
        month = date.getMonth() + 1
        getMonth = month < 10 ? `0${month}` : month
        dt = date.getDate()
        getDate = dt < 10 ? `0${dt}` : dt
        return `${getMonth.toString()}-${getDate.toString()}-${getYear.toString()}`
    },
    phoneNoFormat(f) {
        var r = /(\D+)/g,
          npa = '',
          nxx = '',
          last4 = '';
    
        f = f.replace(r, '');
        npa = f.substr(0, 3);
        nxx = f.substr(3, 3);
        last4 = f.substr(6, 4);
        if (f.length > 0 && f.length <= 3)
          f = '(' + npa
        else if (f.length > 3 && f.length < 7)
          f = '(' + npa + ') ' + nxx
        else if (f.length >= 7)
          f = '(' + npa + ') ' + nxx + '-' + last4
        else
          f = ''
        return f
    },
    phoneNoDigitFormat(f) {
        var r = /(\D+)/g,
          f = f.replace(r, '');
        return f
    },
    validateEmail(email) {
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return re.test(String(email).toLowerCase());
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i.test(email)
    }
}

export default Global;