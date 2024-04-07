import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@rneui/themed';
import { DrawerScreenProps } from '@react-navigation/drawer';

const screenWidth = Dimensions.get('window').width;

const OngoingDrives = ({ navigation }: DrawerScreenProps<StudentDrawerParamList, 'Ongoing Drives'>) => {
    const api = useAxiosPrivate();

    const result = useQuery({
        queryKey: ["fetchOngoingPlacements"],
        queryFn: async (): Promise<StudentOngoingDriveResponseType> => {
            const response = await api.get('/student/drives', {
                params: {
                    s: '',
                    page: 1,
                    limit: 10,
                }
            });
            return response.data.drives;
        }
    });

    if (result.isLoading)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

    if (result.isSuccess)
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {result.data.data.map((drive, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => navigation.navigate('Drive', { drive_id: drive._id })}
                            style={styles.cardContainer}
                        >
                            <Card style={styles.card}>
                                <Card.Title style={styles.title}>{drive.company_name}</Card.Title>
                                <Card.Divider />
                                <Text style={styles.text}>Role: {drive.job_title}</Text>
                                <Text style={styles.text}>CTC: {drive.job_ctc}</Text>
                            </Card>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        );

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        padding: 20,
    },
    cardContainer: {
        width: screenWidth - 40, // Adjusted width
        marginBottom: 20,
    },
    card: {
        width: '100%', // Adjusted width to take full screen width
        padding: 10,
        borderWidth: 5,
        borderRadius: 30,
        borderColor: '#ccc',
        backgroundColor: '#f0f0f0', // Changed background color
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default OngoingDrives;
