import { put, call, takeEvery } from 'redux-saga/effects';

//ASSETS
import {
    GET_STORE_LIST_SUCCESS,
    GET_STORE_LIST_REQUESTING,
    GET_STORE_LIST__FAIL,

    GET_STORE_SCHEDULE_REQUESTING, GET_STORE_SCHEDULE_SUCCESS, GET_STORE_SCHEDULE_FAIL,
    GET_ALL_STORE_LIST_REQUESTING, GET_ALL_STORE_LIST_SUCCESS, GET_ALL_STORE_LIST_FAIL,
    OFFER_OPENED_SHIFT_REQUESTING, OFFER_OPENED_SHIFT_SUCCESS, OFFER_OPENED_SHIFT_FAIL,
    COVER_SHIFT_REQUESTING, COVER_SHIFT_SUCCESS, COVER_SHIFT_FAIL
} from '@Types/StoreScheduleTypes'
import Api from '../../Services/Api';

/************************ Employee MySchedule Function ****************************/

export const watchCreateEmployeeTimeOffAsync = function* watchCreateEmployeeTimeOffAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING STORE SCHEDULE', params)
        const response = yield call(Api.getStoreList, params)
        console.log(response)
        yield put({ type: GET_STORE_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_STORE_LIST__FAIL, payload: e });
    }
}

export const getStoreScheduleAsync = function* getStoreScheduleAsync({ params }) {
    try {
        const response = yield call(Api.getStoreSchedule, params)
        console.log(response)
        yield put({ type: GET_STORE_SCHEDULE_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_STORE_SCHEDULE_FAIL, payload: e });
    }
}

export const offerOpenedShiftAsync = function* offerOpenedShiftAsync({ params }) {
    try {
        const response = yield call(Api.offerOpenedShift, params)
        console.log(response)
        yield put({ type: OFFER_OPENED_SHIFT_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: OFFER_OPENED_SHIFT_FAIL, payload: e });
    }
}

export const coverShiftAsync = function* coverShiftAsync({ params }) {
    try {
        const response = yield call(Api.coverShift, params)
        console.log(response)
        yield put({ type: COVER_SHIFT_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: COVER_SHIFT_FAIL, payload: e });
    }
}

export const getAllStoreListAsync = function* getAllStoreListAsync() {
    try {
        const response = yield call(Api.getAllStoreList)
        yield put({ type: GET_ALL_STORE_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_ALL_STORE_LIST_FAIL, payload: e });
    }
}


watchStoreSchedule = function* watchStoreSchedule() {
    yield takeEvery(GET_STORE_LIST_REQUESTING, watchCreateEmployeeTimeOffAsync);
    yield takeEvery(GET_STORE_SCHEDULE_REQUESTING, getStoreScheduleAsync);
    yield takeEvery(GET_ALL_STORE_LIST_REQUESTING, getAllStoreListAsync);
    yield takeEvery(OFFER_OPENED_SHIFT_REQUESTING, offerOpenedShiftAsync);
    yield takeEvery(COVER_SHIFT_REQUESTING, coverShiftAsync);

}

export default watchStoreSchedule;