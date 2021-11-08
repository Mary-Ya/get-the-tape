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
    <rect className="cls-1" x="0.63" y="0.63" width={props.width || "38"} height={props.height || "38"} rx="19" />
    <path className="cls-2" d="M20.25,3.9A15.39,15.39,0,1,0,35.12,18.78,15.37,15.37,0,0,0,20.25,3.9Zm7,22.17a1.34,1.34,0,0,1-1.17.69,1.4,1.4,0,0,1-.65-.17A16,16,0,0,0,12.69,25.3a1.34,1.34,0,0,1-.81-2.55,18.78,18.78,0,0,1,14.86,1.5A1.34,1.34,0,0,1,27.25,26.07Zm1.84-4.67a1.33,1.33,0,0,1-1.18.72,1.38,1.38,0,0,1-.62-.15,21.05,21.05,0,0,0-15.53-1.56A1.34,1.34,0,0,1,11,17.84a23.5,23.5,0,0,1,9-.8,23.9,23.9,0,0,1,8.56,2.55A1.35,1.35,0,0,1,29.09,21.4Zm.67-3.89a1.46,1.46,0,0,1-.6-.14,26,26,0,0,0-18.28-1.85,1.34,1.34,0,0,1-.68-2.59,28.82,28.82,0,0,1,20.16,2,1.34,1.34,0,0,1-.6,2.54Z" /></svg>
)

const Pencil = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" {...props}
    className="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
  </svg>
)

const Save = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
    className="bi bi-check2-circle" viewBox="0 0 16 16">
      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
  </svg>
)

const Plus = (props: any) => (<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  className="bi bi-plus-square"
  viewBox="0 0 16 16"
>
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
</svg>)

const Inside = (props: any) => (<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  fill="currentColor"
  className="bi bi-save"
  viewBox="0 0 16 16"
>
  <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"></path>
</svg>)

const Star = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg"
  width={props.width || '47'}
  height={props.height || '47'}
  fill="currentColor" className="bi bi-star" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>)

const List = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg"
  width={props.width || '47'}
  height={props.height || '47'}
  fill="currentColor" className={`bi bi-list ${props.className}`} viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
</svg>);

const Remove = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg"
  fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16"
  width={props.width || '47'}
  height={props.height || '47'}>
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>);

const Shuffle = (props: any) => (<svg xmlns="http://www.w3.org/2000/svg"
  className="bi bi-shuffle" viewBox="0 0 16 16"
  fill="currentColor" 
  width={props.width || '47'}
  height={props.height || '47'}>
  <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"/>
  <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z"/>
</svg>);

export default { Pause, Play, Logo, Pencil, Save, Plus, Inside, Star, List, Remove, Shuffle };
