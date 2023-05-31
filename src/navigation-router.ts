import React from "react";
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

export function convertToRouteObject(item: RoutingNavigationItem): RouteObject {
  const { path, element, children } = item;
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
      ...children.map(child => convertToRouteObject(child)),
    ]
  };
}