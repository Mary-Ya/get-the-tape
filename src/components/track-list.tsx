import React, { useState } from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import { ITrack } from "@interfaces/track";
import Track from "@components/track";
import { removeItemByProperty } from "@common/utils";

interface ITrackListProps {
  snapshot: string;
  trackList: ITrack[];
  updateTrackList: (a: ITrack[]) => void;
  shuffleItem: (index: number) => Promise<void | ITrack[]>;
}

const TrackList = (props: ITrackListProps) => {
  const [sortIsDisabled, setSortIsDisabled] = useState(false);

  const onRemoveTrack = (id: ITrack) => {
    const newList = removeItemByProperty(props.trackList, id, "id");
    props.updateTrackList(newList);
  };

  const shuffle = (index: number) => {
    setSortIsDisabled(true);
    props.shuffleItem(index).then(() => {
      setSortIsDisabled(false);
    });
  };

  const renderItem = (i: ITrack, index: number) => (
    <Track
        controls={true}
        track={i}
        className=""
        onClick={null}
        remove={onRemoveTrack}
        shuffle={() => shuffle(index)}
      ></Track>
  );

  const SortableItem = SortableElement(({ value, sortIndex }) => {
    return renderItem(value, sortIndex);
  });

  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul className="px-lg-0 px-3">
        {items.map((value: ITrack, index: number) => (
          <SortableItem
            key={`sortable-track-${value.id}`}
            sortIndex={index}
            index={index}
            value={value}
            disabled={sortIsDisabled}
          />
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

  return (
    <SortableList
      items={props.trackList}
      onSortEnd={onSortEnd}
      useDragHandle={true}
    />
  );
};

export default React.memo(TrackList);
