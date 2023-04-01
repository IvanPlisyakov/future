import React from 'react';
import './InfoTooltip.css';

import Reset from '../../images/infoTooltip__reset.svg';

function InfoTooltip(props) {
  return (
    <section className={`infoTooltip ${props.isOpen ? 'infoTooltip_opened' : ''} ${props.isCare ? 'infoTooltip_care' : ''}`}>
      <p className="infoTooltip__text"><span className="infoTooltip__sign">&#60;&#47;&#62; </span>{props.text}</p>
      <img className="infoTooltip__reset" src={Reset} alt="Closing icon" onClick={props.closeInfoTooltip} />
    </section>
  );
}

export default InfoTooltip;
