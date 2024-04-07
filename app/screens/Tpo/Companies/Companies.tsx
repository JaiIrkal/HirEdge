import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View, VirtualizedList } from 'react-native'
import React, { useCallback, useState } from 'react'
// import { FlashList } from '@shopify/flash-list'
import { Button, Input } from '@rneui/themed'
import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { useDebounce } from '@uidotdev/usehooks'
import { FlatList, RefreshControl } from 'react-native-gesture-handler'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { FontAwesome } from '@expo/vector-icons';

type CompanyListResponseType = {
    metadata: {
        totalCount: number;
        pageCount: number;
        page: number;
    },
    data: Array<{
        company_name: string;
        _id: string;
    }>
}


const Company = ({ route, navigation }: DrawerScreenProps<TPODrawerParamList, "Companies">) => {

    const api = useAxiosPrivate()
    const { width, height } = useWindowDimensions()
    const [search, setSearch] = useState('');
    const s = useDebounce(search, 5000);
    const { data, isLoading, isSuccess, fetchNextPage, fetchPreviousPage, isError, refetch, isRefetching, hasNextPage, hasPreviousPage, isFetchingNextPage, isFetchingPreviousPage, } = useInfiniteQuery({
        queryKey: ['fetchCompanies', s],
        queryFn: ({ pageParam }): Promise<CompanyListResponseType> => (
            api.get('/common/options/companies', {
                params: {
                    s: s,
                    page: pageParam
                }
            }).then(res => res.data.companies)
        ),
        initialPageParam: 1,
        maxPages: 10,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount)
                return lastPage.metadata.page + 1;
            return undefined;
        },
        getPreviousPageParam: (lastpage) => {
            if (lastpage.metadata.page > 1)
                return lastpage.metadata.page - 1;
            return undefined;
        },
    })

    const renderItem = useCallback(({ item }: { item: { company_name: string; _id: string } }) => (
        <View style={{
            width: width * 0.95,
            height: height * 0.1,
            borderColor: 'grey',
            borderWidth: 1,
            borderRadius: 20,
            padding: 10,
            backgroundColor: '#ffffff',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Text style={{ fontSize: 26 }}>{item.company_name}</Text>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                columnGap: 4
            }}>
                <Button onPress={() => {
                    navigation.navigate('Add Drive', {
                        company_id: item._id,
                        company_name: item.company_name,
                    })
                }} style={{

                }}
                    buttonStyle={{
                        borderRadius: 20
                    }}
                > Add Drive</Button>
                <Button onPress={() => {

                }}
                    buttonStyle={{
                        borderRadius: 20
                    }}
                >View Company</Button>
            </View>
        </View>
    ), [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>


            <Input
                value={search}
                onChangeText={setSearch}
                placeholder='Search Company...'
                label="Company"
                rightIcon={<FontAwesome name="search" size={24} color="black" onPress={() => { refetch() }} />}
                onSubmitEditing={() => {
                    refetch();
                }}
            />
            {
                isRefetching && <ActivityIndicator size="large" color="#0000ff" />
            }
            {
                data?.pages.flatMap(page => page.data).length == 0 && <Text>No Company Found</Text>
            }
            <FlatList
                data={data?.pages.flatMap(page => page.data)}
                renderItem={renderItem}
                keyExtractor={(item) => (item._id)}
                style={{
                    marginHorizontal: 10
                }}

                onStartReached={() => {
                    if (hasPreviousPage)
                        fetchPreviousPage();
                }}
                onStartReachedThreshold={1}
                onEndReached={() => {
                    if (hasNextPage)
                        fetchNextPage();
                }}
                onEndReachedThreshold={1}

                ListHeaderComponent={() => {
                    if (isFetchingPreviousPage)
                        return (<ActivityIndicator size={40} />);

                    return null;
                }}

                ListFooterComponent={() => {
                    if (isFetchingNextPage)
                        return (<ActivityIndicator size={40} />)
                    return null
                }}
                scrollEnabled
                initialNumToRender={1}

                refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}

            />
        </View>

    )
}

export default Company

const styles = StyleSheet.create({})