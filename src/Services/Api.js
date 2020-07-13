//LIBRARIES
import {  Platform } from 'react-native';

import { apiRequest, apiGetRequest, apiBodyRequest, apiBodyWithParamsRequest } from '../Redux/utils'


const SUBSOURCESTAGING = "http://subsourceapi.subsource.com";
const STAGING = "http://api.subsource.com";

const ENVIRONMENT = STAGING;

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
} 
