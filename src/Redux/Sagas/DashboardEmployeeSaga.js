//LIBRARIES
import { put, call, takeEvery } from 'redux-saga/effects';

//ASSETS
import {
    FETCH_REASONS_SUCCESS,
    FETCH_REASONS_REQUESTING,
    FETCH_REASONS_FAIL,

    FETCH_STATE_LIST_SUCCESS,
    FETCH_STATE_LIST_REQUESTING,
    FETCH_STATE_LIST_FAIL,

    FETCH_EMPLOYEE_HOURS_SUCCESS,
    FETCH_EMPLOYEE_HOURS_REQUESTING,
    FETCH_EMPLOYEE_HOURS_FAIL,

    FETCH_EMPLOYEE_BASIC_DETAILS_SUCCESS,
    FETCH_EMPLOYEE_BASIC_DETAILS_REQUESTING,
    FETCH_EMPLOYEE_BASIC_DETAILS_FAIL,

    FETCH_EMPLOYEE_GUEST_FEEDBACK_SUCCESS,
    FETCH_EMPLOYEE_GUEST_FEEDBACK_REQUESTING,
    FETCH_EMPLOYEE_GUEST_FEEDBACK_FAIL,

    FETCH_EMPLOYEE_PERSONAL_DETAILS_SUCCESS,
    FETCH_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
    FETCH_EMPLOYEE_PERSONAL_DETAILS_FAIL,

    UPDATE_EMPLOYEE_PERSONAL_DETAILS_SUCCESS,
    UPDATE_EMPLOYEE_PERSONAL_DETAILS_REQUESTING,
    UPDATE_EMPLOYEE_PERSONAL_DETAILS_FAIL,

    GET_NOTIFICATION_LIST_REQUESTING,
    GET_NOTIFICATION_LIST_SUCCESS,
    GET_NOTIFICATION_LIST_FAIL,

    GET_END_EMPLOYEEMENT_REASON_REQUESTING,
    GET_END_EMPLOYEEMENT_REASON_SUCCESS,
    GET_END_EMPLOYEEMENT_REASON_FAIL,

    SAVE_UPDATE_USER_DEVICES_REQUESTING,
    SAVE_UPDATE_USER_DEVICES_SUCCESS,
    SAVE_UPDATE_USER_DEVICES_FAIL,

    GET_NOTIFICATION_DETAILS_REQUESTING,
    GET_NOTIFICATION_DETAILS_SUCCESS,
    GET_NOTIFICATION_DETAILS_FAIL

} from '@Types/DashboardTypes'
import Api from '../../Services/Api';
/************************ Reason function ****************************/

export const watchReasonAsync = function* watchReasonAsync({ params }) {
    console.log(params, "Dashboard")
    try {
        console.log('---------------SAGA CALLING DASHBOARD')
        const response = yield call(Api.getTimeOffReasons, params)
        console.log(response, "Dashboard")
        yield put({ type: FETCH_REASONS_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_REASONS_FAIL, payload: e });
    }
}

/************************ Get Employee Work Hours function ****************************/

export const watchEmployeeHoursAsync = function* watchEmployeeHoursAsync({ params }) {
    console.log(params, "Dashboard")
    try {
        console.log('---------------SAGA CALLING DASHBOARD')
        const response = yield call(Api.getEmployeeTotalWorkedHours, params)
        console.log(response, "Dashboard")
        yield put({ type: FETCH_EMPLOYEE_HOURS_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_EMPLOYEE_HOURS_FAIL, payload: e });
    }
}

/************************ Get State list ****************************/

export const watchStateListAsync = function* watchStateListAsync() {
    try {
        const response = yield call(Api.getStateList, {})
        yield put({ type: FETCH_STATE_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: FETCH_STATE_LIST_FAIL, payload: e });
    }
}

/************************ Get Employee Basic Details function ****************************/

export const watchEmployeeBasicDetailsAsync = function* watchEmployeeBasicDetailsAsync({ params }) {
    console.log(params, "Dashboard")
    try {
        console.log('---------------SAGA CALLING DASHBOARD')
        const response = yield call(Api.getEmployeeBasicDetails, params)
        yield put({ type: FETCH_EMPLOYEE_BASIC_DETAILS_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_EMPLOYEE_BASIC_DETAILS_FAIL, payload: e });
    }
}

/************************ Get Employee Guest Feedback function ****************************/

export const watchEmployeeGuestFeedbackAsync = function* watchEmployeeGuestFeedbackAsync({ params }) {
    console.log(params, "Dashboard")
    try {
        console.log('---------------SAGA CALLING DASHBOARD')
        const response = yield call(Api.getEmployeeGuestFeedback, params)
        console.log('dashboard feedback', response)
        yield put({ type: FETCH_EMPLOYEE_GUEST_FEEDBACK_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_EMPLOYEE_GUEST_FEEDBACK_FAIL, payload: e });
    }
}

