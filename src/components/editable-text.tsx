import React, { ChangeEvent } from "react";
import { useState } from "react";
import Icons from "../assets/icons";

interface IEditableTextProps {
  value: string;
  placeholder?: string;
  textClass?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Component switches between showing plane text and text input
 * which allows to edit it
 * 
 * TODO: add save on hit Enter
 */

function EditableText(props: IEditableTextProps) {
  const [hideInput, setHideInput] = useState(true);

  const toggleControls = () => {
    setHideInput(!hideInput);
  };

  const renderText = () => (
    <button className={`btn btn-link text-decoration-none px-0`}>
      <div className={`d-inline ${props.textClass}`}>
        <span onClick={toggleControls} className="me-2">
        <Icons.Pencil />
      </span></div>
      <div className={`d-inline ${props.textClass}`}>{props.value}</div>
    </button>
  );

  const renderInput = () => (
    <>
      <input
        type="text"
        className={`form-control`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        aria-label={props.placeholder}
        aria-describedby="button-addon2"
      />
      <button
        className={`btn btn-outline-secondary`}
        type="button"
        id="button-addon2"
        onClick={toggleControls}
      >
        <Icons.Save />
      </button>
    </>
  );

  return hideInput ? renderText() : renderInput();
}

export default React.memo(EditableText);
