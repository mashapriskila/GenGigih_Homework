import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Access_Token/access-slice.js';

export default configureStore({
  reducer: {
    auth: authReducer,
  }
});
