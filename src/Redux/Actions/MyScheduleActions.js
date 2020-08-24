import {
    CREATE_EMPLOYEE_TIME_OFF_REQUESTING,
    GET_MY_SCHEDULE_REQUESTING,
    GET_EMPLOYEE_STORE_REQUESTING,
    OPEN_SHIFT_REQUESTING,
    GET_PENDING_SWAP_REQUEST_DETAILS_REQUESTING,
    ACCEPT_SWAP_REQUEST_REQUESTING,
    DECLINE_SWAP_REQUEST_REQUESTING,
    DELETE_EMPLOYEE_OPEN_SHIFT_REQUEST,
    GET_MY_SCHEDULE_HISTORY_REQUEST,
    GET_LEAVE_TYPE_LIST_REQUEST
} from '@Types/MyScheduleTypes';


//--->>Function to Employee Availability----->>>>>
export const createEmployeeTimeOff = (params) => {
    console.log('ACTION CALLED ----------------------')
    return {
        type: CREATE_EMPLOYEE_TIME_OFF_REQUESTING,
        params
    };
}

export const getMyScheduleRequest = (params) => {
    return {
        type: GET_MY_SCHEDULE_REQUESTING,
        params
    }
}

export const getEmployeeStoreRequest = () => {
    return {
        type: GET_EMPLOYEE_STORE_REQUESTING,
    }
}

export const openEmployeeShiftRequest = (params) => {
    return {
        type: OPEN_SHIFT_REQUESTING,
        params
    }
}

export const getPendingSwapRequestDetailsRequest = (params) => {
    return {
        type: GET_PENDING_SWAP_REQUEST_DETAILS_REQUESTING,
        params
    }
}


export const acceptSwapRequest = (params) => {
    return {
        type: ACCEPT_SWAP_REQUEST_REQUESTING,
        params
    }
}


export const declineSwapRequest = (params) => {
    return {
        type: DECLINE_SWAP_REQUEST_REQUESTING,
        params
    }
}

export const deleteEmployeeOpenShiftRequest = (params) => {
    return {
        type: DELETE_EMPLOYEE_OPEN_SHIFT_REQUEST,
        params
    }
}

export const getMyScheduleHistoryRequest = (params) => {
    return {
        type: GET_MY_SCHEDULE_HISTORY_REQUEST,
        params
    }
}

export const getLeaveTypeListRequest = () => {
    return {
        type: GET_LEAVE_TYPE_LIST_REQUEST
    }
}