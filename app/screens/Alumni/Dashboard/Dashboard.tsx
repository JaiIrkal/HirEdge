import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button, Text } from '@rneui/themed'
import useLogout from '../../../utils/useLogout'
import { ScrollView } from 'react-native-gesture-handler'

const AlumniDashboard = () => {

    return (
        <ScrollView>
            <Text style={{
                fontSize: 40,
                textAlign: 'center'
            }}>Alumni Dashboard</Text>



        </ScrollView>
    )
}

export default AlumniDashboard

const styles = StyleSheet.create({})