import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button } from '@rneui/base';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';

const Profile = () => {
    const api = useAxiosPrivate();

    const result = useQuery({
        queryKey: ['TPOProfile'],
        queryFn: (): Promise<TPOProfile> => (
            api.get('/tpo/profile').then(res => res.data)
        ),
        enabled: true
    });

    if (result.isLoading) {
        return <View style={styles.loadingContainer}><Text>Loading....</Text></View>;
    }

    if (result.isSuccess) {
        return (
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Avatar
                        title='T'
                        size={200}
                        rounded
                        containerStyle={styles.avatarContainer}
                        titleStyle={styles.avatarTitle}
                    />

                    <View style={styles.tableContainer}>
                        <View style={styles.row}>
                            <Text style={styles.fieldName}>First Name:</Text>
                            <Text style={styles.fieldValue}>{result.data?.first_name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.fieldName}>Middle Name:</Text>
                            <Text style={styles.fieldValue}>{result.data?.middle_name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.fieldName}>Last Name:</Text>
                            <Text style={styles.fieldValue}>{result.data.last_name}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.fieldName}>Email:</Text>
                            <Text style={styles.fieldValue}>{result.data.email}</Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.fieldName}>Mobile:</Text>
                            <Text style={styles.fieldValue}>{result.data.mobile}</Text>
                        </View>
                    </View>

                    {/* <View style={styles.buttonContainer}>
                        <Button title="Change Password" color="warning" containerStyle={[styles.button, { marginRight: 10 }]} />
                        <Button title="Logout" color="error" containerStyle={styles.button} />
                    </View> */}
                </ScrollView>
            </View>
        );
    }
    return null;
};

export default Profile;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#94DFE6', // Background color set here
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    avatarContainer: {
        backgroundColor: '#fff',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#107387',
    },
    avatarTitle: {
        fontSize: 150,
        color: '#94DFE6',
    },
    tableContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    fieldName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#107387',
    },
    fieldValue: {
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    button: {
        width: '40%',
    },
});
