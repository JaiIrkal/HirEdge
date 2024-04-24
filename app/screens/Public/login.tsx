import { Text, StyleSheet, Image, View } from "react-native";
import Header from "../../components/header/header";
import { useAuth } from "../../utils/AuthContext";
import { StackScreenProps } from "@react-navigation/stack";
import { SegmentedButtons } from "react-native-paper";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from "react";
import { LoginFormValues } from "../../utils/FormTypes/types";
import { Input, Button } from "@rneui/themed";
import Footer from "../../components/footer/footer";
import api from '../../utils/axios'
import { save } from '../../utils/useSecureStore';
import { Dropdown } from 'react-native-element-dropdown'
import messaging from '@react-native-firebase/messaging';

const Login = ({ navigation }: StackScreenProps<RootStackParamList, 'Login'>) => {

    const [role, setRole] = useState<string>('student');
    const { setAuthState } = useAuth();
    const { handleSubmit, control, resetField } = useForm<LoginFormValues>();
    const [error, setError] = useState<string>('');
    const onSubmit = async (data: LoginFormValues) => {
        setError('');
        await api.post('/login', data).then(async (res) => {
            if (res.status == 200) {
                save('refresh_token', `${res.data?.refresh_token}`);
                setAuthState({ access_token: res.data?.access_token, role: res.data?.role, user_id: data.user_id })
                if (role === 'student') {
                    await messaging().subscribeToTopic('NewDrive')
                }
            }
        }).catch((error) => {
            if (error.response) {
                setError(error.response.data.message);
            }
        })
    }

    const UserIdRef = React.createRef<any>();
    const PasswordRef = React.createRef<any>();
    return (
        <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll contentContainerStyle={{
        }} >
            <Header />
            <Text style={styles.login_head}>Opening The Doors To Success</Text>
            <Image
                                source={require('../../../assets/images/success-removebg-preview.png')}
                                style={{
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                    width: 194,
                                    height: 200,
                                    alignSelf: 'center',
                                }}
            />
            <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                defaultValue={'student'}
                render={({ field, fieldState: { error } }) => (
                    <>
                                <SegmentedButtons
                            value={field.value}
                                    buttons={[
                                        {
                                            value: 'student',
                                            label: 'Student',
                                        }, {
                                            value: 'tpo',
                                            label: 'TPO'
                                        }, {
                                            value: 'alumni',
                                            label: "Almuni"
                                        }, {
                                            value: "hod",
                                            label: "HOD"
                                        }
                                    ]}
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setRole(value);
                                        resetField('user_id')
                                    }}
                                />
                        {error?.type == 'required' && <Text style={{
                            color: 'red',
                            textAlign: 'center'
                        }}>{"Select User Type"}</Text>}
                    </>
                )
                }>
            </Controller>
            {
                (<Controller
                    name="user_id"
                    control={control}
                    rules={{
                        required: 'User ID is required',
                        pattern: role == 'student' ? {
                            value: /2[sS][dD][0-9]{2}[A-Z,a-z]{2}[0-9]{3}/,
                            message: "Invalid user ID"
                        } : undefined

                    }}
                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (

                        role == 'student' || role == 'tpo' || role == 'alumni' ? <Input
                            label="User ID"
                            ref={UserIdRef}
                            placeholder="Enter UserID"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            onSubmitEditing={() => {
                                PasswordRef.current.focus();
                            }}
                            errorMessage={error?.message}

                        /> : <><Dropdown
                            data={[
                                {
                                    label: "CSE", value: "CSE"
                                }
                            ]}
                            placeholder="Select Branch"
                            placeholderStyle={{
                                fontSize: 20
                            }}
                            value={value}
                            labelField={'label'}
                            valueField={'value'}
                            onChange={(item) => { onChange(item.value) }}
                            containerStyle={{
                            }}
                            style={{
                                marginHorizontal: 10,
                                marginTop: 10
                            }}



                        />
                            {error && <Text style={{
                                marginHorizontal: 10,
                                color: 'red'
                            }}>{error.message}</Text>}
                        </>

                    )}
                />
                )
            }


            <Controller
                name="password"
                control={control}
                rules={
                    {
                        required: "Password is required",
                    }
                }
                render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (<Input
                    label="Password"
                    ref={PasswordRef}
                    placeholder="Enter Password"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={() => {
                        PasswordRef.current.blur();
                    }}
                    errorMessage={error?.message}
                    secureTextEntry={true}
                />)}
            />
            {error && <Text style={{
                marginHorizontal: 10,
                color: 'red'
            }}>{error}</Text>}
            <Button
                onPress={handleSubmit(onSubmit)}
                                    type="solid"
                                    color={"primary"}
                                    titleStyle={{
                                        fontSize: 20
                                    }}
                                    buttonStyle={{
                                        borderRadius: 20
                                    }}
                                    containerStyle={{
                                        width: "50%",
                                        alignSelf: 'center',
                                    }}
                                >
                                    Log In
            </Button> 
            <Button
                                type="solid"
                                style={{
                                    backgroundColor: '#EAD637',

                }}
                containerStyle={{
                    marginVertical: 10
                                }}
                                color={"warning"}
                                buttonStyle={{
                                    borderRadius: 20,
                                }}
                                onPress={() => {
                                    navigation.goBack();
                }}

            >
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: '#230C0F',
                                    marginBottom: 5
                                }}>Go Back</Text>
            </Button>
            <Footer />
        </KeyboardAwareScrollView >
    )
}

const styles = StyleSheet.create({
    login_head: {
        fontSize: 23,
        marginTop: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
    container: {
        width: '100%',
        flex: 1,
    },
    mainHeading: {
        fontSize: 36,
        fontWeight: 'bold'
    }
    , formBox: {
        flex: 1,
        backgroundColor: '#EAD637',
        padding: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }, errorMsg: {
        color: 'red'
    }
})

export default Login;