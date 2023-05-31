import React, { ReactNode } from "react";
import {RouteObject} from "react-router-dom";

export interface RoutingNavigationItem {
  title: string;
  fullpath: string;
  path: string;
  children?: RoutingNavigationItem[];
  element: React.ReactNode | null;
}

export interface RoutingNavigationItemData {
  title: string;
  path: string;
  children?: RoutingNavigationItemData[];
  element: React.ReactNode | null;
}

export function newRoutingNavigationItem(data: RoutingNavigationItemData, parent?: Pick<RoutingNavigationItem, "fullpath">): RoutingNavigationItem {
  const { title, path, children, element } = data;
  const item = {
    title,
    path,
    fullpath: parent ? `${parent.fullpath === "/" ? "" : parent.fullpath}/${path}` : (path === "" ? "/" : path),
    element,
  }
  return {
    ...item,
    children: children ? children.map(child => newRoutingNavigationItem(child, item)) : undefined,
  };
}

type convertElement = (node: ReactNode | null) => ReactNode | null;
function noop(node: ReactNode | null) {
  return node;
}

export function convertToRouteObject(item: RoutingNavigationItem, convertElement = noop): RouteObject {
  const { path, element: el, children } = item;
  const element = convertElement(el);
  if (children === undefined) {
    return {
      path,
      element,
    }
  }

  return {
    path,
    children: [
      {
        path,
        element,
        index: true,
      },
      ...children.map(child => convertToRouteObject(child, convertElement)),
    ]
  };
}