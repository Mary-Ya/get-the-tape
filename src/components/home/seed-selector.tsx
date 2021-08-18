import React, { DOMElement, useRef } from "react";
import { IArtist, ITrack } from "../../types/track";
import AsyncSelect from "react-select/async";
import api from "../../common/api";
import { ActionMeta } from "react-select";
import { useState } from "react";
import { clearSelectedValue, haveACopyInArray } from "../../common/utils";

type TPossibleSeedTypes = ITrack | IArtist;

interface SeedSelectorProps {
  seeds: Array<TPossibleSeedTypes>,
  canAddMoreSeeds: boolean,
  country: string,
  accessToken: string,
  seedCount: number,
  searchType: string,
  setSeeds(data: Array<TPossibleSeedTypes>): void
}

function SeedSelector(props: SeedSelectorProps) {
  const [offset, setOffset] = useState(0);
  const songSeedSelectorRef = useRef();

  const getTracks = (inputValue: string) => {
    return api
      .search(
        props.country,
        props.accessToken,
        encodeURI(inputValue),
        10,
        offset,
        props.searchType
      )
      .then((data) => (data[props.searchType + 's'].items));
  };

  const onChange = (
    selectedOption: TPossibleSeedTypes | null,
    action: ActionMeta<TPossibleSeedTypes>,
    props: SeedSelectorProps
  ) => {
    console.log(props.seeds)
        const isADuplicate = haveACopyInArray(selectedOption, props.seeds);
        if (selectedOption && props.canAddMoreSeeds && !isADuplicate) {
            let newValue: Array<TPossibleSeedTypes> = ([] as Array<TPossibleSeedTypes>).concat(...props.seeds);
            newValue.push(selectedOption);
            props.setSeeds(newValue);
            clearSelectedValue(songSeedSelectorRef);
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
      innerRef={songSeedSelectorRef}
      getOptionLabel={callRender}
      blurInputOnSelect={true}
      loadOptions={getTracks}
      onChange={(options, action) => (onChange(options, action, props))}
      defaultOptions
      cacheOptions
    />
  );
}


export default SeedSelector;