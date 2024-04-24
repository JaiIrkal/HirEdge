import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { createRef, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { Button, CheckBox, Input, Text } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../../utils/axiosPrivate';
import { DataTable, RadioButton } from 'react-native-paper'

import { useForm, Controller, useFieldArray } from 'react-hook-form';

type PostDriveUpdateForm = {
    update_type: string;
    update_message: string;
}

const StudentList = ({ route, navigation }: DrawerScreenProps<TPODrawerParamList, "Post Update">) => {
    const api = useAxiosPrivate();
    const drive_id = route.params.drive_id;
    const company_name = route.params.company_name;

    const { control, handleSubmit } = useForm<PostDriveUpdateForm>();

    const [isList, setIsList] = useState<Boolean>(false);

    const [shortlist, setShortlist] = useState<Array<String>>([]);

    const onSubmit = (data: PostDriveUpdateForm) => {

        // console.log(JSON.stringify({ short: shortlist }));

        api.post(`tpo/drive/${drive_id}`, {
            ...data, shortlist
        }, {
            params: {
                company_name: company_name,
            }
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show("Drive Update Posted", ToastAndroid.SHORT);
                navigation.navigate('Drive', { drive_id: drive_id })
            }
        }).catch((err) => { console.log(err) })
    }


    const { data, isLoading, isSuccess, isError } = useQuery({
        queryKey: ["TPODriveDatawithStduentData", drive_id],
        queryFn: (): Promise<TPODriveResponseType> => (
            api.get(`/tpo/drive/${drive_id}`, {
                params: {
                    withStudentData: true,
                }
            }).then(res => res.data)
        )
    })

    if (isError) {
        return (
            <View><Text>Error....</Text></View>
        )
    }

    if (isLoading) {
        return (<View><Text>Loading....</Text></View>)
    }

    if (isSuccess)
        return (
            <View style={{
                flex: 1
            }}>
                <Text h3 style={{ textAlign: 'center' }}>{company_name}</Text>
                {/* <Text> {data.drive.job_title}</Text> */}
                <ScrollView>
                    <View style={{
                        flex: 1,
                        padding: 10
                    }}>
                        <Controller
                            name='update_type'
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <>
                                    <Text>Select Update Type</Text>
                                    <View style={{
                            flexDirection: 'row',
                            width: 'auto',
                                        justifyContent: 'space-around'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <RadioButton
                                    value={"regular"}
                                                status={value === 'regular' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    onChange('regular');
                                                    setIsList(false);
                                                }}
                                />
                                <Text style={{ fontSize: 20 }}>Regular</Text>
                            </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <RadioButton
                                                value='shortlist'
                                                status={value === 'shortlist' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    onChange('shortlist')
                                                    setIsList(true);
                                                }}
                                            />
                                            <Text style={{ fontSize: 20 }}>ShortList</Text>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <RadioButton
                                                value='finallist'
                                                status={value === 'finallist' ? 'checked' : 'unchecked'}
                                                onPress={() => {
                                                    onChange('finallist')
                                                    setIsList(true)
                                                }}
                                            />
                                            <Text style={{ fontSize: 20 }}>Final List</Text>
                                        </View>

                                    </View>
                                </>
                            )}
                        />
                        <Controller
                            name='update_message'
                            control={control}
                            render={({ field: { value, onChange } }) => (<>
                                <Input
                                    value={value}
                                    onChangeText={onChange}
                                    label="Update Message"
                                    placeholder='Enter Message..'
                                />
                            </>)}
                        />
                        {
                            isList ? (<View>
                                <DataTable >
                                    <DataTable.Header >
                                        <DataTable.Title>Select</DataTable.Title>
                                        <DataTable.Title >USN</DataTable.Title>
                                        <DataTable.Title>First Name</DataTable.Title>
                                        <DataTable.Title>Middle Name</DataTable.Title>
                                        <DataTable.Title>Last Name</DataTable.Title>
                                    </DataTable.Header>

                                    {
                                        Object.keys(data.studentData).map((key, index) => (
                                            <DataTable.Row key={index}>
                                                <DataTable.Cell>
                                                    <CheckBox
                                                        checked={shortlist.includes(data.studentData[key].user_id)}
                                                        onPress={() => {
                                                            if (shortlist.includes(data.studentData[key].user_id)) {
                                                                setShortlist((value) => {
                                                                    return value.filter((id) => { return id != data.studentData[key].user_id })
                                                                })
                                                            } else {
                                                                setShortlist((value) => {
                                                                    return [...value, data.studentData[key].user_id]
                                                                })
                                                            }
                                                        }}

                                                        style={{ backgroundColor: 'transparent' }}
                                                    />
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    {data.studentData[key].user_id}
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    {data.studentData[key].first_name}
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    {data.studentData[key].middle_name}
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    {data.studentData[key].last_name}
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        ))
                                    }

                                </DataTable>

                            </View>) : null
                        }
                    </View>
                    <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
                </ScrollView>
            </View>
        )
    return null;
}

export default StudentList

const styles = StyleSheet.create({})