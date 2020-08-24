import {
    GET_STORE_LIST_REQUESTING,
    GET_STORE_SCHEDULE_REQUESTING,
    GET_ALL_STORE_LIST_REQUESTING,
    OFFER_OPENED_SHIFT_REQUESTING,
    COVER_SHIFT_REQUESTING
} from '@Types/StoreScheduleTypes';


//--->>Function to Employee Availability----->>>>>
export const getStoreList = (params) => {
    console.log('ACTION CALLED ----------------------')
    return {
        type: GET_STORE_LIST_REQUESTING,
        params
    };
}

export const getStoreSchedule = (params) => {
    return {
        type: GET_STORE_SCHEDULE_REQUESTING,
        params
    };
}

export const getAllStoreRequest = () => {
    return {
        type: GET_ALL_STORE_LIST_REQUESTING,
    }
}

export const offerOpenedShiftRequest = (params) => {
    return {
        type: OFFER_OPENED_SHIFT_REQUESTING,
        params
    };
}

export const coverShiftRequest = (params) => {
    return {
        type: COVER_SHIFT_REQUESTING,
        params
    };
}
