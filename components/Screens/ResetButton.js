import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


export default function ResetButton() {
    return (
        <Container style ={{elevation:4}}>
            <MaterialCommunityIcons name="reload" size={25} color="white" />
        </Container>
    )
}

const Container = styled(View)`
    width: 55px;
    height: 55px;
    background-color: green;
    border-radius:35px;
    align-items: center;
    justify-content: center;
    z-index:-10;
`