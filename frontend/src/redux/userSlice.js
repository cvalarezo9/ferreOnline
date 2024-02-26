 import { createSlice } from "@reduxjs/toolkit";

 const initialState ={
    apellido : "",
    email : "",
    imagen: "",
    primerNombre: "",
    _id : "",   
 }

 export const userSlice= createSlice({

    name: "user",
    initialState,
    reducers:{
        loginRedux:(state,action)=>{
            console.log(action.payload.data)
            //state.user = action.payload.data

            state._id= action.payload.data._id;
            state.primerNombre= action.payload.data.primerNombre;
            state.apellido= action.payload.data.apellido;
            state.email= action.payload.data.email;
            state.imagen= action.payload.data.imagen;
        },
        logoutRedux:(state,action)=>{
            
            state._id= "";
            state.primerNombre= "";
            state.apellido= "";
            state.email= "";
            state.imagen= "";
        },
    },
 })

 export const {loginRedux, logoutRedux}= userSlice.actions

 export default userSlice.reducer