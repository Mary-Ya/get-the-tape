import React from 'react';

function CheckButton(props: { onChange: any, buttonName: string, isSelected: any, className: string, disabled: boolean }) {
  return (
    <div className={`d-inline-block ${props.className}`}>
      <input disabled={props.disabled} type="checkbox" className="btn-check" id={`btn-check-${props.buttonName}`} onChange={() => {
        props.onChange(props.buttonName);
      }}
        checked={props.isSelected} autoComplete="off" />
      <label className="btn btn-outline-secondary rounded-pill text-capitalize" htmlFor={`btn-check-${props.buttonName}`}>
        {props.buttonName}</label><br />
    </div>
  );
}

export default CheckButton;