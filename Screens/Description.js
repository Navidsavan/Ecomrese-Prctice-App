
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector , useDispatch} from 'react-redux';
import * as cartActions from  '../store/actions/cart';
import * as wishActions from '../store/actions/wishListAction'



const Description=props => {
    const  productId  = props.route.params.productId;
    const  productName =props.route.params.productName;
  

     let selectedProduct={}
     let selectedSubProduct={}
     selectedProduct = useSelector(state =>  state.newArrivals.availableProducts.find(prod =>prod.id===productId & prod.name===productName ));
   
    selectedSubProduct = useSelector(state =>  state.AvailableCategoriesSubItems. availableProducts.find(prod => prod.id === productId & prod.name===productName ));
      
     const displayableData={...selectedProduct, ...selectedSubProduct}
     
      
      
    const dispatch=useDispatch();
  

    return (
           
            <ScrollView  showsVerticalScrollIndicator={false} >
            <View style={styles.container}>
            
            <Image style={styles.productImage} source={{ uri:displayableData.URL }} />

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.BothButton} 
                onPress={()=>{dispatch(wishActions.addToWishList(displayableData))}}>
                
                <Text style={styles.text}><Icon name="heart"  size={20} />
                     WishList</Text>
                    
                </TouchableOpacity>
                <TouchableOpacity style={styles.BothButton}
                  onPress={()=>{dispatch(cartActions.addToCart(displayableData))}}>
                    <Text style={styles.text}>
                    <Icon name="cart"  size={20} />
                        Add To Cart
                    </Text>
                </TouchableOpacity>
            </View>
           
       
            <Text style={styles.aboutProduct}>ABOUT PRODUCTS</Text>
            <Text style={styles.productDetail}>{displayableData.detail}</Text>
            <Text style={styles.noDiscountPrice}>{displayableData.noDiscount}</Text>
            <Text style={styles.discountPrice}>Now Only : {displayableData.price}</Text>
          

      </View>
      </ScrollView>

    )


}

export const screenHeaderOption=navData=>{
    return{
        HeaderTitle: navData.route.params.productName
    };

};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 15,
        width: '100%',
        height: '100%',
        maxHeight: '100%',

        
        
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold'

    },
    productImage: {
        width:  '100%',
        height:  Dimensions.get('window').height*0.3,
        borderRadius: 10,
        marginTop: 10,
        padding: 10,


    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: Dimensions.get('window').height*0.4,
        justifyContent: "space-between",
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,


    },
    BothButton:{

        backgroundColor: 'white',
        width: Dimensions.get('window').height*0.2,
        height:Dimensions.get('window').height*0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,

        shadowColor: 'black',
        shadowOpacity:0.4,
        shadowOffset:{
            width: 1, height: 1,


        },


        
    },

    text:{
        fontSize:15,
        fontWeight: '600',
       
    },


    aboutProduct: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'open-sans-bold',
        paddingBottom: 10,


    },
    productDetail: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
        fontFamily: 'open-sans-bold',
       
        

    },
    noDiscountPrice: {
        fontSize: 15,
        fontWeight: '400',
        color: 'gray',
        paddingTop: 10,
        textDecorationLine: ' line-through',
    },
    discountPrice: {
        fontSize: 15,
        fontWeight: '400',
        color: 'green',
        paddingLeft: 4,
    },


})

export default Description;