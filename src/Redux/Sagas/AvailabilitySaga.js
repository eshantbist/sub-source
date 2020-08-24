import { put, call, takeEvery } from 'redux-saga/effects';

//ASSETS
import {
    FETCH_EMPLOYEE_AVAILABILITY_SUCCESS,
    FETCH_EMPLOYEE_AVAILABILITY_REQUESTING,
    FETCH_EMPLOYEE_AVAILABILITY_FAIL,

    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_SUCCESS,
    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_REQUESTING,
    SAVE_UPDATE_EMPLOYEE_AVAILABILITY_FAIL,

    DELETE_EMPLOYEE_AVAILABILITY_SUCCESS,
    DELETE_EMPLOYEE_AVAILABILITY_REQUESTING,
    DELETE_EMPLOYEE_AVAILABILITY_FAIL
} from '@Types/AvailabilityTypes'
import AvailabilityApi from '../../Services/AvailabilityApi';
import Api from '../../Services/Api';

/************************ Employee Availability Function ****************************/

export const watchEmployeeAvailabilityAsync = function* watchEmployeeAvailabilityAsync() {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY')
        const response = yield call(Api.getEmployeeAvailability)
        yield put({ type: FETCH_EMPLOYEE_AVAILABILITY_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: FETCH_EMPLOYEE_AVAILABILITY_FAIL, payload: e });
    }
}

/************************ Save Update Availability Function ****************************/

export const watchSaveUpdateEmployeeAvailabilityAsync = function* watchSaveUpdateEmployeeAvailabilityAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY', params)
        for(i=0; i < params.DeleteShift.length; i++)
        {
            yield call(Api.deleteEmployeeAvailability, {EmployeeAvailabilityID:params.DeleteShift[i]}) 
        }
        const response = yield call(Api.saveUpdateEmployeeAvailability, params.UpdateShift)
        yield put({ type: SAVE_UPDATE_EMPLOYEE_AVAILABILITY_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: SAVE_UPDATE_EMPLOYEE_AVAILABILITY_FAIL, payload: e });
    }
}

/************************ Delete Availability Function ****************************/

export const watchDeleteEmployeeAvailabilityAsync = function* watchDeleteEmployeeAvailabilityAsync({ params }) {
    try {
        console.log('---------------SAGA CALLING AVAILABILITY', params)
        let response;
        for(i=0; i < params.DeleteShift.length; i++)
        {
            response= yield call(Api.deleteEmployeeAvailability, {EmployeeAvailabilityID:params.DeleteShift[i]}) 
        }
        //const response = yield call(Api.deleteEmployeeAvailability, params)
        yield put({ type: DELETE_EMPLOYEE_AVAILABILITY_SUCCESS, payload: response });
    }
    catch (e) {
        console.log(e, 'error');
        yield put({ type: DELETE_EMPLOYEE_AVAILABILITY_FAIL, payload: e });
    }
}

watchAvailability = function* watchAvailability() {
    yield takeEvery(FETCH_EMPLOYEE_AVAILABILITY_REQUESTING, watchEmployeeAvailabilityAsync);
    yield takeEvery(SAVE_UPDATE_EMPLOYEE_AVAILABILITY_REQUESTING, watchSaveUpdateEmployeeAvailabilityAsync);
    yield takeEvery(DELETE_EMPLOYEE_AVAILABILITY_REQUESTING, watchDeleteEmployeeAvailabilityAsync);
}

export default watchAvailability;