import React from "react";
import { ITrack } from "../types/track";
import Track from "./track";
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import { removeItemByProperty } from "../common/utils";

interface ITrackListProps {
    trackList: ITrack[],
    updateTrackList: (a: ITrack[]) => void
}

const TrackList = (props: ITrackListProps) => {
    const onRemoveTrack = (id: ITrack) => {
        const newList = removeItemByProperty(props.trackList, id, 'id');
        props.updateTrackList(newList);
    }

    const renderItem = (i: ITrack) => (
        <Track controls={true}
            track={i}
            key={"playlist-item" + i.id}
            className="button_"
            onClick={null}
            remove={onRemoveTrack}
        ></Track>
    );

    const SortableItem = SortableElement(({value}) => renderItem(value));
    const SortableList = SortableContainer(({items}) => {
        return (
            <ul className="px-lg-0 px-3">
                {items.map((value: ITrack, index: number) => (
                    <SortableItem key={`item-${value.id}`} index={index} value={value} />
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