import React from 'react';
import { View,  StyleSheet, Button, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import WishlistItem from '../Components/WishlistItem';
import * as cartActions  from '../store/actions/wishListAction'


const CartScreen=props=>{
  
   
    const cartItems=useSelector(state=>{
        const transformedCartItems=[];
         for(const key in state.wishListStore.items){
            transformedCartItems.push({
                productId: key,
                productUrl: state.wishListStore.items[key].productUrl,
                productTitle: state.wishListStore.items[key].productTitle,
                productPrice: state.wishListStore.items[key].productPrice,
                sum: state.wishListStore.items[key].sum

            });
           
        }
        return transformedCartItems;
    })

    if(cartItems.length===0){
        return(
            <View style={styles.emptyCartScreen}>
            <Image style={styles.emptyImage} source={{uri: 'https://cdn.dribbble.com/users/1377014/screenshots/4287624/empty_list.png'}}/>
            </View>
        )
    }
    const dispatch=useDispatch();
    return(
        
        <View style={styles.container}>
           <FlatList
                   data={cartItems}
                   showsVerticalScrollIndicator={false}
                   keyExtractor={(item, index) => item.productId}
                
                   renderItem={itemData=>
                  
                        
                   <WishlistItem
                   // productUrl={itemData.item.quantity}
                    productUrl={itemData.item.productUrl}
                    productTitle={itemData.item.productTitle}
                    amount={itemData.item.sum}
                  
                    onRemove={()=>{
                        dispatch(cartActions.removeFromWishList(itemData.item.productId))
                    }}
                    onViewMore={()=>{
                        props.navigation.navigate('Detail'), {
                                 productId: itemData.item.id}
                    }}
                    />
                   
                   
                   
                   }
               />
             
           
             </View>
       
       
    )};
            

const styles=StyleSheet.create({
 container:{
     flex: 1
 },
 wishText:{
     fontFamily: 'open-sans-bold',
     fontSize: 20,
     fontWeight: '800',
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     paddingHorizontal: 10,
     padding: 15
     

 },
    emptyCartScreen:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
       // transform: [{ rotate: "335deg" }]

    },
    emptyImage:{
        width:'100%',
        height: '100%'

    }

})

export default CartScreen;