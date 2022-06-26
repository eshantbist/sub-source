// ========>>>>>>>> LIBRARIES <<<<<<<============
import React from 'react'
import { Image, Animated, Easing } from 'react-native'
import { TabNavigator, createBottomTabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'

// ========>>>>>>>> ASSETS <<<<<<<============
import { Colors, Matrics, Images } from '@Assets'
import Login from '../Auth/View/Login'
import ResetPassword from '../Auth/View/ResetPassword';
import ConfirmPassword from '../Auth/View/ConfirmPassword';
import LinkSent from '../Auth/View/LinkSent';
import Congrats from '../Auth/View/Congrats';
import SplashScreen from '../SplashScreen';
import CheckDoucmentStatus from '../Manager/CheckDocumentStatus/View'
import DocumentDetails from '../Manager/CheckDocumentStatus/View/DocumentDetails';
import HireNewEmployee from '../Manager/HireNewEmployee/View';
import Dashboard from '../Manager/Dashboard/View'
import CustomerComments from '../Manager/Dashboard/View/CustomerComments'
import Profile from '../Manager/Dashboard/View/Profile';
import EditProfile from '../Manager/Dashboard/View/EditProfile';
import WeeklySchedule from '../Manager/WeeklySchedule/View';
import EmployeeList from '../Manager/WeeklySchedule/View/EmployeeList'
import Publish from '../Manager/WeeklySchedule/View/Publish'
import WeeklySummarySheet from '../Manager/WeeklySummarySheet/View'
import BreakWaiver from '../Manager/WeeklySummarySheet/View/BreakWaiver'
import Minor from '../Manager/HireNewEmployee/View/Minor'

//Employeee
import EmployeeDashboard from '../Employee/Dashboard/View/EmployeeDashboard';
import EditProfileEmployee from '../Employee/Dashboard/View/EditProfileEmployee';
import EndEmployment from '../Employee/Dashboard/View/EndEmployment';
import FeedbackHistory from '../Employee/Dashboard/View/FeedbackHistory';
import Notification from '../Employee/Dashboard/View/Notification';
import ProfileEmployee from '../Employee/Dashboard/View/Profile';
import Reason from '../Employee/Dashboard/View/Reason';
import Signature from '../Employee/Dashboard/View/Signature';
import NotificationDetail from '../Employee/Dashboard/View/NotificationDetail';
import SwapOfferDetails from '../Employee/Dashboard/View/Templetes/SwapOfferDetail'
import MySchedule from '../Employee/MySchedule/View/MySchedule';
import CreateRequest from '../Employee/MySchedule/View/CreateRequest';
import History from '../Employee/MySchedule/View/History';
import SwapOffer from '../Employee/MySchedule/View/SwapOffer';
import OfferDetail from '../Employee/MySchedule/View/OfferDetails';
import HistoryDetail from '../Employee/MySchedule/View/HistoryDetails';
import MyAvailability from '../Employee/Availability/View/MyAvailability';
import CreateAvailability from '../Employee/Availability/View/CreateAvailability';
import AllStore from '../Employee/StoreSchedule/View/AllStore';
import StoreSchedule from '../Employee/StoreSchedule/View/StoreSchedule';
import LeaveHistory from '../Employee/MySchedule/View/LeaveHistory'



// ========>>>>>>>> TABS DECLARATION <<<<<<<============
const ManagerTabBarConfig = createBottomTabNavigator(
    {
        CheckDoucmentStatus: {
            screen: CheckDoucmentStatus,
            // screen: StackNavigator({
            //     CheckDoucmentStatus,
            // })
        },
        HireNewEmpployee: {
            screen: HireNewEmployee,
            // screen: StackNavigator({
            //     HireNewEmployee,
            // })
        },
        Dashboard: {
            screen: Dashboard,
            navigationOptions: {
                header: null,
            }
            // screen: StackNavigator({
            //     Dashboard,
            // }, {
            //         navigationOptions: {
            //             header: null,
            //         }
            //     })
        },
        WeeklySchedule: {
            screen: WeeklySchedule,
            // screen: StackNavigator({
            //     WeeklySchedule,
            // })
        },
        WeeklySummarySheet: {
            screen: WeeklySummarySheet,
            // screen: StackNavigator({
            //     WeeklySummarySheet,
            // })
        },
    },
    {
        initialRouteName: 'Dashboard',
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                state = {
                    modalVisible: false,
                };
                const { routeName } = navigation.state;
                if (routeName === 'CheckDoucmentStatus') {
                    return <Image style={{ width: Matrics.CountScale(29), padding: Matrics.CountScale(0), height: Matrics.CountScale(23) }}
                        source={`${focused ? Images.CheckDocumentStatusActiveIcon : Images.CheckDocumentStatusInctiveIcon}`} ></Image>;
                }
                if (routeName === 'HireNewEmpployee') {
                    return <Image style={{ width: Matrics.CountScale(23), padding: Matrics.CountScale(0), height: Matrics.CountScale(23) }}
                        source={`${focused ? Images.HireNewEmployeeActiveIcon : Images.HireNewEmployeeInctiveIcon}`} ></Image>;
                }
                if (routeName === 'Dashboard') {
                    return <Image style={{ width: Matrics.CountScale(45), padding: Matrics.CountScale(2), height: Matrics.CountScale(45) }}
                        source={`${focused ? Images.DashboardActiveIcon : Images.DashboardActiveIcon}`} ></Image>;
                }
                if (routeName === 'WeeklySchedule') {
                    return <Image style={{ width: Matrics.CountScale(25), padding: Matrics.CountScale(0), height: Matrics.CountScale(23) }}
                        source={`${focused ? Images.WeeklyScheduleActiveIcon : Images.WeeklyScheduleInctiveIcon}`} ></Image>;
                }
                if (routeName === 'WeeklySummarySheet') {
                    return <Image style={{ width: Matrics.CountScale(25), padding: Matrics.CountScale(0), height: Matrics.CountScale(25) }}
                        source={`${focused ? Images.WeeklySummarySheetActiveIcon : Images.WeeklySummarySheetInctiveIcon}`} ></Image>;
                }
            },

            tabBarOnPress: (scene, jumpToIndex) => {
                navigation.navigate(scene.navigation.state.key, { changes: true })
            }
        }),
        tabBarOptions: {

            labelStyle: {
                fontSize: 15,
            },
            style: {
                backgroundColor: 'white',
                shadowOffset: { width: 2, height: 2, },
                shadowColor: 'grey',
                shadowOpacity: 0.3,
                height: Matrics.CountScale(65)
                // backgroundColor: 'white',
            },
            showLabel: false
        },

    },
);


