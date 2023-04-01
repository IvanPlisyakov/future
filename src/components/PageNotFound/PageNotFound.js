import React from 'react';
import './PageNotFound.css';

import { useNavigate } from 'react-router-dom';

function PageNotFound(props) {
  const navigate = useNavigate(); 

  return (
    <section className="page-not-found">
      <div className="page-not-found__error_overlay">
        <h2 className="page-not-found__status">404</h2>
        <p className="page-not-found__text">Page not found</p>
      </div>
      <p className="page-not-found__back" onClick={() => navigate(-1)}>Back</p>
    </section>
  );
}

export default PageNotFound;
