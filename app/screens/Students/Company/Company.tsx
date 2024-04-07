import React from 'react';
import { Linking, StyleSheet, View, ScrollView, ToastAndroid } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { Text, FAB } from '@rneui/base';
import { DrawerScreenProps } from '@react-navigation/drawer';
import Experiences from './Experiences';

const Company = ({ navigation, route }: DrawerScreenProps<StudentDrawerParamList, "Company">) => {
    const company_id = route.params.company_id;
    const api = useAxiosPrivate();

    const { data, isSuccess } = useQuery({
        queryKey: ["getCompanyDetails", company_id],
        queryFn: (): Promise<CompanyDetails> => (
            api.get(`/student/company/${company_id}`).then(res => res.data)
        ),
    });

    if (isSuccess) {
        return (
            <View style={styles.container}>
                <View>
                    <Text h1 style={styles.companyName}>{data?.company_name}</Text>
                    <View style={styles.websiteContainer}>
                        <Text style={styles.websiteLabel}>Company Website:</Text>
                        <Text
                            style={styles.websiteLink}
                            onPress={() => Linking.openURL(`https://${data?.company_website}`)}
                        >
                            {data?.company_website}
                        </Text>
                    </View>
                    <Text style={styles.sectionTitle}>Interview Experiences</Text>
                    <View style={styles.interviewExperiencesContainer}>
                        <Experiences company_id={company_id} />
                    </View>
                </View>
                <FAB
                    title="Share Experience"
                    icon={{ name: 'add' }}
                    placement='right'
                    style={styles.fab}
                    onPress={() => {
                        ToastAndroid.show('Share Experience', ToastAndroid.SHORT);
                        navigation.navigate('Share Experience', {
                            company_id: company_id,
                            company_name: data.company_name
                        });
                    }}
                />
            </View>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    companyName: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#107387',
    },
    websiteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#A2D3C2',
        borderRadius: 10,
        marginHorizontal: 30,
        marginBottom: 20,
    },
    websiteLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    websiteLink: {
        fontSize: 18,
        color: 'blue',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 20,
        marginBottom: 10,
        color: '#107387',
    },
    interviewExperiencesContainer: {
        paddingHorizontal: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Company;
