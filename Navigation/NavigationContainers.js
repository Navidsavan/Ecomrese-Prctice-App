import React, {useEffect, useRef} from 'react'
import { MainNavigator } from './StackNavigation';
//import { useSelector } from 'react-redux';
//import { NavigationAction } from '@react-navigation/routers';




const NavigationContainers=props=>{
    
   /* const navRef=useRef();
    const isAuth= useSelector(state=>!!state.auth.token);

    useEffect(()=>{
        
        if(!isAuth){
            navRef.current(
                props.navigation.navigate('Auth')
            )
 
        }
    }, [isAuth])
*/
    return <MainNavigator />

}
 
export default NavigationContainers;