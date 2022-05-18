import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MyTextInput, MyBoton } from "../components/";

import {BASE_URL} from '../config';

const ImgLogo = require("../../assets/MLogo.jpg");

//<Spinner visible={isLoading} />
//<Button title="Logout" color="red" onPress={logout} />
const HomeScreen = ({navigation}) => {
 

  const [cuenta, setCuenta] = React.useState({
    account_name: "",
    type_account: "",
    account_num: "",
    current_balance: "",
    account_cbe: "",
    cutoff_date: "",
  });
  //const [isLoading, setLoading] = React.useState(false);
  const [Error, setError] = React.useState("");
  const [PickerItems, SetPickerItems] = React.useState();
  const [startDate, setStartDate] = React.useState(new Date());
  const [Loading, setLoading] = React.useState(false);

  const {userInfo, logout} = useContext(AuthContext);

  const enviarCuenta = async () => {

    console.log('Inento accesder al endpoint');
    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    try { 
      console.log('Maldito bonbon ' + `${BASE_URL}/accounts/`);
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/accounts/`,
        cuenta,
        { headers: headers }
      );

      setLoading(false);
    } catch (error) {
      console.log('maldita glu');
      const data = error.response.data;
      setLoading(false);
      setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }
  };

  const changeCuenta = (text, name) => {
    setCuenta({
      ...cuenta,
      [name]: text,
    });
  };

  return (
    <View style={styles.container}>
      <Image source={ImgLogo} style={styles.logoMoney} />
      <MyTextInput
        label="Nombre:"
        place="e.g. cuenta de nómina"
        value={cuenta.account_name}
        setValue={(text) => changeCuenta(text, "account_name")}
      />
      <Text>Tipo de Cuenta:</Text>
      <MyTextInput
        label="Tipo de cuenta:"
        place="e.g. ahorro"
        value={cuenta.type_account}
        setValue={(text) => changeCuenta(text, "type_account")}
      />
      
      {/*<Picker
        selectedValue={PickerItems}
        onValueChange={(itemValue, itemIndex) => SetPickerItems(itemValue)}
      >
        <Picker.Item label="Cuenta Corriente" value="Cuenta Corriente" />
        <Picker.Item label="Chequera" value="Chequera" />
        <Picker.Item label="Ahorros" value="Ahorros" />
        <Picker.Item label="Nómina" value="Nómina" />
        <Picker.Item label="Inversiones" value="Inversiones" />
        <Picker.Item label="Cuenta en Dólares" value="Cuenta en Dólares" />
  </Picker>*/}

      <MyTextInput
        label="Número de cuenta:"
        place=" "
        value={cuenta.account_num}
        setValue={(text) => changeCuenta(text, "account_num")}
      />
      <MyTextInput
        label="Clabe Interbancaria:"
        place=" "
        value={cuenta.account_cbe}
        setValue={(text) => changeCuenta(text, "account_cbe")}
      />
      <MyTextInput
        label="Saldo Actual:"
        place=" "
        value={cuenta.current_balance}
        setValue={(text) => changeCuenta(text, "current_balance")}
      />
      <Text>Fecha de Corte:</Text>

      <MyTextInput
        label="Fecha de corte:"
        place=" "
        value={cuenta.cutoff_date}
        setValue={(text) => changeCuenta(text, "cutoff_date")}
      />
      {/*
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
*/}
      <MyBoton text="GUARDAR" onPress={enviarCuenta} />
    </View>
  );
}

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

export default HomeScreen;
