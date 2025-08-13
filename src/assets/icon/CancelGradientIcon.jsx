import React from 'react';

const CancelGradientIcon = ({onClick}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="url(#paint0_linear_425_2047)"/>
      <defs>
        <linearGradient id="paint0_linear_425_2047" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5A77FF"/>
          <stop offset="1" stop-color="#BFA1FA"/>
        </linearGradient>
      </defs>
    </svg>

  );
};

export default CancelGradientIcon;