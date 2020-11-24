import {
    FETCH_REASONS_REQUESTING,
    FETCH_EMPLOYEE_HOURS_REQUESTING,
    FETCH_EMPLOYEE_BASIC_DETAILS_REQUESTING,
    FETCH_EMPLOYEE_GUEST_FEEDBACK_REQUESTING,
    FETCH_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
    UPDATE_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
    GET_NOTIFICATION_LIST_REQUESTING,
    GET_END_EMPLOYEEMENT_REASON_REQUESTING,
    SAVE_UPDATE_USER_DEVICES_REQUESTING
} from '@Types/DashboardTypes';

//--->>Function to request User Login----->>>>>

export const getTimeOffReasons = (params) => {
    return {
        type: FETCH_REASONS_REQUESTING,
        params
    };
}

export const getEmployeeTotalWorkedHours = (params) => {
    console.log('action call')
    return {
        type: FETCH_EMPLOYEE_HOURS_REQUESTING,
        params
    };
}

export const getEmployeeBasicDetails = (params) => {
    return {
        type: FETCH_EMPLOYEE_BASIC_DETAILS_REQUESTING,
        params
    };
}

export const getEmployeeGuestFeedback = (params) => {
    return {
        type: FETCH_EMPLOYEE_GUEST_FEEDBACK_REQUESTING,
        params
    };
}

export const getEmployeePersonalDetails = () => {
    return {
        type: FETCH_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
    };
}

export const updateEmployeePersonalDetails = (params) => {
    return {
        type: UPDATE_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
        params
    };
}

export const getNotificationListDetails = (params) => {
    return {
        type: GET_NOTIFICATION_LIST_REQUESTING,
        params
    };
}

export const getEndEmployeementReasonType = (params) => {
    return {
        type: GET_END_EMPLOYEEMENT_REASON_REQUESTING,
        params
    };
}

export const SaveUpdateUserDevices = (params) => {
    return {
        type: SAVE_UPDATE_USER_DEVICES_REQUESTING,
        params
    }
}
