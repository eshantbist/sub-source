
import { put, call, takeEvery } from 'redux-saga/effects'
import {
    GET_USER_ROLE_LIST, GET_FINANCIAL_REPORT, GET_SALES_BUILDING_REPORT,
    GET_CUSTOMER_COMMENTS_COUNT,
    GET_EMPLOYEE_BASIC_DETAILS,
    GET_EMPLOYEE_PERSONAL_DETAILS,
    GET_DASHBOARD_DATA,
} from '../Types/types'

import { asyncSaga } from '../utils';

export function* dashboardSaga() {
    yield takeEvery(GET_USER_ROLE_LIST.REQ, asyncSaga);
    yield takeEvery(GET_DASHBOARD_DATA.REQ, asyncSaga);
    yield takeEvery(GET_FINANCIAL_REPORT.REQ, asyncSaga);
    yield takeEvery(GET_SALES_BUILDING_REPORT.REQ, asyncSaga);
    yield takeEvery(GET_CUSTOMER_COMMENTS_COUNT.REQ, asyncSaga);
    yield takeEvery(GET_EMPLOYEE_BASIC_DETAILS.REQ, asyncSaga);
    yield takeEvery(GET_EMPLOYEE_PERSONAL_DETAILS.REQ, asyncSaga);

}

export default dashboardSaga;