import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import TPODashboard from './Dashboard/Dashboard';
import AddStudent from './AddStudent/AddStudent';
import AddCompany from './AddCompany/AddCompany';
import AddDrive from './AddDrive/AddDrive';
import OngoingDrives from './OngoingDrives/OngoingDrives';
import Profile from './Profile/Profile';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/themed';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import Drive from './Drive/Drive';
import PostUpdate from './PostUpdate/PostUpdate';
import Company from './Companies/Companies';

const TPODrawerNavigator = createDrawerNavigator<TPODrawerParamList>();


const TPOLayout = () => {
    return (
        <>
            <TPODrawerNavigator.Navigator screenOptions={{
                headerTitleAlign: 'center'
            }}
                drawerContent={(props) => (<SafeAreaView style={{
                    flex: 1
                }}>
                    <DrawerContentScrollView {...props}>
                        <Icon name='account-circle' size={150} />
                        <Text style={{
                            fontSize: 25,
                            textAlign: 'center'
                        }}>TPO</Text>
                        <DrawerItemList {...props} />
                    </DrawerContentScrollView>
                    <LogoutButton />
                </SafeAreaView>)}
                backBehavior='history'
            >
                <TPODrawerNavigator.Screen name='Home' component={TPODashboard}
                    options={{

                    }}
                />
                <TPODrawerNavigator.Screen name='Add Student' component={AddStudent} options={{
                    unmountOnBlur: true
                }} />
                <TPODrawerNavigator.Screen name='Add Company' component={AddCompany}
                    options={{
                        unmountOnBlur: true
                    }}
                />

                <TPODrawerNavigator.Screen name='Companies'
                    component={Company}
                />
                <TPODrawerNavigator.Screen name='Ongoing Drives' component={OngoingDrives} />
                <TPODrawerNavigator.Screen name='Profile' component={Profile} />
                <TPODrawerNavigator.Group screenOptions={{
                    drawerItemStyle: {
                        display: 'none'
                    },
                }}>
                    <TPODrawerNavigator.Screen name='Add Drive' component={AddDrive}
                        options={{
                            unmountOnBlur: true
                        }}
                    />
                    <TPODrawerNavigator.Screen name="Drive" component={Drive}
                        options={{
                            unmountOnBlur: true
                        }}
                    />
                    <TPODrawerNavigator.Screen name="Post Update" component={PostUpdate}
                        options={{
                            unmountOnBlur: true
                        }}
                    />

                </TPODrawerNavigator.Group>


            </TPODrawerNavigator.Navigator>
        </>
    )
}

export default TPOLayout;

const styles = StyleSheet.create({})