import { put, call, takeEvery } from 'redux-saga/effects';

//ASSETS
import {
    CREATE_EMPLOYEE_TIME_OFF_SUCCESS, CREATE_EMPLOYEE_TIME_OFF_REQUESTING, CREATE_EMPLOYEE_TIME_OFF_FAIL,
    GET_MY_SCHEDULE_REQUESTING, GET_MY_SCHEDULE_SUCCESS, GET_MY_SCHEDULE_FAIL,
    GET_EMPLOYEE_STORE_REQUESTING, GET_EMPLOYEE_STORE_SUCCESS, GET_EMPLOYEE_STORE_FAIL,
    OPEN_SHIFT_REQUESTING, OPEN_SHIFT_SUCCESS, OPEN_SHIFT_FAIL,
    GET_PENDING_SWAP_REQUEST_DETAILS_REQUESTING, GET_PENDING_SWAP_REQUEST_DETAILS_SUCCESS, GET_PENDING_SWAP_REQUEST_DETAILS_FAIL,
    ACCEPT_SWAP_REQUEST_REQUESTING, ACCEPT_SWAP_REQUEST_SUCCESS, ACCEPT_SWAP_REQUEST_FAIL,
    DECLINE_SWAP_REQUEST_REQUESTING, DECLINE_SWAP_REQUEST_SUCCESS, DECLINE_SWAP_REQUEST_FAIL,
    DELETE_EMPLOYEE_OPEN_SHIFT_REQUEST, DELETE_EMPLOYEE_OPEN_SHIFT_SUCCESS, DELETE_EMPLOYEE_OPEN_SHIFT_FAIL,
    GET_MY_SCHEDULE_HISTORY_REQUEST, GET_MY_SCHEDULE_HISTORY_SUCCESS, GET_MY_SCHEDULE_HISTORY_FAIL,
    GET_LEAVE_TYPE_LIST_REQUEST, GET_LEAVE_TYPE_LIST_SUCCESS, GET_LEAVE_TYPE_LIST_FAIL
} from '@Types/MyScheduleTypes'
import Api from '../../Services/Api';

/************************ Employee MySchedule Function ****************************/

export const watchCreateEmployeeTimeOffAsync = function* watchCreateEmployeeTimeOffAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING STORE SCHEDULE', params)
        const response = yield call(Api.createEmployeeTimeOff, params)
        yield put({ type: CREATE_EMPLOYEE_TIME_OFF_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: CREATE_EMPLOYEE_TIME_OFF_FAIL, payload: e });
    }
}

export const getMyScheduleAsync = function* getMyScheduleAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING FOR MY SCHEDULE', params)
        const response = yield call(Api.getMySchedule, params)
        // console.log(response)
        yield put({ type: GET_MY_SCHEDULE_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_MY_SCHEDULE_FAIL, payload: e });
    }
}

export const getEmployeeStoreAsync = function* getEmployeeStoreAsync() {
    try {
        const response = yield call(Api.getEmployeeStore)
        console.log(response)
        yield put({ type: GET_EMPLOYEE_STORE_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_EMPLOYEE_STORE_FAIL, payload: e });
    }
}

export const openEmployeeShiftAsync = function* openEmployeeShiftAsync({ params }) {
    try {
        const response = yield call(Api.openEmployeeShift, params)
        yield put({ type: OPEN_SHIFT_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: OPEN_SHIFT_FAIL, payload: e });
    }
}

export const getPendingSwapRequestAsync = function* getPendingSwapRequestAsync({ params }) {
    try {
        const response = yield call(Api.getPendingSwapRequest, params)
        yield put({ type: GET_PENDING_SWAP_REQUEST_DETAILS_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_PENDING_SWAP_REQUEST_DETAILS_FAIL, payload: e });
    }
}

export const acceptSwapRequestAsync = function* acceptSwapRequestAsync({ params }) {
    try {
        const response = yield call(Api.acceptSwapShiftRequest, params)
        yield put({ type: ACCEPT_SWAP_REQUEST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: ACCEPT_SWAP_REQUEST_FAIL, payload: e });
    }
}

export const declineSwapRequestAsync = function* declineSwapRequestAsync({ params }) {
    try {
        const response = yield call(Api.declineSwapShiftRequest, params)
        yield put({ type: DECLINE_SWAP_REQUEST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: DECLINE_SWAP_REQUEST_FAIL, payload: e });
    }
}

export const deleteEmployeeOpenShiftAsync = function* deleteEmployeeOpenShiftAsync({ params }) {
    try {
        const response = yield call(Api.deleteEmployeeOpenShift, params)
        yield put({ type: DELETE_EMPLOYEE_OPEN_SHIFT_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: DELETE_EMPLOYEE_OPEN_SHIFT_FAIL, payload: e });
    }
}

export const getMyScheduleHistoryAsync = function* getMyScheduleHistoryAsync({ params }) {
    try {
        const response = yield call(Api.getMyScheduleHistory, params)
        yield put({ type: GET_MY_SCHEDULE_HISTORY_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_MY_SCHEDULE_HISTORY_FAIL, payload: e });
    }
}

export const getLeaveTypeListAsync = function* getLeaveTypeListAsync() {
    try {
        const response = yield call(Api.getLeaveTypeList)
        yield put({ type: GET_LEAVE_TYPE_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_LEAVE_TYPE_LIST_FAIL, payload: e });
    }
}

watchMySchedule = function* watchMySchedule() {
    yield takeEvery(CREATE_EMPLOYEE_TIME_OFF_REQUESTING, watchCreateEmployeeTimeOffAsync);
    yield takeEvery(GET_MY_SCHEDULE_REQUESTING, getMyScheduleAsync);
    yield takeEvery(GET_EMPLOYEE_STORE_REQUESTING, getEmployeeStoreAsync);
    yield takeEvery(OPEN_SHIFT_REQUESTING, openEmployeeShiftAsync);
    yield takeEvery(GET_PENDING_SWAP_REQUEST_DETAILS_REQUESTING, getPendingSwapRequestAsync);
    yield takeEvery(ACCEPT_SWAP_REQUEST_REQUESTING, acceptSwapRequestAsync);
    yield takeEvery(DECLINE_SWAP_REQUEST_REQUESTING, declineSwapRequestAsync);
    yield takeEvery(DELETE_EMPLOYEE_OPEN_SHIFT_REQUEST, deleteEmployeeOpenShiftAsync);
    yield takeEvery(GET_MY_SCHEDULE_HISTORY_REQUEST, getMyScheduleHistoryAsync);
    yield takeEvery(GET_LEAVE_TYPE_LIST_REQUEST, getLeaveTypeListAsync);


}

export default watchMySchedule;