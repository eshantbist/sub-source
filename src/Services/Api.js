//LIBRARIES
import { AsyncStorage, Platform } from 'react-native';

import { apiRequest, apiGetRequest, apiBodyRequest, apiBodyWithParamsRequest } from '../Redux/utils'


const SUBSOURCESTAGING = "http://subsourceapi.subsource.com";
const STAGING = "http://api.subsource.com";
const NEWURL = "https://testapi.subsource.com";

const ENVIRONMENT = NEWURL;
module.exports = {

    login(params) {
        return apiRequest(params, `${ENVIRONMENT}/ValidateLoginAttempt`, { 'Content-Type': 'application/x-www-form-urlencoded' }, 'POST')
    },

    getUserRoleList(params) {

        const other_params = {
            UserTypeID: global.loginResponse.TypeId,
            BusinessTypeId: 1, //global.DefaultBusinessTypeID,
            UserRoleGuid: ''
        }
        let param = Object.assign(other_params, params);

        return apiRequest(param, `${ENVIRONMENT}/GetUserRoleList/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getFinancialReport(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetKeyFinancialReport/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getSalesBuildingReport(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetSalesBuildingReport/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getCustomerCommentsCount(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetCustomerCommentsCount/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getDashboardData(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetDashboardData/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    //====================RESET PASSWORD API==================//

    resetPasswprd(params) {
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/ValidateLoginAttempt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }).then(response => {
            return response.json();
        });
    },

    //====================Hire Packets Api==================//

    //==================== Check Document Status API ===================//
    getHeaderFilterValues(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetHeaderFilterValues/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    //==================== Dashboard Profile API ===================//
    getEmployeeBasicDetails(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetEmployeeBasicDetails/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getEmployeePersonalcDetails(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetEmployeePersonalDetails/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    //====================Weekly Schedule API ===================//
    getWeeklyScheduleInfo(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeeklyScheduleTopRows/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getWeatherDetailsList(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeatherDetailList/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getWeeklyScheduleEmployee(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetweeklyScheduleEmployee/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getWeeklyScheduleEmployeeReturn(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeeklyScheduleEmployeesReturn/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    deleteEmployeeSchedule(params) {
        return apiRequest(params, `${ENVIRONMENT}/DeleteEmployeeSchedule/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    createUpdateEmployeeSchedule(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/CreateUpdateEmployeeSchedule/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },

    getWeeklySummarySheetData(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeeklySummarySheetData/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token })
    },

    getWeeklySummaryWeekdayStatusList(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeeklySummaryWeekDayStatusList/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getEmployeePunchDetail(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetEmployeePunchDetail/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getTimeoffReasonsList() {
        return apiGetRequest(`${ENVIRONMENT}/GetTimeOffReasons/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    deleteEmployeePunchDetail(params) {
        return apiRequest(params, `${ENVIRONMENT}/DeleteEmployeePunchDetail/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    updateEmployeePunchDetail(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/UpdateEmployeePunchDetail/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    createEmployeeTimeoff(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/CreateEmployeeTimeOff/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    getEmployeeTimeoff(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetEmployeeTimeOff/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    manageWeeklySummaryWeekdayStatus(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/ManageWeeklySummaryWeekDayStatus/`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    NotifyEmployeeSchedulesOnPublish(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/NotifyEmployeeSchedulesOnPublish/`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    getIdleEmployeesReport(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetIdleEmployeesReport/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getStoreListWithSetting(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetStoreListWithSetting/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    GetStoreSettingDetailsList(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetStoreSettingDetailsList/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getCheckDocumentStatusHiringReturnRequest(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetCheckDocumentStatusHiringReturn/?`,{'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getWeeklyScheduleEmployeeCount(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeeklyScheduleEmployeeCount/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getPayrollTaxList(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetPayrollTaxList/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getCheckDocumentStatusEnvelopVoid(params) {
        return apiRequest(params, `${ENVIRONMENT}/CheckDocumentStatusEnvelopVoid/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    EmployeeExistenceCheckOnHiring(params) {
        return apiBodyWithParamsRequest(params, `${ENVIRONMENT}/EmployeeExistenceCheckOnHiring/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    HireNewEmployeeManage(params) {
        return apiBodyWithParamsRequest(params, `${ENVIRONMENT}/HireNewEmployeeManage/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    getweeklyScheduleSharedEmployee(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetweeklyScheduleSharedEmployee/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getweeklyScheduleSharedEmployeeSchedule(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetweeklyScheduleSharedEmployeeSchedule/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getLinkedEmployeeDetails(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetLinkedEmployeeDetails/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    getweeklyScheduleHours(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetweeklyScheduleHours/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    changeEmployeeStatus(params) {
        return apiRequest(params, `${ENVIRONMENT}/ChangeEmployeeStatus/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    deleteEmployeeTimeOffDayWise(params) {
        return apiRequest(params, `${ENVIRONMENT}/DeleteEmployeeTimeOffDayWise/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    ForgotPassword(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/ForgotPassword/`, { 'Content-Type': 'application/json' }, 'POST')
    },
    ChangePassword(params) {
        return apiBodyRequest(params, `${ENVIRONMENT}/ChangePassword/`, { 'Content-Type': 'application/json' }, 'POST')
    },
    CheckDocumentStatusEnvelopRecipientsEmailUpdate(params) {
        return apiBodyWithParamsRequest(params, `${ENVIRONMENT}/CheckDocumentStatusEnvelopRecipientsEmailUpdate/?`, { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + global.user.access_token }, 'POST')
    },
    UpdateBGCEverifyStatus(params) {
        return apiRequest(params, `${ENVIRONMENT}/UpdateBGCEverifyStatus/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token }) 
    },
    ProcessBGCEverify(params) {
        return apiRequest(params, `${ENVIRONMENT}/ProcessBGCEverify/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token }) 
    },
    UpdatePhotoMatchingData(params) {
        return apiRequest(params, `${ENVIRONMENT}/UpdatePhotoMatchingData/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token }) 
    },
    FetchBreakWaiversDetail(params) {
        return apiRequest(params, `${ENVIRONMENT}/FetchBreakWaiversDetail/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token }) 
    },
    getWeekDates(params) {
        return apiRequest(params, `${ENVIRONMENT}/GetWeekDates/?`, { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer ' + global.user.access_token })
    },
    // Employee Module 

    getEmployeeTotalWorkedHours(params) {
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedValue);
        }
        formBody = formBody.join("/");
        return fetch(`${ENVIRONMENT}/GetEmployeeTotalWorkedHours/` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + global.user.access_token
            },
        }).then(response => {
            return response;
        });
    },
    getTimeOffReasons(params) {
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("/");
        return fetch(`${ENVIRONMENT}/GetTimeOffReasons`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
        }).then(response => {
            return response.json();
        });
    },
    async getEmployeeTotalWorkedHours(param) {
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        console.log('userStoreGuid-->', userStoreGuid);
        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(other_params, param);
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        console.log(formBody)
        return fetch(`${ENVIRONMENT}/GetEmployeeTotalWorkedHours/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => response.json())
    },
    async getEmployeePersonalDetails() {
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        authToken = await AsyncStorage.getItem('AuthToken');

        const params = {
            "UserStoreGuid": userStoreGuid,
        }
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/GetEmployeePersonalDetails/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + authToken
            },
        }).then((response) => response.json())
    },
    // getEmployeeBasicDetails(params) {
    //     var formBody = [];
    //     for (var property in params) {
    //         var encodedKey = encodeURIComponent(property);
    //         var encodedValue = encodeURIComponent(params[property]);
    //         formBody.push(encodedValue);
    //     }
    //     formBody = formBody.join("/");
    //     return fetch(`${ENVIRONMENT}/GetEmployeeBasicDetails/` + formBody, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //             'Authorization': 'Bearer ' + global.user.access_token
    //         },
    //     }).then(response => {
    //         return response;
    //     });
    // },

    updateEmployeePersonalDetails(params) {
        return fetch(`${ENVIRONMENT}/UpdateEmployeePersonalDetails/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json());
    },
    updateEmployeeImage(params) {
        return fetch(`${ENVIRONMENT}/UpdateEmployeeImages/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(response => response.json());
    },
    async getEmployeeGuestFeedback(param) {
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        // alert(userStoreGuid)
        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);
        console.log('guestfeedback')
        console.log(params, "Params")

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/GetEmployeeGuestFeedback/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => response.json())
    },
    async getNotificationList(param) {
        console.log(param)
        authToken = await AsyncStorage.getItem('AuthToken');
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/GetEmployeeMessages/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    getEndEmployementReasonType(params) {
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/EmployeeResignationReasonReturn/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + global.user.access_token
            },
        }).then((response) => response.json())
    },
    /* ++++++++++++++++++++++++++++ Availability API'S +++++++++++++++++++++++++++++++++++++*/
    async getEmployeeAvailability() {

        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        const params = {
            "UserStoreGuid": userStoreGuid,
        }
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/GetEmployeeAvailability/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + global.user.access_token
            },
        }).then((response) => response.json())
    },
    async saveUpdateEmployeeAvailability(param) {
        console.log(param)
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        return fetch(`${ENVIRONMENT}/SaveUpdateEmployeeAvailabilityList/?UserStoreGuid=` + userStoreGuid, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(param)
        }).then((response) => response.json())
    },


    async deleteEmployeeAvailability(param) {
        console.log(params, "Params")
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }

        let params = Object.assign(param, other_params);
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/DeleteEmployeeAvailability/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then((response) => response.json())
    },
     /* ++++++++++++++++++++++++++++ My Schedule API'S +++++++++++++++++++++++++++++++++++++*/
     async createEmployeeTimeOff(param) {
        console.log(param, "Params")
        authToken = await AsyncStorage.getItem('AuthToken');
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);

        // var formBody = [];
        // for (var property in params) {
        //     var encodedKey = encodeURIComponent(property);
        //     var encodedValue = encodeURIComponent(params[property]);
        //     formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        return fetch(`${ENVIRONMENT}/CreateEmployeeTimeOff/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
    },
    async getMySchedule(param) {

        authToken = await AsyncStorage.getItem('AuthToken');
        console.log(authToken)
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');
        console.log('userGid-->',userStoreGuid)
        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);
        console.log(params, "Params")

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/GetEmployeeSchedule/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async getPendingSwapRequest(params) {
        authToken = await AsyncStorage.getItem('AuthToken');

        console.log(params, "Params")

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/GetPendingSwapRequestDetail/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async openEmployeeShift(params) {
        authToken = await AsyncStorage.getItem('AuthToken');

        console.log(params, "Params")

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/SaveOpenShift/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async acceptSwapShiftRequest(params) {
        authToken = await AsyncStorage.getItem('AuthToken');
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/UpdateSwapShiftRequestStatus/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async declineSwapShiftRequest(params) {
        authToken = await AsyncStorage.getItem('AuthToken');
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/DeleteEmployeeSwapShift/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async deleteEmployeeOpenShift(params) {
        authToken = await AsyncStorage.getItem('AuthToken');
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/DeleteEmployeeOpenShift/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async getEmployeeStore() {
        authToken = await AsyncStorage.getItem('AuthToken');

        return fetch(`${ENVIRONMENT}/GetEmployeeStores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async getMyScheduleHistory(param) {
        console.log(param)
        authToken = await AsyncStorage.getItem('AuthToken');
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/GetEmployeeMessages/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async getLeaveTypeList() {
        authToken = await AsyncStorage.getItem('AuthToken');

        return fetch(`${ENVIRONMENT}/GetTimeOffReasons`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    /* ++++++++++++++++++++++++++++ Store Schedule API'S +++++++++++++++++++++++++++++++++++++*/

    getStoreList(params) {
        console.log(params, "Params")
        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("/");
        return fetch(`${ENVIRONMENT}/GetFranchiseeActiveStoreList/` + formBody, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer hgbESF35VkbvPyAby_P-x49CZY4aW8Sti_m4TMNE-4IDmaiAAl18oY4js6YSTaNPw1mIqbOxTQYMRuV68wyjiSwAXOPttTOFjotaEUHXSMc-eUfaS3RdADp9Mnu8PXUJO9aXflaozvOGP9ycXJC4RrS259GxJ1VXxpGrckVV-NY2RhCKDPfrVc6JGzu1bZWPOKBbnKyq0ThveNjtQ6mGbQ9hKsfDhOvZ8Ih6FaIZsOx9O3YdArR-BMhjIwEH2EkUFd2ZfwccRZAWNK1q4JLVQPGacA5pajpY1wuEapfCDFXuHndw3jYC5_o5f35cJBf7PFv_rXOeErFsD7klklzpYlNcAUXS_8MNs87H4H4Cn9ODXH-KgLlLI2b1wlneGvJeVJWCC93Wta7rDpf7BWuPBel1qeytAWVbpEN2YvhEbn6Zp7Dos3nam0C1CQ4HRjUKZCQ46SkPtyYipVt6lw3OuRt0E66klIgcnP0ELJtLSS4tKCRM-CsKCzXJv-4HAw8Q'
            },
        }).then(response => {
            console.log(formBody, "FormBody")
            return response;
        });
    },
    async getStoreSchedule(param) {
        authToken = await AsyncStorage.getItem('AuthToken');
        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);
        console.log(params, "Params")

        var formBody = [];
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        return fetch(`${ENVIRONMENT}/GetEmployeeStoreSchedule/?` + formBody, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${authToken}`
            },
        }).then((response) => response.json())
    },
    async getAllStoreList() {
        authToken = await AsyncStorage.getItem('AuthToken');

        return fetch(`${ENVIRONMENT}/GetEmployeeStores`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer BSO0WWa4GRPZ4vIVxL37QBcwIi5aWF9_dTjgHuZbgojW3h3pYYq75TNuUa6Wjri2Gg677tKlLzgG6JjueIC7msk-b6kSuYa7QS6Py40ut_Q28yVCRO38quf-SjmgcunJ4OLRzGt_gsJFsCiJqOIV0GXVv-noDQQLpA1XmmLHHoD-j0sZaaC3YfEji1UbNr9hr9xzXs8SQyGPDTs8xxlafWa6qLQz6lFnhqht6BOfKdqlSIIYmHWaBynnEoTMDuNunsYr_IgMwXeXGR3NbakMD3YkOrFAwVHh8yWQjI_NSWPRQz8CnoQM1Yq5fgrK4nqAfAXT1mDte2cLMlgX1eZ_5wsxX9GjkIYdbSJFk9hnHxCGZXc5CodIrtbHdRZS0nUFD37hu1gFxbAynGyzHT1iILWNXUQGXWjIVsZCn36fk-wpE1ZsnE5oJssFf4CKFZ8UroC8KqD5D0TCb1NPA--5EVNEnNMu_q7NQO0EolQ0NY9Gt3OnFVWRcQgH0O1LgkUZLGCqvMZVR5FLfVRrao8GO8aZ9J5AjVEGm31Jn2Vey5iqFfCUtDkYZ8F2IyL2wpxkEp3cL5l2jFoqMkmpin-fU-xftmeonyDxzmMJoL-vbYI9mJwCM-3z6dw6i3v7hw1xjoC7WOSDEoMV-n57IYT0CA`
            },
        }).then((response) => response.json())
    },
    async offerOpenedShift(param) {

        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);
        console.log('**offer shift**', params)

        return fetch(`${ENVIRONMENT}/SaveSwapRequest/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
    },
    async coverShift(param) {

        userStoreGuid = await AsyncStorage.getItem('UserStoreGuid');

        const other_params = {
            "UserStoreGuid": userStoreGuid,
        }
        let params = Object.assign(param, other_params);
        console.log('**offer shift**', params)

        return fetch(`${ENVIRONMENT}/CoverOpenShift/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
    },
    async postSaveUpdateUserDevices(param) {
        console.log(param, "Params")
        authToken = await AsyncStorage.getItem('AuthToken');
        let params = Object.assign(param);
        return fetch(`${ENVIRONMENT}/SaveUpdateUserDevices/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(params)
        }).then((response) => response.json())
    },
} 
