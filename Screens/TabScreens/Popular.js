import React from 'react';
import { View, Text, StyleSheet,  } from 'react-native';

const Popular=()=>{
    return(
        <View style={styles.container}>
            <Text>Popular Product</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flux: 1,
        justifyContent: 'center',
        alignItems: 'center'
        
    }

})


export default Popular;