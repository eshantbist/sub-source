// //LIBRARIES
// import { put, call, takeEvery } from 'redux-saga/effects';

// //ASSETS
// import {
//   LOGIN_USER_SUCCESS,
//   LOGIN_USER_REQUESTING,
//   LOGIN_USER_FAIL
// } from '@Types/AuthTypes'
// import Api from '../../Services/Api';

// /************************ Login function ****************************/


// export const watchLoginAsync = function* watchLoginAsync({ params }) {
//   console.log(params)
//   try {
//     console.log('---------------SAGA CALLING')
//     const response = yield call(Api.userLogin, params)
//     console.log(response)
//     yield put({ type: LOGIN_USER_SUCCESS, payload: response });
//   }
//   catch (e) {
//     //  alert(e)
//     console.log(e, 'error');
//     yield put({ type: LOGIN_USER_FAIL, payload: e });
//   }
// }


// const watchLogin = function* watchLogin() {
//   yield takeEvery(LOGIN_USER_REQUESTING, watchLoginAsync);
// }

// export default watchLogin;

import { put, call, takeEvery } from 'redux-saga/effects'
import { LOGIN, FORGOT_PASSWORD, CHANGE_PASSWORD } from '../Types/types'

import { asyncSaga } from '../utils';

export function* authSaga() {
  yield takeEvery(LOGIN.REQ, asyncSaga);
  yield takeEvery(FORGOT_PASSWORD.REQ, asyncSaga);
  yield takeEvery(CHANGE_PASSWORD.REQ, asyncSaga);
 
}

export default authSaga;