import { FlatList, StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'

import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { MaterialIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { Text, Card, Divider, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

interface DriveData {
    _id: string;
    company_id: string;
    company_name: string;
    job_title: string;
    current_status: string;
    job_ctc: string;
    status: Array<{
        usn: string;
        status: string;
    }>
}

interface RegisteredDrivesResponseType {
    metadata: {
        totalCount: number;
        pageCount: number;
        page: number;
    }, data: Array<DriveData>
}

const RegisteredDrives = () => {
    const { height, width } = useWindowDimensions();
    const navigation = useNavigation<DrawerNavigationProp<StudentDrawerParamList, 'Home'>>();

    const api = useAxiosPrivate();

    const { data, isSuccess, isError, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['participatedDrives'],
        queryFn: (): Promise<RegisteredDrivesResponseType> =>
            api.get('/student/drives/participated').then(res => res.data.drives)
        ,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount) {
                return (lastPage.metadata.page + 1);
            }
            return undefined;
        },
        initialPageParam: 1,
        getPreviousPageParam: (lastPage) => {
            if (lastPage.metadata.page > 1)
                return lastPage.metadata.page - 1;

            return undefined;
        }
    })

    if (isError) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: height * 0.4,
            }}><MaterialIcons name="error-outline" size={24} color="red" />
                <Text style={{ fontSize: 30 }}>Something Went Wrong.....</Text>
            </View>)
    }

    if (isSuccess)
        return (
            <View style={[styles.panelContainer, {
                flex: 1,
                minHeight: height * 0.6
            }]}>
                <Text h4 style={{ marginBottom: 10, marginLeft:15 }}>{"Drives You Registered For"}</Text>

                <FlatList
                    data={data.pages.flatMap(page => page.data)}
                    horizontal
                    keyExtractor={(item) => item._id}
                    renderItem={({ item, index }) => (
                        <View style={{
                        backgroundColor: 'white',
                            height: height * 0.15,
                        borderRadius: 20,
                        padding: 7,
                        marginHorizontal: 10,
                        flexDirection: 'row',
                    }}>
                        <View style={{
                                flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon name="roman-numeral-1" type="material-community" style={{
                                }} size={100} />
                        </View>
                            <View style={{
                                flex: 1,
                        }}>
                            <Text h4 style={{ textAlign: 'center' }}>{item.company_name}</Text>
                            <Divider />
                            <Text > Job Role: {item.job_title}</Text>
                                <Text> CTC : {item.job_ctc}</Text>
                                <Button
                                    onPress={() => {
                                        navigation.navigate('Drive', {
                                            drive_id: item._id
                                        })
                                    }}
                                    buttonStyle={styles.buttonStyle}
                                >
                                    <Text style={styles.buttonText}>Learn More</Text>
                                </Button>
                        </View>

                        </View>
                    )}
                />

            </View>
        )
    return null
}

export default RegisteredDrives;

const styles = StyleSheet.create({
    panelContainer: {

    },
    buttonStyle: {
        backgroundColor: '#107387',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    }
})