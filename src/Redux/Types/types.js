import { asyncAction } from '../utils'

//=======>>>>>> Auth Endpoints Types <<<<<<============
export const LOGIN = asyncAction('login');

//=======>>>>>> Dashboard Endpoints Types <<<<<<============
export const GET_USER_ROLE_LIST = asyncAction('get_user_role_list');
export const GET_FINANCIAL_REPORT = asyncAction('get_financial_report');
export const GET_SALES_BUILDING_REPORT = asyncAction('get_sales_building_report');
export const GET_CUSTOMER_COMMENTS_COUNT = asyncAction('get_customer_comments_count');
export const GET_DASHBOARD_DATA = asyncAction('get_dashboard_data');


//=======>>>>>> Document Status Endpoints Types <<<<<<============
export const GET_HEADER_FILTER_VALUES = asyncAction('get_header_filter_values');



//======>>>>>>> Profile Type <<<<<<<<================
export const GET_EMPLOYEE_BASIC_DETAILS = asyncAction('get_employee_basic_details');
export const GET_EMPLOYEE_PERSONAL_DETAILS = asyncAction('get_employee_personal_details');

//======>>>>>>> Weekly Schedule Type <<<<<<<<================
export const WEEKLY_SCHEDULE_INFO_DETAILS = asyncAction('weekly_schedule_info_details');
export const GET_WEATHER_DETAILS_LIST = asyncAction('get_weather_details_list');
export const GET_WEEKLY_SCHEDULE_EMPLOYEE = asyncAction('get_weekly_schedule_employee');
export const GET_WEEKLY_SCHEDULE_EMPLOYEE_RETURN = asyncAction('get_weekly_schedule_employee_return');
export const DELETE_EMPLOYEE_SCHEDULE = asyncAction('delete_employee_schedule');
export const CREATE_UPDATE_EMPLOYEE_SCHEDULE = asyncAction('create_update_employee_schedule');
export const GET_WEEKLY_SUMMARY_WEEKDAY_STATUSLIST = asyncAction('get_weekly_summary_weekday_statuslist');
export const GET_EMPLOYEE_PUNCHDETAIL = asyncAction('get_employee_punchdetail');
export const GET_TIMEOFF_REASONS_LIST = asyncAction('get_timeOff_reasons_list');
export const DELETE_EMPLOYEE_PUNCH_DETAIL = asyncAction('delete_employee_punch_detail');
export const UPDATE_EMPLOYEE_PUNCH_DETAIL = asyncAction('update_employee_punch_detail');
export const CREATE_EMPLOYEE_TIMEOFF = asyncAction('create_employee_timeOff');
export const GET_EMPLOYEE_TIMEOFF = asyncAction('get_employee_timeOff');
export const MANAGE_WEEKLY_SUMMARY_WEEKDAY_STATUS = asyncAction('manage_weekly_summary_weekday_status');
export const NOTIFY_EMPLOYEE_SCHEDULES_ONPUBLISH = asyncAction('notify_employee_schedules_onpublish');
export const GET_IDLE_EMPLOYEES_REPORT = asyncAction('get_idle_employees_report');
export const GET_STORE_LIST_WITH_SETTING = asyncAction('get_store_list_with_setting');
export const GET_STORE_SETTING_DETAILS_LIST = asyncAction('get_store_setting_details_list');
export const GET_CKECKDOCUMENT_STATUS_HIRING_RETURN = asyncAction('get_checkdocument_status_hiring_return');
export const GET_WEEKLY_SCHEDULE_EMPLOYEE_COUNT = asyncAction('get_weekly_schedule_employee_count');
export const GET_PAYROLL_TAX_LIST = asyncAction('get_payroll_tax_list');
export const GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID = asyncAction('get_check_document_status_envelopVoid');
export const EMPLOYEE_EXISTENCE_CHECK_ONHIRING = asyncAction('employee_existence_check_onhiring');
export const HIRE_NEW_EMPLOYEE_MANAGE = asyncAction('hire_new_employee_manage');
export const GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE = asyncAction('get_weekly_schedule_shared_employee');
export const GET_WEEKLY_SCHEDULE_SHARED_EMPLOYEE_SCHEDULE = asyncAction('get_weekly_schedule_shared_employee_schedule');
export const GET_LINKED_EMPLOYEE_DETAILS = asyncAction('get_linked_employee_details');
export const GET_WEEKLY_SCHEDULE_HOURS = asyncAction('get_weekly_schedule_hours');
export const CHANGE_EMPLOYEE_STATUS = asyncAction('change_employee_status');
export const GET_WEEKLY_SUMMARY_SHEET_DATA = asyncAction('get_weekly_summary_sheet_data');
export const DELETE_EMPLOYEE_TIMEOFF_DAYWISE = asyncAction('delete_employee_timeoff_dayWise');
export const FORGOT_PASSWORD = asyncAction('forgot_password');
export const CHANGE_PASSWORD = asyncAction('change_password');
export const CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE = asyncAction('check_document_status_envelop_recipients_email_update');
export const UPDATE_BGC_EVERIFY_STATUS = asyncAction('update_bgc_everify_status');
export const PROCESS_BGC_EVERIFY = asyncAction('process_bgc_everify');
export const UPDATE_PHOTO_MATCHING_DATA = asyncAction('update_photo_matching_data');
export const FETCH_BREAK_WAIVERS_DETAIL = asyncAction('fetch_break_waivers_detail');
export const GET_WEEK_DATES = asyncAction('get_week_dates');

