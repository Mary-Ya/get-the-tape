import React from 'react';

function CheckButton(props: {onChange: any, buttonName: string, isSelected: any}) {
  
  return (
    <div className="d-inline-block">
      <input type="checkbox" className="btn-check" id="btn-check-2-outlined" onChange={() => {
        console.log(props)
        props.onChange(props.buttonName);
      }}
            checked={props.isSelected} autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="btn-check-2-outlined">{props.buttonName}</label><br/>
    </div>
  );
}


export default CheckButton;