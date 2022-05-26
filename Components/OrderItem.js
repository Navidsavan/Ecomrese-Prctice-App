import React,{useState} from 'react';
import { Dimensions } from 'react-native';
import { View, Text, StyleSheet, Button, } from 'react-native';
import CartItem from './CartItem';


const OrderItem=props=>{
    const [showDetails, setShowDetails] = useState(false);
    return(
        <View style={styles.orderItem}>
        <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>

        </View>
        <Button color='#E7A63C' 
        title={showDetails? 'Hide Details': 'Show Details' }
        onPress={()=>{setShowDetails(prevState=>!prevState)

        }}/>
        {showDetails && <View style={styles.detailItems}>
            {props.items.map(cartItem=><CartItem
                key={cartItem.productId}
                quantity={cartItem.quantity}
                amount={cartItem.sum}
                productTitle={cartItem.productTitle}
            />)}
        </View>}
            
        </View>
    

    )
}

const styles=StyleSheet.create({
   

  orderItem:{
    backgroundColor: 'white',
    width: Dimensions.get('window').height*0.5,
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity:0.26,
    shadowOffset:{
        width: 0, height: 2


    },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    
  },
  summary:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10,
  },
  totalAmount:{
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'open-sans-bold'
  },
  date:{
    fontSize: 16,
   color: 'gray'
  },
  detailItems:{
      width: '100%'
  }

})
export  default OrderItem;