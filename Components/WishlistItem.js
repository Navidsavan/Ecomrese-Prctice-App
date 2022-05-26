import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image, Dimensions }from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



const CartItem = props => {
    return (
      <View style={styles.container}>
        
          
        
          <Image style={styles.ImageStyle} source={{uri: props.productUrl}}/>
          
          <Text style={styles.productName}>{props.productTitle} </Text>
       
        <View style={styles.itemData}>
          <Text style={styles.ProductPrice}>Now only Available on: ${props.amount}</Text>
          <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={props.onRemove} style={styles.BothButton}>
          <View style={styles.removeContainer}>
            <Icon
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
              <Text style={{size: 20, fontWeight: '700', padding: 3}}>Remove</Text>
            </View>
          
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onViewMore} style={styles.BothButton}>
          <View style={styles.removeContainer}>
          <Icon
              name= 'ellipsis-vertical-sharp'
              size={23}
              color="green"
            />
            <Text style={{size: 20, fontWeight: '700', padding: 3}}>View Detail</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
    
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
        height: Dimensions.get('window').height * 0.45,
        margin: 10,
       
  },
  productName:{
       fontFamily: 'open-sans-bold',
       fontSize: 15,
       fontWeight: '600',
       paddingTop: 10,
       paddingLeft: 10

  },
  ProductPrice:{
    fontWeight: '300',
    fontSize: 20,
    paddingLeft: 10,
    color: 'green'
  },
    

    ImageStyle:{
      width: '100%',
      height: Dimensions.get('window').height*0.25
    },
    buttonContainer:{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      width: Dimensions.get('window').height*0.5,
      height: Dimensions.get('window').height*0.4,
      justifyContent: "space-between",
      alignItems: 'center',
      padding: 10,
     // paddingBottom: 10,
      


  },
  BothButton:{

    backgroundColor: '#E3E3E3',
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
removeContainer:{
  flexDirection: 'row',
  justifyContent: 'center'
}
  });
  
  export default CartItem;