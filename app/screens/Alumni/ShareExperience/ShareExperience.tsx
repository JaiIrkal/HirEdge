import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, Alert } from 'react-native';

import useAxiosPrivate from '../../../utils/axiosPrivate';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { Button, Input, Text, Slider, Icon } from '@rneui/themed';
import { AlumniDrawerParamList } from '../../../utils/Navigation/types';

import { useForm, Controller } from 'react-hook-form';

interface ShareExperienceType {
    company_id: string;
    difficulty: number;
    experience: string;
    important_topics: string;
}

const ShareExperience = ({ navigation, route }: DrawerScreenProps<AlumniDrawerParamList, "Share Experience">) => {
    const api = useAxiosPrivate();
    const company_id = route.params.company_id;

    const { control, handleSubmit, } = useForm<ShareExperienceType>();

    const onSubmit = (data: ShareExperienceType) => {
        Alert.alert(JSON.stringify(data));

        api.post(`/alumni/company/${company_id}/experience`, data).then(res => {
            if (res.status === 200) {
                ToastAndroid.show("Experience Posted Successfully", ToastAndroid.SHORT)
                navigation.goBack()
            }
        }).catch(err => {
            Alert.alert(err.message)
        })

    }

    const [topic, setTopic] = useState<string>('');

    return (
        <View style={styles.container}>
            <Text style={styles.title} h4>Share your Experience</Text>
            <Text h4>Company Name: {route.params.company_name}</Text>
            <View style={styles.formContainer}>
                <ScrollView>

                    <Controller
                        name="experience"
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <Input
                                label="Experience"
                                placeholder='Write your experience here...'
                                value={value}
                                onChangeText={onChange}
                                multiline
                                inputStyle={styles.inputStyle}
                                inputContainerStyle={styles.inputContainerStyle}
                            />)}
                    />

                    <Controller
                        name='important_topics'
                        control={control}
                        render={({ field: { value, onChange } }) => (<Input
                            label="Important Topics"
                            placeholder='Write Inportant Topics Seperated by Comma'
                            value={value}
                            onChangeText={onChange}
                            multiline
                            inputContainerStyle={styles.inputContainerStyle}
                        />)}
                    />


                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderLabel}>Difficulty Level</Text>
                        <Controller
                            name='difficulty'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Slider
                                    minimumValue={1}
                                    minimumTrackTintColor='green'
                                    maximumValue={5}
                                    maximumTrackTintColor='red'
                                    value={value}
                                    onSlidingComplete={(value) => { onChange(value) }}
                                    step={1}
                                    thumbTintColor='#40A2E3'
                                />
                            )}
                        />
                        <View style={styles.sliderLabels}>
                            <Text>Very Easy</Text>
                            <Text>Moderate</Text>
                            <Text>Very Difficult</Text>
                        </View>
                    </View>
                    <Button onPress={handleSubmit(onSubmit)} style={styles.submitButton}>Submit</Button>
                </ScrollView>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
    },
    formContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    inputStyle: {
        minHeight: 200,
        maxHeight: 400,
        textAlignVertical: 'top',
        overflow: 'scroll',
    },
    inputContainerStyle: {
        marginBottom: 20,
    },
    topicContainer: {
        marginBottom: 20,
    },
    topicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    topicText: {
        fontSize: 16,
    },
    sliderContainer: {
        marginBottom: 20,
    },
    sliderLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    sliderLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    submitButton: {
        marginBottom: 20,
    },
});

export default ShareExperience;
