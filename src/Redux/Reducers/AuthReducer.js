import { LOGIN, FORGOT_PASSWORD, CHANGE_PASSWORD } from '../Types/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  console.log('in reducer', action.type);
  switch (action.type) {

    case LOGIN.SUCCESS:
      return { loginSuccess: true, data: action.payload }
    case FORGOT_PASSWORD.SUCCESS:
      return { forgotPasswordSuccess: true, data: action.payload }
    case CHANGE_PASSWORD.SUCCESS:
      return { changePasswordSuccess: true, data: action.payload }

    case LOGIN.ERROR:
    case FORGOT_PASSWORD.ERROR:
    case CHANGE_PASSWORD.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}