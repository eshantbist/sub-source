
import { put, call, takeEvery } from 'redux-saga/effects'
import {
  GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST,
  GET_EMPLOYEE_PUNCHDETAIL,
  DELETE_EMPLOYEE_PUNCH_DETAIL,
  UPDATE_EMPLOYEE_PUNCH_DETAIL,
  MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS,
  GET_WEEKLY_SUMMARY_SHEET_DATA,
  FETCH_BREAK_WAIVERS_DETAIL,
} from '../Types/types'

import { asyncSaga } from '../utils';

export function* WeeklySummarySheetSaga() {
    yield takeEvery(GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST.REQ, asyncSaga);
    yield takeEvery(GET_EMPLOYEE_PUNCHDETAIL.REQ, asyncSaga);
    yield takeEvery(DELETE_EMPLOYEE_PUNCH_DETAIL.REQ, asyncSaga);
    yield takeEvery(UPDATE_EMPLOYEE_PUNCH_DETAIL.REQ, asyncSaga);
    yield takeEvery(MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS.REQ, asyncSaga);
    yield takeEvery(GET_WEEKLY_SUMMARY_SHEET_DATA.REQ, asyncSaga);
    yield takeEvery(FETCH_BREAK_WAIVERS_DETAIL.REQ, asyncSaga);
}

export default WeeklySummarySheetSaga;