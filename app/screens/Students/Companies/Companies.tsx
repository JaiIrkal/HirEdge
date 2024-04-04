import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card, SearchBar } from '@rneui/base';
import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { useDebounce } from '@uidotdev/usehooks';
import { FlashList } from '@shopify/flash-list';

const Companies = ({ navigation, route }: DrawerScreenProps<StudentDrawerParamList, 'Companies'>) => {
    const [search, setSearch] = useState('');
    const deferredSearch = useDebounce(search, 2000);
    const api = useAxiosPrivate();

    const { data, isLoading, isSuccess, isError, refetch, fetchNextPage, isRefetching } = useInfiniteQuery({
        queryKey: ['fetchCompanies', deferredSearch],
        queryFn: ({ pageParam }): Promise<CompaniesPageResponseType> =>
        (api.get('/student/companies', {
                    params: {
                        s: deferredSearch,
                page: pageParam
                    },
                })
            .then((res) => res.data.companies)),
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount)
                return lastPage.metadata.page + 1
            return undefined;
        },
        initialPageParam: 1
    });

    if (isSuccess)
        return (
            <View style={styles.container}>
                <SearchBar
                    value={search}
                    onChangeText={setSearch}
                    placeholder="Enter Company Name...."
                    containerStyle={[styles.searchBarContainer, {
                        borderColor: 'white'
                    }]}
                    inputStyle={styles.searchInput}
                    placeholderTextColor="#A9A9A9"
                    inputContainerStyle={{
                        backgroundColor: 'white',
                    }}
                    label="Search Company"
                    labelStyle={{

                    }}
                    // Placeholder text color
                />
                <FlashList
                    onRefresh={refetch}
                    refreshing={isRefetching}
                    estimatedItemSize={100}
                    data={data.pages.flatMap((page, index) => page.data)}
                    onEndReached={fetchNextPage}
                    onEndReachedThreshold={1}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                navigation.navigate('Company', {
                                    company_id: item._id,
                                });
                            }}
                        >
                            <Card>
                                <Text style={styles.companyName}>{item.company_name}</Text>
                            </Card>
                        </TouchableOpacity>
                    )}
                />
            </View>
        );

    return null;
};

export default Companies;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Light background color
    },
    searchBarContainer: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff', // White background color for search bar
    },
    searchInput: {
        fontSize: 16,
        color: '#333333', // Text color
    },
    scrollView: {
        flex: 1,
    },
    // card: {
    //     marginHorizontal: 20,
    //     marginVertical: 10,
    //     borderRadius: 10,
    //     elevation: 3, // Add elevation for card shadow
    //     backgroundColor: '#ffffff', // White background color for cards
    // },
    companyName: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        paddingVertical: 15,
        color: '#107387', // Company name text color
    },
});
