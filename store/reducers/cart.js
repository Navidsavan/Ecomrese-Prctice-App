import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import CartItem from '../../models/cartItem'
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';


const initialState={
    items: {},
    totalAmount:0
}

export default (state=initialState, action)=>{
    switch(action.type){
        case ADD_TO_CART:
            const addedProduct=action.product;
            const prodTitle=addedProduct.name;
            const prodPrice=addedProduct.price;
           

            let updateOrNewCartItem;

            if(state.items[addedProduct.id]){
           
            updateOrNewCartItem=new CartItem(
               state.items[addedProduct.id].quantity+1,
               prodTitle,
               prodPrice,
               state.items[addedProduct.id].sum+prodPrice
           );
           
    }
    else{
        updateOrNewCartItem=new CartItem(1,  prodTitle,prodPrice, prodPrice);
    }
        return{
            ...state,
            items: {...state.items, [addedProduct.id]: updateOrNewCartItem},
            totalAmount: state.totalAmount+prodPrice
         

    }
    case REMOVE_FROM_CART:
        const selectedCartItem=state.items[action.pid];
        const currentQty=selectedCartItem.quantity;
        let updatedCartItems;
        if(currentQty>1){
            
            const updatedCartItem=new CartItem(
                selectedCartItem.quantity-1,
                selectedCartItem.productTitle,
                selectedCartItem.productPrice,  
                selectedCartItem.sum-selectedCartItem.productPrice,

            );
            updatedCartItems={...state.items, [action.pid]: updatedCartItem}
        }
        else{
           
            updatedCartItems={...state.items};
            delete updatedCartItems[action.pid];
        }

        return{
            ...state,
            items: updatedCartItems,
            totalAmount: state.totalAmount -selectedCartItem.productPrice
        }
        case ADD_ORDER:
            return initialState;


       case DELETE_PRODUCT:
           if(!state.items[action.pid]){
               return state;
           }
           const updatedItems={...state.items};
           const itemTotal=state.items[action.pid].sum;
           delete updatedItems[action.pid];
           return{
               ...state,
               items: updatedItems,
               totalAmount: state.totalAmount-itemTotal
           }
    }
    return state;
}
