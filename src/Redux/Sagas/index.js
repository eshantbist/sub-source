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

//Main Root Saga
const rootSaga = function* rootSaga() {
  yield [
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
  ]
};
export default rootSaga;
