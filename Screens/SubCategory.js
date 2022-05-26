import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions , Button} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import SubCategoryProduct from '../Components/SubcategoryProduct';
import * as cartActions from '../store/actions/wishListAction'



const SubCategory=(props)=>{
        
    const categoryId = props.route.params.categoryId;
  

    const availableSubItems=useSelector(
        state=>state. AvailableCategoriesSubItems.availableProducts);
    const showAbleProducts=availableSubItems.filter(prod=>prod.catId===categoryId);
    
   const dispatch=useDispatch();
    return(

            
       
        <View style={styles.container}>
          
            <FlatList 
                data={showAbleProducts}
                keyExtractor={(item, index) => item.id}
               
                scrollIndicatorInsets={false}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                renderItem={itemData => (
                    
                    <TouchableOpacity onPress={() => {
                           props.navigation.navigate('Detail', { 
                               productId: itemData.item.id,
                               productName: itemData.item.name })



                        }}>
                             <SubCategoryProduct 
                             image={itemData.item.URL} 
                             name={itemData.item.name} 
                             price={itemData.item.price} 
                             noDiscount={itemData.item.noDiscount}
                             onHeatPress={()=>{dispatch(cartActions.addToWishList(showAbleProducts))}}
                             />
                        </TouchableOpacity>
                   
                )}
                
            />
            
            
            
        </View>
        
       
    )}           
                  
   SubCategory.navigationOptions=props=>{
       return{
           headerTitle: props.route.params.productId
       }
   } 

const styles=StyleSheet.create({

    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        
    },
    

})

export default SubCategory;