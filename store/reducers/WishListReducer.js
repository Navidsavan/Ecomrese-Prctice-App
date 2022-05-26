import { Alert } from "react-native";
import WishlistVariables from "../../models/wishListVariables";
import { ADD_TO_WISH_LIST, REMOVE_FROM_WISH_LIST } from "../actions/wishListAction";


const initialState={
    items: {},
    //totalAmount:0
}

export default (state=initialState, action)=>{
    switch(action.type){
        case  ADD_TO_WISH_LIST:
            const addedProduct=action.product;
            const prodUrl=addedProduct.URL;
            const prodTitle=addedProduct.name;
            const prodPrice=addedProduct.price;
            

            let updateOrNewCartItem;

           /* if(state.items[addedProduct.id]){
           
          Alert('item is already exist in your wish list')
    }
    else{*/
        updateOrNewCartItem=new WishlistVariables(1,prodUrl, prodTitle,prodPrice, prodPrice);
    
        return{
            ...state,
            items: {...state.items, [addedProduct.id]: updateOrNewCartItem},
         
         

    }
    case  REMOVE_FROM_WISH_LIST:
          let  updatedCartItems={...state.items};
            delete updatedCartItems[action.pid];
        

        return{
            ...state,
            items: updatedCartItems,
           
        }

    }
    return state;
}
