import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { Button, Text } from '@rneui/base';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import useAxiosPrivate from '../../../utils/axiosPrivate';

const OngoingDrivePanel = () => {
    const api = useAxiosPrivate();
    const navigation = useNavigation<DrawerNavigationProp<StudentDrawerParamList, 'Home'>>();

    const result = useQuery({
        queryKey: ['fetchOngoingDrives'],
        queryFn: (): Promise<StudentOngoingDriveResponseType> => (api.get('/student/drives', {
            params: {
                limit: 5,
                page: 1,
            }
        }).then(res => res.data.drives))
    })

    const renderOngoingDrive = ({ item }: { item: StudentDriveListType }) => {
        return (
            <View style={styles.cardStyle}>
                <Text style={styles.fontStyle}>{item.company_name}</Text>
                <Text style={styles.fontStyle}>{item.job_title}</Text>
                <Text style={styles.fontStyle}>{item.job_ctc}</Text>
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
        )
    }

    if (result.isSuccess)
        return (
            <View style={styles.panelStyle}>
                <Text h4 style={styles.heading}>Ongoing Drives</Text>
                <FlatList
                    data={result.data.data}
                    renderItem={renderOngoingDrive}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item._id}
                    horizontal
                    contentContainerStyle={styles.flatListContainer}
                    ItemSeparatorComponent={() => (<View style={styles.separator}></View>)}
                />
            </View>
        )

    return null;
}

export default OngoingDrivePanel;

const styles = StyleSheet.create({
    panelStyle: {
        minHeight: 240,
        backgroundColor: '#DCF2F1',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginBottom: 20,
    },
    heading: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    fontStyle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
    },
    cardStyle: {
        borderRadius: 15,
        minWidth: 150,
        padding: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        marginBottom: 10,
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
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    separator: {
        width: 10,
    },
})
