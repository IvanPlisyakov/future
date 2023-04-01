import { configureStore } from '@reduxjs/toolkit';
import { requestsReducer } from './requestReducer';
import { booksReducer } from './bookReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const reducer = {
  requests: requestsReducer,
  books: booksReducer,
};

export const store = configureStore({ reducer: reducer, composeWithDevTools});