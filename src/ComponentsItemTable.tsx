import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { atom, selector } from "recoil";
import { buildBuildQuery, buildQueryStrring, ItemTable, useUpdateQuery } from "./ItemTable";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const buildQuery = buildBuildQuery({
  _page: {
    searchParamName: "page",
    parseSearchParam(str: string | null) {
      if (str === null) {
        return 1;
      }
      return parseInt(str, 10);
    },
  },
});

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

export function ComponentsItemTable() {

  const [searchParams] = useSearchParams();
  const updateQuery = useUpdateQuery(searchParams, queryState, buildQuery);
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
