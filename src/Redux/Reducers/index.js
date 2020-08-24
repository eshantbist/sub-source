
//Libraries
import { combineReducers } from 'redux';

//Assets
import AuthReducer from './AuthReducer';
import HirePacketReducer from './HirePacketReducer';
import DashboardReducer from './DashboardReducer';
import DocumentStatusReducer from './DocumentStatusReducer';
import WeeklyScheduleReducer from './WeeklyScheduleReducer';
import WeeklySummarySheetReducer from './WeeklySummarySheetReducer';
import DashboardEmployeeReducer from './DashboardEmployeeReducer';
import AvailabilityReducer from './AvailabilityReducer';
import MyScheduleReducer from './MyScheduleReducer';
import StoreScheduleReducer from './StoreScheduleReducer';

let rootReducer = combineReducers({
  Auth: AuthReducer,
  HirePacket: HirePacketReducer,
  Dashboard: DashboardReducer,
  CheckDocumentStatus: DocumentStatusReducer,
  WeeklySchedule: WeeklyScheduleReducer,
  WeeklySummarySheet: WeeklySummarySheetReducer,
  DashboardEmployee: DashboardEmployeeReducer,
  Availability: AvailabilityReducer,
  MySchedule: MyScheduleReducer,
  StoreSchedule: StoreScheduleReducer
});
export default rootReducer