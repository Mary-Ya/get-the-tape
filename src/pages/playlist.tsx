import React, { useEffect, useState } from "react";
import apiPlaylist from "@api/playlist-api";
import PaginatedList from "@components/paginated-list";
import Spinner from "@components/spinner";
import { IPlaylist, IPlaylistList } from "@interfaces/playlist";

const Playlist = () => {
  const [list, setList] = useState<IPlaylistList | null>(null);
  // const { execute, status, value, error } = useAsyncList(makeFetchFunction(), false);

  const makeFetchFunction = () => {
    return apiPlaylist.getList()
  }

  useEffect(() => {
    apiPlaylist.getList().then((i: IPlaylistList) => {
      setList(i);
    })
  }, []);

  const unfollow = (id: string) => {
    apiPlaylist.unfollow(id).then((res) => {
      if (res.statusCode == 200) {
        apiPlaylist.getList(list?.offset, list?.limit).then((i: IPlaylistList) => {
          setList(i);
        })
      }
    });
  };

  const RenderRow = (item: IPlaylist) => {
    return <div><button onClick={() => {
      unfollow(item.id);
    }}>unfollow</button>
      <button onClick={() => {
        console.log('edit')
      }}>Edit</button>{item.name}</div>
  };

  const setPage = () => {
    return (page: number) => {
      const offset = list.limit * page;
      apiPlaylist.getList(offset).then((i: IPlaylistList) => {
        setList(i);
      });
    }
  }

  return list ? <PaginatedList {...list}
    row={RenderRow}
    setPage={setPage()}
  /> : <Spinner></Spinner>
};

export default Playlist;