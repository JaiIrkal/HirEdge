import { StyleSheet, View } from 'react-native'
import React from 'react'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Button, FAB, Icon, Text } from '@rneui/themed';
import Loading from '../../../components/Loading/Loading';
import { DataTable } from 'react-native-paper';
import AutoLink from 'react-native-autolink' 


const DrivePage = ({ route, navigation }: DrawerScreenProps<TPODrawerParamList, "Drive">) => {
    const api = useAxiosPrivate();
    const drive_id = route.params.drive_id;

    const result = useQuery({
        queryKey: ["TPODriveData", drive_id],
        queryFn: (): Promise<TPODriveResponseType> => (
            api.get(`/tpo/drive/${drive_id}`, {
            }).then(res => res.data)
        )
    })

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                refreshControl={<RefreshControl refreshing={result.isLoading} onRefresh={result.refetch} />}
            >
                <View style={styles.box}>
                    {result.isSuccess && (
                        <>
                            <Text style={styles.companyName} h2>{result.data?.drive.company_details.company_name}</Text>
                            <Text h4>Company Website: {result.data?.drive.company_details.company_website}</Text>
                            <Text h4>Job Title: {result.data?.drive.job_title}</Text>
                            <Text h4>CTC: {result.data.drive.job_ctc}</Text>

                            <Text h4 style={styles.eligibilityTitle}>Eligibility Criteria</Text>
                            <View style={styles.eligibilityContainer}>
                                <Text h4>Branch: {result.data.drive.branch.join(', ')}</Text>
                                <Text h4>10th Marks: {result.data.drive.tenth_cutoff ? `${result.data.drive.tenth_cutoff}%` : 'No Criteria'}</Text>
                                <Text h4>12th Marks: {result.data.drive.twelfth_cutoff ? `${result.data.drive.twelfth_cutoff}%` : 'No Criteria'}</Text>
                                <Text h4>UG CGPA: {result.data.drive.ug_cutoff || 'No Criteria'}</Text>
                            </View>

                            <View style={styles.jobLocationsContainer}>
                                <Text h4>Job Locations: </Text>
                                <View style={styles.jobLocations}>
                                    {result.data.drive.job_locations.map((city, index, arr) => (
                                        <React.Fragment key={index}>
                                            <Text style={styles.jobLocation}>{city} {index != arr.length - 1 ? "," : null}</Text>

                                        </React.Fragment>
                                    ))}
                                </View>
                            </View>
                            <View >
                                <Text h4>Job Description</Text>
                                <AutoLink text={result.data.drive.job_description}
                                    linkStyle={{
                                        fontSize: 20
                                    }}
                                    textProps={{
                                        style: {
                                            fontSize: 20
                                        }
                                    }}
                                />
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button
                                    title={"Post Update"}
                                    titleStyle={{
                                    }}
                                    onPress={() => {
                                        navigation.navigate("Post Update", {
                                            drive_id: drive_id,
                                            company_name: result.data.drive.company_details.company_name,
                                        })
                                    }}
                                />

                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        // marginVertical: -1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    box: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        backgroundColor: '#FFFFFF',
    },
    companyName: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30, // Increased space between each line
        color: '#107387',
    },
    eligibilityTitle: {
        marginTop: 20,
        marginBottom: 30, // Increased space between each line
        color: '#107387',
    },
    eligibilityContainer: {
        marginBottom: 40, // Increased space between each line
    },
    jobLocationsContainer: {
        marginBottom: 20, // Increased space between each line
    },
    jobLocations: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    jobLocation: {
        fontSize: 22,
        marginRight: 10,
        marginBottom: 25, // Increased space between each line
        color: '#666666',
    },
    jobDescription: {
        fontSize: 16,
        marginBottom: 90, // Increased space between each line
        color: '#333333',
    },
    buttonsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    registerButtonContainer: {
        flex: 1,
        marginRight: 10,
    },
    buttonTitle: {
        fontSize: 20,
    },
    registerButton: {
        borderRadius: 20,
        backgroundColor: 'primary',
        flex: 1
    },
    knowMoreButton: {
        borderRadius: 20,
        backgroundColor: '#107387',
        flex: 1,
    },
});

export default DrivePage;
