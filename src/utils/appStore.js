import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../utils/userSlice'; 
import feedReducer from '../utils/feedSlice';
import connectionReducer from '../utils/connectionSlice';
import requestsReducer from './requestsSlice'
const appStore=configureStore({
reducer:{
    user:userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestsReducer,
}
})
export default appStore;