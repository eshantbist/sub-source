
import { GET_HEADER_FILTER_VALUES, GET_STORE_LIST_WITH_SETTING, GET_STORE_SETTING_DETAILS_LIST, EMPLOYEE_EXISTENCE_CHECK_ONHIRING,
  HIRE_NEW_EMPLOYEE_MANAGE } from '../Types/types'

import Api from '../../Services/Api';

export const getHeaderFilterValuesRequest = (params) => {
  return {
    type: GET_HEADER_FILTER_VALUES.REQ,
    params,
    constant: GET_HEADER_FILTER_VALUES,
    api: Api.getHeaderFilterValues
  };
}

export const getStoreListWithSettingRequest = (params) => {
  return {
    type: GET_STORE_LIST_WITH_SETTING.REQ,
    params,
    constant: GET_STORE_LIST_WITH_SETTING,
    api: Api.getStoreListWithSetting
  }
}

export const getStoreSettingDetailsListRequest = (params) => {
  return {
    type: GET_STORE_SETTING_DETAILS_LIST.REQ,
    params,
    constant: GET_STORE_SETTING_DETAILS_LIST,
    api: Api.GetStoreSettingDetailsList
  }
}

export const EmployeeExistenceCheckOnHiringRequest = (params) => {
  return {
    type: EMPLOYEE_EXISTENCE_CHECK_ONHIRING.REQ,
    params,
    constant: EMPLOYEE_EXISTENCE_CHECK_ONHIRING,
    api: Api.EmployeeExistenceCheckOnHiring
  }
}

export const HireNewEmployeeManageRequest = (params) => {
  return {
    type: HIRE_NEW_EMPLOYEE_MANAGE.REQ,
    params,
    constant: HIRE_NEW_EMPLOYEE_MANAGE,
    api: Api.HireNewEmployeeManage
  }
}
