import React from 'react';
import './Preloader.css';

function Preloader() {
  return (
    <section className="preloader">
      <div className='cssload-loader'>
      <div className='cssload-inner cssload-one'></div>
      <div className='cssload-inner cssload-two'></div>
      <div className='cssload-inner cssload-three'></div>
      </div>
    </section>
  );
}

export default Preloader;
