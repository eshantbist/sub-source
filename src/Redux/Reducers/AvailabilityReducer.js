import {
    FETCH_EMPLOYEE_AVAILABILITY_SUCCESS,
    FETCH_EMPLOYEE_AVAILABILITY_FAIL,

    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_SUCCESS,
    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_FAIL,

    DELETE_EMPLOYEE_AVAILABILITY_SUCCESS,
    DELETE_EMPLOYEE_AVAILABILITY_FAIL
} from '@Types/AvailabilityTypes'

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    console.log('*****************REDUCER')
    switch (action.type) {
        // ==================================FETCH_EMPLOYEE_AVAILABILITY
        case FETCH_EMPLOYEE_AVAILABILITY_SUCCESS:
            return { employeeAvailabilitySuccess: true, employeeAvailabilityData: action.payload };
        case FETCH_EMPLOYEE_AVAILABILITY_FAIL:
            return { employeeAvailabilityFail: true };

        // ==================================SAVE_UPDATE_EMPLOYEE_AVAILABILITY
        case SAVE_UPDATE_EMPLOYEE_AVAILABILITY_SUCCESS:
            return { saveUpdateEmployeeAvailabilitySuccess: true, saveUpdateEmployeeAvailabilityData: action.payload };
        case SAVE_UPDATE_EMPLOYEE_AVAILABILITY_FAIL:
            return { saveUpdateEmployeeAvailabilityFail: true };

        // ==================================DELETE_EMPLOYEE_AVAILABILITY
        case DELETE_EMPLOYEE_AVAILABILITY_SUCCESS:
            return { deleteEmployeeAvailabilitySuccess: true, deleteEmployeeAvailabilityData: action.payload };
        case DELETE_EMPLOYEE_AVAILABILITY_FAIL:
            return { deleteEmployeeAvailabilityFail: true };

        default:
            return state;
    };
};