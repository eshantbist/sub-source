import {
    GET_STORE_LIST_SUCCESS, GET_STORE_LIST__FAIL,
    GET_STORE_SCHEDULE_SUCCESS, GET_STORE_SCHEDULE_FAIL,
    GET_ALL_STORE_LIST_SUCCESS, GET_ALL_STORE_LIST_FAIL,
    OFFER_OPENED_SHIFT_SUCCESS, OFFER_OPENED_SHIFT_FAIL,
    COVER_SHIFT_SUCCESS, COVER_SHIFT_FAIL
} from '@Types/StoreScheduleTypes'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('REDUCER CALLED ----------------------')
    console.log('*****************REDUCER', action)
    switch (action.type) {
        // ==================================CREATE_EMPLOYEE_TIME_OFF
        case GET_STORE_LIST_SUCCESS:
            return { getStoreListSuccess: true, storeListData: action.payload, ...state };

        case GET_STORE_LIST__FAIL:
            return { getStoreListFail: true };

        case GET_STORE_SCHEDULE_SUCCESS:
            return { getStoreScheduleSuccess: true, data: action.payload }

        case GET_STORE_SCHEDULE_FAIL:
            return { getStoreScheduleFailed: true }

        case GET_ALL_STORE_LIST_SUCCESS:
            return { getAllStoreSuccess: true, data: action.payload }

        case GET_ALL_STORE_LIST_FAIL:
            return { getAllStoreFailed: true }

        case OFFER_OPENED_SHIFT_SUCCESS:
            return { offerOpenedShiftSuccess: true, data: action.payload }

        case OFFER_OPENED_SHIFT_FAIL:
            return { offerOpenedShiftFailed: true }

        case COVER_SHIFT_SUCCESS:
            return { coverShiftSuccess: true, data: action.payload }

        case COVER_SHIFT_FAIL:
            return { coverShiftFailed: true }

        default:
            return state;
    };
};