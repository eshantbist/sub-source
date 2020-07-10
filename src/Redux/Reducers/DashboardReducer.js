import {
    GET_USER_ROLE_LIST, GET_FINANCIAL_REPORT, GET_SALES_BUILDING_REPORT,
    GET_CUSTOMER_COMMENTS_COUNT,
    GET_EMPLOYEE_BASIC_DETAILS,
    GET_EMPLOYEE_PERSONAL_DETAILS,
    GET_DASHBOARD_DATA
} from '../Types/types';

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {


        case GET_USER_ROLE_LIST.SUCCESS:
            return { getUserRoleListSuccess: true, data: action.payload }

        case GET_DASHBOARD_DATA.SUCCESS:
            return { getDashboardDataSuccess: true, data: action.payload }

        case GET_FINANCIAL_REPORT.SUCCESS:
            return { getFinancialReportSuccess: true, data: action.payload }

        case GET_SALES_BUILDING_REPORT.SUCCESS:
            return { getSalesBuildingReportSuccess: true, data: action.payload }

        case GET_CUSTOMER_COMMENTS_COUNT.SUCCESS:
            return { getCustomerCommentsCountSuccess: true, data: action.payload }

        case GET_EMPLOYEE_BASIC_DETAILS.SUCCESS:
            return { getEmployeeBasicDetailSuccess: true, data: action.payload }

        case GET_EMPLOYEE_PERSONAL_DETAILS.SUCCESS:
            return { getEmployeePersonalDetailSuccess: true, data: action.payload }

        case GET_USER_ROLE_LIST.ERROR:
        case GET_DASHBOARD_DATA.ERROR:
        case GET_EMPLOYEE_BASIC_DETAILS.ERROR:
        case GET_EMPLOYEE_PERSONAL_DETAILS.ERROR:
        case GET_FINANCIAL_REPORT.ERROR:
        case GET_SALES_BUILDING_REPORT.ERROR:
        case GET_CUSTOMER_COMMENTS_COUNT.ERROR:
            return { isRequestFailed: true, data: action.payload }

        default:
            return state;
    }
}