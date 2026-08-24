import { createSlice } from "@reduxjs/toolkit";


export let cartSlice = createSlice(
    {
        name:"cart",
        initialState:{
            cart:localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : []  // state variable
        },
        reducers:{ 
            // 1st param is state , 2nd param = object whichcontent request data   reqData = {payload:any}

            addToCart:(state , reqData )=>{   
             
                // console.log(reqData.payload);  // data is in payload is fixed

                let {cartObj} = reqData.payload;
                state.cart=[cartObj, ...state.cart]
                localStorage.setItem("CART",JSON.stringify(state.cart));
            },

            deleteCart:(state,reqData)=>{
                let {id} = reqData.payload;
                // console.log(reqData.payload)
                state.cart=state.cart.filter((obj)=> obj.id != id);
                // console.log("state.cart",state.cart)
                localStorage.setItem("CART",JSON.stringify(state.cart));
            },

            changeQty:(state,reqData)=>{
                let {id,finalQty}=reqData.payload;
                // state.cart = state.cart.filter((obj)=>{
                //     if(obj.id==id){
                //         obj['qty']=finalQty;
                //     }

                //     return obj;
                // })

                state.cart.map((data,index)=>{
                     if(data.id==id){
                        data['qty']=finalQty;
                    }
                })

                state.cart = [...state.cart]
               
                // console.log("state.cart",state.cart)
                localStorage.setItem("CART",JSON.stringify(state.cart));

            }
        }

    }
)

// following are the actions . Actions are functions defined under reducers
export const {addToCart,deleteCart,changeQty} = cartSlice.actions;
export default cartSlice.reducer;