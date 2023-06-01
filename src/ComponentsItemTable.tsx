import React from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { atom, selector } from "recoil";
import { buildQueryStrring, ItemTable, useUpdateQuery } from "./ItemTable";

function parsePage(str: string | null): number {
  if (str === null) {
    return 1;
  }
  return parseInt(str, 10);
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

function buildQuery(params: URLSearchParams) {
  return {
    _page: parsePage(params.get("page")),
  };
}

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