// employee tabnavigator //
const EmployeeTabBarConfig = createBottomTabNavigator(
    {
        EmployeeDashboard: {
            screen: EmployeeDashboard,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                swipeEnabled: false,
                // tabBarVisible: navigation.state.params && navigation.state.params.tabBarVisible,
                header: null
            }),
        },

        Availability: {
            screen: StackNavigator({
                MyAvailability: {
                    screen: MyAvailability,
                    navigationOptions:
                    {
                        header: null
                    },
                },
                CreateAvailability: {
                    screen: CreateAvailability,
                    navigationOptions:
                    {
                        header: null
                    },
                }
            },
                {
                    initialRouteName: 'MyAvailability'
                }),
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                swipeEnabled: false,
                // tabBarVisible: navigation.state.params && navigation.state.params.tabBarVisible,
                header: null
            }),
        },
        MySchedule: {
            screen: MySchedule,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                swipeEnabled: false,
                //tabBarVisible: navigation.state.params && navigation.state.params.tabBarVisible,
                header: null
            }),
        },
        AllStore: {
            screen: AllStore,
            navigationOptions: ({ navigation }) => ({
                gesturesEnabled: false,
                swipeEnabled: false,
                //tabBarVisible: navigation.state.params && navigation.state.params.tabBarVisible,
                header: null
            }),
        },

    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                state = {
                    modalVisible: false,
                };
                const { routeName } = navigation.state;
                if (routeName === 'EmployeeDashboard') {
                    return <Image style={{ width: Matrics.CountScale(20), padding: Matrics.CountScale(5), height: Matrics.CountScale(20) }} source={`${focused ? Images.EmpDashboardActiveIcon : Images.EmpDashboardIcon}`} ></Image>;
                }
                if (routeName === 'Availability') {
                    return <Image style={{ width: Matrics.CountScale(21), padding: Matrics.CountScale(5), height: Matrics.CountScale(23) }} source={`${focused ? Images.AvailabilityActiveIcon : Images.AvailabilityIcon}`} ></Image>;
                }
                if (routeName === 'MySchedule') {
                    return <Image style={{ width: Matrics.CountScale(28), padding: Matrics.CountScale(5), height: Matrics.CountScale(22) }} source={`${focused ? Images.MyScheduleActiveIcon : Images.MyScheduleIcon}`} ></Image>;
                }
                if (routeName === 'AllStore') {
                    return <Image style={{ width: Matrics.CountScale(23), padding: Matrics.CountScale(5), height: Matrics.CountScale(21) }} source={`${focused ? Images.StoreActiveIcon : Images.StoreInactiveIcon}`} ></Image>;
                }
            },

            tabBarOnPress: (scene, jumpToIndex) => {
                navigation.navigate(scene.navigation.state.key, { changes: true })
            }
        }),
        tabBarOptions: {

            labelStyle: {
                fontSize: 15,
            },
            style: {
                backgroundColor: 'white',
                shadowOffset: { width: 2, height: 2, },
                shadowColor: 'black',
                shadowOpacity: 0.3,
                // backgroundColor: 'white',
            },
            showLabel: false
        },
    },
);
//=======APP STACK DECLARATION=========//

