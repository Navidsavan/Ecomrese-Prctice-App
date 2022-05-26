import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


const Message=({navigation})=>{
    return(
        <View style={styles.container}>
            <Text>Message Screen</Text>
         <Button title="switch page"   onPress={() => navigation.navigate("SubCategory")}/>
        </View>
    )
}

const styles=StyleSheet.create({

    container:{
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
    }

})

export default Message;
