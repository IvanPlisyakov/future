import React from 'react';
import './Search.css';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createRequestAction } from '../../store/requestReducer';

import searchButtonImageOpen from '../../images/search__button-image_open.svg';
import searchButtonImageClose from '../../images/search__button-image_close.svg';

function Search(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate(); 

  const backgroundRef = React.useRef();
  const inputRef = React.useRef();

  const [screenDiagonal, setScreenDiagonal] = React.useState(Math.sqrt(document.documentElement.clientWidth**2 + document.documentElement.clientHeight**2));
  function handleWindowResize() {
    setScreenDiagonal(Math.sqrt(document.documentElement.clientWidth**2 + document.documentElement.clientHeight**2));
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    }
  }, []);
  
  React.useEffect(() => {
    if(backgroundIsOpen) {
      backgroundRef.current.style.setProperty('--radius', `${screenDiagonal}px`);
    }
  });

  const [backgroundIsOpen, setBackgroundIsOpen] = React.useState(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  function toggleSearch() {
    setButtonDisabled(true);

    setBackgroundIsOpen(!backgroundIsOpen);

    if(backgroundIsOpen) {
      backgroundRef.current.style.setProperty('--radius', '26px');
    } else {
      backgroundRef.current.style.setProperty('--radius', `${screenDiagonal}px`);
      inputRef.current.focus();
    }

    setTimeout(() => setButtonDisabled(false), 2000);
  }

  function downHandler(e) {
    if(e.key === "Escape") {
      if(backgroundIsOpen) {
        toggleSearch();
      }
    }
  }

  const [string, setString] = React.useState('');

  function handleChangeString(e) {
    setString(e.target.value);
  }

  const [sorting, setSorting] = React.useState('relevance');

  function handleChangeSorting(e) {
    setSorting(e.target.value);
  }

  const [category, setCategory] = React.useState('');

  function handleChangeCategory(e) {
    setCategory(e.target.value === 'all' ? '' : e.target.value);
  }

  function handleSubmitButton() {
    toggleSearch();
    handleSubmit();
  }

  function handleSubmit() {
    props.getBooks(string, category, sorting, 0);
    dispatch(createRequestAction({
      string: string,
      category: category,
      sorting: sorting,
    }));
    navigate(`/`);
    //clearInputs();
  }

  /*function clearInputs() {
    setString('');
    setCategory('');
    setSorting('relevance');
  }*/

  function downInput(e) {
    if(e.key === "Enter") {
      if(backgroundIsOpen) {
        toggleSearch();
        handleSubmit();
      }
    }
  }

  return (
    <div className="search">
      <button className="search__button hover" onClick={toggleSearch} disabled={buttonDisabled}>
        <img className={`search__button-image ${!backgroundIsOpen && 'search__button-image_active'}`} src={searchButtonImageOpen} alt="" />
        <img className={`search__button-image ${backgroundIsOpen && 'search__button-image_active'}`} src={searchButtonImageClose} alt="" />
      </button>
      <div className="search__background" ref={backgroundRef} onKeyDown={downHandler} tabIndex="0">
        <div className="search__input-container">
          <input className="search__input" ref={inputRef} value={string} onChange={handleChangeString} onKeyDown={downInput} placeholder='search' autoFocus/>
          <button className="search__input-button hover" onClick={handleSubmitButton} disabled={buttonDisabled}>
            <img className="search__input-button-image" src={searchButtonImageOpen} alt="" />
          </button>
        </div>
        <div className="search__settings-container">
          <div className="search__settings">
            <label className="search__settings-label">category</label>
            <select className="search__settings-select hover" value={category} onChange={handleChangeCategory} id="category">
              <option className="search__settings-option">all</option>
              <option className="search__settings-option">art</option>
              <option className="search__settings-option">biography</option>
              <option className="search__settings-option">computers</option>
              <option className="search__settings-option">history</option>
              <option className="search__settings-option">medical</option>
              <option className="search__settings-option">poetry</option>
            </select>
          </div>
          <div className="search__settings">
            <label className="search__settings-label">sorting</label>
            <select className="search__settings-select hover" value={sorting} onChange={handleChangeSorting} id="sorting">
              <option className="search__settings-option">relevance</option>
              <option className="search__settings-option">newest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
/*
${backgroundState == 2 ? 'search__background_start' : (backgroundState == 1 ? 'search__background_open' : 'search__background_close')}
*/