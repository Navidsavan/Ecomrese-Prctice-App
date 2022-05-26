export const ADD_TO_WISH_LIST='ADD_TO_WISH_LIST';
export const REMOVE_FROM_WISH_LIST=' REMOVE_FROM_WISH_LIST';


export const addToWishList=product=>{
    return{type: ADD_TO_WISH_LIST, product: product}
}

export const removeFromWishList= productId =>{
    return{type:  REMOVE_FROM_WISH_LIST, pid: productId};

};