import { StyleSheet, Text, View, ScrollView, Image, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'
import { getValueFor } from '../../../utils/useSecureStore';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Button } from '@rneui/base';


const HODDashboard = () => {

    const user_id = 'ABCD';

    const {width} = useWindowDimensions()

    const data = [
        {
            name: "Dream Tier",
            population: 12,
            color: "#FFD700",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Tier 1",
            population: 10,
            color: "#097969",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Tier 2",
            population: 60,
            color: "#0047AB",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Tier 3",
            population: 58,
            color: "#7393B3",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Unplaced",
            population: 30,
            color: "#C70039",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ]

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.header}>
                {/* <Image
                    style={styles.avatar}
                    source={require('../../../../assets/avatars/graduated.png')} // Replace with your image source
                /> */}
                <Text style={styles.headerText}>Welcome To {user_id} HOD Dashboard</Text>
            </View>
            <View style={styles.graphView}>
                <PieChart
                    data={data}
                    width={width}
                    height={240}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[6, 8]}
                    absolute
                />
            </View>
        </ScrollView>
    )
}

export default HODDashboard

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
        fontSize: 35,
        fontWeight: 'bold',
        color: '#107387', // Header text color
        textAlign: "center"
    },
    avatar: {
        width: 140,
        height: 140,
        marginLeft: 1,
        marginRight: 0, // Add some spacing between text and avatar
        borderRadius: 25, // Make it a circle
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginHorizontal: 20,
        elevation: 10
    },
    graphView: {
        height:280,
        backgroundColor:"white",
        width:"95%",
        alignSelf:"center",
        borderRadius:20
    }
})