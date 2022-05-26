import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-ionicons';
import { useSelector , useDispatch} from 'react-redux';
import OrderItem from '../Components/OrderItem';
import * as ordersActions from '../store/actions/orders'



const ordersScreen=props=>{
    const [isLoading, setIsLoading]=useState(false);
    const orders=useSelector(state=>state.orders.orders)
    const dispatch=useDispatch();

    useEffect(()=>{
        setIsLoading(true);
        dispatch(ordersActions.fetchOrders()).then(()=>{
            setIsLoading(false);
        });

    }, [dispatch])

    if(isLoading){
        return<View style={styles.spinnerCenter}>
            <ActivityIndicator size='large' color='pink'/>
        </View>
    }

    
    if(orders.length===0){
        return(
            <View style={styles.emptyCartScreen}>
            <Icon name='list' size ={100}/>
            <Text style={styles.emptyImage}>No Orders Place Yet!</Text>
            </View>
        )
    }

    return(
       
        <View style={styles.container}>
         <View style={styles.bigCircle}></View>
         <View style={styles.smallCircle}></View>
        <FlatList
            data={orders}
            keyExtractor={item=>item.id}
            showsVerticalScrollIndicator={false}
            renderItem={itemData=>
                   <OrderItem 
                   amount={itemData.item.totalAmount} 
                   date={itemData.item.readableDate}
                       items={itemData.item.items}
                   />
            }
        />
        </View>

    );
};


const styles=StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#5D6D7E'

    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.5,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: 'white',
        borderRadius: 1000,
        position: 'fixed',
        right: Dimensions.get('window').width * 0.3,
        top: 5,
      },
      bigCircle: {
        width: Dimensions.get('window').height * 0.7,
        height: Dimensions.get('window').height * 0.7,
        backgroundColor: '#E8DAEF',
        borderRadius: 1000,
        position: 'absolute',
        right: Dimensions.get('window').width * 0.25,
        top: -50,
      },
      smallCircle: {
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        backgroundColor: '#ff7979',
        borderRadius: 1000,
        position:'absolute',
        bottom: Dimensions.get('window').width * -0.005,
        right: Dimensions.get('window').width * -0.3,
      },
    emptyImage:{
        size: 20,
        fontWeight: '500'

    },
    spinnerCenter:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCartScreen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})
export default ordersScreen;