const AppNavigator = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            header: null
        }
    },
    ConfirmPassword: {
        screen: ConfirmPassword,
        navigationOptions: {
            header: null
        }
    },
    LinkSent: {
        screen: LinkSent,
        navigationOptions: {
            header: null
        }
    },
    Congrats: {
        screen: Congrats,
        navigationOptions: {
            header: null
        }
    },
    TabBar: {
        screen: ManagerTabBarConfig,
        navigationOptions: {
            header: null,
        }
    },
    EmpTabBar: {
        screen: EmployeeTabBarConfig,
        navigationOptions: {
            header: null,
        }
    },
    DocumentDetails: {
        screen: DocumentDetails,
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
    EditProfile: {
        screen: EditProfile,
    },
    BreakWaiver: {
        screen: BreakWaiver
    },
    EmployeeList: {
        screen: EmployeeList
    },
    Publish: {
        screen: Publish
    },
    CustomerComments: {
        screen: CustomerComments
    },
    Minor: {
        screen: Minor
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
    },
    HistoryDetail: {
        screen: HistoryDetail,
        navigationOptions: {
            header: null
        }
    },
    LeaveHistory:{
        screen: LeaveHistory,
        navigationOptions:{
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
    EditProfileEmployee: {
        screen: EditProfileEmployee,
        navigationOptions:
        {
            header: null
        },
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
    ProfileEmployee: {
        screen: ProfileEmployee,
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
    Signature: {
        screen: Signature,
        navigationOptions: {
            // gesturesEnabled: false,
            header: null
        }
    }
},
    {
        swipeEnabled: false,
        initialRouteName: "SplashScreen",
        // navigationOptions: {
        //     header: null
        // },
        // transitionConfig: () => ({
        //     transitionSpec: {
        //         duration: 0,
        //         timing: Animated.timing,
        //         easing: Easing.step0,
        //     },
        // }),
    });


export default AppNavigator
