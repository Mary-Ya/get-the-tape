import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import Icons from "../assets/icons";

interface IEditableTextProps {
    value: string,
    placeholder?: string,
    textClass?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function EditableText(props: IEditableTextProps) {
    const [hideInput, setHideInput] = useState(true);

    const toggleControls = () => {
        setHideInput(!hideInput);
    };

    const renderText = () => (
        <a href="#" className={`text-decoration-none ${props.textClass}`}>
            {props.value}
            <span onClick={toggleControls} className='ms-2'>
                <Icons.Pencil />
            </span>
        </a>
    );

    const renderInput = () => (
        <><input
            type="text"
            className={`form-control`}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            aria-label={props.placeholder}
            aria-describedby="button-addon2" /><button
                className={`btn btn-outline-secondary`}
                type="button"
                id="button-addon2"
                onClick={toggleControls}
            ><Icons.Save />
            </button></>
    );

    return hideInput ? renderText() : renderInput();
}

export default EditableText;