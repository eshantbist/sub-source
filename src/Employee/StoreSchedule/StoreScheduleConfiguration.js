/*  =============>>>>>>>>> Libraries <<<<<<<<<<============= */
import { StackNavigator } from 'react-navigation'

/*  =============>>>>>>>>> Assets <<<<<<<<<<============= */
import StoreSchedule from './View/StoreSchedule';
import AllStore from './View/AllStore';

/*  =============>>>>>>>>> STACK DECLARATION FOR AUTH SCREENS <<<<<<<<<<============= */

const StoreScheduleNavigator = StackNavigator({

    AllStore: {
        screen: AllStore,
        navigationOptions: {
            header: null
        }
    },
    StoreSchedule: {
        screen: StoreSchedule,
        navigationOptions:
        {
            header: null
        },
    },

},
    {
        initialRouteName: 'AllStore'
    });

export default StoreScheduleNavigator;