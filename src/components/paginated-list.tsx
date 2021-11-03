import React from 'react';
import { IAnyList } from '../types/common';

interface IPaginationListProps extends IAnyList {
  children: any;
  setPage: (pageNumber: number) => void;
}

function PaginatedList(props: IPaginationListProps) {
  const renderSpotifyHref = () => {
    if (props.href) {
      return <a href={props.href} target="_blank">Open on spotify</a>;
    } else return '';
  }

  const renderPagination = () => {
    let pages: number[] = [];
    const pagesCount = Math.floor(props.total / props.limit);
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i + 1);
    }
    return <>{pages.map(i => <button
      className="btn btn-link"
      onClick={() => props.setPage(i)}
      key={`page-${i}`}> {i}</button>)}</>;
  }

  return (
    <div className="content">
      <div className="row m-0">
        {props.items.map((item, index) => React.cloneElement(props.children, {key: item.id, ...item, index}))}
      </div>
      <div className="row m-0">
        <div className="col-lg-6">
          {renderPagination()}
        </div>
        <div className="col-lg-6 align-content-end">
          {renderSpotifyHref()}
        </div>
      </div>
    </div>
  );
}


export default PaginatedList;