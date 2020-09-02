import watchLogin from './LoginSaga';
import hirePacketSaga from './HirePacketsSaga';
import dashboardSaga from './DashboardSaga';
import documentStatusSaga from './DocumentStatusSaga';
import weeklyScheduleSaga from './WeeklyScheduleSaga';
import WeeklySummarySheetSaga from './WeeklySummarySheetSaga';
import dashboardWatch from './DashboardEmployeeSaga';
import availabilityWatch from './AvailabilitySaga';
import watchMySchedule from './MyScheduleSaga';
import watchStoreSchedule from './StoreScheduleSaga';
import { all } from 'redux-saga/effects';

//Main Root Saga
const rootSaga = function* rootSaga() {
  yield all([
    watchLogin(),
    hirePacketSaga(),
    dashboardSaga(),
    documentStatusSaga(),
    weeklyScheduleSaga(),
    WeeklySummarySheetSaga(),
    dashboardWatch(),
    availabilityWatch(),
    watchMySchedule(),
    watchStoreSchedule()
  ])
};
export default rootSaga;
