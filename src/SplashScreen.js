import React from 'react'
import { View, AsyncStorage, BackAndroid, BackHandler } from 'react-native'
import { NavigationActions, StackActions } from 'react-navigation'
class SplashScreen extends React.Component {
    state = {
        loading: false
    }
    async componentDidMount() {
        // AsyncStorage.clear()
        let login = await AsyncStorage.getItem('login')
        let UserDetails = await AsyncStorage.getItem('tokenDetails');
        let subsourceModule = await AsyncStorage.getItem('subsourceModule');
        if (UserDetails) {
            global.user = JSON.parse(UserDetails);
            userDetails = JSON.parse(UserDetails);
            global.loginResponse = JSON.parse(userDetails.LoginObject).Login
            expireDate = Object.keys(global.user)[5]
            date = new Date
            // date = new Date('Wed Oct 17 2018 21:49:00 GMT+0530 (India Standard Time)')
            exDate = new Date(global.user[expireDate])
            // exDate = new Date('Wed Oct 18 2018 21:49:00 GMT+0530 (India Standard Time)')
            if (date.getTime() > exDate.getTime()) {
                AsyncStorage.removeItem('login');
                this.navigateToScreen('Login')
            } else {
                if (login == 'true' && subsourceModule == 'Manager') {
                    console.log('manager splash')
                    // this.navigateToScreen('Login')
                    this.navigateToScreen('TabBar')
                } else if (login == 'true' && subsourceModule == 'Employee') {
                    console.log('employee splash')
                    // this.navigateToScreen('Login')
                    this.navigateToScreen('EmpTabBar')
                } else {
                    this.navigateToScreen('Login')
                }
            }
        }
        else {
            this.navigateToScreen('Login')
        }

    }
    navigateToScreen(route) {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: route })]
        });
        this.props.navigation.dispatch(navigateAction);
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}></View>
        );
    }
}
export default SplashScreen;