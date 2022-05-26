
import React, {useEffect, useState, useCallback} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    FlatList,
    TouchableOpacity,
    Image,
    Platform,
    ScrollView,
    ActivityIndicator,
    Button
} from 'react-native';

import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import ProductItem from '../Components/ProductItem';
import CategoryItem from '../Components/CategoryItem';
import * as wishActions from '../store/actions/wishListAction'
import {  useDispatch} from 'react-redux';
import * as productsActions from '../store/actions/products'
import products from '../store/reducers/products';




const Category = (props) => {
    //pul to refresh
    const [isLoading, setIsLoading]=useState(false);
    const [isRefreshing, setIsRefreshing]=useState(false);
    const [error, setError]=useState();
    const newProducts = useSelector(state => state.newArrivals.availableProducts);
    const CategoriesAvailable = useSelector(state => state.AllCategories.availableCategories);




    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);

    const dispatch=useDispatch();


    const loadProducts=useCallback(async()=>{ 
        setIsRefreshing(true);
        setError(null);
        
       
        try{
        await dispatch(productsActions.fetchProducts());
        }
        catch (err){
            setError(err.message)
        }
         setIsRefreshing(false);
        }, [dispatch, setIsLoading, setError])
    // setting up navigation listener
   // when ever we move between dif nav options load products rebuilt
    useEffect(()=>{
        const unsubscribe=props.navigation.addListener('focus', loadProducts);
        return () => {
            unsubscribe();
          };
    },[loadProducts])


    useEffect(()=>{
        setIsLoading(true);
        loadProducts().then(()=>{
            setIsLoading(false)
        });
    }, [dispatch, loadProducts]);

    if(error){
        return (
            <View style={styles.spinnerStyling}>
                <Text>An error ocurred!</Text>
                <Button title='Try Again' onPress={loadProducts}/>
            </View>
        )}

    if(isLoading){
        return (
        <View style={styles.spinnerStyling}>
            <ActivityIndicator size='large' color="pink"/>
        </View>
        )}
    
     if(!isLoading && newProducts.length===0){
            return  (
            <View style={styles.spinnerStyling}>
            <Text>No Products found!</Text>
    
            
        </View>
            )}
    return (
       

        <View style={styles.container}>
        
            <View>
            <Text style={styles.text}>Shop </Text>
            <Text style={styles.textDescription}>Get Cheapest Goods for your everyday use</Text>
            </View>
            <View style={styles.searchBarContainer}>
                <Searchbar
                    placeholder="Search for goods"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
            </View>
           
            <ScrollView showsVerticalScrollIndicator={false} onRefresh={loadProducts}
                    refreshing={isRefreshing}>
                <View style={styles.newOffers}>
                    <Text style={styles.newestText}>NEWEST OFFERS</Text>
                    <View style={styles.seeAll}>
                        <Text style={{ fontSize: 14, fontWeight: 700,  }}>SEE ALL</Text>
                        <Icon name='md-arrow-forward' color="black" size={15} />
                    </View>
              
                </View>
                
                <FlatList
                   // when ever pul flatList it will be refresh 
                    onRefresh={loadProducts}
                    refreshing={isRefreshing}
                    data={newProducts}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    //scrollIndicatorInsets={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={itemData =>
                      
    
                            <ProductItem
                             image={itemData.item.URL} 
                             name={itemData.item.name} 
                             price={itemData.item.price} 
                             noDiscount={itemData.item.noDiscount} 

                            onWishList={()=>{
                                dispatch(wishActions.addToWishList(newProducts))
                            }}
                             onPress={()=>{
                                props.navigation.navigate('Detail', {
                                 productId: itemData.item.id,
                                 productName:itemData.item.name 
                                 })}}
                        />
                    }    
                />
                            
                            

                <View style={styles.newOffers}>
                    <Text style={styles.newestText}>BY CATEGORIES</Text>
                    <View style={styles.seeAll}>
                        <Text style={{ fontSize: 14, fontWeight: 700,  }}>SEE ALL</Text>
                        <Icon name='md-arrow-forward' color="black" size={15} />
                    </View>

                </View>

                <FlatList
                    data={CategoriesAvailable}
                    keyExtractor={(item, index) => item.id}
                    horizontal={true}
                    scrollIndicatorInsets={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={itemData => (
                     
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate({
                               name: 'SubCategory',
                                params: {
                                   categoryId: itemData.item.id,
                                   productName: itemData.item.name,
                                }
                              })

                        }}>
                            <CategoryItem image={itemData.item.URL} name={itemData.item.name} />
                        </TouchableOpacity>
                   
                        
                      

                    )}

                />

            </ScrollView>


        </View>



    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor:'#F8F9F9',
       //backgroundColor: '#DE3163',
       //backgroundColor: '#EFF1F1',
    },
    
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingTop: 15,
        paddingLeft: 15,
        fontFamily: 'open-sans-bold',
        color: 'black'
    },
    textDescription: {
        fontSize: 15,
        fontWeight: '700',
        paddingLeft: 15,
        fontFamily: 'open-sans-regular',
        color: 'black'

    },
    searchBarContainer: {
        paddingBottom: 10,
        paddingTop: 10,
        height: Dimensions.get('window').height * 0.12,
        width:  '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: 10,


    },
    searchBar: {
        backgroundColor: 'white',
        borderColor: 'white',
        paddingLeft: 15,
        borderRadius: 3,
        borderWidth: 2,
        width: Dimensions.get('window').height * 0.52,


    },
    newOffers: {
        flux: 1,
        flexDirection: 'row',
        paddingLeft: 15,
        width: Dimensions.get('window').height * 0.6,
        color: 'black'

    },
    newestText: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: 'open-sans-bold',
        color: 'black'

    },
    seeAll: {
        flex: 1,
        paddingRight: Dimensions.get('window').height * 0.055,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        color: 'black'
    },

spinnerStyling:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}

})

export default Category;
