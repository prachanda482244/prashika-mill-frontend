import { createSlice } from "@reduxjs/toolkit";
const initialState={
      modalValue:false
}
const modalSlice = createSlice({
      name:"modalSlice",
      initialState,
      reducers:{
            setModalValue:(state)=>{
                  state.modalValue=true
            },
            setModalValueFalse:(state)=>{
                  state.modalValue=false
            }
      }
})
export const {setModalValue,setModalValueFalse} = modalSlice.actions
export default modalSlice.reducer