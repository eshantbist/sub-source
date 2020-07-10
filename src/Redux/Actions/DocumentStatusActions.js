
import { GET_HEADER_FILTER_VALUES, GET_CKECKDOCUMENT_STATUS_HIRING_RETURN, GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID,
  CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE,UPDATE_BGC_EVERIFY_STATUS,PROCESS_BGC_EVERIFY, UPDATE_PHOTO_MATCHING_DATA
} from '../Types/types'

import Api from '../../Services/Api'


export const getHeaderFilterValues = (params) => {
  return {
      type: GET_HEADER_FILTER_VALUES.REQ,
      params,
      constant: GET_HEADER_FILTER_VALUES,
      api: Api.getHeaderFilterValues
  };
}

export const getCheckDocumentStatusHiringReturnRequest = (params) => {
  return {
    type: GET_CKECKDOCUMENT_STATUS_HIRING_RETURN.REQ,
    params,
    constant: GET_CKECKDOCUMENT_STATUS_HIRING_RETURN ,
    api: Api.getCheckDocumentStatusHiringReturnRequest
  }
}

export const getCheckDocumentStatusEnvelopVoidRequest = (params) => {
  return {
    type: GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID.REQ,
    params,
    constant: GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID ,
    api: Api.getCheckDocumentStatusEnvelopVoid
  }
}

export const CheckDocumentStatusEnvelopRecipientsEmailUpdate = (params) => {
  return {
    type: CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE.REQ,
    params,
    constant: CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE ,
    api: Api.CheckDocumentStatusEnvelopRecipientsEmailUpdate
  }
}

export const UpdateBGCEverifyStatusRequest = (params) => {
  return {
    type: UPDATE_BGC_EVERIFY_STATUS.REQ,
    params,
    constant: UPDATE_BGC_EVERIFY_STATUS ,
    api: Api.UpdateBGCEverifyStatus
  }
}

export const ProcessBGCEverifyRequest = (params) => {
  return {
    type: PROCESS_BGC_EVERIFY.REQ,
    params,
    constant: PROCESS_BGC_EVERIFY ,
    api: Api.ProcessBGCEverify
  }
}

export const UpdatePhotoMatchingDataRequest = (params) => {
  return {
    type: UPDATE_PHOTO_MATCHING_DATA.REQ,
    params,
    constant: UPDATE_PHOTO_MATCHING_DATA ,
    api: Api.UpdatePhotoMatchingData
  }
}