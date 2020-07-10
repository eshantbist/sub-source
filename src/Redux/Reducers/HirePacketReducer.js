import { GET_HEADER_FILTER_VALUES, GET_STORE_LIST_WITH_SETTING, GET_STORE_SETTING_DETAILS_LIST, EMPLOYEE_EXISTENCE_CHECK_ONHIRING, HIRE_NEW_EMPLOYEE_MANAGE } from '../Types/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_HEADER_FILTER_VALUES.SUCCESS:
      return { getHeaderFilterValuesSuccess: true, data: action.payload }
    case GET_STORE_LIST_WITH_SETTING.SUCCESS:
      return { GetStoreListWithSettingSuccess: true, data: action.payload }
    case GET_STORE_SETTING_DETAILS_LIST.SUCCESS:
      return { GetStoreSettingDetailsListSuccess: true, data: action.payload }
    case EMPLOYEE_EXISTENCE_CHECK_ONHIRING.SUCCESS:
      return { EmployeeExistenceCheckOnHiringSuccess: true, data: action.payload }
    case HIRE_NEW_EMPLOYEE_MANAGE.SUCCESS:
      return { HireNewEmployeeManageSuccess: true, data: action.payload }

    case GET_HEADER_FILTER_VALUES.ERROR:
    case GET_STORE_LIST_WITH_SETTING.ERROR:
    case GET_STORE_SETTING_DETAILS_LIST.ERROR:
    case EMPLOYEE_EXISTENCE_CHECK_ONHIRING.ERROR:
    case HIRE_NEW_EMPLOYEE_MANAGE.ERROR:
      return { isRequestFailed: true, data: action.payload }

    default:
      return state;
  }
}