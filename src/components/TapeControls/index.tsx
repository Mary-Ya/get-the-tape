import React from "react";
import EditableText from "../editable-text";

interface TapeControlsProps {
  id: string;
  onNameChange: (x: any) => void;
}

const TapeControls = (props: TapeControlsProps) => {


  return <>
    <EditableText
      textClass={'ms-3 py-2'}
      onChange={props.onNameChange}
      placeholder={'Write the Tape name here'} value={""}  />
    <div>{props.id}</div>
  </>
};

export default TapeControls;