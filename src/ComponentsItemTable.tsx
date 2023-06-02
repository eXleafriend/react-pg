import React from "react";
import { buildQueryStrring, createQueryAndData, ItemTable } from "./ItemTable";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const [useQueryUpdate, dataState] = createQueryAndData(

  "ComponentItemTable:queryState",
  {
    _page: {
      searchParamName: "page",
      parseSearchParam(str: string | null) {
        if (str === null) {
          return 1;
        }
        return parseInt(str, 10);
      },
    },
  },

  "ComponentItemTable:dataState",
  async ({ get, queryState }) => {
    const query = get(queryState);
    const queryString = buildQueryStrring(query);
    const posts = fetch(`https://jsonplaceholder.typicode.com/posts?${queryString}`)
      .then(response => response.json())
      .then(json => json as Post[]);
    return posts;
  }
);

export function ComponentsItemTable() {

  useQueryUpdate();

  const dataColumns = {
    "#": (post: Post) => `${post.id}`,
    Title: (post: Post) => `${post.title}`,
  };

  return (
    <>
      <div>Item</div>
      <ItemTable state={dataState} columns={dataColumns} />
    </>
  );
}

export default ComponentsItemTable;
