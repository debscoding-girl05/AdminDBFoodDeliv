import {
  Cpu,
  LayoutGrid,
  LucideIcon,
  SquarePen,
  NotebookTabs,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/techs",
          label: "Technologies",
          active: pathname.includes("/techs"),
          icon: Cpu,
          submenus: [
            {
              href: "/techs/all-tech",
              label: "All Techs",
              active: pathname === "/techs/all-tech",
              icon: NotebookTabs,
            },
            {
              href: "/techs/new-tech",
              label: "New Technology",
              active: pathname === "/techs/new-tech",
              icon: SquarePen,
              
            }
          ]
        }
      ]
    }
  ];
}
