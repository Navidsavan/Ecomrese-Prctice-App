import React from 'react';
import {View, Text, FlatList, StyleSheet, Alert, Dimensions, } from 'react-native';
import UserProducts from '../../Components/UserProducts';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products'




const UserProductScreen = props => {
   const userProducts= useSelector(state => state.newArrivals.userProducts)
   const dispatch=useDispatch();

   /*const deleteHandler=(id)=>{
    Alert.alert('Are you sure?', 'Do You really want to delete this item?',[
    {text: 'No', style: 'default'},
    {text: 'Yes', style: 'destructive', onPress: ()=> dispatch(productActions.deleteProduct(id))

      }
    
    ])
}*/
if(userProducts.length===0){
    return(
    <View style={styles.noAvailableProduct}>
        <Text>No Products Found</Text>
    </View>
    )
}
    return (
        <View style={styles.container}>
        <View style={styles.bigCircle}></View>
       <View style={styles.smallCircle}></View>
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            scrollIndicatorInsets={false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            disableScrollViewPanResponder={false}
            renderItem={itemData =>
                <UserProducts
                    image={itemData.item.URL}
                    name={itemData.item.name}
                    price={itemData.item.price}
                    noDiscount={itemData.item.noDiscount}

                    onDelete={()=> dispatch(productActions.deleteProduct(itemData.item.id))}
                       
                    onEdit={() => {
                        props.navigation.navigate('editProduct', {
                            productId: itemData.item.id
                        })
                    }} />
                  
                   

            }
        />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
       
        position: 'absolute',
        backgroundColor: '#C9C0CE'

    },
    bigCircle: {
        width: Dimensions.get('window').height * 0.5,
        height: Dimensions.get('window').height * 0.5,
        backgroundColor: 'white',
        borderRadius: 100,
        position: 'fixed',
        right: Dimensions.get('window').width * 0.2,
        top: 5,
      },
      smallCircle: {
        width: Dimensions.get('screen').height * 0.5,
        height: Dimensions.get('screen').height * 0.5,
        backgroundColor: 'white',
        borderLeftBottomRadius: 300,
        position: 'absolute',
        bottom: Dimensions.get('window').width * 0.2,
        right: Dimensions.get('window').width * 0,

      },
      noAvailableProduct:{
          flex:1,
          justifyContent: 'center',
        alignItems: 'center'    
      }
    
})

export default UserProductScreen;
