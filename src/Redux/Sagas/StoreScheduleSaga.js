import { put, call, takeEvery } from 'redux-saga/effects';

//ASSETS
import {
    GET_STORE_LIST_SUCCESS,
    GET_STORE_LIST_REQUESTING,
    GET_STORE_LIST__FAIL,
} from '@Types/StoreScheduleTypes'
import Api from '../../Services/Api';

/************************ Employee MySchedule Function ****************************/

export const watchCreateEmployeeTimeOffAsync = function* watchCreateEmployeeTimeOffAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING STORE SCHEDULE', params)
        const response = yield call(Api.getStoreList, params)
        yield put({ type: GET_STORE_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: GET_STORE_LIST__FAIL, payload: e });
    }
}


watchStoreSchedule = function* watchStoreSchedule() {
    yield takeEvery(GET_STORE_LIST_REQUESTING, watchCreateEmployeeTimeOffAsync);
}

export default watchStoreSchedule;