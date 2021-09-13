import React from 'react';
import { IArtist, ITrack } from '../../types/track';

interface ISelectedSeedProps {
    id: string,
    labelText: string,
    item: ITrack | IArtist | any,
    enabled: boolean,
    onClick: (e: any) => void,
}

function SelectedSeed(props: ISelectedSeedProps) {
    const name = props.item.name || props.id;
    
    return <div className={`d-inline-block m-1`} key={props.id}>
        <input
            type="checkbox"
            className="btn-check"
            id={`btn-check-${name}`}
            onChange={() => {
                props.enabled ? props.onClick(props.item) : null;
            }}
            checked={true}
            autoComplete="off"
        />
        <label
            className="btn btn-outline-secondary rounded-pill text-capitalize"
            htmlFor={`btn-check-${name}`}
        >
            {props.labelText}
        </label>
    </div>
}


export default SelectedSeed;