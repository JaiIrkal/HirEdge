import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Button, Text } from '@rneui/themed'
import useLogout from '../../../utils/useLogout'
import { ScrollView } from 'react-native-gesture-handler'
import OngoingDrivePanel from '../OngoingDrivesPanel/OngoingDrivePanel'
import OffersTillNowCard from '../../../components/OffersTillNowCard/OffersTillNowCard'

const AlumniDashboard = () => {

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.header}>
            <Image
                    style={styles.avatar}
                    source={require('../../../../assets/avatars/graduated.png')} // Replace with your image source
                />
                <Text style={styles.headerText}>Welcome to Alumni Dashboard</Text>      
            </View>
            <View style={styles.cardContainer}>
                <OffersTillNowCard />
            </View>

            {/* <View>
                <PrevYearOfferCard />
            </View> */}
                <OngoingDrivePanel/>
            {/* <RegisteredDrives /> */}
        </ScrollView>
    )
}

export default AlumniDashboard

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#94DFE6', // Light background color
    },
    header: {
        backgroundColor: '#94DFE6', // Header background color
        padding: 20,
        marginBottom: 0,
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'center', // Center content horizontally
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#107387', // Header text color
    },
    avatar: {
        width: 140,
        height: 140,
        marginLeft:1,
        marginRight:0, // Add some spacing between text and avatar
        borderRadius: 25, // Make it a circle
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginHorizontal:20,
        elevation:10
    },
})