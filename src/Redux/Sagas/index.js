import watchLogin from './LoginSaga';
import hirePacketSaga from './HirePacketsSaga'
import dashboardSaga from './DashboardSaga'
import documentStatusSaga from './DocumentStatusSaga'
import weeklyScheduleSaga from './WeeklyScheduleSaga'
import WeeklySummarySheetSaga from './WeeklySummarySheetSaga'

//Main Root Saga
// const rootSaga = function* rootSaga() {
//   yield [
//     watchLogin(),
//     hirePacketSaga(),
//     dashboardSaga(),
//     documentStatusSaga(),
//     weeklyScheduleSaga(),
//     WeeklySummarySheetSaga()
//   ]
// };
// export default rootSaga;

export default function* rootSaga() {
  yield* watchLogin();
  yield* hirePacketSaga();
  yield* dashboardSaga();
  yield* documentStatusSaga();
  yield* weeklyScheduleSaga();
  yield* WeeklySummarySheetSaga();
}

