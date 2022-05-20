import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTextInput, MyBoton } from "../components/";
import HomeScreen from '../screens/HomeScreen';
import Gu from '../screens/GuScreen';

import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';

const ImgLogo = require("../../assets/MLogo.jpg");

/*
aqui quiero poner la navegacion del usuario loegeado
*/

//const Home = createDrawerNavigator();
const Home = createBottomTabNavigator();
const HomeNavigation = ({navigation}) => {

    return (
        <Home.Navigator>
            <Home.Screen name="Gu" component={Gu}/>
            <Home.Screen name="Cuentas" component={HomeScreen}/>
            
        </Home.Navigator>

    );
 
} 
export default HomeNavigation;
