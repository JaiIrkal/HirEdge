import { StyleSheet, View, Linking } from 'react-native'
import React from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { AlumniDrawerParamList } from '../../../utils/Navigation/types'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { AlumniCompanyData } from '../../../utils/Query/types'
import { Text, FAB, Icon } from "@rneui/themed";

import { Link } from '@react-navigation/native'
import Experiences from './Experiences'
const Company = ({ route, navigation }: DrawerScreenProps<AlumniDrawerParamList, "Company">) => {

    const api = useAxiosPrivate();

    const company_id = route.params.company_id;

    const { data, isError, isLoading, isSuccess } = useQuery({
        queryKey: ["getCompanyDetails", company_id],
        queryFn: (): Promise<AlumniCompanyData> => (
            api.get(`/alumni/company/${company_id}`).then(res => res.data)
        ),
        enabled: true

    })

    if (isError) {
        return (<View>
            <Text>Something went wrong</Text>
        </View>)
    }

    if (isLoading) {
        return (
            <View>
                <Text>
                    Loading.....
                </Text>
            </View>
        )
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                marginHorizontal: 5,
                borderColor: 'white',
                borderWidth: 1,
                flex: 1,
                backgroundColor: 'white',
            }}>
                <Text style={{
                    fontSize: 40,
                    fontWeight: '900',
                    color: 'teal',
                    textAlign: 'center'
                }}>
                    {data?.company_name}
                </Text>

                <View style={{
                    flexDirection: 'row',
                }}>
                    <Text style={{
                        fontSize: 26
                    }}>Company Website: </Text>
                    <Text style={[
                        {
                            fontSize: 26,
                            color: 'blue',
                            textDecorationLine: 'underline'

                        }]}
                        onPress={() => {
                            Linking.openURL(`https://${data?.company_website}`)
                        }}>{data?.company_website}</Text>
                </View>

                <Experiences company_id={company_id} />

            </View>


            <FAB
                placement='right'
                icon={<Icon name="pluscircleo" type="antdesign" color={"white"} size={26} />}
                title={"Share Experience"}
                titleStyle={{ fontSize: 20 }}
                onPress={() => {
                    navigation.navigate('Share Experience', {
                        company_id: company_id,
                        company_name: data?.company_name!
                    })
                }}
            />


        </View>
    )
}

export default Company

const styles = StyleSheet.create({})