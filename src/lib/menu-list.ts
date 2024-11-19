import {
  LayoutGrid,
  LucideIcon,
  SquarePen,
  NotebookTabs,
  BookOpenText,
  UserCog,
  Soup 
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
          href: "/plats",
          label: "Plats",
          active: pathname.includes("/plats"),
          icon: Soup,
          submenus: [
            {
              href: "/plats/all-plat",
              label: "Tableau Plats",
              active: pathname === "/plats/all-plat",
              icon: NotebookTabs,
            },
            {
              href: "/plats/new-plat",
              label: "Ajouter Plat",
              active: pathname === "/techs/new-tech",
              icon: SquarePen,
              
            }
          ]
        },
         
          {
          href:"/commandes",
          label: "Commandes",
          active:pathname.includes("/commandes"),
          icon:BookOpenText ,
          submenus:[
            {
              href: "/commandes/all-commandes",
              label: "Toutes les Commandes",
              active: pathname === "/commandes/all-commandes",
              icon: NotebookTabs,
            },
          ]
        },
        {
          href:"/categories",
          label:"Categories",
          active:pathname.includes("/categories"),
          icon:NotebookTabs,
          submenus:[
            {
              href:"/categories/all-categories",
              label: "Toutes les categories",
              active:pathname === "/blocks/all-categories",
              icon:NotebookTabs,
            },
            {
              href: "/categories/new-categories",
              label: "Nouvelle Categorie",
              active: pathname === "/categories/new-categories",
              icon: SquarePen,
            }
          ]
        },
      ]
    },
   
    
    {
      groupLabel: "Gestion des Utilisateurs",
      menus:[
         {
          href:"/users",
          label:"Utilisateurs",
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
