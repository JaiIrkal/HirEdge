import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { useInfiniteQuery } from '@tanstack/react-query';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';


interface Props {
    company_id: string;
}


type CompanyExperienceResponse = {
    metadata: {
        totalCount: number,
        pageCount: number;
        page: number;
    },
    data: Array<{
        _id: string;
        experience: string;
        postedOn: number;
        difficulty: number;
        important_topics: Array<string>;
        postedBy: {
            role: string,
            user_id: string;
        }
    }>
}



const Experiences = ({ company_id }: Props) => {

    const api = useAxiosPrivate();



    const { data, isError, isSuccess, isLoading, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['interviewExperiences'],
        queryFn: async ({ pageParam }): Promise<CompanyExperienceResponse> => {
            return api.get(`/common/company/${company_id}/experiences`, {
                params: {
                    page: pageParam
                }
            }).then(res => res.data.experiences)
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.metadata.page < lastPage.metadata.pageCount) {
                return (lastPage.metadata.page + 1);
            }
            return undefined;
        },
        getPreviousPageParam: (lastPage) => {
            if (lastPage.metadata.page > 1)
                return lastPage.metadata.page - 1;

            return undefined;
        }
    })

    if (isError) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
    if (isSuccess) {
        if (data.pages[0].data.length > 0) {
            return (
                <FlatList
                    data={data.pages.flatMap(page => page.data)}
                    renderItem={({ item, index }) => (
                        <View style={{
                            borderWidth: 1,
                            borderColor: 'grey',
                            padding: 5,
                            shadowColor: 'gray',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: 3,
                            shadowRadius: 10,
                            elevation: 3,

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: 10,
                                borderBottomColor: 'gray',
                                borderBottomWidth: 1
                            }}>
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontWeight: '900' }}>Posted By:</Text>
                                        <Text style={{
                                            fontSize: 14
                                        }}>{item.postedBy.user_id}</Text></View>
                                    <Text style={{
                                        textTransform: 'capitalize'
                                    }}>{item.postedBy.role}</Text>
                                </View>
                                <View>
                                    <Text style={{ fontWeight: "900" }}>Posted On</Text>
                                    <Text>{moment(item.postedOn).format("Do MMMM, YYYY")}</Text>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>Difficulty Rating: </Text>
                                <Text>
                                    {item.difficulty}
                                </Text>

                            </View>

                            <View>
                                <Text style={{
                                    fontWeight: 'bold'
                                }}>Important Topics: </Text>
                                <Text>
                                    {item.important_topics.join(', ')}
                                </Text>
                            </View>


                            <View>
                                <Text style={{ fontWeight: 'bold' }}>Experience</Text>

                                <Text>
                                    {item.experience}
                                </Text>

                            </View>


                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={{
                        margin: 10
                    }}

                    onEndReached={() => {
                        if (hasNextPage) {
                            fetchNextPage();
                        }
                    }}
                    onEndReachedThreshold={1}

                    onStartReached={() => {
                        if (hasPreviousPage) {
                            fetchPreviousPage();
                        }
                    }}
                    onStartReachedThreshold={1}
                />
            )
        }

        return (
            <View>
                <Text>No Experiences Found</Text>
            </View>
        )
    }


    return null;
}

export default Experiences

const styles = StyleSheet.create({})