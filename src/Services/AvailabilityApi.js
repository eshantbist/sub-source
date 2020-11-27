//LIBRARIES
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// const LIVE = 'https://mytowntv.com/api'   //main url endpoint
const STAGING = "http://subsourceapi.subsource.com";
const SUBSOURCESTAGING = "https://api.subsource.com";

const ENVIRONMENT = STAGING;

module.exports = {

    /* ++++++++++++++++++++++++++++ Availability API'S +++++++++++++++++++++++++++++++++++++*/






    deleteEmployeeAvailability(params) {
        console.log(params, "Params")
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("/");
        return fetch(`${SUBSOURCESTAGING}/DeleteEmployeeAvailability/` + formBody, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            console.log(formBody, "FormBody")
            return response;
        });
    },

}