interface NavbarLink {
  text: string;
  path: string;
  icon: string;
}

export const dashboardNavbarLinks: NavbarLink[] = [
  {
    text: "Dashboard",
    path: "/dashboard",
    icon: "/assets/icons/dashboard.png",
  },
  {
    text: "My Links",
    path: "/dashboard/links",
    icon: "/assets/icons/urls.png",
  },
  {
    text: "Statistics",
    path: "/dashboard/statistics",
    icon: "/assets/icons/statistics.png",
  },
  {
    text: "Profile",
    path: "/dashboard/profile",
    icon: "/assets/icons/user.png",
  },
];
