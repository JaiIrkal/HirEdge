import { StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import React from 'react';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Card, Input } from '@rneui/themed';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { FlatList } from 'react-native-gesture-handler';
import DriveInteractionButton from '../../../components/common/DriveInteractionButton/DriveInteractionButton';
import CompanyTierIcon from '../../../components/common/CompanyTierIcon/CompanyTierIcon';

const screenWidth = Dimensions.get('window').width;

const OngoingDrives = ({ navigation }: DrawerScreenProps<StudentDrawerParamList, 'Ongoing Drives'>) => {
    const api = useAxiosPrivate();

    const { height, width } = useWindowDimensions();

    const { data, isLoading, isSuccess, isError, hasNextPage, fetchNextPage, } = useInfiniteQuery({
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
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount)
                return lastPage.metadata.page + 1;
            return undefined;
        },
        getPreviousPageParam: (lastPage) => {
            if (lastPage.metadata.page > 1)
                return lastPage.metadata.page - 1;
            return undefined;
        }


    });

    if (isError) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }


    if (isLoading)
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );

    if (isSuccess)
        return (
            <View style={styles.container}>

                <Input
                    placeholder='Enter Company Name'
                    label="Company Name"
                />
                <View style={{
                    flex: 1
                }}>
                    <FlatList
                        data={data.pages.flatMap(page => page.data)}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Drive', {
                                    drive_id: item._id,
                                });
                            }}>
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                    padding: 5,
                                    shadowColor: 'gray',
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 3,
                                    shadowRadius: 10,
                                    elevation: 3,
                                    borderRadius: 5,
                                    flexDirection: 'row',
                                    columnGap: 5,
                                    margin:8
                                }}>
                                    <View>
                                        <CompanyTierIcon tier={item.tier} size={height * 0.08} />
                                    </View>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.company_name}</Text>
                                        <Text style={{
                                            fontWeight: '700'
                                        }}>{item.job_title}</Text>
                                        <Text>{item.job_ctc}</Text>
                                    </View>
                                    <View>
                                        {!item.eligible && <Text style={{ color: 'red', alignSelf: 'center' }}>Not Eligible</Text>}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={{
                            flex: 1,
                        }}
                    />
                </View>
            </View>
        );

    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: 'white'
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
