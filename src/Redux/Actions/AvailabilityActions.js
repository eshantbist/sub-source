import {
    FETCH_EMPLOYEE_AVAILABILITY_REQUESTING,
    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_REQUESTING,
    DELETE_EMPLOYEE_AVAILABILITY_REQUESTING
} from '@Types/AvailabilityTypes';


//--->>Function to Employee Availability----->>>>>
export const getEmployeeAvailability = () => {
    return {
        type: FETCH_EMPLOYEE_AVAILABILITY_REQUESTING,

    };
}

//--->>Function to Save Update Employee Availability----->>>>>
export const saveUpdateEmployeeAvailability = (params) => {
    return {
        type: SAVE_UPDATE_EMPLOYEE_AVAILABILITY_REQUESTING,
        params

    };
}

//--->>Function to Save Update Employee Availability----->>>>>
export const deleteEmployeeAvailability = (params) => {
    return {
        type: DELETE_EMPLOYEE_AVAILABILITY_REQUESTING,
        params

    };
}