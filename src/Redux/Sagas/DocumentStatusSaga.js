
import { put, call, takeEvery } from 'redux-saga/effects'
import { GET_HEADER_FILTER_VALUES, GET_CKECKDOCUMENT_STATUS_HIRING_RETURN, GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID,
    CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE,UPDATE_BGC_EVERIFY_STATUS, PROCESS_BGC_EVERIFY, UPDATE_PHOTO_MATCHING_DATA
} from '../Types/types'

import { asyncSaga } from '../utils';

export function* documentStatusSaga() {
    yield takeEvery(GET_HEADER_FILTER_VALUES.REQ, asyncSaga);
    yield takeEvery(GET_CKECKDOCUMENT_STATUS_HIRING_RETURN.REQ, asyncSaga);
    yield takeEvery(GET_CHECK_DOCUMENT_STATUS_ENVELOPVOID.REQ, asyncSaga);
    yield takeEvery(CHECK_DOCUMENT_STATUS_ENVELOP_RECIPIENTS_EMAIL_UPDATE.REQ, asyncSaga);
    yield takeEvery(UPDATE_BGC_EVERIFY_STATUS.REQ, asyncSaga);
    yield takeEvery(PROCESS_BGC_EVERIFY.REQ, asyncSaga);
    yield takeEvery(UPDATE_PHOTO_MATCHING_DATA.REQ, asyncSaga);
}

export default documentStatusSaga;