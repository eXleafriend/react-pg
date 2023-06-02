import React from "react";
import { selectorFamily, useRecoilValue } from "recoil";
import { buildQueryStrring, createQueryAndData, ItemColumn, ItemColumns, ItemTable } from "./ItemTable";

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const userQuery = selectorFamily({
  key: "ComponentItemTable:User",
  get: (userId: number) => async () => {
    const user = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(response => response.json())
      .then(json => json as User);
    return user;
  },
});

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

  const dataColumns: ItemColumns<Post> = {
    "#": (post: Post) => `${post.id}`,
    Title: (post: Post) => `${post.title}`,
    User: {
      title: (post: Post) => {
        const user = useRecoilValue(userQuery(post.userId));
        return user.username;
      },
      children: (post: Post) => {
        const user = useRecoilValue(userQuery(post.userId));
        return user.name;
      },
    },
  };

  return (
    <>
      <h2>Item</h2>
      <ItemTable state={dataState} columns={dataColumns} />
    </>
  );
}

export default ComponentsItemTable;
