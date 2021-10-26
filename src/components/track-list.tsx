import React, { useEffect } from "react";
import { ITrack } from "../types/track";
import Track from "./track";
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import useTrackList from "../hooks/use-track-list";

const TrackList = (props: any) => {
    const [currentList, setCurrentList, removeTrack] = useTrackList(props.trackList);

    useEffect(() => {
        setCurrentList(props.trackList)
    }, [props.trackList]);

    const onRemoveTrack = (id) => {
        const newList = removeTrack(id);
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
            const newArray = arrayMove(currentList, oldIndex, newIndex);
            props.updateTrackList(newArray);
        }
    };
    
    return <SortableList items={currentList} onSortEnd={onSortEnd} useDragHandle={true} />
};

export default React.memo(TrackList);