import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'
import { Button, Input } from '@rneui/themed'
import useAxiosPrivate from '../../../utils/axiosPrivate'
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';

type AddCompanyForm = {
    company_name: string;
    company_website: string;
}

const validationSchema = Yup.object({
    company_name: Yup.string().required("Company Name cannot be empty"),
    company_website: Yup.string().url("Must be a valid URL"),
})

const AddCompany = () => {

    const api = useAxiosPrivate();

    const { control, handleSubmit } = useForm<AddCompanyForm>();


    const onSubmit = (values: AddCompanyForm) => {
        api.post('/tpo/companies', values).then((res) => {
            if (res.status === 200) {
                ToastAndroid.show('Company Added to Database', ToastAndroid.SHORT);
            }
        }).catch((e) => {
            ToastAndroid.show("Errot Occured", ToastAndroid.SHORT);
        });
    }

    return (
        <View>


            <Controller
                name='company_name'
                control={control}
                rules={{
                    required: "Company Name cannot be empty",
                }}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <Input
                        value={value}
                        onChangeText={onChange}
                        placeholder='Enter Company Name'
                        label="Company Name"
                        errorMessage={error?.message}
                    />)}
                        />
            <Controller
                name='company_website'
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <Input
                        value={value}
                        onChangeText={onChange}
                            placeholder='Enter Company Website'
                            label="Company Website"
                        // errorMessage={errors.company_website}    
                    />
                )}
            />

            <Button color={'success'} onPress={handleSubmit(onSubmit)}>Submit</Button>

        </View>
    )
}

export default AddCompany

const styles = StyleSheet.create({})