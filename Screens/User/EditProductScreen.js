import React, {useState, useEffect, useCallback, useReducer} from 'react';
import { View, Text, StyleSheet,ScrollView,  TouchableOpacity, Alert, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as productActions from '../../store/actions/products'
import Input from '../../Components/input';
import Icon from 'react-native-ionicons';


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

const EditProductScreen=props=>{
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState();





    const prodId=props.route.params.productId
    const editedProduct=useSelector(state=>state.newArrivals.userProducts.find(prod=>prod.id===prodId));
    const dispatch=useDispatch();

    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
            URL:  editedProduct?editedProduct.URL: '',
            name: editedProduct?editedProduct.name: '',
            price: editedProduct?editedProduct.price: '',
            noDiscount: editedProduct?editedProduct.noDiscount: '',
            detail: editedProduct?editedProduct.detail: ''
        },
        inputValidities:{
            URL:  editedProduct?true: false,
            name:  editedProduct?true: false,
            price:  editedProduct?true: false,
            noDiscount:  editedProduct?true: false,
            detail:  editedProduct?true: false,
        },
        formIsValid: editedProduct?true: false,
    })
    
    useEffect(()=>{
        if(error){
            alert('An error ocurred!', error, [{text: 'Ok'}])
        }

    }, [error]);
    
    const submitHandler=useCallback(async()=>{
        if(!formState.formIsValid){
            alert('Wrong input', 'Please check the errors in the form', [{text: 'OK'}
        ]);
        return;
        }
        setError(null)
        setIsLoading(true);
        try{
       if(editedProduct){
         await  dispatch(
               productActions.updateProduct(
                   prodId, 
                   formState.inputValues.URL, 
                   formState.inputValues.name, 
                   +formState.inputValues.price, 
                   +formState.inputValues.noDiscount, 
                   formState.inputValues.detail
                   )
           );

       }
    

       else{
         await  dispatch(
               productActions.createProduct(
                   formState.inputValues.URL, 
                   formState.inputValues.name, 
                   +formState.inputValues.price, 
                   +formState.inputValues.noDiscount, 
                   formState.inputValues.detail))
       }
       props.navigation.goBack();
    }
    catch (err){
        setError(err.message);
    } 
       setIsLoading(false)
       
    }, [dispatch, prodId, formState])

    const inputChangeHandler=useCallback((inputIdentifier, inputValue, inputValidity)=>{
       dispatchFormState({
           type:FORM_INPUT_UPDATE,
           value: inputValue, 
           isValid: inputValidity,
           input: inputIdentifier
        })
    }, [dispatchFormState]);


    if(isLoading){
        return <View style={styles.centeredSpinner}>
            <ActivityIndicator size='large' color='pink' />
        </View>
    }
  
    return(
        <KeyboardAvoidingView 
            behavior='padding' 
            keyboardVerticalOffset={100} 
            style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
     
        <View style={styles.form}>
        <Input 
            id='URL'
            label='URL'
            errorText='Please enter a valid Url!'
            keyboardType='default'
            autoCapitalize='sentences'
            autCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.URL: ''}
            initiallyValid={!!editedProduct}
            required

        />
        <Input 
            id='name'
            label='Name'
            errorText='Please enter a valid Name!'
            keyboardType='default'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.name: ''}
            initiallyValid={!!editedProduct}
            required

        />
        
        <Input 
            id='price'
            label='Price'
            errorText='Please enter a valid Price!'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.price: ''}
            initiallyValid={!!editedProduct}
            required
            min={0}


        />
        
        
       
        <Input 
            id='noDiscount'
            label='Actual Price'
            errorText='Please enter a valid Price!'
            keyboardType='decimal-pad'
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.noDiscount: ''}
            initiallyValid={!!editedProduct}
            required
            min={0}

        />
        
        <Input 
            id='detail'
            label='Detail'
            errorText='Please enter a valid Detail!'
            keyboardType='default'
            autoCapitalize='sentences'
            autCorrect
            multiLine
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct? editedProduct.detail: ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}


        />
         
        </View>
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.button} onPress={submitHandler} >
        <Icon name="save" color="black" size={30} />
          <Text style={styles.btnText}>Save</Text>
       
        </TouchableOpacity>
        </View>
   
        </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles=StyleSheet.create({

    form:{
        margin: 20
    },
    
    btnContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
        

    },

    button: {
        width: 150,
        marginTop: 20,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        justifyContent: "center",
        textAlign: "center",
        borderWidth: 1,
        borderColor: 'pink',
        flexDirection: 'row'
       
      },
      btnText: {
        color: "Black",
        fontSize: 20,
        fontWeight: 'bold',
        justifyContent: "center",
        textAlign: "center",
      },
centeredSpinner:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
}

})

export default EditProductScreen;