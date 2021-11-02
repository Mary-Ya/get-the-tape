import React from "react";

interface ICHeckButtonProps {
  onChange: (buttonName: string) => void;
  buttonName: string;
  className: string;
  isSelected: boolean;
  disabled: boolean;
}

function CheckButton({onChange, buttonName, isSelected, className, disabled}: ICHeckButtonProps) {
  return (
    <div className={`d-inline-block m-1 ${className}`}>
      <input
        disabled={disabled}
        type="checkbox"
        className="btn-check"
        id={`btn-check-${buttonName}`}
        onChange={() => {
          onChange(buttonName);
        }}
        checked={isSelected}
        autoComplete="off"
      />
      <label
        className="btn btn-outline-secondary rounded-pill text-capitalize"
        htmlFor={`btn-check-${buttonName}`}
      >
        {buttonName}
      </label>
      <br />
    </div>
  );
}

export default CheckButton;
