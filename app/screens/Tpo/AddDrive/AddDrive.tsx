import { StyleSheet, TouchableOpacity, View, Dimensions, TextInput, ToastAndroid } from 'react-native'
import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, CheckBox, Icon, Input, Text } from '@rneui/themed'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import { useDebounce } from '@uidotdev/usehooks'
import { DrawerScreenProps } from '@react-navigation/drawer'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';




interface AddDriveValues {
    tier: number | null;
    job_title: string,
    job_description: string,
    job_ctc: string,
    job_locations: string,
    tenth_cutoff: number,
    twelfth_cutoff: number,
    ug_cutoff: number,
    branch: {
        CSE: boolean,
        ISE: boolean,
        ECE: boolean,
        MECH: boolean,
        CIVIL: boolean,
        EEE: boolean,
        CHEM: boolean
    },
    rounds: Array<{
        round_details: string,
    }>,
    registration_end_date: Date;
    registration_end_time: Date;
}

type CompaniesProps = {
    readonly title: string,
    readonly id: string,
}


interface CompanyOptionsResponseType {
    metadata: {
        totalCount: number;
        pageCount: number;
        page: 1
    },
    data: Array<CompaniesProps>
}


const AddDrive = ({ route }: DrawerScreenProps<TPODrawerParamList, "Add Drive">) => {
    const api = useAxiosPrivate();

    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [search, setSearch] = useState('')
    const s = useDebounce(search, 2000);
    const showTimepicker = () => {
        setShowTime(true);
    };


    const { control, handleSubmit, setValue } = useForm<AddDriveValues>();


    const onSubmit = (data: AddDriveValues) => {
        api.post('tpo/drives', {
            company_id: route.params.company_id,
            company_name: route.params.company_name, ...data
        }).then((res) => {
            if (res.status == 200) {
                ToastAndroid.show("Drive added successfully", ToastAndroid.SHORT);
            }
        }).catch((err) => { console.log(err) })
    }
    const [open, setOpen] = useState(false);

    const richText = useRef();

    return (
        <KeyboardAwareScrollView enableOnAndroid >
            <View style={{
                backgroundColor: 'white'
            }}>
                <Text style={{ fontSize: 20, color: 'black' }}>Company Name : {route.params.company_name}</Text>
                <Controller
                    name='job_title'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (<Input
                        value={value}
                        onChangeText={onChange}
                        placeholder='Enter Job Title'
                        label="Job Title"
                    // errorMessage={errors.job_title}
                    />)}
                />
                <Controller
                    name='job_ctc'
                    control={control}
                    rules={{}}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (<Input
                        value={value}
                        onChangeText={onChange}
                        placeholder='Enter Job CTC'
                        label="Job CTC"
                    // errorMessage={errors.job_title}
                    />)}
                />


                <Text>Tier</Text>
                <Controller
                    name='tier'
                    control={control}
                    render={({ field: { value, onChange } }) => (<View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            borderWidth: 1,
                            borderColor: 'gray',
                            marginHorizontal: 5
                        }}>
                        <CheckBox
                            checked={value === 1}
                            onPress={() => { onChange(1) }}
                            title={"Tier - I"}
                        />
                        <CheckBox
                            checked={value === 2}
                            onPress={() => { onChange(2) }}
                            title={"Tier - II"}
                        />
                        <CheckBox
                            checked={value === 3}
                            onPress={() => { onChange(3) }}
                            title={"Tier - III"}
                        />
                        <CheckBox
                            checked={value === 0}
                            onPress={() => { onChange(0) }}
                            title={"Dream"}
                        />
                    </View>)}

                />

                <Text>Branch</Text>

                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>

                <Controller
                    name='branch.CSE'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"CSE"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.ISE'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"ISE"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.ECE'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"ECE"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.EEE'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"EEE"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.MECH'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"MECH"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.CIVIL'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"CIVIL"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                <Controller
                    name='branch.CHEM'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <CheckBox
                            checked={value}
                            title={"CHEM"}
                            onPress={() => { onChange(!value) }}
                            wrapperStyle={styles.checkboxWrapper}
                        />
                    )}
                />
                </View>

                <Controller
                    name="job_locations"
                    control={control}
                    render={({ field: { value, onChange } }) => (<Input
                        value={value}
                        onChangeText={onChange}
                        label="job_locations"
                        placeholder='Enter Job Locations seperated by comma'
                    />)}
                />

                <Controller
                    name='tenth_cutoff'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            label="10th Percentage"
                            value={value ? value.toString() : ""}
                            keyboardType='decimal-pad'
                            onChangeText={onChange}
                            inputMode='decimal'
                            // errorMessage={errors.tenth_cutoff}
                            // leftIcon={<TouchableOpacity onPress={() => {
                            //     setFieldValue('tenth_cutoff', values.tenth_cutoff - 1);
                            // }}><Icon name='minuscircleo' type='antdesign' /></TouchableOpacity>
                            // }
                            // rightIcon={<TouchableOpacity onPress={() => {
                            //     setFieldValue('tenth_cutoff', values.tenth_cutoff + +1);
                            // }}><Icon name='pluscircleo' type='antdesign' /></TouchableOpacity>}
                        />
                    )}
                />

                <Controller
                    name='twelfth_cutoff'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { } }) => (
                        <Input
                            label="12th Percentage"
                            value={value ? value.toString() : ""}
                            inputMode='decimal'
                            keyboardType='decimal-pad'
                            onChangeText={onChange}
                            placeholder='Enter 12th cutoff percentage'
                        // errorMessage={errors.twelfth_cutoff}
                        // leftIcon={<TouchableOpacity onPress={() => {
                        //     setFieldValue('twelfth_cutoff', values.twelfth_cutoff - 1)
                        // }}><Icon name='minuscircleo' type='antdesign' /></TouchableOpacity>
                        // }
                        // rightIcon={<TouchableOpacity onPress={() => {
                        //     setFieldValue('twelfth_cutoff', values.twelfth_cutoff + +1)
                        // }}><Icon name='pluscircleo' type='antdesign' /></TouchableOpacity>}
                        />
                    )}
                />


                <Controller
                    name='ug_cutoff'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (<Input
                        label="UG CGPA"
                        value={value ? value.toString() : ""}
                        placeholder='Enter UG Cutoff'
                        enterKeyHint='done'
                        inputMode='numeric'
                        keyboardType='numeric'
                        onChangeText={onChange}
                    // leftIcon={<TouchableOpacity onPress={() => {
                    //     if (values.ug_cutoff - 1 > 0.0)
                    //         setFieldValue('ug_cutoff', values.ug_cutoff - 1)
                    // }}><Icon name='minuscircleo' type='antdesign' /></TouchableOpacity>
                    // }
                    // rightIcon={<TouchableOpacity onPress={() => {
                    //     if (values.ug_cutoff + +1 <= 10.0)
                    //         setFieldValue('ug_cutoff', values.ug_cutoff + +1)
                    // }}><Icon name='pluscircleo' type='antdesign' /></TouchableOpacity>}
                    // errorMessage={errors.ug_cutoff}
                    />)}
                />
                <Text h4>Selection Process</Text>
                <Controller
                    name='registration_end_date'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => {
                        return (<>
                            <Input
                                value={value ? value.toLocaleDateString() : ""}
                                rightIcon={<Icon name='calendar' type='antdesign' onPress={() => {
                                    setShowDate(true);
                                }} />}
                                label={"Registration End Date"}
                            />
                            {showDate && <DateTimePicker
                                value={value || new Date()}
                                mode='date'
                                minimumDate={new Date()}
                                onChange={(_, date) => {
                                    if (date) {
                                        onChange(date);
                                    }
                                    setShowDate(false);
                                }}
                            />}
                        </>
                        )
                    }}
                />
                <Controller
                    name='registration_end_time'
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => {
                        return (<>
                            <Input
                                value={value ? value.toLocaleTimeString() : ""}
                                rightIcon={<Icon name='clockcircleo' type='antdesign' onPress={() => {
                                    setShowTime(true);
                                }} />}
                                label={"Registration End Time"}
                            />
                            {
                                showTime && <DateTimePicker
                                    value={value || new Date()}
                                    mode={'time'}
                                    onChange={(_, date) => {
                                        if (date) {
                                            onChange(date);
                                        }
                                        setShowTime(false);
                                    }}
                                />
                            }
                        </>)
                    }}
                />
                <ScrollView style={{
                    minHeight: 200,
                    maxHeight: Dimensions.get('window').height * 0.4,
                }}>
                    <Controller
                        name='job_description'
                        control={control}
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <Input
                                multiline
                                value={value}
                                onChangeText={onChange}
                                placeholder='Enter Job Description'
                                label="Job Description"
                                errorMessage={error?.message}
                                scrollEnabled
                                inputStyle={{
                                    minHeight: 150,
                                    maxHeight: 250,
                                    textAlignVertical: 'bottom'
                                }}
                            />

                        )}
                    />
                </ScrollView>
                <Button color={'success'}
                    onPress={handleSubmit(onSubmit)}
                >Submit</Button>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default AddDrive

const styles = StyleSheet.create({
    errorMessageStyle: {
        color: 'red'
    },
    checkboxWrapper: {
        width: 80
    }
})