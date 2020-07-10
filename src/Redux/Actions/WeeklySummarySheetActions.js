import {
  GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST,
  GET_EMPLOYEE_PUNCHDETAIL,
  DELETE_EMPLOYEE_PUNCH_DETAIL,
  MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS,
  GET_WEEKLY_SUMMARY_SHEET_DATA,
  UPDATE_EMPLOYEE_PUNCH_DETAIL,
  FETCH_BREAK_WAIVERS_DETAIL

} from '../Types/types'

import Api from '../../Services/Api'

export const getWeeklySummaryWeekDayStatusList = (params) => {
  console.log(params)
  return {
      type: GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST.REQ,
      params,
      constant: GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST,
      api: Api.getWeeklySummaryWeekdayStatusList
  };
}

export const getWeeklySummarySheetDataRequest = (params) => {
  return {
    type: GET_WEEKLY_SUMMARY_SHEET_DATA.REQ,
    params,
    constant: GET_WEEKLY_SUMMARY_SHEET_DATA,
    api: Api.getWeeklySummarySheetData
  };
}

export const getEmployeePunchDetailRequest = (params) => {
  console.log(params)
  return {
    type: GET_EMPLOYEE_PUNCHDETAIL.REQ,
    params,
    constant: GET_EMPLOYEE_PUNCHDETAIL,
    api: Api.getEmployeePunchDetail,
  }
}

export const DeleteEmployeePunchDetail = (params) => {
  console.log(params)
  return {
    type: DELETE_EMPLOYEE_PUNCH_DETAIL.REQ,
    params,
    constant: DELETE_EMPLOYEE_PUNCH_DETAIL,
    api: Api.deleteEmployeePunchDetail,
  }
}

export const UpdateEmployeePunchDetailRequest = (params) => {
  console.log(params)
  return {
    type: UPDATE_EMPLOYEE_PUNCH_DETAIL.REQ,
    params,
    constant: UPDATE_EMPLOYEE_PUNCH_DETAIL,
    api: Api.updateEmployeePunchDetail,
  }
}

export const ManageWeeklySummaryWeekDayStatus = (params) => {
  console.log('p-->',params)
  return {
    type: MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS.REQ,
    params,
    constant: MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS,
    api: Api.manageWeeklySummaryWeekdayStatus,
  }
}

export const FetchBreakWaiversDetailRequest = (params) => {
  return {
      type: FETCH_BREAK_WAIVERS_DETAIL.REQ,
      params,
      constant: FETCH_BREAK_WAIVERS_DETAIL,
      api: Api.FetchBreakWaiversDetail
  }
}