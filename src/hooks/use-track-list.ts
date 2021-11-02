import { useState } from "react";
import { ITrack } from "../types/track";

const useTrackList = (initialValue: ITrack[]) => {
    const [state, setState] = useState(initialValue || []);

    const removeItemById = (id: string) => {
        const newSongSeeds = state.filter((i: ITrack) => i.id !== id);
        setState(newSongSeeds);
        return newSongSeeds;
    };

    const setList = (data) => {
        setState(data || []);
    };

    return [state, setList, removeItemById];
}

export default useTrackList;