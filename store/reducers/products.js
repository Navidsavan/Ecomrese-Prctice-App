import { CREATE_PRODUCT, DELETE_PRODUCT, SET_PRODUCTS, UPDATE_PRODUCT } from '../actions/products';
import CATEGORIES from '../../Data/data';
import Product from '../../models/Variables'

const initialState={
    availableProducts: [],
    userProducts: [],
};

export default (state=initialState, action)=>{
    switch(action.type){
        case SET_PRODUCTS:
            return{
                availableProducts: action.products,
                userProducts:action.userProducts
            }
        case CREATE_PRODUCT:
            const newProduct=new Product(
            action.productData.id,
            action.productData.ownerId, 
            action.productData.URL, 
            action.productData.name, 
            action.productData.price, 
            action.productData.noDiscount, 
            action.productData.detail
            );
            return{
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UPDATE_PRODUCT:
            const productIndex=state.userProducts.findIndex(prod=>prod.id === action.pid);
            const updateProduct=new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.URL, 
                action.productData.name, 
                action.productData.price, 
                action.productData.noDiscount, 
                action.productData.detail
                
            );
            const updatedUserProducts=[...state.userProducts];
            updatedUserProducts[productIndex]=updateProduct;
            const availableProductIndex= state.availableProducts.findIndex(
                prod=>prod.id===action.pid
            );
            const updatedAvailableProducts=[...state.availableProducts]
            updatedAvailableProducts[availableProductIndex]=updateProduct;
            return{
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts

            }

        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts: state.userProducts.filter(product=>
                    product.id!==action.pid),
                availableProducts: state.availableProducts.filter(product=>
                    product.id!==action.pid),

            }
    }
    return state;
}