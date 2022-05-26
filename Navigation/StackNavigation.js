import React, { useEffect } from 'react'
import { View,Text, StyleSheet, TouchableOpacity, Dimensions, Image, SafeAreaView, Button} from 'react-native'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';
import { createStackNavigator, screenHeaderOption } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Category from '../Screens/Category';
import SubCategory from '../Screens/SubCategory';
import Description, { headerTitles } from '../Screens/Description';
import Message from '../Screens/Message';
import WishListScreen from '../Screens/WishListScreen';
import Account from '../Screens/Account';
import Icon from 'react-native-vector-icons/Ionicons';
import CartScreen from '../Screens/CartScreen';
import ordersScreen from '../Screens/ordersScreen';
import UserProductScreen from '../Screens/User/UserProductScreen';
import EditProductScreen from '../Screens/User/EditProductScreen';
import AuthScreen, {screenOptions as authScreenOptions} from '../Screens/User/AuthScreen';
import StartupScreen from '../Screens/StartupScreen';
import { useDispatch } from 'react-redux';

import * as authActions from '../store/actions/auth'


//import {createSwitchNavigator} from 'react-navigation'



const Stack = createStackNavigator();

export const StackNavigation = (props) => {

    return (

        <Stack.Navigator
            screenOptions={{

                headerStyle: { borderBottomWidth: 0 },
                headerRight: () => {
                    return (
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('CartScreen')}>
                            <Icon name="cart-outline" color="black" size={30} style={{ padding: 10 }} />
                        </TouchableOpacity>
                    )
                },
            }}
        >
            <Stack.Screen name="Home" component={Category}
                options={{
                    headerTitle: (
                        <Image
                            style={{
                                width: Dimensions.get('window').height * 0.3,
                                height: 60,
                                alignSelf: 'center',
                                resizeMode: 'contain',
                                justifyContent: 'center',
                                alignItems: 'center',

                            }}
                            source={{ uri: 'https://www.ch-aviation.com/portal/stock/4098.jpg' }} />
                    ),
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => props.navigation.toggleDrawer()}>
                                <Icon name="menu" color="black" size={30} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen name='SubCategory' component={SubCategory}
                options={({ route }) => ({
                    title: route.params.productName,
                    headerTitleAlign: 'center',
                    headerTintColor: '#E9967A',
                })}



            />
            <Stack.Screen name="Detail" component={Description}
                options={({ route }) => ({
                    title: route.params.productName,
                    headerTitleAlign: 'center',
                    headerTintColor: '#E9967A',

                })}
            />
            <Stack.Screen name="CartScreen" component={CartScreen}
                options={{
                    headerTitle: 'Welcome To Cart',
                    headerTintColor: '#E9967A',
                    headerTitleAlign: 'center'
                }}
            />

        </Stack.Navigator>

    )
}

const wishListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='WishList' component={WishListScreen}
                options={{
                    headerTitle: 'Welcome to Wish List',
                    headerTitleAlign: 'center',
                    headerTintColor: 'Green'
                }}

            />
            <Stack.Screen name='detail' component={Description} />


        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
    return (
        <View style={styles.container}>
            <Tab.Navigator
                tabBarOptions={{
                    labelPosition: 'below-icon',
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                    style: {
                        // Remove border top on both android & ios
                        borderTopWidth: 0,
                        borderTopColor: "transparent",
                        elevation: 0,
                        shadowColor: '#5bc4ff',
                        shadowOpacity: 0,
                        shadowOffset: {
                            height: 0,
                        },
                        shadowRadius: 0,
                    },
                    tabStyle: {
                        //backgroundColor:  '#FBF7F5',
                    },
                    labelStyle: {
                        fontWeight: 'bold',
                        fontSize: 11,
                    },
                }}>
                <Tab.Screen name="For You" component={StackNavigation}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen name="Notifications" component={Message}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="notifications-circle-outline" color={color} size={size} />
                        ),
                    }} />
                <Tab.Screen name="WishList" component={wishListStack}
                    options={{
                        tabBarIcon: ({ color, size }) => (

                            <Icon name="heart-circle-outline" color={color} size={size} />
                        ),

                    }} />
                <Tab.Screen name=" Account" component={Account}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon name='person-circle-outline' color={color} size={size} />
                        ),
                    }}
                />

            </Tab.Navigator>
        </View>
    )
}


