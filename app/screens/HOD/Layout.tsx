import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import Dashboard from './Dashboard/Dashboard'
import { SafeAreaView } from 'react-native-safe-area-context'
import LogoutButton from '../../components/LogoutButton/LogoutButton'

type HODDrawerParamList = {
    Home: undefined,

}


const HODDrawerNaviagtor = createDrawerNavigator<HODDrawerParamList>()


const Layout = () => {
    return (

        <HODDrawerNaviagtor.Navigator
            drawerContent={(props) => (
                <SafeAreaView style={{
                    flex: 1
                }}>
                    <DrawerContentScrollView {...props}>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                    <LogoutButton />
                </SafeAreaView>)}
            backBehavior='history'
        >

            <HODDrawerNaviagtor.Screen
                name='Home'
                component={Dashboard}
            />

        </HODDrawerNaviagtor.Navigator>
    )
}

export default Layout;

const styles = StyleSheet.create({})