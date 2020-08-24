/* =======>>>>>> Libraries <<<<<<<======= */
import { StackNavigator } from 'react-navigation'

/* =======>>>>>> Libraries <<<<<<<======= */
import MySchedule from './View/MySchedule';
import CreateRequest from './View/CreateRequest';
import History from './View/History';
import SwapOffer from './View/SwapOffer';
import OfferDetail from './View/OfferDetails';

/* ======>>>>> STACK DECLARATION FOR AUTH SCREENS <<<<<<<========= */

const MyScheduleNavigator = StackNavigator({

    MySchedule: {
        screen: MySchedule,
        navigationOptions:
        {
            header: null
        },
    },
    CreateRequest: {
        screen: CreateRequest,
        navigationOptions: {
            header: null
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            header: null
        }
    },
    SwapOffer: {
        screen: SwapOffer,
        navigationOptions: {
            header: null
        }
    },
    OfferDetail: {
        screen: OfferDetail,
        navigationOptions: {
            header: null
        }
    }

},
    {
        initialRouteName: 'MySchedule'
    });

export default MyScheduleNavigator;