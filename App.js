import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator, MainNavigator } from './Navigation/StackNavigation';
import * as Font from 'expo-font';
//import {AppLoading} from 'expo';
//import {composeWithDevTools} from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './store/reducers/products';
import categoryReducer from './store/reducers/categories'
import cartReducer from './store/reducers/cart'
import subCategoryItemsReducer from './store/reducers/subCategoryItems';
import wishListReducer from './store/reducers/WishListReducer'
import ordersReducer from './store/reducers/orders'
import  ReduxThunk from 'redux-thunk'
import { View, StyleSheet, Dimensions } from 'react-native';
import authReducer from './store/reducers/auth'
import NavigationContainers from './Navigation/NavigationContainers';





const rootReducer = combineReducers({
  newArrivals: productReducer,
  AllCategories: categoryReducer,
  AvailableCategoriesSubItems: subCategoryItemsReducer,
  cart: cartReducer,
  wishListStore: wishListReducer,
  orders: ordersReducer,
  auth: authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));

const fetchFonts=()=>{
  return Font.loadAsync({
   'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf'),
   'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
 }); 
}


export default function App() {
  /*
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded){
    return(
      <AppLoading
        startAsync={fetchFonts}
        onFinish={()=>{
          setDataLoaded(true)
        }}
        
      />
    )
  }
  */
  return (
   
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
      <MainNavigator/>
      </NavigationContainer>
    </Provider>
 

  );
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    height: '100%'
  }

})


