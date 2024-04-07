import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';


interface Props {
    registered: boolean;
    eligible: boolean;
}

const DriveInteractionButton = ({ registered, eligible }: Props) => {


    if (eligible === false) {
        return (
            <Button color={'error'}
                buttonStyle={{
                    borderRadius: 20
                }}
                titleStyle={{
                    fontSize: 20
                }}
            >
                Not Eligible
            </Button>
        )
    }

    if (registered === false) {
        return (
            <Button
                onPress={() => {
                    console.log('pressed')
                }}
            >
                Register
            </Button>
        )
    }

    return (<Button>
        Already Registered
    </Button>)


}

export default DriveInteractionButton

const styles = StyleSheet.create({})