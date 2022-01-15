import React from "react";
import ToggleAndRange from "@components/home/toggle-and-range";
import { divideArray } from "./optional-settings/services";

function OptionalSettings(props: {setOptionalSettings: (data: number[]) => void}) {
  return (
    <>
      <ToggleAndRange
        label="Tempo"
        name="tempo"
        defaultChecked={false}
        rangeProps={{
          min: 63,
          max: 205,
          step: 1,
          defaultValue: [63, 205],
          pushable: false,
          allowCross: false,
        }}
        onUpdate={(data) => {
          props.setOptionalSettings(data);
        }}
      />
      <ToggleAndRange
        label="Instrumentalness"
        name="instrumentalness"
        defaultChecked={false}
        rangeProps={{
          min: 0,
          max: 200,
          step: 1,
          defaultValue: [35, 171],
          pushable: false,
          allowCross: false,
        }}
        onUpdate={(data) => {
          props.setOptionalSettings(data);
        }}
        intervalFormat={divideArray}
      />
      <ToggleAndRange
        label="Popularity"
        name="popularity"
        defaultChecked={false}
        rangeProps={{
          min: 0,
          max: 100,
          step: 1,
          defaultValue: [40, 86],
          pushable: false,
          allowCross: false,
        }}
        onUpdate={(data) => {
          props.setOptionalSettings(data);
        }}
      />
    </>
  );
}

export default OptionalSettings;
