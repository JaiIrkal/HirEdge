import { StyleSheet, Text, View, ScrollView, Image, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'
import { PieChart } from 'react-native-chart-kit';
import { Button } from '@rneui/base';
import { useAuth } from '../../../utils/AuthContext';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { RefreshControl } from 'react-native-gesture-handler';

type offerData = {
    tier: number;
    company_name: string;
    job_role: string;
    job_ctc: string;
}

type studentData = {
    user_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    offers: Array<offerData>

}

type DeptPlacementData = {
    total: number;
    tier1: Array<studentData>;
    tier2: Array<studentData>;
    tier3: Array<studentData>;
    tier0: Array<studentData>;
}

const HODDashboard = () => {

    const { authState } = useAuth();

    const user_id = authState?.user_id;

    const { width } = useWindowDimensions();

    const api = useAxiosPrivate();

    const { data, isError, isLoading, isSuccess, refetch } = useQuery({
        queryKey: ['deptPlacement', user_id],
        queryFn: async (): Promise<DeptPlacementData> => {
            return api.get('/hod/placementdata', {

            }).then(res => res.data)
        },
    })





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

    if (isError) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Error</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View>
                <Text>Loading....</Text>
            </View>
        )
    }

    if (isSuccess) {

        const placementdata = [
            {
                name: "Dream Tier",
                population: data.tier0.length,
                color: "#D862BC",
                legendFontColor: "#D862BC",
                legendFontSize: 15
            },
            {
                name: "Tier 1",
                population: data.tier1.length,
                color: "#FFAF45",
                legendFontColor: "#FFAF45",
                legendFontSize: 15
            },
            {
                name: "Tier 2",
                population: data.tier2.length,
                color: "#C0C0C0",
                legendFontColor: "#C0C0C0",
                legendFontSize: 15
            },
            {
                name: "Tier 3",
                population: data.tier3.length,
                color: "#CD7F32",
                legendFontColor: "#CD7F32",
                legendFontSize: 15
            },
            {
                name: "Unplaced",
                population: data.total - (data.tier0.length + data.tier1.length + data.tier2.length + data.tier3.length),
                color: "#C70039",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }
        ]


    return (
        <ScrollView style={styles.mainContainer} refreshControl={<RefreshControl
            onRefresh={refetch} refreshing={isLoading}
        />}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Welcome To {user_id} HOD Dashboard</Text>
            </View>
            <View style={styles.graphView}>
                <PieChart
                    data={placementdata}
                    width={width}
                    height={240}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[6, 8]}
                    absolute
                />
                <Text style={{
                    textAlign: "center"
                }}>Total Students: {data.total}</Text>
            </View>

            <View style={{
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 10,
                padding: 5
            }}>
                <View>
                    <Text style={{ textAlign: 'center' }}>Dream Tier</Text>
                    {
                        data.tier0.map((student, index) => {
                            return (
                                <View key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{}}>{student.first_name} {student.last_name}</Text>
                                    {
                                        student.offers.map((offer, index) => (<View key={index} style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_role}</Text>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_ctc}</Text>
                                        </View>))
                                    }
                                </View>
                            )
                        })
                    }

                </View>
                <View>
                    <Text style={{ textAlign: 'center' }}>Tier-I</Text>
                    {
                        data.tier1.map((student, index) => {
                            return (
                                <View key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ textAlign: 'center' }}>{student.first_name} {student.last_name}</Text>
                                    {
                                        student.offers.map((offer, index) => (<View key={index} style={{
                                            display: 'flex',
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_role}</Text>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_ctc}</Text>
                                        </View>))
                                    }
                                </View>
                            )
                        })
                    }
                </View>
                <View>
                    <Text style={{ textAlign: 'center' }}>Tier-II</Text>
                    {
                        data.tier2.map((student, index) => {
                            return (
                                <View key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ textAlign: 'center' }}>{student.first_name} {student.last_name}</Text>
                                    {
                                        student.offers.map((offer, index) => (<View key={index} style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            columnGap: 5
                                        }}>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_role}</Text>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_ctc}</Text>
                                        </View>))
                                    }
                                </View>
                            )
                        })
                    }

                </View>
                <View>
                    <Text style={{ textAlign: 'center' }}>Tier-III</Text>
                    {
                        data.tier3.map((student, index) => {
                            return (
                                <View key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ textAlign: 'center' }}>{student.first_name} {student.last_name}</Text>
                                    {
                                        student.offers.map((offer, index) => (<View key={index} style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_role}</Text>
                                            <Text style={{ textAlign: 'center' }}>{offer.job_ctc}</Text>
                                        </View>))
                                    }
                                </View>
                            )
                        })
                    }

                </View>


            </View>



        </ScrollView>
    )
}
    return null;
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