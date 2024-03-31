

import { StyleSheet } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from './Public/welcome';
import Login from './Public/login';
import { useAuth } from '../utils/AuthContext';
import HODDashboard from './HOD/Dashboard/Dashboard';
import StudentLayout from './Students/Layout';
import TPOLayout from './Tpo/Layout';
import AlumniLayout from './Alumni/AlumniLayout';
const RootStack = createNativeStackNavigator<RootStackParamList>();


export default function Layout() {

    const { authState } = useAuth();

    return (
        <RootStack.Navigator screenOptions={{
            headerShown: false
        }}>
            {
                !authState?.access_token ? (
                    <>
                        <RootStack.Screen name='Welcome' component={Welcome} />
                        <RootStack.Screen name='Login' component={Login} />
                    </>) : authState.role === 'student' ? (<>
                        <RootStack.Screen name="student" component={StudentLayout} />
                    </>
                    ) : authState.role === 'tpo' ? (<>
                            <RootStack.Screen name='tpo' component={TPOLayout} />
                    </>) : authState.role === 'alumni' ? (<>
                                <RootStack.Screen name='alumni' component={AlumniLayout} />
                    </>) : authState.role === 'hod' ? (<>
                                    <RootStack.Screen name='hod' component={HODDashboard} />
                    </>) : null
            }

        </RootStack.Navigator>
    )
}

const styles = StyleSheet.create({})