import React, { useState } from "react";
import { ITrack } from "../types/track";
import Track from "./track";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc";
import { getRandomNumber, removeItemByProperty } from "../common/utils";

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

  // TODO: make API call for random track
  // will need to make optimization (fetch a bunch before all alts are used)
  // will need to think through collisions and potential micro freezes between removes and shuffles
  const shuffle = (index: number) => {
    setSortIsDisabled(true);
    props.shuffleItem(index).then(() => {
      setSortIsDisabled(false);
    });
  };

  const renderItem = (i: ITrack, index: number) => (
    <div
        className={`row gx-0  my-1 py-1 justify-content-left track-row button_`}
        key={"playlist-item" + i.id}
        style={{ minHeight: 88}}
      >
      <Track
        controls={true}
        track={i}
        className=""
        onClick={null}
        remove={onRemoveTrack}
        shuffle={() => shuffle(index)}
      ></Track>
    </div>
  );

  const SortableItem = SortableElement((params) => {
    const { value, sortIndex } = params;
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
