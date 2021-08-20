import React from 'react';
import { IArtist, ITrack } from '../../types/track';

interface ISelectedSeedProps {
    id: string,
    labelText: string,
    data: ITrack | IArtist,
    onClick: (e: any) => void,
}

function SelectedSeed(props: ISelectedSeedProps) {
    return <div className={`d-inline-block m-1`} key={props.id}>
        <input
            disabled={false}
            type="checkbox"
            className="btn-check"
            id={`btn-check-${props.data.name}`}
            onChange={() => {
                props.onClick(props.data);
            }}
            checked={true}
            autoComplete="off"
        />
        <label
            className="btn btn-outline-secondary rounded-pill text-capitalize"
            htmlFor={`btn-check-${props.data.name}`}
        >
            {props.labelText}
        </label>
        <br />
    </div>
}


export default SelectedSeed;