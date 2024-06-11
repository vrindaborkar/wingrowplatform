import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducers';


const logger = (store) => (next) => (action) => {
  console.log('action', action);
  let result = next(action);
  console.log('new state', store.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});
export default store;
