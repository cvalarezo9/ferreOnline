import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast';



const initialState={
    productList:[],
    cartItem:[]
}

export const productSlice = createSlice({

    name: "product",
    initialState,
    reducers: {
        setDataProduct : (state,action)=>{
               
                state.productList= [...action.payload]
        },

        addArticulos: (state,action) =>{
            
            const check = state.cartItem.some(el=>el._id === action.payload._id)
            
            if(check){
                toast("Este producto ya ha sido añadido")
            }else{
                toast("Producto ha sido añadido")
                const total =action.payload.precio
                state.cartItem=[...state.cartItem,{...action.payload,qty :1,total:total}] 
            }
            
        },

        deleteArticulos: (state,action) =>{
            
            toast("Un elemento eliminado")
            const index =state.cartItem.findIndex((el)=>el._id === action.payload)
            state.cartItem.splice(index,1)
            console.log(index)
        },

        incrementarArticulos:(state,action)=>{
            const index =state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty =state.cartItem[index].qty

            const qtyIn= ++qty
            state.cartItem[index].qty = qtyIn
            const precio =state.cartItem[index].precio
            const total=precio*qtyIn
            state.cartItem[index].total=total
            
        },

        decrementarArticulos:(state,action)=>{
            const index =state.cartItem.findIndex((el)=>el._id === action.payload)
            let qty =state.cartItem[index].qty
            if(qty>1){
                const qtyDec= --qty
                state.cartItem[index].qty = qtyDec

                const precio =state.cartItem[index].precio
                const total=precio*qtyDec
                state.cartItem[index].total=total
            }
            
        }


    }

})

export const {setDataProduct,addArticulos,deleteArticulos,incrementarArticulos,decrementarArticulos}=productSlice.actions

export default productSlice.reducer