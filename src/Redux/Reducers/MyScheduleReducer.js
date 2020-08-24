import {
    CREATE_EMPLOYEE_TIME_OFF_SUCCESS, CREATE_EMPLOYEE_TIME_OFF_FAIL,
    GET_MY_SCHEDULE_SUCCESS, GET_MY_SCHEDULE_FAIL,
    GET_EMPLOYEE_STORE_SUCCESS, GET_EMPLOYEE_STORE_FAIL,
    OPEN_SHIFT_SUCCESS, OPEN_SHIFT_FAIL,
    GET_PENDING_SWAP_REQUEST_DETAILS_SUCCESS, GET_PENDING_SWAP_REQUEST_DETAILS_FAIL,
    ACCEPT_SWAP_REQUEST_SUCCESS, ACCEPT_SWAP_REQUEST_FAIL,
    DECLINE_SWAP_REQUEST_SUCCESS, DECLINE_SWAP_REQUEST_FAIL,
    DELETE_EMPLOYEE_OPEN_SHIFT_SUCCESS, DELETE_EMPLOYEE_OPEN_SHIFT_FAIL,
    GET_MY_SCHEDULE_HISTORY_SUCCESS, GET_MY_SCHEDULE_HISTORY_FAIL,
    GET_LEAVE_TYPE_LIST_SUCCESS, GET_LEAVE_TYPE_LIST_FAIL
} from '@Types/MyScheduleTypes'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('REDUCER CALLED ----------------------')
    console.log('*****************REDUCER', action)
    switch (action.type) {
        // ==================================CREATE_EMPLOYEE_TIME_OFF
        case CREATE_EMPLOYEE_TIME_OFF_SUCCESS:
            return { createEmployeeTimeOffSuccess: true, data: action.payload };

        case CREATE_EMPLOYEE_TIME_OFF_FAIL:
            return { createEmployeeTimeOffFailed: true };

        case GET_MY_SCHEDULE_SUCCESS:
            return { getMyScheduleSuccess: true, data: action.payload }

        case GET_MY_SCHEDULE_FAIL:
            return { getMyScheduleFailed: true }

        case GET_EMPLOYEE_STORE_SUCCESS:
            return { getEmployeeStoreSuccess: true, data: action.payload }

        case GET_EMPLOYEE_STORE_FAIL:
            return { getEployeeStoreFailed: true }

        case OPEN_SHIFT_SUCCESS:
            return { openEmployeeShiftSuccess: true, data: action.payload }

        case OPEN_SHIFT_FAIL:
            return { openEmployeeShiftFailed: true }

        case GET_PENDING_SWAP_REQUEST_DETAILS_SUCCESS:
            return { getPendingSwapRequestDetailsSuccess: true, data: action.payload }

        case GET_PENDING_SWAP_REQUEST_DETAILS_FAIL:
            return { getPendingSwapRequestDetailsFail: true }

        case ACCEPT_SWAP_REQUEST_SUCCESS:
            return { acceptSwapShiftRequestSuccess: true, data: action.payload }

        case ACCEPT_SWAP_REQUEST_FAIL:
            return { acceptSwapShiftRequestFail: true }

        case DELETE_EMPLOYEE_OPEN_SHIFT_SUCCESS:
            return { deleteEmployeeOpenShiftSuccess: true, data: action.payload }

        case DELETE_EMPLOYEE_OPEN_SHIFT_FAIL:
            return { deleteEmployeeOpenShiftFail: true }

        case DECLINE_SWAP_REQUEST_SUCCESS:
            return { declineSwapShiftRequestSuccess: true, data: action.payload }

        case DECLINE_SWAP_REQUEST_FAIL:
            return { declineSwapShiftRequestFail: true }

        case GET_MY_SCHEDULE_HISTORY_SUCCESS:
            return { getMyScheduleHistorySuccess: true, data: action.payload }

        case GET_MY_SCHEDULE_HISTORY_FAIL:
            return { getMyScheduleHistoryFail: true }

        case GET_LEAVE_TYPE_LIST_SUCCESS:
            return { getLeaveTypeListSuccess: true, data: action.payload }

        case GET_LEAVE_TYPE_LIST_FAIL:
            return { getLeaveTypeListFail: true }

        default:
            return state;
    };
};