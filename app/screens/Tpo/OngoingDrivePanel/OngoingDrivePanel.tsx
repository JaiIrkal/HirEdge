import { StyleSheet, Text, TouchableNativeFeedback, View, useWindowDimensions } from 'react-native'
import React from 'react'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';

import { Button, Card, Icon } from '@rneui/themed';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


const OngoingDrivePanel = () => {
    const { width } = useWindowDimensions();

    const api = useAxiosPrivate();

    const navigation = useNavigation<NavigationProp<TPODrawerParamList>>();

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["TPOOngoingDrive"],
        queryFn: async (): Promise<TPODrivesPanelResponseType> => {
            return api.get('/tpo/drives', {
                params: {
                    limit: 5,
                    page: 1,
                    s: ''
                }
            }).then(res => res.data.drives)
        },
        staleTime: 30 * 60 * 1000
    })

    if (isError)
        return (<View>
            <Text>Error....</Text>
        </View>)

    if (isLoading)
        return (<View>
            <Text>Loading.....</Text>
        </View>)

    if (isSuccess)
        return (
            <FlashList
                data={data.data}
                renderItem={({ item }) => (
                    <View style={{
                        marginVertical: 0,
                        width: width * 0.4,
                        height: "100%",
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius:20,
                        padding: 10,
                        backgroundColor:'#ffffff',
                        marginBottom: 30
                    }}>
                        <Card.Title style ={styles.cardTitle}>
                            {item.company_name}
                        </Card.Title>
                        <Card.Divider />
                        <Text style={styles.jobTitle}>{item.job_title}</Text>
                        <Button style={{borderRadius:10 }} title={"Go To Drive"} onPress={() => {
                            navigation.navigate('Drive', { drive_id: item._id }) 
                        }} />
                    </View>
                )}
                scrollEnabled
                estimatedItemSize={10}
                horizontal
                contentContainerStyle={{
                    padding: 0,
                    paddingBottom: 0, 
                }}
                canCancelContentTouches
                style={{

                }}
                ListFooterComponent={() => (<TouchableOpacity
                    pressRetentionOffset={0}
                    onPress={() => {
                        navigation.navigate('Ongoing Drives')
                    }}

                    style={{
                        marginVertical: 0,
                        width: width * 0.4,
                        height: "100%",
                        margin: 5,
                        padding: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}><>
                        <Icon name='rightcircleo' type='antdesign' />
                        <Button
                            iconRight

                            type='clear'
                            titleStyle={{
                                color: 'darkblue',
                                fontWeight: '900'
                            }}
                        >Show More..</Button></>
                </TouchableOpacity>)}

            />
        )

    return null;
}

export default OngoingDrivePanel

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#107387',
        marginBottom: 5,
    },
    jobTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#107387',
        marginBottom:5,
    },
})
