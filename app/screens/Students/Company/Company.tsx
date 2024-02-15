import { Linking, StyleSheet, ToastAndroid, View, useWindowDimensions, } from 'react-native'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate';

import { Text } from '@rneui/base'
import { FAB, Tab, TabView } from '@rneui/themed';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import InterviewExperiences from '../InterviewExperiences/InterviewExperiences';
import { DrawerScreenProps } from '@react-navigation/drawer';



const Company = ({ navigation, route }: DrawerScreenProps<StudentDrawerParamList, "Company">) => {
    const company_id = route.params.company_id;

    const api = useAxiosPrivate();

    const { data, isSuccess, isLoading, refetch } = useQuery({
        queryKey: ["getCompanyDetails", company_id],
        queryFn: (): Promise<CompanyDetails> => (
            api.get(`/student/company/${company_id}`, {

            }).then(res => res.data)
        )
    })

    if (isSuccess)
    return (
        <View style={{

            flex: 1,

        }}>
            <ScrollView
                style={{
                    flex: 1
                }}
            // refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
            >
                <Text h1 style={{ alignSelf: "center" }}>{data?.company_name}</Text>
                
                <View style={{
                    alignSelf:'center', 
                    display:'flex', 
                    flexDirection:'row',
                    marginTop:5,
                    backgroundColor:'#A2D3C2',
                    padding:10,
                    paddingRight:20,
                    borderRadius:10,
                    marginLeft:30,
                    marginRight:30,
                    // flexWrap:'wrap'
                }}>
                    <Text h4 style={{textAlign:'center'}}>Company Website:</Text>
                    <Text onPress={() => {
                        Linking.openURL(`https://${data?.company_website}`)
                    }} style={{
                        // textDecorationLine: 'underline',
                        fontSize: 20,
                        left: 10,
                        color: 'blue'
                        }}>{data?.company_website}</Text>
                </View>

                <Text style={{
                    fontSize: 20
                }}>Interview Experiences</Text>

                <View style={{
                    flex: 1
                }}>
                <InterviewExperiences company_id={company_id} />
                </View>
            </ScrollView>
            <FAB title={"Share Experience"} icon={{ name: 'add' }} placement='right' style={{
                position: 'absolute',
            }}
                onPress={() => {
                    ToastAndroid.show(
                        'Share Experience',
                        ToastAndroid.SHORT,
                    )
                    navigation.navigate('Share Experience', {
                        company_id: company_id,
                        company_name: data.company_name
                    })
                }}
            >
            </FAB>
        </View>


    )
    return null;
}

export default Company

const styles = StyleSheet.create({})