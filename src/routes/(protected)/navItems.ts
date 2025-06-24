export type NavItem = {
  href: string;
  title: string;
  icon?: string;
  subItems?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    icon: 'mdi-home',
    href: '/',
  },
  {
    title: 'Basic UI Elements',
    icon: 'mdi-crosshairs-gps',
    href: '/basic-ui-elements',
    subItems: [
      {
        title: 'Buttons',
        href: '/basic-ui-elements/buttons',
      },
      {
        title: 'Dropdowns',
        href: '/basic-ui-elements/dropdowns',
      },
      {
        title: 'Typography',
        href: '/basic-ui-elements/typography',
      },
    ],
  },
]
