import React from 'react';
import './Books.css';

import { useSelector } from 'react-redux';

import BooksCard from '../BooksCard/BooksCard';
import Preloader from '../Preloader/Preloader';

function Books(props) {
  const books = useSelector(state => state.books.books);

  const [title, setTitle] = React.useState('Please, make a request ⟶');
  const [loadButtonDisabled, setLoadButtonDisabled] = React.useState(true);

  function returnTitle() {
    if(books) {
      if(books.items) {
        setTitle(`Found ${books.totalItems} result`);
        setLoadButtonDisabled(false);
        return;
      }
  
      if(books.totalItems === 0) {
        setTitle('Sorry, nothing was found :(');
        setLoadButtonDisabled(true);
        return;
      }  
    }

    setTitle('Please, make a request ⟶');
    setLoadButtonDisabled(true);
    return;
  }

  React.useEffect(() => {
    returnTitle();
  }, [books]);

  function handleLoadButton() {
    props.putBooks();
  }

  return (
    <section className="books">
      <div className="books__column">
        <h1 className="books__count">{title}</h1>
        <div className="books__cards">
          {(books.items && !props.preloaderBooksIsActive) &&
            books.items.map((card, i) => (
              <BooksCard
                card={card}
                key={i}
              />
          ))}
        </div>
        <button className={`books__load-button hover ${(loadButtonDisabled || props.preloaderBooksIsActive) && 'books__load-button_inactive'}`} onClick={handleLoadButton}>Load more</button>
      </div>
      {props.preloaderBooksIsActive && <Preloader /> }
    </section>
  );
}

export default Books;

//{props.readyData.items ? `Found ${props.readyData.totalItems} result` : 'Please, make a request ⟶'}

/*
      <div className="app__block hover">

      </div>
*/
