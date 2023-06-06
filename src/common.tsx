import React from 'react';
import { App } from './App';
import Components from './Components';
import ComponentsItemTable from './ComponentsItemTable';
import { newRoutingNavigationItem } from "./navigation-router";
import Recoil from "./Recoil";
import PartialObjectForm from './recoil/partial-object-form';
import RecoilAtom from "./RecoilAtom";
import RecoilSelector from "./RecoilSelector";
import Router from "./Router";

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
      title: "Redux",
      path: "reduc",
      element: null,
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
        {
          title: "Partial Object Form",
          path: "partial-object-for",
          element: <PartialObjectForm />,
        },
      ]
    },
    {
      title: "Components",
      path: "components",
      element: <Components />,
      children: [
        {
          title: "ItemTable",
          path: "item-table",
          element: <ComponentsItemTable />,
        },
      ]
    },
  ],
});