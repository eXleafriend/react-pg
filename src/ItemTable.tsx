import React from "react";
import { ProgressBar, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RecoilState, RecoilValue, useRecoilState, useRecoilValue } from "recoil";

export interface SimpleObject {
  [key: string]: any;
}

function shallowEqual(object1: SimpleObject, object2: SimpleObject) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
}

export function buildQueryStrring(query: SimpleObject) {
  return Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
    ;
}

export function useUpdateQuery<T extends SimpleObject>(
  searchParams: URLSearchParams,
  queryState: RecoilState<T>,
  buildQuery: (params: URLSearchParams) => T,
) {
  const [query, setQuery] = useRecoilState(queryState);
  const $query = buildQuery(searchParams);
  return () => {
    if (!shallowEqual(query, $query)) {
      setQuery($query);
    }
  };
}

export interface ItemColumn<T> {
  heading: {
    text: string;
  };
  body: {
    text: (value: T) => string;
  }
}

export interface ItemProps<T> {
  state: RecoilValue<T[]>;
  columns: ItemColumn<T>[];
}

export function ItemTable<T>(props: ItemProps<T>) {
  const { columns } = props;
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={`th-${i}`}>{column.heading.text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <React.Suspense fallback={(
            <tr>
              <td colSpan={columns.length}>
                <ProgressBar animated now={100} />
              </td>
            </tr>
          )}>
            <ItemTableBody {...props} />
          </React.Suspense>
        </tbody>
      </Table>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {arrayRange(1, 10).map(i => (
            <li className="page-item" key={`page-${i}`}><Link className="page-link" to={`?page=${i}`}>{i}</Link></li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function ItemTableBody<T>({ state, columns }: ItemProps<T>) {
  const data = useRecoilValue(state);
  return (
    <>
      {data.map((record, i) => (
        <tr key={`tr-${i}`}>
          {columns.map((column, i) => (
            <td key={`td-${i}`}>{column.body.text(record)}</td>
          ))}
        </tr>
      ))}
    </>
  )
}

const arrayRange = (start: number, stop: number, step: number = 1) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
  );
