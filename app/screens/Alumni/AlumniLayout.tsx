import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'
import AlumniDashboard from './Dashboard/Dashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Companies from './Companies/Companies';
import Profile from './Profile/Profile';
import ShareExperience from './ShareExperience/ShareExperience';

import { AlumniDrawerParamList } from '../../utils/Navigation/types';
import Company from './Company/Company';

const Drawer = createDrawerNavigator<AlumniDrawerParamList>();

const AlumniLayout = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                drawerLabelStyle: {
                    fontSize: 20
                }
            }}
            initialRouteName='Profile'
            drawerContent={(props) => (<SafeAreaView style={{
                flex: 1
            }}
            >
                <DrawerContentScrollView {...props}>
                    <Icon name='account-circle' size={150} />
                    <Text style={{
                        fontSize: 25,
                        textAlign: 'center'
                    }}>Alumni</Text>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
                <LogoutButton />
            </SafeAreaView>)}
            backBehavior='history'
        >
            <Drawer.Screen name='Home' component={AlumniDashboard} options={{
                drawerIcon: (props) => (<Icon name='home' />)
            }} />

            <Drawer.Screen name='Companies' component={Companies} options={{
                drawerIcon: (props) => (<Icon name='world-o' type='fontisto' />)
            }} />

            <Drawer.Screen name='Profile' component={Profile} options={{
                drawerIcon: (props) => (<Icon name='account-circle' color={props.color} />)
            }} />

            <Drawer.Group screenOptions={{
                drawerItemStyle: {
                    display: 'none'
                }
            }} >
                <Drawer.Screen name='Share Experience' component={ShareExperience}
                    options={{
                        unmountOnBlur: true
                    }}

                />

                <Drawer.Screen name='Company' component={Company} options={{
                    unmountOnBlur: true
                }} />
            </Drawer.Group>

        </Drawer.Navigator>
    )
}

export default AlumniLayout

const styles = StyleSheet.create({})