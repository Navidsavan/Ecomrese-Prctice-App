import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';






const ProductItem = props => {
    return (
    
        <View style={styles.itemContainerList1}>
            <Image style={styles.catImage1} source={{ uri: props.image }} />
            <Text style={styles.prdName}>{props.name}</Text>
            <Text style={styles.prdPrice}>Now Only : $ {props.price.toFixed(2)}</Text>
            <View style={styles.IconTextContainer}>
            <Text style={styles.noDiscountText}>${props.noDiscount}</Text>
            
           
            <View style={styles.IconContainer}>
            <TouchableOpacity  onPress={props.onHeatPress}><Icon name="heart-outline"  size={20} color='red'/></TouchableOpacity>
            </View>
        </View>
        </View>

        
    );
};

const styles = StyleSheet.create({
    IconTextContainer:{
    
       flexDirection: 'row',
       justifyContent: 'space-between',
       
   },
   IconContainer:{
    backgroundColor: 'white',
    width: 20,
    height: 22,
    borderRadius: 4,
    marginRight: 10,
    marginBottom: 10,
   

},

    itemContainerList1: {
        display: 'flex',
        marginHorizontal: 12,
        borderRadius: 5,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: '#F8F9F9',

        shadowColor: 'blue',
        shadowOpacity:0.4,
        shadowOffset:{
            width: 0, height: 0

        },
        shadowRadius: 2,
        elevation: 5,
        height: Dimensions.get('window').height * 0.35,
        margin: 10,
       


    },
    catImage1: {
        borderRadius: 5,
        height: Dimensions.get('window').height * 0.25,
      
        
      

    },
    
    prdName: {
        fontSize: 15,
        fontWeight: '700',
        paddingLeft: 4,
        
    },
    prdPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: 'green',
        paddingLeft: 4,
        //textDecorationLine:' line-through',

    },
    
    noDiscountText: {
        fontSize:15,
        fontWeight: '600',
        color: 'gray',
        paddingLeft: 4,
        textDecorationLine: ' line-through',

    },

})


export default ProductItem;