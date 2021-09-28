import React, { useEffect, useState } from "react";
import apiPlaylist from "../common/playlist-api";
import PaginatedList from "../components/paginated-list";
import Spinner from "../components/spinner";
import { IPlaylist, IPlaylistList } from "../types/playlist";

const Playlist = (props) => {

  const [res, setRes] = useState<IPlaylistList | null>(null);

  useEffect(() => {
    apiPlaylist.getList(props.access_token).then((i: IPlaylistList) => {
      setRes(i);
    })
  }, []);

  const unfollow = (id: string) => {
    apiPlaylist.unfollow(props.access_token, id).then((res) => {
      if (res.statusCode == 200) {
        const newSongSeeds = list.filter((i: IPlaylist) => i.id !== id);
        setList(newSongSeeds);
      }
    });
  };

  const RenderRow = (item: IPlaylist) => {
    return <div key={item.id}><button onClick={() => {
      unfollow(item.id)
    }}>unfollow</button><button onClick={() => {
      unfollow(item.id)
    }}>Edit</button>{item.name}</div>
  }

  return res ? <PaginatedList {...res} children={<RenderRow/>}/> : <Spinner></Spinner>
};

export default Playlist;