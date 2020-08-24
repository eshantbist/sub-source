import {
    FETCH_REASONS_SUCCESS,
    FETCH_REASONS_FAIL,

    FETCH_EMPLOYEE_HOURS_SUCCESS,
    FETCH_EMPLOYEE_HOURS_FAIL,

    FETCH_EMPLOYEE_BASIC_DETAILS_SUCCESS,
    FETCH_EMPLOYEE_BASIC_DETAILS_FAIL,

    FETCH_EMPLOYEE_GUEST_FEEDBACK_SUCCESS,
    FETCH_EMPLOYEE_GUEST_FEEDBACK_FAIL,

    FETCH_EMPLOYEE_PERSONAL_DETAILS_SUCCESS,
    FETCH_EMPLOYEE_PERSONAL_DETAILS_FAIL,

    UPDATE_EMPLOYEE_PERSONAL_DETAILS_SUCCESS,
    UPDATE_EMPLOYEE_PERSONAL_DETAILS_FAIL,

    GET_NOTIFICATION_LIST_SUCCESS,
    GET_NOTIFICATION_LIST_FAIL,

    GET_END_EMPLOYEEMENT_REASON_SUCCESS,
    GET_END_EMPLOYEEMENT_REASON_FAIL,

    SAVE_UPDATE_USER_DEVICES_SUCCESS,
    SAVE_UPDATE_USER_DEVICES_FAIL

} from '@Types/DashboardTypes'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('*****************REDUCER')
    switch (action.type) {
        // ==================================FETCH_REASONS

        case FETCH_REASONS_SUCCESS:
            return { reasonsSuccess: true, data: action.payload, ...state };
        case FETCH_REASONS_FAIL:
            return { reasonsFail: true };

        // ==================================FETCH_EMPLOYEE_HOURS
        case FETCH_EMPLOYEE_HOURS_SUCCESS:
            return { employeeWorkHourSuccess: true, employeeWorkHourdata: action.payload, ...state, };
        case FETCH_EMPLOYEE_HOURS_FAIL:
            return { employeeWorkHourFail: true };

        // ==================================FETCH_EMPLOYEE_BASIC_DETAILS
        case FETCH_EMPLOYEE_BASIC_DETAILS_SUCCESS:
            return { employeeBasicDetailsSuccess: true, employeeBasicDetailsdata: action.payload, ...state, };
        case FETCH_EMPLOYEE_BASIC_DETAILS_FAIL:
            return { employeeBasicDetailsFail: true };

        // ==================================FETCH_EMPLOYEE_GUEST_FEEDBACK
        case FETCH_EMPLOYEE_GUEST_FEEDBACK_SUCCESS:
            return { employeeGuestFeedbackSuccess: true, employeeGuestFeedbackdata: action.payload, };
        case FETCH_EMPLOYEE_GUEST_FEEDBACK_FAIL:
            return { employeeGuestFeedbackFail: true };

        // ==================================FETCH_EMPLOYEE_PERSONAL_DETAILS    
        case FETCH_EMPLOYEE_PERSONAL_DETAILS_SUCCESS:
            return { employeePersonalDetailsSuccess: true, employeePersonalDetailsdata: action.payload };
        case FETCH_EMPLOYEE_PERSONAL_DETAILS_FAIL:
            return { employeePersonalDetailsFail: true };

        // ==================================UPDATE_EMPLOYEE_PERSONAL_DETAILS    
        case UPDATE_EMPLOYEE_PERSONAL_DETAILS_SUCCESS:
            return { updateEmployeePersonalDetailsSuccess: true, updateEmployeePersonalDetailsdata: action.payload };
        case UPDATE_EMPLOYEE_PERSONAL_DETAILS_FAIL:
            return { updateEmployeePersonalDetailsFail: true };

        case GET_NOTIFICATION_LIST_SUCCESS:
            return { getNotificationDetailsSuccess: true, notificationDetailsdata: action.payload };
        case GET_NOTIFICATION_LIST_FAIL:
            return { getNotificationDetailsFail: true };

        case GET_END_EMPLOYEEMENT_REASON_SUCCESS:
            return { getEndEmployeementReasonSuccess: true, data: action.payload };
        case GET_END_EMPLOYEEMENT_REASON_FAIL:
            return { getEndEmployeementReasonFail: true };

        case SAVE_UPDATE_USER_DEVICES_SUCCESS:
            return { SaveUpdateUserDevicesSuccess: true, data: action.payload };
        case SAVE_UPDATE_USER_DEVICES_FAIL:
            return { SaveUpdateUserDevicesFail: true };

        default:
            return state;
    };
};