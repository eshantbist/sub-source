/* ====>>>>>>>>>>> Libraries <<<<<<<<<<==========>  */
import { StackNavigator } from 'react-navigation'

/* ====>>>>>>>>>>> Assets <<<<<<<<<<==========>  */
import Dashboard from './View/Dashboard';
import EditProfile from './View/EditProfile';
import EndEmployment from './View/EndEmployment';
import FeedbackHistory from './View/FeedbackHistory';
import Notification from './View/Notification';
import Profile from './View/Profile';
import Reason from './View/Reason';
import Signature from './View/Signature';
import NotificationDetail from './View/NotificationDetail';
import SwapOfferDetails from './View/Templetes/SwapOfferDetail'

/* =========>>>>>>> STACK DECLARATION FOR AUTH SCREENS <<<<<<=========== */

const DashboardNavigator = StackNavigator(
    {
        Dashboard: {
            screen: Dashboard,
            navigationOptions:
            {
                gesturesEnabled: false,
                swipeEnabled: false,
                header: null
            },
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                header: null
            }
        },
        EndEmployment: {
            screen: EndEmployment,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        FeedbackHistory: {
            screen: FeedbackHistory,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        Notification: {
            screen: Notification,
            navigationOptions: {
                header: null,
                // gesturesEnabled: false,
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        Reason: {
            screen: Reason,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        NotificationDetail: {
            screen: NotificationDetail,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        SwapOfferDetails: {
            screen: SwapOfferDetails,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        },
        Signature : {
            screen: Signature,
            navigationOptions: {
                // gesturesEnabled: false,
                header: null
            }
        }
    },
    {
        initialRouteName: 'Dashboard'
    });

export default DashboardNavigator;