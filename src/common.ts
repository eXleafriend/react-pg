import { newNavigationItem } from "./navigation";

export const navigationRoot = newNavigationItem({
  title: "React Playground",
  path: "",
  children: [
    {
      title: "React Router",
      path: "router",
    },
    {
      title: "Recoil",
      path: "recoil",
      children: [
        {
          title: "Atom",
          path: "atom",
        },
        {
          title: "Selector",
          path: "selector",
        },
      ]
    },
  ],
});