import { KeyboardAvoidingView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import { Button, Icon, Input, Overlay } from '@rneui/themed'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import SelectDropdown from 'react-native-select-dropdown'
import { RadioButton } from 'react-native-paper'
import useAxiosPrivate from '../../../utils/axiosPrivate'

import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';

const valdationSchema = Yup.object({
    usn: Yup.string().required("USN is required").matches(/2[sS][dD][0-9]{2}[A-Z,a-z]{2}[0-9]{3}/, "Invalid USN"),
    first_name: Yup.string().required("First name is required"),
    middle_name: Yup.string(),
    last_name: Yup.string(),
    dob: Yup.date().required("Date of Birth is required"),
    gender: Yup.string().oneOf(['male', 'female', 'other']).required("Gender is required"),
    branch: Yup.string().required("Branch is required"),
    email: Yup.string().email().required("Email is required"),
    mobile: Yup.number().min(1000000000).max(9999999999).required("Mobile No is required"),
    tenth_percentage: Yup.number().required("10th Percentage is required").min(1).max(100).typeError('Must be a number'),
    twelfth_percentage: Yup.number().required("12th Percentage is required").typeError('Must be a number'),
    ug_cgpa: Yup.number().min(0).max(10).required("UG CGPA is required").typeError('Must be a number'),
})

interface StudentForm {
    usn: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    dob: string;
    gender: string;
    mobile: string;
    email: string;
    branch: string;
    tenth_percentage: string;
    twelfth_percentage: string;
    ug_cgpa: string;

}




const AddStudent = () => {
    const api = useAxiosPrivate();
    const { control, handleSubmit, setValue, } = useForm<StudentForm>({

    })
    const [show, setShow] = useState(false);

    const showDatepicker = () => {
        setShow(true);
    };

    const onSubmit = (data: StudentForm) => {
        console.log(data);
    }

    const initialValues: StudentForm = {
        usn: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        gender: '',
        mobile: '',
        email: '',
        branch: '',
        tenth_percentage: '',
        twelfth_percentage: '',
        ug_cgpa: '',
    }

    return (

        <View style={{
            flex: 1
        }}>
            <ScrollView >
                <KeyboardAvoidingView >

                        <View>
                        <Controller
                            name='usn'
                            control={control}
                            rules={{
                                // required: true,
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Input
                                    value={value}
                                    placeholder='Enter USN'
                                    onChangeText={onChange}
                                    label="USN"
                                    // errorMessage={ }
                                    maxLength={25}
                                />)}
                            />

                        <Controller
                            name='first_name'
                            control={control}
                            rules={{
                                // required: true
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (<Input
                                value={value}
                                placeholder='Enter First Name'
                                onChangeText={onChange}
                                label="First Name"
                                maxLength={25}
                            />)}

                        />

                        <Controller
                            name='middle_name'
                            control={control}
                            rules={{
                                // required: true,
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Input
                                    value={value}
                                    placeholder='Enter Middle Name'
                                    label="Middle Name"
                                    onChangeText={onChange}
                                    // errorMessage={errors.middle_name}
                                maxLength={25}
                                />)}
                            />


                        <Controller
                            name='last_name'
                            control={control}
                            rules={{
                                // required: true,
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Input
                                    value={value}
                                placeholder='Enter Last Name'
                                    onChangeText={onChange}
                                label="Last Name"
                                    // errorMessage={errors.last_name}
                                maxLength={25}
                            />
                            )}
                        />

                        <Controller
                            name='dob'
                            control={control}
                            rules={{
                                // required: true
                            }}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Input value={value}
                                placeholder='Enter Date of Birth'
                                label='Date of Birth'
                                style={{ flexGrow: 1 }}
                                rightIcon={<Icon onPress={showDatepicker} name={'calendar'} type='antdesign' size={36} />}
                                editable={false}
                                    // errorMessage={errors.dob}
                            />
                            )}
                        />
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                value={new Date()}
                                            mode='date'
                                            // is24Hour={true}
                                            onChange={(event: any, currentDate: moment.MomentInput) => {
                                                setValue('dob', moment(currentDate).format("DD-MM-YYYY"));
                                            }}
                                            maximumDate={new Date()}
                                        />
                        )}
                            <Text>Gender</Text>
                        <Controller
                            name='gender'
                            control={control}
                            rules={{
                                // required: true
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (<RadioButton.Group onValueChange={onChange} value={value} >
                                {error && <Text style={styles.errorMessage}>{error.message}</Text>}
                                <RadioButton.Item value='male' label='Male' />
                                <RadioButton.Item value='female' label='Female' />
                            </RadioButton.Group>)}
                        />

                        <Controller
                            name='email'
                            control={control}
                            rules={{
                                // required: true
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (<Input
                                value={value}
                                placeholder='Enter Email'
                                onChangeText={onChange}
                                label="Email"
                                inputMode='email'
                                textContentType='emailAddress'
                            // errorMessage={errors.email}
                            />)}
                        />

                        <Controller
                            name='mobile'
                            control={control}
                            rules={{
                                // required: true
                            }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (<Input
                                value={value}
                                placeholder='Enter Mobile Number'
                                onChangeText={onChange}
                                label="Mobile Number"
                                keyboardType='phone-pad'
                                inputMode='tel'
                            // errorMessage={errors.mobile}
                            />)}
                        />


                            <Text>Branch</Text>

                        <Controller
                            name='branch'
                            control={control}
                            render={({ field: { value, onChange }, fieldState: { error } }) => (<SelectDropdown
                                data={["CSE", "ISE", "ECE", "EEE"]}
                                onSelect={onChange}
                                defaultButtonText='Select Branch'
                            />)}
                            />

                        {/* {errors.branch && <Text style={styles.errorMessage}>{errors.branch}</Text>} */}

                        <Controller
                            name='tenth_percentage'
                            control={control}
                            defaultValue='10'
                            render={({ field: { value, onChange }, fieldState: { error } }) => (<Input
                                label="Tenth Percentage"
                                placeholder='Enter 10th Percentages'
                                value={`${value}`}
                                onChangeText={onChange}
                                inputMode='decimal'
                                keyboardType='decimal-pad'
                            // errorMessage={errors.tenth_percentage}
                            />)}
                        />



                        <Controller
                            name='twelfth_percentage'
                            control={control}
                            defaultValue='10'
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Input
                                label="Twelfth Percentage"
                                placeholder='Enter 12th Percentages'
                                    value={`${value}`}
                                    onChangeText={onChange}
                                inputMode='decimal'
                                keyboardType='decimal-pad'
                                // errorMessage={errors.twelfth_percentage}
                                />
                            )}
                        />

                        <Controller
                            name='ug_cgpa'
                            control={control}
                            defaultValue='10'
                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                <Input
                                label="UG CGPA"
                                placeholder='Enter UG CGPA'
                                    value={`${value}`}
                                    onChangeText={onChange}
                                inputMode='decimal'
                                keyboardType='decimal-pad'
                                // errorMessage={errors.ug_cgpa}
                                />
                            )}
                        />
                        <Button onPress={handleSubmit(onSubmit)} >Submit</Button>
                    </View>
                </KeyboardAvoidingView>
        </ScrollView>
        </View>
    )
}

export default AddStudent

const styles = StyleSheet.create({
    errorMessage: {
        color: 'red'
    }
})