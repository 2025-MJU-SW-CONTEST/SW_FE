import React from 'react';

const Avatar = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_709_1523)">
        <rect x="8" y="8" width="54" height="54" rx="27" fill="#A9B8FF"/>
      </g>
      <path
        d="M35 21.25C31.5482 21.25 28.75 24.0482 28.75 27.5C28.75 30.9518 31.5482 33.75 35 33.75C38.4518 33.75 41.25 30.9518 41.25 27.5C41.25 24.0482 38.4518 21.25 35 21.25Z"
        fill="#E7ECFF"/>
      <path
        d="M28.3333 37.083C24.8815 37.083 22.0833 39.8812 22.0833 43.333V45.3135C22.0833 46.5688 22.9931 47.6392 24.2321 47.8415C31.3635 49.0058 38.6365 49.0058 45.7678 47.8415C47.0068 47.6392 47.9166 46.5688 47.9166 45.3135V43.333C47.9166 39.8812 45.1185 37.083 41.6666 37.083H41.0985C40.791 37.083 40.4855 37.1317 40.1931 37.227L38.7506 37.6982C36.3135 38.4938 33.6865 38.4938 31.2493 37.6982L29.8068 37.227C29.5145 37.1317 29.2089 37.083 28.9014 37.083H28.3333Z"
        fill="#E7ECFF"/>
      <defs>
        <filter id="filter0_d_709_1523" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                         result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="4"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.731615 0 0 0 0 0.731615 0 0 0 0 0.731615 0 0 0 1 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_709_1523"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_709_1523" result="shape"/>
        </filter>
      </defs>
    </svg>

  );
};

export default Avatar;