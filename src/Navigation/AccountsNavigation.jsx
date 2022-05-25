import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountList from '../screens/AccountList';
import AccountForm from '../screens/AccountForm';


const BottomTab = createBottomTabNavigator()

export default function AccountsNavigator(){
    return(
       <BottomTab.Navigator>
           <BottomTab.Screen name="Agregar Cuenta" component={AccountForm} options={{headerShown: false}} />
           <BottomTab.Screen name="Ver Cuentas" component={AccountList} options={{headerShown: false}}/>
       </BottomTab.Navigator> 
    )
}