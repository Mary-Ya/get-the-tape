import React from "react";

const STATUS_TEXT = {
  EMPTY: () => () => (<span className="text-black-50">Nothing here yet</span>),
  NEW: () => () => (<span className="text-primary">This list is local</span>),
  SAVED: () => () =>(
    <span className="text-success">Playlist is saved</span>
  ),
  MODIFIED: () => () =>
    (
      <span className="text-black-50">
        <span className="text-warning">Playlist is modified</span>. Changes are currently local. You may save them to
        current playlist or you may create a new one
      </span>
    ),
};

function TapeStatusText(props: { status: string }) {
  return STATUS_TEXT[props.status as keyof typeof STATUS_TEXT]()();
}

export default React.memo(TapeStatusText);
