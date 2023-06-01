import React, { useEffect } from "react";
import { ProgressBar, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { atom, RecoilState, RecoilValue, selector, useRecoilState, useRecoilValue } from "recoil";

function parsePage(str: string | null): number {
  if (str === null) {
    return 1;
  }
  return parseInt(str, 10);
}

interface SimpleObject {
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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const queryState = atom({
  key: "queryState",
  default: buildQuery(new URLSearchParams(global.location.search)),
});

const dataState = selector({
  key: "dataState",
  get: async ({ get }) => {
    const query = get(queryState);
    const queryString = buildQueryStrring(query);
    return fetch(`https://jsonplaceholder.typicode.com/posts?${queryString}`)
      .then(response => response.json())
      .then(json => json as Post[])
  },
});

function buildQueryStrring(query: SimpleObject) {
  return Object.entries(query)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
    ;
}

function buildQuery(params: URLSearchParams) {
  return {
    _page: parsePage(params.get("page")),
  };
}

function useUpdateQuery<T extends SimpleObject>(queryState: RecoilState<T>, buildQuery: (params: URLSearchParams) => T, searchParams: URLSearchParams) {
  const [query, setQuery] = useRecoilState(queryState);
  const $query = buildQuery(searchParams);
  return () => {
    if (!shallowEqual(query, $query)) {
      setQuery($query);
    }
  };
}

export function ComponentsItemTable() {

  const [searchParams] = useSearchParams();

  const updateQuery = useUpdateQuery(queryState, buildQuery, searchParams);

  useEffect(() => {
    updateQuery();
  }, [updateQuery]);

  const dataColumns = [
    {
      heading: {
        text: "#",
      },
      body: {
        text: (post: Post) => `${post.id}`,
      },
    },
    {
      heading: {
        text: "Title",
      },
      body: {
        text: (post: Post) => `${post.title}`,
      },
    },
  ];
  return (
    <>
      <div>Item</div>
      <ItemTable state={dataState} columns={dataColumns} />
    </>
  );
}

export default ComponentsItemTable;

interface ItemColumn<T> {
  heading: {
    text: string;
  };
  body: {
    text: (value: T) => string;
  }
}

interface ItemProps<T> {
  state: RecoilValue<T[]>;
  columns: ItemColumn<T>[];
}

function ItemTable<T>(props: ItemProps<T>) {
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

function ItemTableBody<T>({ state, columns }: ItemProps<T>) {
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