/************************ Get Employee Personal Details function ****************************/

export const watchEmployeePersonalDetailsAsync = function* watchEmployeePersonalDetailsAsync() {
    try {
        console.log('---------------SAGA CALLING DASHBOARD')
        const response = yield call(Api.getEmployeePersonalDetails)
        yield put({ type: FETCH_EMPLOYEE_PERSONAL_DETAILS_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_EMPLOYEE_PERSONAL_DETAILS_FAIL, payload: e });
    }
}

/************************ Update Employee Personal Details function ****************************/

export const watchUpdateEmployeePersonalDetailsAsync = function* watchUpdateEmployeePersonalDetailsAsync({ params }) {
    console.log(params, "Dashboard_updte")
    console.log('imageParams-->', params)
    // console.log('detailsParams-->', detailsParams)
    console.log('len-->', Object.keys(params.imageParams).length)

    try {
        if (Object.keys(params.imageParams).length == 0) {
            const response = yield call(Api.updateEmployeePersonalDetails, params.detailsParams)
            yield put({ type: UPDATE_EMPLOYEE_PERSONAL_DETAILS_SUCCESS, payload: response });
        }
        else {
            const res = yield call(Api.updateEmployeeImage, params.imageParams)
            console.log('imgres-->', res);
            const response = yield call(Api.updateEmployeePersonalDetails, params.detailsParams)
            yield put({ type: UPDATE_EMPLOYEE_PERSONAL_DETAILS_SUCCESS, payload: response });
        }
        //const response = yield call(Api.updateEmployeePersonalDetails, params)

    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: UPDATE_EMPLOYEE_PERSONAL_DETAILS_FAIL, payload: e });
    }
}

export const watchGetNotificationListAsync = function* watchGetNotificationListAsync({ params }) {

    try {
        const response = yield call(Api.getNotificationList, params)
        yield put({ type: GET_NOTIFICATION_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_NOTIFICATION_LIST_FAIL, payload: e });
    }
}

export const watchGetNotificationDetailsAsync = function* watchGetNotificationDetailsAsync({ params }) {
    try {
        const response = yield call(Api.getNotificationDetail, params)
        yield put({ type: GET_NOTIFICATION_DETAILS_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_NOTIFICATION_DETAILS_FAIL, payload: e });
    }
}

export const getEndEmployeementReasonTypeAsync = function* getEndEmployeementReasonTypeAsync({ params }) {

    try {
        const response = yield call(Api.getEndEmployementReasonType, params)
        yield put({ type: GET_END_EMPLOYEEMENT_REASON_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_END_EMPLOYEEMENT_REASON_FAIL, payload: e });
    }
}

export const updateUserDeviceAsync = function* updateUserDeviceAsync({ params }) {
    try {
        console.log('updateUserDeviceAsync')
        const response = yield call(Api.postSaveUpdateUserDevices, params)
        console.log(typeof response, "Dashboard update")
        yield put({ type: SAVE_UPDATE_USER_DEVICES_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: SAVE_UPDATE_USER_DEVICES_FAIL, payload: e });
    }
}

const watch = function* watch() {
    yield takeEvery(FETCH_REASONS_REQUESTING, watchReasonAsync);
    yield takeEvery(FETCH_EMPLOYEE_HOURS_REQUESTING, watchEmployeeHoursAsync);
    yield takeEvery(FETCH_STATE_LIST_REQUESTING, watchStateListAsync);
    yield takeEvery(FETCH_EMPLOYEE_BASIC_DETAILS_REQUESTING, watchEmployeeBasicDetailsAsync);
    yield takeEvery(FETCH_EMPLOYEE_GUEST_FEEDBACK_REQUESTING, watchEmployeeGuestFeedbackAsync);
    yield takeEvery(FETCH_EMPLOYEE_PERSONAL_DETAILS_REQUESTING, watchEmployeePersonalDetailsAsync);
    yield takeEvery(UPDATE_EMPLOYEE_PERSONAL_DETAILS_REQUESTING, watchUpdateEmployeePersonalDetailsAsync);
    yield takeEvery(GET_NOTIFICATION_LIST_REQUESTING, watchGetNotificationListAsync);
    yield takeEvery(GET_END_EMPLOYEEMENT_REASON_REQUESTING, getEndEmployeementReasonTypeAsync);
    yield takeEvery(SAVE_UPDATE_USER_DEVICES_REQUESTING, updateUserDeviceAsync);
    yield takeEvery(GET_NOTIFICATION_DETAILS_REQUESTING, watchGetNotificationDetailsAsync);
}

export default watch;