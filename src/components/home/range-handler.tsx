import SliderTooltip from 'rc-slider/lib/common/SliderTooltip';
import Handle from 'rc-slider/lib/Handle';
import React from 'react';

interface IHandler {
    value: number,
    index: string,
    units?: string
}
function CustomHandler(props: IHandler) {
    const { value, index, units, ...restProps } = props;
    return (
      <SliderTooltip
        prefixCls="rc-slider-tooltip"
        overlay={`${value} ${units || 'BPM'}`}
        visible={true}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </SliderTooltip>
    );
}


export default CustomHandler;