import { ITrack } from "@interfaces/track";
import { OptionTypeBase } from "react-select";

export const renderOptionLabel: {[key: string]: (option: OptionTypeBase) => string} = {
    track: (option) => 
      (`${option.name} by ${option.artists.map((i: ITrack) => i.name).join(", ")}`),
    artist: (option) => (`${option.name}`)
}
  
export const getOptionalLabel = (option: OptionTypeBase, searchType: string) => (renderOptionLabel[searchType](option))

