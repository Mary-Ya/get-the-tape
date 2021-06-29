import React from 'react';

function CheckButton(props: { onChange: any, buttonName: string, isSelected: any }) {

  return (
    <div className="d-inline-block">
      <input type="checkbox" className="btn-check" id={`btn-check-${props.buttonName}`} onChange={() => {
        props.onChange(props.buttonName);
      }}
        checked={props.isSelected} autoComplete="off" />
      <label className="btn btn-outline-secondary" htmlFor={`btn-check-${props.buttonName}`}>
        {props.buttonName}</label><br />
    </div>
  );
}


export default CheckButton;