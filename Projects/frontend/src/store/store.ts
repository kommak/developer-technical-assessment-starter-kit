import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import popularPropertiesReducer from './slices/popularPropertiesSlice';
import featuredPropertiesSlice from './slices/featuredPropertiesSlice';
import propertyReducer from './slices/propertySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    popularProperties: popularPropertiesReducer,
    featuredPropertiesSlice: featuredPropertiesSlice,
    property: propertyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;