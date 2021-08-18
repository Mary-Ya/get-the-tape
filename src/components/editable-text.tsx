import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import Icons from "../assets/icons";

interface IEditableTextProps {
    value: string,
    placeholder?: string,
    className?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function EditableText(props: IEditableTextProps) {
    const [hideInput, setHideInput] = useState(true);

    const toggleControls = () => {
        setHideInput(!hideInput);
    };

    return <div>
        <a href="#" className={`text-decoration-none ${hideInput ? '' : 'd-none'}`}>
            {props.value}
            <span onClick={toggleControls}>
                <Icons.Pencil />
            </span>
        </a>
        <div className={`input-group mb-3  ${hideInput ? 'd-none' : ''}`}>
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
            ><Icons.Save />
            </button>
        </div>
    </div>
}

export default EditableText;