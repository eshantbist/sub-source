
import {
    WEEKLY_SCHEDULE_INFO_DETAILS,
    GET_WEATHER_DETAILS_LIST,
    GET_WEEKLY_SCHEDULE_EMPLOYEE,
    GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN,
    DELETE_EMPLOYEE_SCHEDULE,
    CREATE_UPDATE_EMPLOYEE_SCHEDULE,
    GET_TIMEOFF_REASONS_LIST,
    CREATE_EMPLOYEE_TIMEOFF,
    GET_EMPLOYEE_TIMEOFF,
    NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH,
    GET_IDLE_EMPLOYEES_REPORT,
    GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT,
    GET_PAYROLL_TAX_LIST,
    GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE,
    GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE,
    GET_LINKED_EMPLOYEE_DETAILS,
    GET_WEEKLY_SCHEDULE_HOURS,
    CHANGE_EMPLOYEE_STATUS,
    DELETE_EMPLOYEE_TIMEOFF_DAYWISE,
    GET_WEEK_DATES,
} from '../Types/types'

import Api from '../../Services/Api'

export const getWeeklyScheduleInfoRequest = (params) => {
    console.log(params)
    return {
        type: WEEKLY_SCHEDULE_INFO_DETAILS.REQ,
        params,
        constant: WEEKLY_SCHEDULE_INFO_DETAILS,
        api: Api.getWeeklyScheduleInfo
    };
}


export const getWeatherDetailsListRequest = (params) => {
    console.log(params)
    return {
        type: GET_WEATHER_DETAILS_LIST.REQ,
        params,
        constant: GET_WEATHER_DETAILS_LIST,
        api: Api.getWeatherDetailsList
    };
}

export const getWeeklyScheduleEmployeeRequest = (params) => {
    console.log(params)
    return {
        type: GET_WEEKLY_SCHEDULE_EMPLOYEE.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_EMPLOYEE,
        api: Api.getWeeklyScheduleEmployee
    };
}


export const getWeeklyScheduleEmployeeReturnRequest = (params) => {
    console.log(params)
    return {
        type: GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN,
        api: Api.getWeeklyScheduleEmployeeReturn
    };
}

export const DeleteEmployeeSchedule = (params) => {
    console.log(params)
    return {
        type: DELETE_EMPLOYEE_SCHEDULE.REQ,
        params,
        constant: DELETE_EMPLOYEE_SCHEDULE,
        api: Api.deleteEmployeeSchedule
    };
}

export const CreateUpdateEmployeeSchedule = (params) => {
    console.log(params)
    return {
        type: CREATE_UPDATE_EMPLOYEE_SCHEDULE.REQ,
        params,
        constant: CREATE_UPDATE_EMPLOYEE_SCHEDULE,
        api: Api.createUpdateEmployeeSchedule
    };
}

export const getTimeOffReasonsListRequest = () => {
    return {
        type: GET_TIMEOFF_REASONS_LIST.REQ,
        constant: GET_TIMEOFF_REASONS_LIST,
        api: Api.getTimeoffReasonsList
    };
}

export const CreateEmployeeTimeOff = (params) => {
    return {
        type: CREATE_EMPLOYEE_TIMEOFF.REQ,
        params,
        constant: CREATE_EMPLOYEE_TIMEOFF,
        api: Api.createEmployeeTimeoff
    };
}

export const GetEmployeeTimeOffRequest = (params) => {
    return {
        type: GET_EMPLOYEE_TIMEOFF.REQ,
        params,
        constant: GET_EMPLOYEE_TIMEOFF,
        api: Api.getEmployeeTimeoff
    };
}

export const NotifyEmployeeSchedulesOnPublishRequest = (params) => {
    return {
        type: NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH.REQ,
        params,
        constant: NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH,
        api: Api.NotifyEmployeeSchedulesOnPublish
    }
}

export const getIdleEmployeesReportRequest = (params) => {
    return {
        type: GET_IDLE_EMPLOYEES_REPORT.REQ,
        params,
        constant: GET_IDLE_EMPLOYEES_REPORT,
        api: Api.getIdleEmployeesReport
    }
}

export const getWeeklyScheduleEmployeeCountRequest = (params) => {
    return {
        type: GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT,
        api: Api.getWeeklyScheduleEmployeeCount
    }
}

export const getPayrollTaxListRequest = (params) => {
    return {
        type: GET_PAYROLL_TAX_LIST.REQ,
        params,
        constant: GET_PAYROLL_TAX_LIST,
        api: Api.getPayrollTaxList
    }
}

export const getweeklyScheduleSharedEmployeeRequest = (params) => {
    return {
        type: GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE,
        api: Api.getweeklyScheduleSharedEmployee
    }
}

export const getweeklyScheduleSharedEmployeeScheduleRequest = (params) => {
    return {
        type: GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE,
        api: Api.getweeklyScheduleSharedEmployeeSchedule
    }
}

export const getLinkedEmployeeDetailsRequest = (params) => {
    return {
        type: GET_LINKED_EMPLOYEE_DETAILS.REQ,
        params,
        constant: GET_LINKED_EMPLOYEE_DETAILS,
        api: Api.getLinkedEmployeeDetails
    }
}

export const getweeklyScheduleHoursRequest = (params) => {
    return {
        type: GET_WEEKLY_SCHEDULE_HOURS.REQ,
        params,
        constant: GET_WEEKLY_SCHEDULE_HOURS,
        api: Api.getweeklyScheduleHours
    }
}

export const ChangeEmployeeStatusRequest = (params) => {
    return {
        type: CHANGE_EMPLOYEE_STATUS.REQ,
        params,
        constant: CHANGE_EMPLOYEE_STATUS,
        api: Api.changeEmployeeStatus
    }
}

export const DeleteEmployeeTimeOffDayWise = (params) => {
    return {
        type: DELETE_EMPLOYEE_TIMEOFF_DAYWISE.REQ,
        params,
        constant: DELETE_EMPLOYEE_TIMEOFF_DAYWISE,
        api: Api.deleteEmployeeTimeOffDayWise
    }
}

export const getWeekDatesRequest = (params) => {
    return {
        type: GET_WEEK_DATES.REQ,
        params,
        constant: GET_WEEK_DATES,
        api: Api.getWeekDates
    }
}