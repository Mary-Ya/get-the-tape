import React, { useRef } from "react";
import { IArtist, ITrack } from "../../types/track";
import AsyncSelect from "react-select/async";
import api from "../../common/api";
import { useState } from "react";
import { clearSelectedValue, haveACopyInArray } from "../../common/utils";

type TPossibleSeedTypes = ITrack | IArtist | string;

interface SeedSelectorProps {
  seeds: Array<TPossibleSeedTypes>,
  selectedSeedsIds: Array<string>,
  canAddMoreSeeds: boolean,
  country: string,
  searchType: string,
  setSeeds(data: Array<TPossibleSeedTypes>): void
}

// TODO: block selected item from rendering
function SeedSelector(props: SeedSelectorProps) {
  const [offset, setOffset] = useState(0);
  const seedSelectorRef = useRef();
  const [localSeeds, setLocalSeeds] = useState(props.seeds);

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
    selectedOption: TPossibleSeedTypes | null,
    props: SeedSelectorProps
  ) => {
      const isADuplicate = haveACopyInArray(selectedOption, props.seeds);
      if (selectedOption && props.canAddMoreSeeds && !isADuplicate) {
          let newValue: Array<TPossibleSeedTypes> = ([] as Array<TPossibleSeedTypes>).concat(...props.seeds);
          newValue.push(selectedOption);
          props.setSeeds(newValue);
          clearSelectedValue(seedSelectorRef);
      }
  };
    
  const renderOptionLabel: {[key: string]: (option: TPossibleSeedTypes) => string} = {
    track: (option) => 
      (`${option.name} by ${option.artists.map((i: ITrack) => i.name).join(", ")}`),
    artist: (option) => (`${option.name}`)
  }

  const callRender = (option: IArtist | ITrack) => (renderOptionLabel[props.searchType](option))

  return (
    <AsyncSelect
      className="async-select"
      isDisabled={!props.canAddMoreSeeds}
      innerRef={seedSelectorRef}
      getOptionLabel={callRender}
      blurInputOnSelect={true}
      loadOptions={getSeeds}
      onChange={(options) => (onChange(options, props))}
      cacheOptions
    />
  );
}


export default SeedSelector;