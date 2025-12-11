// import { createSlice } from '@reduxjs/toolkit';
// const userSlice=createSlice({
//     name:'user',
//     initialState:null,
    
//    reducers:{
//     addUser:(state,action)=>{ 
//         return action.payload
        
//     },
//     removeUser:(state,action)=>{
//         return null
       
//     },
     
//    }
// })
// export const { addUser, removeUser } = userSlice.actions;
// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: true,
  },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    removeUser: (state) => {
      state.data = null;
      state.loading = false;
    },
    finishLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { addUser, removeUser, finishLoading } = userSlice.actions;
export default userSlice.reducer;
