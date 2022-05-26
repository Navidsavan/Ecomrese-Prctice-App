import React ,{useState} from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../Components/CartItem'
import * as cartActions  from '../store/actions/cart'
import * as ordersActions from '../store/actions/orders'


const CartScreen=props=>{
    //const [isLoading, setIsLoading]=useState(false);
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount);
    const cartItems=useSelector(state=>{
        const transformedCartItems=[];
         for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                quantity: state.cart.items[key].quantity,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                sum: state.cart.items[key].sum

            });
           
        }
        return transformedCartItems;
    })

    const dispatch=useDispatch();

    /*const sendOrderHandler = async ()=>{
        setIsLoading(true);
        await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))}
        setIsLoading(false);
*/
    if(cartItems.length===0){
        return(
            <View style={styles.emptyCartScreen}>
            <Image style={styles.emptyImage} source={{uri: 'http://notunbazaar.com/images/emptycart.png'}}/>
            </View>
        )
    }

   

    return(
        
        <View style={styles.container}>
        
           <View style={styles.summary}>
           
               <Text style={styles.summaryText}>
               Total: <Text style={styles.TotalAmount}>${cartTotalAmount}</Text></Text>
               
               
               <Button
                color='#F5B041' 
                 title='Order Now' 
                 disabled={cartItems.length===0} 
                 onPress={()=>dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))}
                 />
                
           </View>
        
           
           <FlatList
                   data={cartItems}
                   keyExtractor={(item, index) => item.productId}
                   renderItem={itemData=>
                  
                        
                   <CartItem 
                    quantity={itemData.item.quantity}
                    productTitle={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deletable
                    onRemove={()=>{
                        dispatch(cartActions.removeFromCart(itemData.item.productId))
                    }}
                    />
                   
                   
                   
                   }
               />
             
           
            
        </View>
       
    )};
            

const styles=StyleSheet.create({

    container:{
        margin: 20,
        

    },
    summary:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,

        shadowColor: 'black',
        shadowOpacity:0.26,
        shadowOffset:{
            width: 0, height: 2,
        },
        shadowRadius:10,
        backgroundColor: 'white'
    },
    summaryText:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    TotalAmount:{
        color: 'green'
    },
    emptyCartScreen:{
        flex: 1,
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
       // transform: [{ rotate: "335deg" }]

    },
    emptyImage:{
        width: Dimensions.get('window').height*0.3,
        height: Dimensions.get('window').height*0.3,

    }

})

export default CartScreen;