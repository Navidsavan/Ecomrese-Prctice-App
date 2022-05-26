import React, {useState, useReducer, useCallback, useEffect} from 'react';
import { 
    View, Text, 
    StyleSheet, ScrollView, 
    Button,Dimensions, 
    KeyboardAvoidingView, 
    Alert, ActivityIndicator, Image} from 'react-native';
import Input from '../../Components/input';
//import Card from '../../Components/Card'
//import { LinearGradient} from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth'
import Icon from 'react-native-ionicons';
import { color } from 'react-native-elements/dist/helpers';



const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE'

const formReducer=(state, action) => {
    if(action.type===FORM_INPUT_UPDATE){
        const updatedValues={
            ...state.inputValues,
            [action.input]: action.value

        };
        const updatedValidities={
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid=true
        for(const key in updatedValidities){
            updatedFormIsValid=updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };

    }
    return state;
};


const AuthScreen =props=>{
    const [isLoading, setIsLoading]=useState(false)
    const [error, setError]=useState()
    const [isSignup, setIsSignup]=useState(false)

    const dispatch=useDispatch();

    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
           email: '',
           password: ''
        },
        inputValidities:{
            email: false,
            password: false
        },
        formIsValid: false,
    })

    useEffect(()=>{
        if(error){
            alert('An error Occurred', error, [{text: 'Ok'}])
        }

    }, [error])


    const authHandler=async ()=>{
        let action;
        if(isSignup){
       action=authActions.signup(
            formState.inputValues.email, 
            formState.inputValues.password
            )
        
        } else {
            action=authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
                );
        }
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('Shop')
         } catch (err){
             setError(err.message);
             setIsLoading(false)
         }
        
        
    }

    const inputChangeHandler=useCallback((inputIdentifier, inputValue, inputValidity)=>{
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value: inputValue, 
            isValid: inputValidity,
            input: inputIdentifier
         })
     }, [dispatchFormState]);
 
    return(
        <KeyboardAvoidingView  style={styles.screen}>
        <View style={styles.bigCircle}></View>
        <View style={styles.smallCircle}></View>
        <View style={styles.triangle}></View>
        <View style={styles.bottomLeftTriangle}></View>

        <View style={styles.userIcon}>
         <Image  style={styles.imageUser} source={{uri:'https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile.png'}}/>
        </View>
        <View style={styles.authContainer}>
        
            <ScrollView showsHorizontalScrollIndicator={false}>
            <Input
                id = "email"
                label = "E-Mail"
                keyboardType="email-address"
                required
                email
                autoCapitalize="none"
                errorText="Please enter a valid email address!"
                onInputChange={inputChangeHandler}
                initialValue=""

            />

            <Input
                id = "password"
                label = "Password"
                keyboardType="default"
                secureTextEntry
                required
                minLength={5}
                autoCapitalize="none"
                errorText="Please enter a valid password!"
                onInputChange={inputChangeHandler}
                initialValue=""
                

            />
            <View style={styles.ButtonContainer}>
               {isLoading? 

               <ActivityIndicator
                   size='small' color='pink'
               />: <Button 
                title={isSignup?'Sign Up': 'LogIn'}  
                color='#138D75' 
                onPress={authHandler}/>}
            </View>
            <View  style={styles.ButtonContainer}>
                <Button 
                title={`Switch to ${isSignup ? 'LogIn' : 'Sign Up'}`} 
                color='#EB984E' 
                onPress={()=>{
                    setIsSignup(prevState=>!prevState)
                }}/>
            </View>
         

            </ScrollView>
        </View>
      
        </KeyboardAvoidingView>
    )
};


export const screenOptions={
    headerTitle: 'AUTHENTICATE'
}
const styles = StyleSheet.create({

    screen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2F838A',
       

    },
    authContainer:{
        width: '80%',
        maxHeight: 400,
        height: '50%',
        maxHeight: 400 ,
        padding: 20,
    
    
        shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
        

    },
    ButtonContainer:{
        margin: 10
    },

    bigCircle: {
        width: Dimensions.get('window').height * 0.18,
        height: Dimensions.get('window').height * 0.18,
        //backgroundColor: '#CF3150',
        //borderRadius: 1000,
        position: 'absolute',
        top: Dimensions.get('window').width * -0.001,
        left: Dimensions.get('window').width * -0.001,
        borderTopLeftRadius: 300,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderWidth: 20,
        borderColor: 'white'
      },
      smallCircle: {
        width: Dimensions.get('window').height * 0.18,
        height: Dimensions.get('window').height * 0.18,
       // backgroundColor: '#CF3150',
        //borderRadius: 1000,
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.001,
        right: Dimensions.get('window').width * -0.001,
        borderTopLeftRadius: 300,
        borderWidth: 20,
        borderBottomWidth: 0,
        borderRightWidth:0,
        borderColor: 'white',

      
      },
      triangle: {
        width: Dimensions.get('window').height * 0.18,
        height: Dimensions.get('window').height * 0.18,
       // backgroundColor: '#CF3150',
        
        position: 'absolute',
        top: Dimensions.get('window').width * -0.001,
        right: Dimensions.get('window').width * -0.001,
        borderTopRightRadius: 300,
        borderWidth: 20,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderColor: 'white'
      
    },
    bottomLeftTriangle: {
        width: Dimensions.get('window').height * 0.18,
        height: Dimensions.get('window').height * 0.18,
        //backgroundColor: '#CF3150',
        borderColor: 'white',
        
        position: 'absolute',
        bottom: Dimensions.get('window').width * -0.001,
        left: Dimensions.get('window').width * -0.001,
        borderTopRightRadius: 300,
        borderWidth: 20,
        borderBottomWidth: 0,
        borderLeftWidth:0
      
    },
    userIcon:{
        width: Dimensions.get('window').height * 0.2,
        height: Dimensions.get('window').height * 0.2,
       
        
        position: 'absolute',
        top: Dimensions.get('window').width * -0.001,
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 300,
        marginTop: 15,

        
    },
    imageUser:{
        //width: '100%',
        //height: '100%',
        borderRadius: 300,
        width: Dimensions.get('window').height * 0.18,
        height: Dimensions.get('window').height * 0.18,
    }
   

})

export default AuthScreen;