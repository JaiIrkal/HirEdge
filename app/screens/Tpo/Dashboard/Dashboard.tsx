import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/base';
import { RefreshControl } from 'react-native-gesture-handler';
import OffersTillNowCard from '../../../components/OffersTillNowCard/OffersTillNowCard';
import { Card } from '@rneui/themed';
import OngoingDrivePanel from '../OngoingDrivePanel/OngoingDrivePanel';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useQueryClient } from '@tanstack/react-query';

const TPODashboard = ({ route, navigation }: DrawerScreenProps<TPODrawerParamList, "Home">) => {

    const { height, width } = useWindowDimensions();

    const [refresh, setRefresh] = useState<boolean>(false);

    const queryClient = useQueryClient();

    return (
        <ScrollView 
            style={styles.container} // Apply style to set background color
            refreshControl={<RefreshControl
                refreshing={queryClient.getQueryState(['TPOOngoingDrive'])?.status == 'pending'}
                onRefresh={() => {

                    queryClient.refetchQueries({
                        'queryKey': ['TPOOngoingDrive']
                    })
                }}
            />}
        >

            <View style={{
                height: height * 0.1,
            }}>
                <OffersTillNowCard />
            </View>

            <View style={{
                width: width,
                height: height * 0.2,
                backgroundColor: '#94DFE6',
                paddingHorizontal: 5
            }}>
                <OngoingDrivePanel />
            </View>

            {/* <Card >
                <Card.Title>Manage Students</Card.Title>
                <Card.Divider />
                <Button
                    onPress={() => {
                        navigation.navigate('Add Student')
                    }}
                >
                    Add Student
                </Button>
            </Card> */}

            <View style={styles.manageStudentCard}>
                <Text style={styles.cardTitle}> Students :</Text>
                <Card.Divider />
                <Button
                    onPress={() => {
                        navigation.navigate('Add Student')
                    }}
                >
                    Add Student
                </Button>
            </View>
            
            <View style={styles.manageStudentCard}>
                <Text style={styles.cardTitle}> Drives :</Text>
                <Card.Divider />

                <Card.Divider />
                </View>

                <View style={styles.manageStudentCard}>
                <Text style={styles.cardTitle}>View : </Text>
                <Card.Divider />
                <Button
                    // onPress={() => {
                    //     navigation.navigate('Drive');
                    // }}
                >
                    View Drives
                </Button>
            </View>
        
           
        </ScrollView>
    )
}

export default TPODashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#94DFE6',
    },
    manageStudentCard: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardTitle: {
        padding:10,
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#107387',
    },
});
