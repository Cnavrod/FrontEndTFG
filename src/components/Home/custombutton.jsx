import React from 'react';
import '../../styles/home.css';

export default function CustomButton({ text, onClick, styleClass }) {
  return (
    <button className={styleClass} onClick={onClick}>
      {text}
    </button>
  );
}