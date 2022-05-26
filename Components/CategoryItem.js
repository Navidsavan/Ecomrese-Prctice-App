import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';



const CategoryItem = props=> {
    return (
        <View style={styles.itemContainerList2}> 
            <Image style={styles.cat2Image} source={{ uri: props.image }} />
            <Text style={styles.prdName}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    itemContainerList2: {
        display: 'flex',
        marginHorizontal: 12,
        
        borderRadius: 5,
        justifyContent: 'flex-start',
        flexDirection: 'cloumn',
        backgroundColor: 'white',
        


        shadowColor: 'black',
        shadowOpacity:0.4,
        shadowOffset:{
            width: 0, height: 0

        },
        shadowRadius: 6,
        elevation: 5,
        height: Dimensions.get('window').height * 0.23,
        width: Dimensions.get('window').height*0.2,
        margin: 10,

        
         
       


    },
    cat2Image: {
        flex: 1,
        borderRadius:(0, 200, 100, 200),
       // height: Dimensions.get('window').height * 0.02,
        width: '100%',
        height: Dimensions.get('window').height * 0.5,
       
        
        
        


    },
    prdName: {
        fontSize: 14,
        fontWeight: '700',
        paddingLeft: 4,
       paddingBottom: 3,
        textAlign: 'center'
        
    },


})


export default CategoryItem;