const ordersStack = props => {
    return (
        <Stack.Navigator screenHeaderOption={{

        }}>
            <Stack.Screen name="orders" component={ordersScreen}
                options={{
                    headerTitle: 'Your Orders',
                    headerTintColor: '#E7923C',
                    headerTitleAlign: 'center',
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => props.navigation.toggleDrawer()}>
                                <Icon name="menu" color="black" size={30} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        );
                    },


                    headerRight: () => {
                        return (
                            <MenuProvider >
                            <Menu >
                                <MenuTrigger>
                                <Icon name="ellipsis-vertical-sharp" color="black" size={30} style={{ padding: 10 }} />
                                </MenuTrigger>
                               
                                <MenuOptions 
                                style={{
                                    paddingRight:40, marginRight: 30, backgroundColor: 'white' }}>
                                    <MenuOption onSelect={() => {}} text='Remove' />
                                   
                                </MenuOptions>
                            </Menu>
                            </MenuProvider>

                        );
                    },
                }}
            />
        </Stack.Navigator>
    )
}



const userProductStack = props => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="user" component={UserProductScreen}
                options={{
                    headerTitle: 'Your Products',
                    headerTintColor: '#E7923C',
                    headerTitleAlign: 'center',
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => props.navigation.toggleDrawer()}>
                                <Icon name="menu" color="black" size={30} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        );
                    },
                    headerRight: () => {
                        return (
                            <TouchableOpacity

                                onPress={() => props.navigation.navigate('editProduct', {
                                    productId: '', headerTitle: 'create product'
                                })}>
                                <Icon name="add-circle-sharp" color="black" size={30} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen name="editProduct" component={EditProductScreen}
                options={{
                    headerTitle: false,
                    headerTintColor: '#E7923C',
                    headerTitleAlign: 'center',
                    /*headerRight: () => {
                        return (
                            <TouchableOpacity
                                onPress= {props.route.submitHandler}>
                                <Icon name="md-checkmark" color="black" size={30} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        );
                    },
                    */
                }}


            />
        </Stack.Navigator>
    )
}




const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
    const dispatch=useDispatch();
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        
        <DrawerItem label={() => <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold' }}>Logout</Text>}
          onPress={() => {
              dispatch(authActions.logout());
              props.navigation.navigate('Auth');
          }}
        /> 
         
        </View>    
      </DrawerContentScrollView>
    );
  }
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator 
        
        
         drawerContentOptions={{
            activeTintColor: 'white',
            activeBackgroundColor: '#5D6D7E',
            

        }}
            drawerStyle={{
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderBottomRightRadius: 300,
                borderStartColor: '#EAECEE',
                borderRightColor: '#FDEBD0',
                borderTopColor: '#FDEBD0',
                borderBottomColor: '#FDEBD0',
                borderWidth: 5,
                height: '100%',
                borderLeftWidth: 0

            }}
           
            drawerContent={props => <CustomDrawerContent {...props} />}
             >
            <Drawer.Screen name='Home' component={BottomNavigator}
                options={{
                    drawerIcon: drawerConfig => <Icon name='home' size={20} />
                }} />
            <Drawer.Screen name='Orders' component={ordersStack}
                options={{
                    drawerIcon: drawerConfig => <Icon name='list' size={20} />,

                }}
            />
            <Drawer.Screen name='Admin' component={userProductStack}
                options={{
                    drawerIcon: drawerConfig => <Icon name='create' size={20} />,

                }}
            />
              
             
        </Drawer.Navigator>

    )
}
//------------------Authentication Starts From here------------------------------------

const authStackNavigator=createStackNavigator();

export const authNavigator=()=>{
    return(
        <authStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <authStackNavigator.Screen name='Auth' component={AuthScreen} options={authScreenOptions}/>
        </authStackNavigator.Navigator>
    )
}







const MainNavigator = () => {
    return(
    <Stack.Navigator screenOptions={{
        headerTitle:'Authenticate',
        headerTitleAlign: 'center',
        headerTintColor: '#E7923C'
              }} >
        <Stack.Screen name='Startup' component={StartupScreen}/>
        <Stack.Screen name='Auth' component={AuthScreen} />
        <Stack.Screen name='Shop' component={DrawerNavigator}/>
    </Stack.Navigator>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    MenuContainer: {
        borderRadius: 5,
        borderColor: 'white',
       
      
        
    }
})




export  { MainNavigator};
