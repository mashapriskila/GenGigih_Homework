import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Access_Token/access-slice.';

export default configureStore({
  reducer: {
    auth: authReducer,
  }
});
