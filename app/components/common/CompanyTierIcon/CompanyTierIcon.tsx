
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import { IconButtonProps } from 'react-native-vector-icons/Icon';

interface Props {
    tier: number;
    size?: number;
    style?: ViewStyle | TextStyle | undefined;
}

const CompanyTierIcon = ({ tier, size, style }: Props) => {
    if (tier === 0)
        return (
            <Icon type='material-community' name='star-outline' size={size} style={style} color={"#A020F0"}
                containerStyle={{
                    borderColor: '#A020F0',
                    borderWidth: 1,
                    borderRadius: 10
                }}
            />
        )
    else
        if (tier === 1)
            return (
                <Icon type='material-community' name='roman-numeral-1' size={size} style={style} color={'gold'} containerStyle={{
                    borderColor: 'gold',
                    borderWidth: 1,
                    borderRadius: 10
                }} />
            )
        else if (tier === 2)
            return (
                <Icon type='material-community' name='roman-numeral-2' size={size} style={style} color={'silver'}
                    containerStyle={{
                        borderColor: 'silver',
                        borderWidth: 1,
                        borderRadius: 10
                    }} />
            )
        else if (tier === 3)
            return (
                <Icon type='material-community' name='roman-numeral-3' size={size} style={style} color={'#CD7F32'}
                    containerStyle={{
                        borderColor: '#CD7F32',
                        borderWidth: 1,
                        borderRadius: 10
                    }}

                />
            )
}

export default CompanyTierIcon

const styles = StyleSheet.create({})