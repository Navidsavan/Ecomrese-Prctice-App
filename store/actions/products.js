import Variables from "../../models/Variables"

export const DELETE_PRODUCT='DELETE_PRODUCT'
export const CREATE_PRODUCT='CREATE_PRODUCT'
export const UPDATE_PRODUCT='UPDATE-PRODUCT'
export const SET_PRODUCTS='SET_PRODUCTS'

export const fetchProducts=()=>{
   
    return async (dispatch, getState)=>{
        const userId=getState().auth.userId;
        try{
        //any async code we can use
        const response= await fetch('https://rn-complete-guide-e2272-default-rtdb.firebaseio.com/products.json'
        );
      if(!response.ok){
          throw new Error('Something went wrong!');

      }


        const resData=await response.json();
        const loadedProducts=[];

        for(const key in resData){
            loadedProducts.push(new Variables(
                key, 
                resData[key].ownerId, 
                resData[key].URL, 
                resData[key].name, 
                resData[key].noDiscount,
                resData[key].price, 
                resData[key].detail
                ))
        }
        dispatch({
            type: SET_PRODUCTS, 
            products: loadedProducts, 
            userProducts: loadedProducts.filter(prod=>prod.ownerId===userId)
        })
    }
    catch(err){
        //set to custom analytic server or where ever you want
        throw err;
    }

    }}

export const deleteProduct=productId=>{
    return async (dispatch, getState)=>{
        const token=getState().auth.token;
      const response=  await fetch(`https://rn-complete-guide-e2272-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        })
        if(!response.ok){
            throw new Error('Something went wrong!!!');
        }
        dispatch({type: DELETE_PRODUCT, pid: productId})
    }
    
}

export const createProduct=(URL, name, price, noDiscount, detail )=>{
    return async (dispatch, getState)=>{
        const token=getState().auth.token;
        const userId=getState().auth.userId;
        //any async code we can use
        //?auth=${token}` add at the end or url to access token by the help of 'getState'
        const response= await fetch(`https://rn-complete-guide-e2272-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
 
            },
            body: JSON.stringify({
                URL, 
                name, 
                price, 
                noDiscount, 
                detail,
                ownerId: userId
            })

        })
        const resData=await response.json();
        console.log(resData);
      dispatch({
        type: CREATE_PRODUCT,
        productData:{
            id: resData.name, 
            URL,
            name, 
            price, 
            noDiscount, 
            detail,
            ownerId: userId
        }
    })
    };
};

export const updateProduct =(id,URL, name, price, noDiscount, detail )=>{
    return async (dispatch, getState)=>{
        const token=getState().auth.token;
        //use backtiks and add id after product to locate exact product
        //?auth=${token}` add at the end or url to access token by the help of 'getState'
        const response= await fetch(`https://rn-complete-guide-e2272-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
                              // PATCH will update in the places where you tell it to updated while PUT will full override
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
 
            },
            body: JSON.stringify({
                URL, 
                name, 
                price, 
                noDiscount, 
                detail
            })

        })
        if(!response.ok){
            throw new Error('Something went wrong!!!');
        }
        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData:{
                URL,
                name, 
                price, 
                noDiscount, 
                detail
    
            }
        });

    }
   
};