
//Libraries
import { combineReducers } from 'redux';

//Assets
import AuthReducer from './AuthReducer';
import HirePacketReducer from './HirePacketReducer';
import DashboardReducer from './DashboardReducer';
import DocumentStatusReducer from './DocumentStatusReducer';
import WeeklyScheduleReducer from './WeeklyScheduleReducer';
import WeeklySummarySheetReducer from './WeeklySummarySheetReducer';

let rootReducer = combineReducers({
  Auth: AuthReducer,
  HirePacket: HirePacketReducer,
  Dashboard: DashboardReducer,
  CheckDocumentStatus: DocumentStatusReducer,
  WeeklySchedule: WeeklyScheduleReducer,
  WeeklySummarySheet: WeeklySummarySheetReducer,
  // Availability: AvailabilityReducer,
  // MySchedule: MyScheduleReducer,
  // StoreSchedule: StoreScheduleReducer

});
export default rootReducer