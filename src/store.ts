import { configureStore } from '@reduxjs/toolkit';
import contractReducer from './features/contract/contractSlice';

const store = configureStore({
  reducer: {
    contract: contractReducer,
  },
}); 

export type RootState = ReturnType<typeof store.getState>

export default store;