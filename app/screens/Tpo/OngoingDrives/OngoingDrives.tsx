import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import Loading from '../../../components/Loading/Loading'
import { Card, Icon, Input } from '@rneui/themed'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { useDebounce } from '@uidotdev/usehooks'
import { Text } from '@rneui/themed'
import { FlatList, RefreshControl, TouchableOpacity } from 'react-native-gesture-handler'
import CompanyTierIcon from '../../../components/common/CompanyTierIcon/CompanyTierIcon'


interface TPODrivesResponseType {
    metadata: {
        totalCount: number,
        pageCount: number;
        page: number;
    },
    data: Array<{
        _id: string;
        company_id: string;
        company_name: string;
        job_title: string;
        job_ctc: string;
        registered_students: Array<{
            user_id: string;
            status: string;
        }>
    }>
}


const OngoingDrives = ({ navigation }: DrawerScreenProps<TPODrawerParamList, 'Ongoing Drives'>) => {

    const [search, setSearch] = useState<string>('');

    const s = useDebounce(search, 2000);

    const api = useAxiosPrivate();

    const { width, height } = useWindowDimensions();

    const { data, isLoading, isSuccess, isError, refetch, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage, isRefetching } = useInfiniteQuery({
        queryKey: ["fetchTPOOngoingDrives", s],
        queryFn: ({ pageParam }): Promise<TPODrivesResponseType> => (
            api.get('/tpo/drives', {
                params: {
                    s: s,
                    page: pageParam,
                    limit: 5
                }
            }).then(res => res.data.drives)
        ),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount)
                return lastPage.metadata.page + 1;
            return undefined;
        },
        maxPages: 4,
        getPreviousPageParam: (lastPage) => {
            if (lastPage.metadata.page > 1)
                return lastPage.metadata.page - 1;

            return undefined;
        }
    })

    if (isLoading) {
        return <Loading size={200} />
    }


    if (isSuccess)
    return (

        <View style={{
            flex: 1,
            justifyContent: 'center'
        }}>
            <Input
                value={search}
                onChangeText={setSearch}
                label="Company Name"
                placeholder='Search for Drives...'
            />

            <FlatList
                data={data.pages.flatMap((item) => { return item.data })}
                scrollEnabled
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onLongPress={() => {
                            navigation.navigate('Drive', {
                                drive_id: item._id
                            })
                        }}
                        pressRetentionOffset={0}
                    >   
                        <View style={{
                            height: height * 0.1,
                            width: width * 0.95,
                            alignItems: 'center',
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 10,
                            padding: 5,
                            flexDirection: 'row'
                        }}>
                            <CompanyTierIcon tier={1} size={height * 0.07} style={{
                                borderColor: 'black',
                                borderWidth: 3,
                                borderRadius: 10
                            }} />
                            <Text style={{
                                fontSize: 20
                            }}>{item.company_name}</Text>
                        </View>
                    </TouchableOpacity>)}
                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
                onEndReachedThreshold={1}
                onEndReached={() => {
                    if (hasNextPage)
                        fetchNextPage()
                }}
                onStartReachedThreshold={1}
                onStartReached={() => {
                    if (hasPreviousPage)
                        fetchPreviousPage();
                }}
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            />
        </View>
    )

    return null
}

export default OngoingDrives

const styles = StyleSheet.create({})


/* 

    

*/