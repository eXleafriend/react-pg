import React, { createElement } from "react";
import { newRoutingNavigationItem } from "./navigation-router";
import { App } from './App';
import Router from "./Router";
import Recoil from "./Recoil";
import RecoilAtom from "./RecoilAtom";
import RecoilSelector from "./RecoilSelector";

export const navigationRoot = newRoutingNavigationItem({
  title: "React Playground",
  path: "",
  element: <App />,
  children: [
    {
      title: "React Router",
      path: "router",
      element: <Router />,
    },
    {
      title: "Recoil",
      path: "recoil",
      element: <Recoil />,
      children: [
        {
          title: "Atom",
          path: "atom",
          element: <RecoilAtom />,
        },
        {
          title: "Selector",
          path: "selector",
          element: <RecoilSelector />,
        },
      ]
    },
  ],
});