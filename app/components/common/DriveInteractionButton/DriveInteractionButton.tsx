import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

interface Props {
    registered: boolean;
    eligible: boolean;
}

const DriveInteractionButton = ({ registered, eligible }: Props) => {
    if (!eligible) {
        return (
            <Button
                color="error"
                buttonStyle={styles.button}
                titleStyle={styles.title}
                disabled
            >
                Not Eligible
            </Button>
        );
    }

    if (!registered) {
        return (
            <Button
                buttonStyle={styles.registerButton}
                titleStyle={styles.title}
                onPress={() => {
                    console.log('pressed');
                }}
            >
                Register
            </Button>
        );
    }

    return (
        <Button
            buttonStyle={styles.registeredButton}
            titleStyle={styles.title}
            disabled
        >
            Already Registered
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
