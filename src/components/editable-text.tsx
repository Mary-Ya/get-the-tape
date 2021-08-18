import React, { ChangeEvent } from 'react';
import { useState } from 'react';

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
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                </svg>
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
        ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
        </svg>
            </button>
        </div>
    </div>
}


export default EditableText;