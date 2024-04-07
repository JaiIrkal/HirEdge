import { Alert, StyleSheet, View } from 'react-native'
import React from 'react'
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Text, Icon, Button } from '@rneui/themed';


type AlumniProfile = {
    user_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    mobile: string;

}

const Profile = () => {

    const api = useAxiosPrivate();

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["alumniProfile"],
        queryFn: async (): Promise<AlumniProfile> => {
            return api.get('alumni/profile').then((res) => res.data).catch((err) => {
                Alert.alert(err.message)
            })
        }
    })

    if (isError) {
        return (<View>
            <Text>Error..</Text>
        </View>)
    }

    if (isLoading) {
        return (<View>
            <Text>Loading...</Text>
        </View>)
    }
    if (isSuccess)
    return (
        <View style={{
            flex: 1,
            padding: 5
        }}>
            <View style={{ flex: 1, }}>
                <Avatar title='A' size={'xlarge'} containerStyle={{
                    backgroundColor: 'purple',
                    borderRadius: 100,
                    alignSelf: 'center',
                    marginBottom: 40
                }} />
                <View style={{
                    flex: 1,
                    rowGap: 10
                }}>
                    <View style={styles.fieldContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.fieldTitleStyle}>Name:</Text>
                            <Text style={styles.fieldValueStyle}>{data.first_name} {data.middle_name} {data.last_name}</Text>
                        </View>
                        <Icon name='mode-edit' style={{

                        }} size={30} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.fieldTitleStyle}>Email:</Text>
                            <Text style={styles.fieldValueStyle}>{data.email}</Text>
                        </View>
                        <Icon name='mode-edit' style={{

                        }} size={30} />
                    </View>
                    <View style={styles.fieldContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.fieldTitleStyle}>Mobile:</Text>
                            <Text style={styles.fieldValueStyle}>{data.mobile}</Text>
                        </View>
                        <Icon name='mode-edit' style={{

                        }} size={30} />
                    </View>
                </View>

            </View>

            <Button>Change Password</Button>

        </View>
    )

    return null
}

export default Profile

const styles = StyleSheet.create({
    fieldContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        columnGap: 5,
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    fieldTitleStyle: {
        fontSize: 30,
        fontWeight: '900',
        marginRight: 10
    },
    fieldValueStyle: {
        fontSize: 30
    }
})