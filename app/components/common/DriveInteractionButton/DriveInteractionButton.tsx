import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import useAxiosPrivate from '../../../utils/axiosPrivate';

interface Props {
    registered: boolean;
    eligible: boolean;
    drive_id: string;
}

const DriveInteractionButton = ({ registered, eligible, drive_id }: Props) => {


    const api = useAxiosPrivate();

    if (!eligible) {
        return (
            <Button
                color="error"
                buttonStyle={styles.button}
                titleStyle={styles.title}
                disabled
                containerStyle={{

                }}
            >
                Not Eligible
            </Button>
        );
    }

    if (registered) {
        return (
            <Button
                buttonStyle={styles.registeredButton}
                titleStyle={styles.title}
                disabled
            >
                Already Registered
            </Button>
        );
    }

    return (
        <Button
            buttonStyle={styles.registerButton}
            titleStyle={styles.title}
            onPress={() => {

            }}
        >
            Register
        </Button>
    );

};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
    },
    registerButton: {
        borderRadius: 20,
        backgroundColor: '#007bff',
    },
    registeredButton: {
        borderRadius: 20,
        backgroundColor: '#28a745',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DriveInteractionButton;
