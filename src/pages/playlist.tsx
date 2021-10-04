import React, { useEffect, useState } from "react";
import apiPlaylist from "../common/playlist-api";
import PaginatedList from "../components/paginated-list";
import Spinner from "../components/spinner";
import { IPlaylist, IPlaylistList } from "../types/playlist";

const Playlist = (props) => {
  const [list, setList] = useState<IPlaylistList | null>(null);
  // const { execute, status, value, error } = useAsyncList(makeFetchFunction(), false);

  const makeFetchFunction = () => {
    return apiPlaylist.getList(props.access_token)
  }

  useEffect(() => {
    apiPlaylist.getList(props.access_token).then((i: IPlaylistList) => {
      setList(i);
    })
  }, []);

  const unfollow = (id: string, index: number) => {
    apiPlaylist.unfollow(props.access_token, id).then((res) => {
      if (res.statusCode == 200) {
        apiPlaylist.getList(props.access_token, list?.offset, list?.limit).then((i: IPlaylistList) => {
          setList(i);
        })
      }
    });
  };

  const RenderRow = (item: IPlaylist) => {
    return <div><button onClick={() => {
      unfollow(item.id, item.index)
    }}>unfollow</button><button onClick={() => {
      console.log('edit')
    }}>Edit</button>{item.name}</div>
  }

  const setPage = () => {
    return (page: number) => {
      const offset = list.limit * page;
      console.log(page)
      apiPlaylist.getList(props.access_token, offset).then((i: IPlaylistList) => {
        setList(i);
      });
    }
  }

  return list ? <PaginatedList {...list}
    children={<RenderRow />}
    setPage={setPage()}
  /> : <Spinner></Spinner>
};

export default Playlist;