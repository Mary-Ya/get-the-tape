import React, { useState } from 'react';
import { divideArray, getRandomNumber } from '../../common/utils';
import { IArtist, ITrack } from '../../types/track';
import { useCashableState } from '../hooks';

const Slider = require('rc-slider');
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

interface IRangeProps {
    defaultValue: number[],
    min: number,
    max: number,
    step: number,
    allowCross: boolean,
    pushable: boolean
}

interface IToggleAndRangeProps {
    label: string,
    name: string,
    defaultChecked: boolean,
    rangeProps: IRangeProps,
    intervalFormat?: (data: (number | null)[]) => (number | null)[],
    onUpdate: (e: any) => void,
}

function ToggleAndRange(props: IToggleAndRangeProps) {
    const [rowRange, setRowRange] = useCashableState(props.rangeProps.defaultValue || [0, 100], props.name);
    const [checked, setChecked] = useCashableState(props.defaultChecked, props.name);
    const [name] = useState(props.name);
    const intervalFormat = props.intervalFormat ? props.intervalFormat : (e: any)=> (e);
    const key = Math.random();

    const formatRange = (data: Array<number | null>) => {
        const convertedData = intervalFormat(data);
        return {
            [`min_${name}`]: convertedData[0],
            [`max_${name}`]: convertedData[1],
        };
    };

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setChecked(isChecked)
        
        let newValue;
        if (isChecked) {
            newValue = formatRange(rowRange);
        } else {
            newValue = formatRange([null, null])
        }

        props.onUpdate(newValue);
    }

    const onRangeChange = (data: number[]) => {
        setRowRange(data)
        props.onUpdate(formatRange(data));
    }

    return <div className="row" key={`${props.name}-checkbox-and-range`}>
        <div className="text-start pt-3 col-12">
            {props.label}: {`${rowRange[0]} - ${rowRange[1]}`}
        </div>
        <div className="col-1">
            <input
                name={`${name}-check`}
                className="form-check-input ms-0"
                key={`${name}-${key}`}
                type="checkbox"
                onChange={onCheckboxChange}
                checked={checked}
            />
        </div>
        <div className={"col-11"}>
            <Range
                onChange={onRangeChange}
                disabled={!checked}
                {...props.rangeProps}
            />
        </div>
    </div>
}


export default ToggleAndRange;
