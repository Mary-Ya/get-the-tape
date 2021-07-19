import React from "react";

const Pause = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
    className="bi bi-pause-fill" viewBox="0 0 16 16" {...props}>
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
  </svg>
);

const Play = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
    className="bi bi-play-fill" viewBox="0 0 16 16" {...props}>
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>
)

const Logo = (props: any) => (
  <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" {...props}
    viewBox="0 0 39.25 39.25"><defs><style></style></defs>
    <rect className="cls-1" x="0.63" y="0.63" width="38" height="38" rx="19" />
    <path className="cls-2" d="M20.25,3.9A15.39,15.39,0,1,0,35.12,18.78,15.37,15.37,0,0,0,20.25,3.9Zm7,22.17a1.34,1.34,0,0,1-1.17.69,1.4,1.4,0,0,1-.65-.17A16,16,0,0,0,12.69,25.3a1.34,1.34,0,0,1-.81-2.55,18.78,18.78,0,0,1,14.86,1.5A1.34,1.34,0,0,1,27.25,26.07Zm1.84-4.67a1.33,1.33,0,0,1-1.18.72,1.38,1.38,0,0,1-.62-.15,21.05,21.05,0,0,0-15.53-1.56A1.34,1.34,0,0,1,11,17.84a23.5,23.5,0,0,1,9-.8,23.9,23.9,0,0,1,8.56,2.55A1.35,1.35,0,0,1,29.09,21.4Zm.67-3.89a1.46,1.46,0,0,1-.6-.14,26,26,0,0,0-18.28-1.85,1.34,1.34,0,0,1-.68-2.59,28.82,28.82,0,0,1,20.16,2,1.34,1.34,0,0,1-.6,2.54Z" /></svg>
)

export default { Pause, Play, Logo };
