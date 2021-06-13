import React from 'react'
import { View, Text,Image, StyleSheet } from 'react-native'
import { ThemeConsumer } from 'styled-components'
import styled from 'styled-components'
import SwipeableImage from './SwipeableImage'

export default function PorfileScreen() {
    return (
        <View style={styles.mainContainer}>
        <View style={styles.profileContainer}>
        <Image source={require('../../assets/profile.jpg')} style={styles.profilePicture}></Image>
        <View style={styles.welcomeBox}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.name}>George</Text>
        </View>
        </View>
        <View style={styles.settingsContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>settings</Text>
                    </View>
                    {settingItems.map((setting, index) => (
                                    <View key={index} style={styles.setting}>
                                    <Text  style={styles.settingText}>{setting}</Text>
                                    </View>
                                    ))}
        </View>
        </View>
    )

    //  return(
    //      <MainContainer>
    //          <WelcomeBox>
    //              <Profile source={require('../../assets/profile.jpg')}></Profile>
    //              <Wrapper>
    //              <Title>Welcome back</Title>
    //              <UserName>George</UserName>
    //              </Wrapper>
    //          </WelcomeBox>
    //          <FloatingContainer style={styles.shadows}>
    //         <TitleContainer>
    //          <Title style={styles.title}>settings</Title>
    //          </TitleContainer>
    //          {settingItems.map((setting, index) => (
    //                                <SettingItem key={index}>
    //                                 <SettingText>{setting}</SettingText>
    //                                </SettingItem>))}
    //          </FloatingContainer>
    //      </MainContainer>
    //  )
}

const MainContainer = styled(View)`
      height:100%;
      width:100%;
      align-items:center;
`

const WelcomeBox = styled(View)`
        padding:25px;
        padding-left: 28px;
        width:100%;
        flex-direction:row;
`

const Profile = styled(Image)`
        width:55px;
        height:55px;
        border-radius:35px;
`

const Wrapper = styled(View)`
padding-left:10px;
`
const UserName = styled(Text)`
      color: ${(props) => props.theme.colors.main};
      font-weight: bold;
      font-size: 20px;`

const Title = styled(Text)`
      font-size: 15px;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.title};
` 
const TitleContainer = styled(View)`
      padding-left:20px;
      padding-top:10px;
` 
const FloatingContainer = styled(View)`
        width:90%;
        height: auto;
        border-radius: 15px;
        background-color:white;
        `

const SettingItem = styled(View)`
        border-top-width: 1px;
        border-color: #c7c7c7;
        margin-top:5px;
        width:90%;
        align-self:center;
`
const SettingText = styled(Text)`
        color:black;
        font-size:18px;
        padding-top:12px;
        padding-bottom:12px;

`

const styles = StyleSheet.create({
    mainContainer: {
      height:"100%",
      width:"100%",
      alignItems:'center',
    },
    profilePicture:{
      width: 55,
      height: 55,
      backgroundColor:'red',
      borderRadius: 37
    },
    profileContainer:
    {
        padding: 28,
        width:'100%',
        display: 'flex',
        justifyContent:'flex-start',
        flexDirection: 'row',
    },
    welcomeBox:
    {
        textAlign:'center',
        paddingLeft:10,
        textAlignVertical:'top',

    },
    name: {
      color: 'green',
      fontWeight: 'bold',
      fontSize: 20,
    },
    title: {
      fontSize: 15,
      textTransform: 'uppercase',
      color: '#757575',
    },
    settingsContainer:{
        width:'90%',
        height: 'auto',
        borderRadius:15,
        backgroundColor:'white',
        paddingBottom:8,
        elevation:8,
    },
    setting:{
        flexDirection:'row',
        borderTopWidth: 1,
        borderColor: '#c7c7c7',
        marginTop:5,
        width:"90%",
        alignSelf:"center",
    },
    titleContainer:
    {
        paddingLeft:18,
        paddingTop:10,
        paddingBottom:10
    },
    settingText:
    {
        color:'black',
        fontSize:18,
        paddingTop:12,
        paddingBottom:12,
    },
    shadows:
    {
         shadowOpacity: 0.75, shadowRadius: 5, shadowColor: 'black',  shadowOffset: { height: 0, width: 0 },elevation:9
    }
  });

  const settingItems = [
      "Change email",
      "Change passwords",
      "Change phone number",
      "Delete account"
  ]