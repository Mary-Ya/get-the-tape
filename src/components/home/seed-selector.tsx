import React, { useRef } from "react";
import { IArtist, ITrack } from "../../types/track";
import AsyncSelect from "react-select/async";
import api from "../../common/api";
import { ActionMeta } from "react-select";
import { useState } from "react";
import { clearSelectedValue, haveACopyInArray } from "../../common/utils";

interface SeedSelectorProps {
  seeds: Array<ITrack | IArtist>,
  canAddMoreSeeds: boolean,
  country: string,
  accessToken: string,
  seedCount: number,
  searchType: string,
  setSeeds(data: Array<ITrack | IArtist>): void
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
    selectedOption: ITrack | IArtist | null,
    action: ActionMeta<ITrack | IArtist>,
    props: SeedSelectorProps
  ) => {
    console.log(props.seeds)
        const isADuplicate = haveACopyInArray(selectedOption, props.seeds);
        if (selectedOption && props.canAddMoreSeeds && !isADuplicate) {
            let newValue: Array<ITrack | IArtist> = [].concat(...props.seeds);
            newValue.push(selectedOption);
            props.setSeeds(newValue);
            clearSelectedValue(songSeedSelectorRef);
        }
    };
    
  const renderOptionLabel = {
    track: (option: ITrack) =>
      (`${option.name} by ${option.artists.map((i) => i.name).join(", ")}`),
    artist: (option: IArtist) => (`${option.name}`)
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