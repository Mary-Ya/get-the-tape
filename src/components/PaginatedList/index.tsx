import React from 'react';
import { IAnyList } from '@interfaces/common';

interface IPaginationListProps extends IAnyList {
  row: any;
  total: number;
  limit: number;
  
  items: any[];
  href: string;
  setPage: (pageNumber: number) => void;
}

function PaginatedList({row, total, limit, items, href, setPage}: IPaginationListProps) {
  const renderSpotifyHref = () => {
    if (href) {
      return <a href={href} target="_blank">Open on spotify</a>;
    } else return '';
  };

  const renderPagination = () => {
    let pages: number[] = [];
    const pagesCount = Math.floor(total / limit);
    for (let i = 0; i < pagesCount; i++) {
      pages.push(i + 1);
    };
    return <>{pages.map(i => <button
      className="btn btn-link"
      onClick={() => setPage(i)}
      key={`page-${i}`}> {i}</button>)}</>;
  }

  const Row = row;

  return (
    <div className="content">
      <div className="row m-0">
        {items.map((item, index) => React.createElement(Row, {key: item.id, ...item, index}))}
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