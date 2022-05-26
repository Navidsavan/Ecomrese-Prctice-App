// npm install @react-navigation/material-top-tabs react-native-tab-view
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import All from '../Screens/TabScreens/All'
import Popular from '../Screens/TabScreens/Popular'
import OnSale from '../Screens/TabScreens/OnSale'
import Exclusive from '../Screens/TabScreens/Exclusive'



//const Stack = createStackNavigator();


const Tab = createMaterialTopTabNavigator();
const TabNavigation=()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name='All' component={All} />
      <Tab.Screen name='Tab B' component={Popular} />
      <Tab.Screen name='Tab C' component={OnSale} />
      <Tab.Screen name='Tab E' component={Exclusive} />
    </Tab.Navigator>
  );
}



export default TabNavigation;

