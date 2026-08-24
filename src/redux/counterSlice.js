import { createSlice } from "@reduxjs/toolkit";


export let counterSlice = createSlice(
    {
        name:"counter",
        initialState:{
            count:0   // state variable
        },
        reducers:{
            increment:(state , reqData )=>{   // 1st param is state , 2nd param = object whichcontent request data   reqData = {payload:any}
             state.count +=1  ;
            },

            decreament:(state,reqData)=>{
                state.count-=1 ;
            }
        }

    }
)

// following are the actions . Actions are functions defined under reducers
export const {increment,decreament} = counterSlice.actions;
export default counterSlice.reducer;