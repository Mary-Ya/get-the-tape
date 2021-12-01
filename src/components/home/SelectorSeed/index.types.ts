import { IArtist, ITrack } from "@interfaces/track";
import { OptionTypeBase } from "react-select";

type TPossibleSeedTypes = ITrack | IArtist | string;

export interface SeedSelectorProps {
  seeds: Array<TPossibleSeedTypes>,
  selectedSeedsIds: Array<string>,
  canAddMoreSeeds: boolean,
  country: string,
  searchType: string,
  setSeeds(data: Array<TPossibleSeedTypes>): void
}
