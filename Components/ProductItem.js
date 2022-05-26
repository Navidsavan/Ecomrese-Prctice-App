import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProductItem = props => {
    return (
        
        <View style={styles.itemContainerList1} >
            
           <TouchableOpacity onPress={props.onPress}>
           <Image style={styles.catImage1} source={{ uri: props.image }} />
           </TouchableOpacity>
            <View style={styles.NameDiscountTextContainer}>
            <Text style={styles.prdName}>{props.name}</Text>
            <Text style={styles.noDiscountText}>${props.noDiscount}</Text>
         
            <View style={styles.IconTextContainer}>
            <Text style={styles.prdPrice}>Now Only : $ {props.price.toFixed(2)}</Text>
           
            <View style={styles.IconContainer}>
            <TouchableOpacity onPress={props.onWishList}><Icon name="heart-outline"  size={20} color='red'/></TouchableOpacity>
            </View>
        </View>
        </View>
      </View>
      
        
        
    );
};

const styles = StyleSheet.create({

    
    itemContainerList1: {
        display: 'flex',
        marginHorizontal: 15,
        borderRadius: 5,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: 'white',

        shadowColor: 'black',
        shadowOpacity:0.4,
        shadowOffset:{
            width: 0, height: 0

        },
        shadowRadius: 6,
        elevation: 5,
        height: Dimensions.get('window').height * 0.25,
        width: Dimensions.get('window').height*0.3,
        margin: 25,


        transform: [
            { perspective: 350 },
              { translateX: - Dimensions.get('window').width * 0 },
              { translateY: - Dimensions.get('window').width * 0.002},
            { rotateY: '30deg'},
           
      
          ],
      


    },
    catImage1: {
        borderRadius: 5,
        height: Dimensions.get('window').height * 0.15,
        width: '100%',
        
       

    },
    
    prdName: {
        fontSize: 14,
        fontWeight: '700',
        paddingLeft: 4,
        
    },
    prdPrice: {
        fontSize: 12,
        fontWeight: '600',
        color: 'green',
        paddingLeft: 4,
        //textDecorationLine:' line-through',

    },
    
    noDiscountText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'gray',
        paddingLeft: 4,
        textDecorationLine: ' line-through',

    },
    IconTextContainer:{
        alignContent: 'flex-start',
       flexDirection: 'row',
       justifyContent: 'space-between',
       
       
   },
   NameDiscountTextContainer:{
       flexDirection: 'column',
       justifyContent: 'space-between',
      
   },
   IconContainer:{
       backgroundColor: '#F8DFB8',
       width: 20,
       height: 20,
       borderRadius: 4,
       marginRight: 10,
   },

})


export default ProductItem;