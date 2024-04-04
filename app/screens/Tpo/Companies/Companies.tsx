import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
// import { FlashList } from '@shopify/flash-list'
import { Input } from '@rneui/themed'
import { useInfiniteQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { useDebounce } from '@uidotdev/usehooks'
// import { FlatList } from 'react-native-gesture-handler'
import { FlashList } from '../../../components/FlashList/FlashList'


type CompanyListResponseType = {
    metadata: {
        totalCount: number;
        pageCount: number;
        page: number;
    },
    data: Array<{
        company_name: string;
        id: string;
    }>
}


const Company = () => {

    const api = useAxiosPrivate()
    const { width, height } = useWindowDimensions()
    const [search, setSearch] = useState('');
    const s = useDebounce(search, 3000);

    const { data, isLoading, isSuccess, fetchNextPage, fetchPreviousPage, isError, refetch, isRefetching, hasNextPage, hasPreviousPage } = useInfiniteQuery({
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
        maxPages: 5,
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount)
                return lastPage.metadata.page + 1;
            return undefined;
        },
        getPreviousPageParam: (lastpage) => {
            if (lastpage.metadata.page > 1)
                return lastpage.metadata.page - 1;
            return undefined;
        }
    })

    return (
        <View style={{ flex: 1, }}>


            <Input
                value={search}
                onChangeText={setSearch}

            />
            <FlashList
                pageInfo={{
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage
                }}
                estimatedItemSize={100}
                data={data?.pages.flatMap(page => page.data)}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            width: width * 0.2,
                            height: height * 0.1
                        }}>
                            <Text>
                                {item.company_name}
                            </Text>
                        </View>

                    )
                }}
                onEndReached={async () => {
                    fetchNextPage();

                }}
                onEndReachedThreshold={0.5}
                refreshing={isRefetching}
                scrollEnabled
                onStartReached={async () => {
                    fetchPreviousPage()
                }}
                onStartReachedThreshold={0.5}
            />




        </View>

    )
}

export default Company

const styles = StyleSheet.create({})