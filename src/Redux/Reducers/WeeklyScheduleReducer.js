import {
    WEEKLY_SCHEDULE_INFO_DETAILS, GET_WEATHER_DETAILS_LIST, GET_WEEKLY_SCHEDULE_EMPLOYEE,
    GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN, DELETE_EMPLOYEE_SCHEDULE, CREATE_UPDATE_EMPLOYEE_SCHEDULE, GET_WEEK_DATES,
    GET_TIMEOFF_REASONS_LIST, CREATE_EMPLOYEE_TIMEOFF, GET_EMPLOYEE_TIMEOFF, NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH,
    GET_IDLE_EMPLOYEES_REPORT, GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT, GET_PAYROLL_TAX_LIST, GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE,
    GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE, GET_LINKED_EMPLOYEE_DETAILS, GET_WEEKLY_SCHEDULE_HOURS, CHANGE_EMPLOYEE_STATUS, DELETE_EMPLOYEE_TIMEOFF_DAYWISE
} from '../Types/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case WEEKLY_SCHEDULE_INFO_DETAILS.SUCCESS:
            return { weeklyScheduleInfoSuccess: true, data: action.payload }

        case GET_WEATHER_DETAILS_LIST.SUCCESS:
            return { getWeatherDetailsListSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_EMPLOYEE.SUCCESS:
            return { getWeeklyScheduleEmployeeSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN.SUCCESS:
            return { getWeeklyScheduleEmployeeReturnSuccess: true, data: action.payload }

        case DELETE_EMPLOYEE_SCHEDULE.SUCCESS:
            return { deleteEmployeeScheduleSuccess: true, data: action.payload }

        case CREATE_UPDATE_EMPLOYEE_SCHEDULE.SUCCESS:
            return { createUpdateEmployeeScheduleSuccess: true, data: action.payload }

        case GET_TIMEOFF_REASONS_LIST.SUCCESS:
            return { getTimeoffReasonsSuccess: true, data: action.payload }

        case CREATE_EMPLOYEE_TIMEOFF.SUCCESS:
            return { createTimeoffSuccess: true, data: action.payload }
        
        case GET_EMPLOYEE_TIMEOFF.SUCCESS: 
            return { getEmployeeTimeOffSuccess: true, data: action.payload }

        case NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH.SUCCESS: 
            return { NotifyEmployeeSchedulesOnPublishSuccess: true, data: action.payload }

        case GET_IDLE_EMPLOYEES_REPORT.SUCCESS: 
            return { GetIdleEmployeesReportSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT.SUCCESS: 
            return { GetWeeklyScheduleEmployeeCountSuccess: true, data: action.payload }

        case GET_PAYROLL_TAX_LIST.SUCCESS: 
            return { GetPayrollTaxListSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE.SUCCESS: 
            return { GetweeklyScheduleSharedEmployeeSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE.SUCCESS: 
            return { GetweeklyScheduleSharedEmployeeScheduleSuccess: true, data: action.payload }

        case GET_LINKED_EMPLOYEE_DETAILS.SUCCESS: 
            return { GetLinkedEmployeeDetailsSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_HOURS.SUCCESS: 
            return { GetweeklyScheduleHoursSuccess: true, data: action.payload }

        case CHANGE_EMPLOYEE_STATUS.SUCCESS: 
            return { ChangeEmployeeStatusSuccess: true, data: action.payload }

        case DELETE_EMPLOYEE_TIMEOFF_DAYWISE.SUCCESS: 
            return { deleteEmployeeTimeoffDaywiseSuccess: true, data: action.payload }

        case GET_WEEK_DATES.SUCCESS: 
            return { getWeekDatesSuccess: true, data: action.payload }

        case GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN.ERROR:
        case GET_WEEKLY_SCHEDULE_EMPLOYEE.ERROR:
        case WEEKLY_SCHEDULE_INFO_DETAILS.ERROR:
        case GET_WEATHER_DETAILS_LIST.ERROR:
        case DELETE_EMPLOYEE_SCHEDULE.ERROR:
        case CREATE_UPDATE_EMPLOYEE_SCHEDULE.ERROR:
        case GET_TIMEOFF_REASONS_LIST.ERROR:
        case CREATE_EMPLOYEE_TIMEOFF.ERROR:
        case GET_EMPLOYEE_TIMEOFF.ERROR:
        case NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH.ERROR:
        case GET_IDLE_EMPLOYEES_REPORT.ERROR:
        case GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT.ERROR:
        case GET_PAYROLL_TAX_LIST.ERROR:
        case GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE.ERROR:
        case GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE.ERROR:
        case GET_LINKED_EMPLOYEE_DETAILS.ERROR:
        case GET_WEEKLY_SCHEDULE_HOURS.ERROR:
        case CHANGE_EMPLOYEE_STATUS.ERROR:
        case DELETE_EMPLOYEE_TIMEOFF_DAYWISE.ERROR:
        case GET_WEEK_DATES.ERROR:
            return { isRequestFailed: true, data: action.payload }

        default:
            return state;
    }
}