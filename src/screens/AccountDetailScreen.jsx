import React, {useContext, useEffect, useState, useLayoutEffect} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import { useRoute, useIsFocused } from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import DatePicker from 'react-native-date-picker';
import { MyTextInput, MyBoton } from "../components/";
import request from "../api";

import {BASE_URL} from '../config';

//import { useState } from 'react/cjs/react.production.min';

const ImgLogo = require("../../assets/MLogo.jpg");

//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const AccountDetailScreen = ({navigation}) => {
  const route = useRoute();//en vez de navigation.getParams
  const [account, setAccount] = useState({});
  //const [account, setAccount] = useState([]);
  const isFocused = useIsFocused();
  const [Loading, setLoading] = useState(false);
  /*const [account, setAccount] = useState({
    account_name: "",
    type_account: "",
    account_num: "",
    current_balance: "",
    account_cbe: "",
    cutoff_date: "",
  });*/

  //const [isLoading, setLoading] = React.useState(false);

  const {userInfo} = useContext(AuthContext);
  useEffect(() => {
    if (isFocused) {
      getAccountDetail();

    }
  }, [isFocused]);

/*useLayoutEffect(()=>{
  console.log('ya está la cuenta');
  console.log(account);
  console.log(account.account_name);
}, [account]);*/


  const getAccountDetail = async () => {
    try {
      let accId = route.params.id;
      console.log('Id de cuenta'+accId);
      setLoading(true);
      const response = await request({method: 'get', url: `/accounts/${accId}`}) //sin el último slash
      
      setLoading(false);
      setAccount(response.data);
      //console.log(account);
    } catch (error) {
      
      //const data = error.response.data;
      setLoading(false);
     // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);

    }
  };
  
  return (
    <View style={styles.container}>
      <Text>Detalle cuenta :3</Text>
      <Text>{route.params.id}</Text>
      <Text>{route.params.account_name}</Text>
      <Text>Detalle cuenta :3 del request</Text>
      <Text>{account.account_name}Gu</Text>
    </View>
  );
}
//navigation.getParam('id')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    padding: 40,
    justifyContent: "space-evenly",
    fontSize: 5,
  },
  logoMoney: {
    height: 90,
    width: 90,
    alignSelf: "flex-end",
    margin: 0,
  },
});

/*<DatePicker 
        selected={cuenta.cutoff_date} 
        onChange={(text) => changeCuenta(text, "cutoff_date")} 
      />*/
  
  /*<DatePicker 
        date = {cuenta.cutoff_date}
        mode="date"
        onDateChange={(text) => changeCuenta(text, "cutoff_date")}
      />*/


  /*
  (
    <View style={styles.container}>
      
      <Text style={styles.welcome}>Welcome {userInfo.tokens.access}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 18,
    marginBottom: 8,
  },
});
*/

export default AccountDetailScreen;

