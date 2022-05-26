import React, {useContext, useEffect, useState} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { MyTextInput } from "../components/";
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import request from "../api";

import {BASE_URL} from '../config';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const ImgLogo = require("../../assets/MLogo.jpg");

const AccountList = (navigation) => {
const [account, setAccount] = useState([]);
  const [cuenta, setCuenta] = useState({
    id:0,
    account_name: "",
    type_account: "",
    account_num: "",
    current_balance: "",
    account_cbe: "",
    cutoff_date: "",
  });
  //const {account, deleteData} = React.useContext()
  const isFocused = useIsFocused();
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const {userInfo} = useContext(AuthContext);

  useEffect(() => {
    if (isFocused) {
      getAccount();
    }
  }, [isFocused]);

  const getAccount = async () => {
    const access_token = userInfo.tokens.access;
    const headers = {
      Authorization: `Bearer ${access_token}`,
    };

    /*
    res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin, profilerefid(whatever header you need)");*/

    //console.log(`GU token ${access_token}`);
    
    try {
      setLoading(true);
      //const response = await axios({ method: 'get', url: `${BASE_URL}/accounts/`, headers: { 'Authorization': 'Bearer ' + access_token } })
      //const response = await axios.get(`${BASE_URL}/accounts/`, headers);
      const response = await request({method: 'get', url: '/accounts/'})
      console.log(response.data)
      setLoading(false);
      setAccount(response.data)
    } catch (error) {
      
      //const data = error.response.data;
      setLoading(false);
     // setError(data.msg ? data.msg : data.error);
      console.error(error);
      alert(error);
    }

    //const response= await axios.get(`${BASE_URL}/accounts/`);
  };

  const eliminarElemento= async (idx) => {
    const response = await axios.delete(`${BASE_URL}/accounts/${idx}`) 
    deleteData(idx);
  }

  return (
    
      
        <ScrollView style={styles.container}>
          {account.map((acc, idx) => {
            return (
            <TouchableOpacity key={`account-${idx}`} >
              <View style={styles.accItem}> 
                <Text >{acc.account_name}</Text> 
              </View>
            </TouchableOpacity>
            )
          })}
        </ScrollView>
    
    );
};

const styles= StyleSheet.create({
  textInput: {
      backgroundColor: "#fff",
      padding:10,
      borderWidth: 1,
      borderColor: "#000",
  },
  eliminar:{
    color: "gold",
    backgroundColor: "#000",
    alignSelf: "flex-start",
    borderRadius: 10,
    padding: 13,
    marginLeft: 15,
},
actualizar:{
    backgroundColor: "#000",
    padding:13,
    color: "#fff",
    alignSelf: "flex-end",
    borderRadius: 10,
    marginBottom: 20,
},
container: {
  flex: 1,
  backgroundColor: '#FFFFFF', //RRGGBB hex
  flexDirection: 'column',
},
accItem:{
  backgroundColor:'#FFFFFF',
  padding:20,
  borderRadius:8,
  borderWidth:1,
  borderColor:'#000000',
  marginBottom:10,
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
},
});

export default AccountList;

/*
<View>
      <Image source={ImgLogo} style={styles.logoMoney} />
        <MyTextInput
            label="Nombre:"
            value={account.name} 
            onChangeText={(text) => ChangeAccountInputs("name", text)}
        />
        <MyTextInput
            label="Tipo de cuenta:"
            value={account.tipo} 
            onChangeText={(text) => ChangeAccountInputs("tipo",text)}
        />
        <MyTextInput 
            label="Número de cuenta:" 
            value={account.numero} 
            onChangeText={(text) => ChangeAccountInputs("numero",text)}
        />
        <MyTextInput
            label="Clabe Interbancaria:"
            value={account.clabe} 
            onChangeText={(text) => ChangeAccountInputs("clabe",text)}
        />
        <MyTextInput 
            label="Saldo Actual:"
            value={account.saldo} 
            onChangeText={(text) => ChangeAccountInputs("saldo",text)}
        />
        <MyTextInput
            label="Fecha de Corte:"
            value={account.fecha} 
            onChangeText={(text) => ChangeAccountInputs("fecha",text)}
        />
        <TouchableOpacity>
            <Text onPress={()=> eliminarElemento(idx)} style= {styles.eliminar}>ELIMINAR</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text onPress={()=>navigation.navigate("Vista Actualizar",{
                            itemId: idx,
                        })} style= {styles.actualizar}>ACTUALIZAR</Text>
        </TouchableOpacity>

        <Button title="GUARDAR CUENTA" onPress={() => navigation.navigate("Agregar Cuenta")}/>
    </View>

*/
/*{/*<FlatList keyExtractor={(item) => item.id} 
        data={account}
        renderItem={({item})=> (
          <Text>{item.account_name}</Text>
        )}
        ItemSeparatorComponent = {() => <View style={{margin:8, borderColor: '#00000020', borderWidth: 0.5 }}/>}
        />*/
  
