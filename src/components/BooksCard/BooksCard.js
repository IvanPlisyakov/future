import React from 'react';
import './BooksCard.css';

import { useNavigate } from 'react-router-dom';

function BooksCard(props) {
  const navigate = useNavigate(); 

  function clickCard() {
    navigate(`book/${props.card.id}`);
  }

  return (
    <div className="books-card" onClick={clickCard}>
      <img className="books-card__image" src={props.card.volumeInfo.imageLinks && props.card.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=1')} alt="" />
      <p className="books-card__text books-card__text_category">{props.card.volumeInfo.categories && props.card.volumeInfo.categories[0]}</p>
      <p className="books-card__text books-card__text_title">{props.card.volumeInfo.title && props.card.volumeInfo.title}</p>
      <p className="books-card__text books-card__text_author">{props.card.volumeInfo.authors && props.card.volumeInfo.authors.join(', ')}</p>
    </div>
  );
}

export default BooksCard;