// import {
//   LOGIN_USER_REQUESTING,
//   LOGOUT_USER_REQUESTING,
// } from '@Types/AuthTypes';
import { LOGIN, FORGOT_PASSWORD, CHANGE_PASSWORD } from '../Types/types'

import Api from '../../Services/Api'

//--->>Function to request User Login----->>>>>

// export const loginRequest = (params) => {
//   return {
//     type: LOGIN_USER_REQUESTING,
//     params
//   };
// }


export const loginRequest = (params) => {
  console.log('called...***',params)
  return {
    type: LOGIN.REQ,
    params,
    constant: LOGIN,
    api: Api.login
  };
}

//--->>Function to Logout User----->>>>>
export const logOutRequest = () => {
  return {
    type: LOGOUT_USER_REQUESTING
  };
}

export const ResetPasswordRequest = (params) => {
  return {
    type: FORGOT_PASSWORD.REQ,
    params,
    constant: FORGOT_PASSWORD,
    api: Api.ForgotPassword
  };
}

export const ChangePasswordRequest = (params) => {
  return {
    type: CHANGE_PASSWORD.REQ,
    params,
    constant: CHANGE_PASSWORD,
    api: Api.ChangePassword
  };
}