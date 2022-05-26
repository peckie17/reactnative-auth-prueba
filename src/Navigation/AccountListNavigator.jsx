import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountList from '../screens/AccountList';
import AccountForm from '../screens/AccountForm';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AccountDetailScreen from "../screens/AccountDetailScreen";


const AccountListStack = createNativeStackNavigator();

export default function AccountListNavigator(){
    return(
       <AccountListStack.Navigator>
           <AccountListStack.Screen name="AccountList" component={AccountList} options={{headerShown: false}} />
           <AccountListStack.Screen 
                name="AccountDetail" 
                component={AccountDetailScreen} 
                options={({ route }) => ({ title: 'Detalle de cuenta: ' + route.params.account_name })}/>
       </AccountListStack.Navigator> 
    )
}