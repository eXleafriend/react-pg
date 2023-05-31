import React from 'react';
import { navigationRoot } from './common';
import { NavigationItem } from "./navigation";

export function App() {
  return (
    <ul>
      <Sitemap item={navigationRoot} />
    </ul>
  );
}

export default App;

function Sitemap({ item }: { item: NavigationItem }) {
  return (
    <li>
      <a href={item.fullpath}>{item.title}</a>
      {item.children
        ? <ul>{item.children.map(child => (<Sitemap key={child.path} item={child} />))}</ul>
        : <></>
      }
    </li>
  );
}
