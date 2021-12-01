import React, { useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import { OptionTypeBase } from "react-select";
import api from "@api/api";
import { clearSelectedValue, haveACopyInArray } from "@common/utils";
import { getOptionalLabel } from "./services";

interface SeedSelectorProps {
  seeds: Array<OptionTypeBase>,
  selectedSeedsIds: Array<string>,
  canAddMoreSeeds: boolean,
  country: string,
  searchType: string,
  setSeeds(data: Array<OptionTypeBase>): void
}

// TODO: block selected item from rendering
function SeedSelector(props: SeedSelectorProps) {
  const [offset, setOffset] = useState(0);
  const seedSelectorRef = useRef();

  const getSeeds = (inputValue: string) => {
    return api
      .search(
        props.country,
        encodeURI(inputValue),
        10,
        offset,
        props.searchType
      )
      .then((data) => (data[props.searchType + 's'].items));
  };

  const onChange = (
    selectedOption: OptionTypeBase | null,
    props: SeedSelectorProps
  ) => {
      const isADuplicate = haveACopyInArray(selectedOption, props.seeds);
      if (selectedOption && props.canAddMoreSeeds && !isADuplicate) {
          let newValue: Array<OptionTypeBase> = ([] as Array<OptionTypeBase>).concat(...props.seeds);
          newValue.push(selectedOption);
          props.setSeeds(newValue);
          clearSelectedValue(seedSelectorRef);
      }
  };
    
  return (
    <AsyncSelect
      className="async-select"
      isDisabled={!props.canAddMoreSeeds}
      innerRef={seedSelectorRef}
      getOptionLabel={(options: OptionTypeBase) => (getOptionalLabel(options, props.searchType))}
      blurInputOnSelect={true}
      loadOptions={getSeeds}
      onChange={(options) => (onChange(options, props))}
      cacheOptions
    />
  );
}


export default SeedSelector;