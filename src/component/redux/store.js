import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './loginForm';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// Import Redux Persist

// Import the storage adapter of your choice

// Define the root reducer
const rootReducer = combineReducers({
  auth: authSlice,
});

// Create the persist configuration
const persistConfig = {
  key: 'root', // key for the root of the storage
  storage, // storage medium, defaults to local storage
};


// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false
    });
  }
});

// Persist the store
persistStore(store);

// Export the store
export { store };
