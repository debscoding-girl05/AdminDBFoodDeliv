import {
  Cpu,
  LayoutGrid,
  LucideIcon,
  SquarePen,
  NotebookTabs,
  MonitorStop,
  BookOpenText,
  LibraryBig,
  Blocks,
  UserCog, 
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
        },
          {
          href: "/tutorials",
          label: "Tutorials",
          active: pathname.includes("/tutorials"),
          icon: MonitorStop ,
          submenus: [
            {
              href: "/tutorials/all-tutorials",
              label: "All Tutorials",
              active: pathname === "/tutorials/all-tutorials",
              icon: NotebookTabs,
            },
            {
              href: "/tutorials/add-tutorial",
              label: "New Tutorial",
              active: pathname === "/tutorials/new-tutorial",
              icon: SquarePen,
              
            }
          ]
        },
          {
          href:"/formations",
          label: "Formations",
          active:pathname.includes("/formations"),
          icon:BookOpenText ,
          submenus:[
            {
              href: "/formations/all-formations",
              label: "All formations",
              active: pathname === "/formations/all-formations",
              icon: NotebookTabs,
            },
            {
              href: "/formations/new-formation",
              label: "New formations",
              active: pathname === "/formations/new-formation",
              icon: SquarePen,
            }
          ]
        },
        {
          href:"/lessons",
          label:"Lessons",
          active:pathname.includes("/lessons"),
          icon:LibraryBig,
          submenus:[
            {
              href:"/lessons/all-lessons",
              label: "All Lessons",
              active:pathname === "/lessons/all-lessons",
              icon:NotebookTabs,
            },
            {
              href: "/lessons/new-lesson",
              label: "New lessons",
              active: pathname === "/lessons/new-lesson",
              icon: SquarePen,
            }
          ]
        },
        {
          href:"/blocks",
          label:"Blocks",
          active:pathname.includes("/blocks"),
          icon:Blocks,
          submenus:[
            {
              href:"/blocks/all-blocks",
              label: "All blocks",
              active:pathname === "/blocks/all-blocks",
              icon:NotebookTabs,
            },
            {
              href: "/blocks/new-block",
              label: "New blocks",
              active: pathname === "/blocks/new-block",
              icon: SquarePen,
            }
          ]
        },
      ]
    },
   
    
    {
      groupLabel: "User Management",
      menus:[
         {
          href:"/users",
          label:"Users",
          active:pathname.includes("/users"),
          icon:UserCog,
          submenus:[
            {
              href:"/users/all-users",
              label: "All users",
              active:pathname === "/users/all-users",
              icon:NotebookTabs,
            },
            {
              href: "/users/new-user",
              label: "New users",
              active: pathname === "/users/new-user",
              icon: SquarePen,
            }
          ]
        },
      ]
    }
  ];
}
