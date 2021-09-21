import React, { DetailedReactHTMLElement, PropsWithChildren, useState } from 'react';
import {Link} from 'react-router-dom';
import { IAnyList } from '../types/common';

interface IPaginationListProps extends IAnyList {
  children: any
}

function PaginatedList(props: PropsWithChildren<IAnyList>) {
  const [items, setItems] = useState(props.items || []);
  const [href] = useState(props.href || '');
  const [limit] = useState(props.limit || 0);
  const [next] = useState(props.next || '');
  const [offset] = useState(props.offset || 0);
  const [previous] = useState(props.previous || null);
  const [total] = useState(props.total || 0);

  return (
    <>
      <div className="row">
        {items.map(i => React.cloneElement(props.children, i))}
      </div>
    </>
  );
}


export default PaginatedList;