import React, { ReactNode, useEffect } from "react";
import { ProgressBar, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
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

export type Builder<T> = {
  [key in keyof T]: {
    searchParamName?: string;
    parseSearchParam: (searchParam: string | null) => T[key],
  }
};

export function buildBuildQuery<T extends SimpleObject>(builder: Builder<T>): BuildQuery<T> {
  return searchParams => {
    const query: T = {} as any as T;
    for (const key in builder) {
      const { searchParamName, parseSearchParam } = builder[key];
      const name = searchParamName || key;
      const searchParam = searchParams.get(name);
      const value = parseSearchParam(searchParam);
      query[key] = value;
    };
    return query;
  };

}

export type BuildQuery<T> = (params: URLSearchParams) => T;

export function useQueryUpdate<T extends SimpleObject>(
  queryState: RecoilState<T>,
  buildQuery: BuildQuery<T>,
) {
  const [searchParam] = useSearchParams();
  const [query, setQuery] = useRecoilState(queryState);
  const $query = buildQuery(searchParam);
  useEffect(() => {
    if (!shallowEqual(query, $query)) {
      setQuery($query);
    }
  }, [query, setQuery, $query]);
}

export interface ItemColumn<T> {
  heading: {
    children: ReactNode;
  };
  data: {
    children: ReactNode | ((value: T) => ReactNode);
  }
}

export interface ItemProps<T> {
  state: RecoilValue<T[]>;
  columns: ItemColumn<T>[];
}

export function ItemTable<T>(props: ItemProps<T>) {
  const { columns } = props;
  const page = parseInt(new URLSearchParams(global.location.search).get("page") || "1", 10);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th key={`th-${i}`}>{column.heading.children}</th>
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
            <li className={`page-item ${i === page ? "active" : ""}`} key={`page-${i}`}>
              <Link className="page-link" to={`?page=${i}`}>{i}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

function render<T>(expression: ReactNode | ((value: T) => ReactNode)): (value: T) => ReactNode {
  if (typeof expression === "function") {
    return expression;
  } else {
    return () => expression;
  }
}

export function ItemTableBody<T>({ state, columns }: ItemProps<T>) {
  const data = useRecoilValue(state);
  return (
    <>
      {data.map((record, i) => (
        <tr key={`tr-${i}`}>
          {columns.map((column, i) => (
            <td key={`td-${i}`}>{render(column.data.children)(record)}</td>
          ))}e
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
