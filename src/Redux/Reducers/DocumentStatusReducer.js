import { GET_HEADER_FILTER_VALUES, GET_CKECKDOCUMENT_STATUS_HIRING_RETURN, GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID,
    CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE,UPDATE_BGC_EVERIFY_STATUS, PROCESS_BGC_EVERIFY,
    UPDATE_PHOTO_MATCHING_DATA
} from '../Types/types'

const INITIAL_STATE = {}


export default (state = INITIAL_STATE, action) => {
    console.log(action,"Action IN DocumentReducer")
    switch (action.type) {

        case GET_HEADER_FILTER_VALUES.SUCCESS:
            return { getHeaderFilterValuesSucess: true, data: action.payload }
        case GET_CKECKDOCUMENT_STATUS_HIRING_RETURN.SUCCESS:
            return { GetCheckDocumentStatusHiringReturnSucess: true, data: action.payload }
        case GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID.SUCCESS:
            return { GetCheckDocumentStatusEnvelopVoidSuccess: true, data: action.payload }
        case CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE.SUCCESS:
            return { CheckDocumentStatusEnvelopRecipientsEmailUpdateSuccess: true, data: action.payload }
        case UPDATE_BGC_EVERIFY_STATUS.SUCCESS:
            return { UpdateBGCEverifyStatusSuccess: true, data: action.payload }
        case PROCESS_BGC_EVERIFY.SUCCESS:
            return { ProcessBGCEverifySuccess: true, data: action.payload }
        case UPDATE_PHOTO_MATCHING_DATA.SUCCESS:
            return { UpdatePhotoMatchingDataSuccess: true, data: action.payload }

        case GET_HEADER_FILTER_VALUES.ERROR:
        case GET_CKECKDOCUMENT_STATUS_HIRING_RETURN.ERROR:
        case GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID.ERROR:
        case CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE.ERROR:
        case UPDATE_BGC_EVERIFY_STATUS.ERROR:
        case PROCESS_BGC_EVERIFY.ERROR:
        case UPDATE_PHOTO_MATCHING_DATA.ERROR:
            return { getHeaderFilterValuesSucess: false }

        default:
            return state;
    }
}