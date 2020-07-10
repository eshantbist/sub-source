// ========>>>>>>>> LIBRARIES <<<<<<<============
import React from 'react'
import { Image, Animated, Easing } from 'react-native'
import { TabNavigator, createBottomTabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation'

// ========>>>>>>>> ASSETS <<<<<<<============
import { Colors, Matrics, Images } from '@Assets'
// import AuthNavigator from '@Auth/AuthNavigationConfiguration'
import Login from '../Auth/View/Login'
import ResetPassword from '../Auth/View/ResetPassword';
import ConfirmPassword from '../Auth/View/ConfirmPassword';
import LinkSent from '../Auth/View/LinkSent';
import Congrats from '../Auth/View/Congrats';
import SplashScreen from '../SplashScreen';
import CheckDoucmentStatus from '../CheckDocumentStatus/View'
import DocumentDetails from '../CheckDocumentStatus/View/DocumentDetails';
// import CheckDoucmentStatusNavigator from '../CheckDocumentStatus/CheckDocumentStatusNavigationConfiguration';
import HireNewEmployee from '../HireNewEmployee/View';
import Dashboard from '../Dashboard/View'
import CustomerComments from '../Dashboard/View/CustomerComments'
import Profile from '../Dashboard/View/Profile';
import EditProfile from '../Dashboard/View/EditProfile';
import WeeklySchedule from '../WeeklySchedule/View';
import EmployeeList from '../WeeklySchedule/View/EmployeeList'
import Publish from '../WeeklySchedule/View/Publish'
import WeeklySummarySheet from '../WeeklySummarySheet/View'
import BreakWaiver from '../WeeklySummarySheet/View/BreakWaiver'
import Minor from '../HireNewEmployee/View/Minor'


// ========>>>>>>>> TABS DECLARATION <<<<<<<============
const TabBarConfig = createBottomTabNavigator(
    {
        CheckDoucmentStatus: {
            screen: StackNavigator({
                CheckDoucmentStatus,
            })
        },
        HireNewEmpployee: {
            screen: StackNavigator({
                HireNewEmployee,
            })
        },
        Dashboard: {
            screen: StackNavigator({
                Dashboard,
            }, {
                    navigationOptions: {
                        header: null,
                    }
                })
        },
        WeeklySchedule: {
            screen: StackNavigator({
                WeeklySchedule,
            })
        },
        WeeklySummarySheet: {
            screen: StackNavigator({
                WeeklySummarySheet,
            })
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
            header: null
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
        screen: TabBarConfig,
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
