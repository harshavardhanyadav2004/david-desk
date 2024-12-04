/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  BarChartBig,
  Group,
  Calendar,
  MessageCircleQuestion,
  Info,
  Box,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string, userRole: string): Group[] {
  const adminMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/admin/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "#",
          label: "Metrics",
          icon: BarChartBig,
          submenus: [
            {
              href: "/admin/students",
              label: "Students",
              icon: Group,
            },
            {
              href: "/admin/teachers",
              label: "Teachers",
              icon: Group,
            },
          ],
        },
        {
          href: "#",
          label: "Information",
          icon: Info,
          submenus: [
            {
              href: "/admin/information/announcements",
              label: "Announcements",
              icon: MessageCircleQuestion,
            },
            {
              href: "/admin//time-tables",
              label: "Time Tables",
              icon: Calendar,
            },
          ],
        },
        {
          href: "/admin/inventory",
          label: "Inventory",
          icon: Box,
          submenus: [],
        },
      ],
    },
  ];

  const teacherMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];

  const studentMenuList = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
  ];

  if (userRole === "admin") {
    return adminMenuList;
  } else if (userRole === "teacher") {
    return teacherMenuList;
  } else if (userRole === "student") {
    return studentMenuList;
  }
  return [];
}
