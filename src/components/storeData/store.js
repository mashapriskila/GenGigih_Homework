import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../Access_Token/access-slice.';

export default configureStore({
  reducer: {
    auth: authSlice,
  }
});
