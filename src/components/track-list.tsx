import React, { useEffect, useState } from "react";
import api from "../common/api";
import { IPlayState } from "../types/play-state";
import { errorHandler } from "../common/utils";
import { IArtist, ITrack } from "../types/track";
import Icons from "../assets/icons";
import Player from "./player";
import Track from "./track";
import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';

const PlayList = (props: any) => {
    const [currentList, setCurrentList] = useState(props.trackList || []);

    useEffect(() => {
        setCurrentList(props.trackList || [])
    }, [props.trackList])

    const renderItem = (i: ITrack) => (
        <Track controls={true}
            track={i}
            key={"playlist-item" + i.id}
            className="button_"
            onClick={null}
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

export default React.memo(PlayList);