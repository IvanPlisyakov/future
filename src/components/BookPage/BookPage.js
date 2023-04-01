import React from 'react';
import './BookPage.css';

import { useLocation } from "react-router-dom";
import DOMPurify from 'dompurify';

import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';

function BookPage(props) {
  const { pathname } = useLocation();
  
  const [checkInBook, setCheckInBook] = React.useState(false);
  const [bookData, setBookData] = React.useState({});

  React.useEffect(() => {
    props.checkBook(pathname.slice(6))
      .then((data) => {
        if(data) {
          setCheckInBook(true);
          
          if(data.volumeInfo.description) {
            data.volumeInfo.description = DOMPurify.sanitize(data.volumeInfo.description, {USE_PROFILES: {html: true}});
          }
         
          setBookData(data)
        } else {
          setCheckInBook(false);
          setBookData({})
        }
      });



  }, [pathname]);

  return (
    <>
    {props.preloaderBookPageIsActive ?
      <Preloader />
      :
      (checkInBook ? 
        <div className="book-page">
          <div className="book-page__column">
            <div className="book-page__border">
              <div className="book-page__info">
                <p className="book-page__text book-page__text_category">{bookData.volumeInfo.categories && bookData.volumeInfo.categories.join(', ')}</p>
                <p className="book-page__text book-page__text_title">{bookData.volumeInfo.title && bookData.volumeInfo.title}</p>
                <p className="book-page__text book-page__text_author">{bookData.volumeInfo.authors && bookData.volumeInfo.authors.join(', ')}</p>
              </div>
              <img className="book-page__image" src={bookData.volumeInfo.imageLinks && bookData.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=3')} alt={`Cover ${bookData.volumeInfo.title}`} />
            </div>
            {bookData.volumeInfo.description &&
              <p className="book-page__description" dangerouslySetInnerHTML={{__html: bookData.volumeInfo.description}}></p>
            }
          </div>
        </div>
        : 
        <PageNotFound />
      )
    }
    </>
  )
}

export default BookPage;
