import React from "react";
import { ITrack } from "../types/track";
import Track from "./track";
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import { getRandomNumber, removeItemByProperty } from "../common/utils";

interface ITrackListProps {
    snapshot: string;
    trackList: ITrack[],
    updateTrackList: (a: ITrack[]) => void
}

const TrackList = (props: ITrackListProps) => {
    const onRemoveTrack = (id: ITrack) => {
        const newList = removeItemByProperty(props.trackList, id, 'id');
        props.updateTrackList(newList);
    }

    // TODO: make API call for random track
    // will need to make optimization (fetch a bunch before all alts are used)
    // will need to think through collisions and potential micro freezes between removes and shuffles
    const shuffle = (index) => {
        const track = props.trackList[index];
        const newAlts = track.alts;
        newAlts?.push(track);
        const nextTrack = newAlts?.shift();

        const newList = props.trackList;
        newList[index] = { ...nextTrack };
        newList[index].alts = [...newAlts];
        
        props.updateTrackList(newList);
    }

    const renderItem = (i: ITrack, index: number) => (
        <Track controls={true}
            track={i}
            key={"playlist-item" + i.id}
            className="button_"
            onClick={null}
            remove={onRemoveTrack}
            shuffle={() => shuffle(index)}
        ></Track>
    );

    const SortableItem = SortableElement((params) => {
        const { value, sortIndex } = params;
        return renderItem(value, sortIndex)
    });

    const SortableList = SortableContainer(({items}) => {
        return (
            <ul className="px-lg-0 px-3">
                {items.map((value: ITrack, index: number) => (
                    <SortableItem key={`sortable-track-${value.id}`} sortIndex={index}
                    index={index} value={value} />
                ))}
            </ul>
        );
    });

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
            const newArray = arrayMove(props.trackList, oldIndex, newIndex);
            props.updateTrackList(newArray);
        }
    };
    
    return <SortableList items={props.trackList} onSortEnd={onSortEnd} useDragHandle={true} />
};

export default React.memo(TrackList);