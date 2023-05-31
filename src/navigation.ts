export interface NavigationItem {
  title: string;
  fullpath: string;
  path: string;
  children?: NavigationItem[];
}

export interface NavigationItemData {
  title: string;
  path: string;
  children?: NavigationItemData[];
}

export function newNavigationItem(data: NavigationItemData, parent?: Pick<NavigationItem, "fullpath">): NavigationItem {
  const { title, path, children } = data;
  const item = {
    title,
    path,
    fullpath: parent ? `${parent.fullpath === "/" ? "" : parent.fullpath}/${path}` : (path === "" ? "/" : path),
  }
  return {
    ...item,
    children: children ? children.map(child => newNavigationItem(child, item)) : undefined,
  };
}
