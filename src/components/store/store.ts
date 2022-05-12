import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook,useDispatch, useSelector } from 'react-redux';
import authReducer from '../slice/access-slice';
import tracksSlice from '../slice/track-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tracks: tracksSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
