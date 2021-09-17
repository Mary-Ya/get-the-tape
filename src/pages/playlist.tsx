import React, { useEffect, useState } from "react";
import apiPlaylist from "../common/api-playlist";
import { IPlaylist, IPlaylistList } from "../types/playlist";

const Playlist = (props) => {

  const [list, setList] = useState<IPlaylist[]>([]);

  useEffect(() => {
    apiPlaylist.getList(props.access_token).then((i: IPlaylistList) => {
      console.log(i)
      setList(i.items)
    })
  }, [])

  const unfollow = (id: string) => {
    apiPlaylist.unfollow(props.access_token, id).then((res) => {
      if (res.statusCode == 200) {
        const newSongSeeds = list.filter((i: IPlaylist) => i.id !== id);
        setList(newSongSeeds);
      }
    });
  };

  return list.length > 0 ? <div>
    {list.map((item: IPlaylist) => (<div key={item.id}>{item.name}<button onClick={() =>{unfollow(item.id)}}>unfollow</button></div>))} 
  </div> : <>No playlist yet</>
};

export default Playlist;