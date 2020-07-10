
import { put, call, takeEvery } from 'redux-saga/effects';
import { GET_HEADER_FILTER_VALUES, GET_STORE_LIST_WITH_SETTING, GET_STORE_SETTING_DETAILS_LIST, EMPLOYEE_EXISTENCE_CHECK_ONHIRING, HIRE_NEW_EMPLOYEE_MANAGE } from '../Types/types';

import { asyncSaga } from '../utils';

export function* hirePacketSaga() {
  yield takeEvery(GET_HEADER_FILTER_VALUES.REQ, asyncSaga);
  yield takeEvery(GET_STORE_LIST_WITH_SETTING.REQ, asyncSaga);
  yield takeEvery(GET_STORE_SETTING_DETAILS_LIST.REQ, asyncSaga);
  yield takeEvery(EMPLOYEE_EXISTENCE_CHECK_ONHIRING.REQ, asyncSaga);
  yield takeEvery(HIRE_NEW_EMPLOYEE_MANAGE.REQ, asyncSaga);
}

export default hirePacketSaga;