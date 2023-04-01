import React from 'react';
import './App.css';

import {
  Routes, Route, 
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../Search/Search';
import Books from '../Books/Books';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import PageNotFound from '../PageNotFound/PageNotFound';
import BookPage from '../BookPage/BookPage';

import { BooksApi } from '../../utils/BooksApi';

import { addBooksAction, putBooksAction } from '../../store/bookReducer';
import { addIndexAction } from '../../store/requestReducer';



function App() {
  const dispatch = useDispatch();

  const [infoTooltip, setInfoTooltip] = React.useState({ isOpen: false, isCare: false, text: '' });

  function closeInfoTooltip() {
    setInfoTooltip({ isOpen: true, isCare: true, text: infoTooltip.text });
    setTimeout(setInfoTooltip, 0.9 * 1000, { isOpen: false, isCare: false, text: '' });
  }

  function openInfoTooltip(text) {
    setInfoTooltip({ isOpen: true, isCare: false, text });
    setTimeout(closeInfoTooltip, 10 * 1000);
  }

  const booksApi = new BooksApi({
    baseUrlGoogleBooks: 'https://www.googleapis.com/books/v1/volumes?',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    key: 'AIzaSyCQ36wFNDxjiQXaqHzOmKO0GzGTZ2bboHM',
  }, openInfoTooltip);

  function sendStandartCatch(err) {
    console.log(err);
  }

  const request = useSelector(state => state.requests.request);

  const [preloaderBooksIsActive, setPreloaderBooksIsActive] = React.useState(false);

  function getBooks(string, category, sorting) {
    setPreloaderBooksIsActive(true);

    return booksApi.getInitialBooks(string, category, sorting, 0, 30)
      .then((data) => {
        setPreloaderBooksIsActive(false);

        dispatch(addBooksAction(data));

        return data;
      })
      .catch((err) => sendStandartCatch(err));
  }

  function putBooks() {
    setPreloaderBooksIsActive(true);

    return booksApi.getInitialBooks(
      request.string,
      request.category,
      request.sorting,
      request.startIndex + 30,
      )
    .then((putData) => {
      setPreloaderBooksIsActive(false);

      dispatch(addIndexAction(30));

      dispatch(putBooksAction(putData));
      
      return putData;
    })
    .catch((err) => sendStandartCatch(err));
  }

  const [preloaderBookPageIsActive, setPreloaderBookPageIsActive] = React.useState(false);

  function checkBook(id) {
    setPreloaderBookPageIsActive(true);
    return booksApi.getBook(id)
      .then((data) => {
        setPreloaderBookPageIsActive(false);

        return data
      })
      .catch((err) => sendStandartCatch(err));
  }

  return (
    <div className="App">
      <Search 
        getBooks={getBooks}
      />
      <Routes>
        <Route path="/" 
          element={
            <Books 
              putBooks={putBooks}
              preloaderBooksIsActive={preloaderBooksIsActive}
            />
          }
        />
        <Route path="/book/*" 
          element={
            <BookPage 
              checkBook={checkBook} 
              preloaderBookPageIsActive={preloaderBookPageIsActive}
            />
          } 
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        isCare={infoTooltip.isCare}
        text={infoTooltip.text}
        closeInfoTooltip={closeInfoTooltip}
      />
    </div>
  );
}

export default App;

