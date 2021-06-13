import React from 'react';
import { View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Dimensions } from "react-native";
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {MaterialIcons, FontAwesome5} from '@expo/vector-icons'

import FoodGameScreen from './components/Screens/FoodGameScreen'
import ProfileScreen from './components/Screens/PorfileScreen'

import global from './themes/global'


const Tab = createMaterialTopTabNavigator();
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function App() {
  return (
    <ThemeProvider theme={global}>
        <NavigationContainer>
          <Tab.Navigator
          screenOptions={({route}) => ({tabBarIcon: ({focused,size, color}) => {
              let iconName;
              size = focused? 35:30
              color = focused?   global.colors.main :  global.colors.unselected

              if(route.name=="Home"){
                iconName='local-dining'
              }
              else if(route.name=="Settings")
              {
                iconName='account-circle'
              }
              return(
                <MaterialIcons name={iconName} size={size} color={color}/>
              )
            }})}
            tabBarOptions={{
              activeTintColor : global.colors.main,
              inactiveTintColor : global.colors.unselected,
              showLabel:false,
              showIcon:true,
              tabStyle:{height:100},
              indicatorStyle:{backgroundColor:global.colors.main},
              iconStyle:{width:35,height:35,marginTop:((screenHeight > 700 ? 40 : 10)),marginBottom:0,alignItems:'center', alignSelf:'center', justifyContent:'center'},
              
            }}
          >
            <Tab.Screen name="Home" component={FoodGameScreen} />
            <Tab.Screen name="Settings" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
    </ThemeProvider>

  );
}


