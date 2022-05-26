import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import { createDrawerNavigator, useDrawerStatus, DrawerContentScrollView  } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTextInput, MyBoton } from "../components/";
import HomeScreen from '../screens/HomeScreen';
import Gu from '../screens/GuScreen';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-fontawesome';
import AccountsNavigator from './AccountsNavigation';

const ImgLogo = require("../../assets/MLogo.jpg");

/*
aqui quiero poner la navegacion del usuario loegeado
*/

const Home = createDrawerNavigator();
const MainStack = createNativeStackNavigator();
//const Home = createBottomTabNavigator();
//const isDrawerOpen = useDrawerStatus() === 'open';
const HomeNavigation = ({navigation}) => {

    return (
        <Home.Navigator initialRouteName="Home" >
            {/*<Home.Screen name="MainPage" component={MainPage}/>*/}
            <Home.Screen name ="Home" component={Gu}/>
            {/*<Home.Screen name="Cuentas" component={HomeScreen}/>*/}
            <Home.Screen name="Cuentas" component={AccountsNavigator}/>
             
            {/*<Home.Screen name="Cuentas" component={HomeScreen}/>*/}
            
        </Home.Navigator>

    );
 
}

//drawerContent={ (props) => <MenuItems {...props}/>}

const MenuItems = ({navigation}) => {
    return (
        <DrawerContentScrollView>
            <Text>
                Mi menu
            </Text>
        </DrawerContentScrollView>
    )
}
export default HomeNavigation;


const MainPage = ({navigation}) => {
    return (
        <MainStack.Navigator initialRouteName='MainPage'>
            <MainStack.Screen name ="Home" component={Gu} 
                options={({navigation})=> ({
                    headerLeft: () => (
                        <Icon name = {'menu'} onPress = {() => {navigation.openDrawer()}} />
                    )
                })}
                />
        </MainStack.Navigator>
    )
}
