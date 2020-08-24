import {
  GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST,
  GET_EMPLOYEE_PUNCHDETAIL,
  DELETE_EMPLOYEE_PUNCH_DETAIL,
  UPDATE_EMPLOYEE_PUNCH_DETAIL,
  MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS,
  GET_WEEKLY_SUMMARY_SHEET_DATA,
  FETCH_BREAK_WAIVERS_DETAIL
} from '../Types/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

      case GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST.SUCCESS:
          return { getweeklySummaryWeekdayStatusListSuccess: true, data: action.payload }
      case GET_EMPLOYEE_PUNCHDETAIL.SUCCESS:
          return { getEmployeePunchDetailSuccess: true, data: action.payload }
      case DELETE_EMPLOYEE_PUNCH_DETAIL.SUCCESS:
          return { deleteEmployeePunchDetailSuccess: true, data: action.payload }
      case UPDATE_EMPLOYEE_PUNCH_DETAIL.SUCCESS:
          return { updateEmployeePunchDetailSuccess: true, data: action.payload }
      case MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS.SUCCESS:  
          return { manageWeeklySummaryWeekdayStatusSuccess: true, data: action.payload }
      case GET_WEEKLY_SUMMARY_SHEET_DATA.SUCCESS:  
          return { getWeeklySummarySheetDataSuccess: true, data: action.payload }
      case FETCH_BREAK_WAIVERS_DETAIL.SUCCESS:  
          return { getFetchBreakWaiversDetailSuccess: true, data: action.payload }

      case GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST.ERROR:
      case GET_EMPLOYEE_PUNCHDETAIL.ERROR:
      case DELETE_EMPLOYEE_PUNCH_DETAIL.ERROR:
      case UPDATE_EMPLOYEE_PUNCH_DETAIL.ERROR:
      case MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS.ERROR:
      case GET_WEEKLY_SUMMARY_SHEET_DATA.ERROR:
      case FETCH_BREAK_WAIVERS_DETAIL.ERROR:
          return { isRequestFailed: true, data: action.payload }

      default:
          return state;
  }
}