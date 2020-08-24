
import {
    GET_USER_ROLE_LIST, GET_FINANCIAL_REPORT, GET_SALES_BUILDING_REPORT,
    GET_CUSTOMER_COMMENTS_COUNT,
    GET_EMPLOYEE_PERSONAL_DETAILS,
    GET_EMPLOYEE_BASIC_DETAILS,
    GET_DASHBOARD_DATA
} from '../Types/types'

import Api from '../../Services/Api'


export const getUserRoleRequest = (params) => {
    return {
        type: GET_USER_ROLE_LIST.REQ,
        params,
        constant: GET_USER_ROLE_LIST,
        api: Api.getUserRoleList
    };
}

export const getDashBoardDataRequest = (params) => {
    return {
        type: GET_DASHBOARD_DATA.REQ,
        params,
        constant: GET_DASHBOARD_DATA,
        api: Api.getDashboardData
    }
}

export const getFinancialReportRequest = (params) => {
    return {
        type: GET_FINANCIAL_REPORT.REQ,
        params,
        constant: GET_FINANCIAL_REPORT,
        api: Api.getFinancialReport
    };
}

export const getSalesBuildingReportRequest = (params) => {
    return {
        type: GET_SALES_BUILDING_REPORT.REQ,
        params,
        constant: GET_SALES_BUILDING_REPORT,
        api: Api.getSalesBuildingReport
    };
}

export const getCustomerCommentsCountRequest = (params) => {
    return {
        type: GET_CUSTOMER_COMMENTS_COUNT.REQ,
        params,
        constant: GET_CUSTOMER_COMMENTS_COUNT,
        api: Api.getCustomerCommentsCount
    };
}

//<<<<<<<<======== Dashboard Profile Actions ========>>>>>>
export const getEmployeeBasicDetails = (params) => {
    return {
        type: GET_EMPLOYEE_BASIC_DETAILS.REQ,
        params,
        constant: GET_EMPLOYEE_BASIC_DETAILS,
        api: Api.getEmployeeBasicDetails
    };
}

export const getEmployeePersonalDetails = (params) => {
    return {
        type: GET_EMPLOYEE_PERSONAL_DETAILS.REQ,
        params,
        constant: GET_EMPLOYEE_PERSONAL_DETAILS,
        api: Api.getEmployeePersonalcDetails
    };
}

// export const updateEmployeePersonalDetails = (params) => {
//     return {
//         type: GET_CUSTOMER_COMMENTS_COUNT.REQ,
//         params,
//         constant: GET_CUSTOMER_COMMENTS_COUNT,
//         api: Api.getCustomerCommentsCount
//     };
// }