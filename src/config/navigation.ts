/**
 * Amani — Central Navigation Links Configuration
 */

export interface NavLinkItem {
  label: string;
  path: string;
  isPrimary?: boolean;
  isExternal?: boolean;
}

export const PRIMARY_OPEN_NAV_LINKS: NavLinkItem[] = [
  { label: 'HOME',       path: '/' },
  { label: 'MENU',       path: '/menu/' },
  { label: 'STORIES',    path: '/stories/' },
  { label: 'GATHERINGS', path: '/gatherings/' },
  { label: 'VISIT',      path: '/visit/' },
];

export const SECONDARY_OPEN_NAV_LINKS: NavLinkItem[] = [
  { label: 'INSTAGRAM ↗', path: 'https://instagram.com', isExternal: true },
  { label: 'GET DIRECTIONS ↗', path: '/visit/#location', isExternal: false },
];

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'MENU', path: '/menu/' },
  { label: 'STORIES', path: '/stories/' },
  { label: 'GATHERINGS', path: '/gatherings/' },
  { label: 'VISIT', path: '/visit/' },
  { label: 'INSTAGRAM ↗', path: 'https://instagram.com', isExternal: true },
  { label: 'GET DIRECTIONS ↗', path: '/visit/#location', isExternal: false },
];

export const CTA_NAV_LINK: NavLinkItem = {
  label: 'RESERVE A TABLE',
  path: '/visit/#reserve',
  isPrimary: true,
};

export const FOOTER_NAV_LINKS: NavLinkItem[] = [
  { label: 'Menu',       path: '/menu/' },
  { label: 'Stories',    path: '/stories/' },
  { label: 'Gatherings', path: '/gatherings/' },
  { label: 'Visit',      path: '/visit/' },
  { label: 'Reservations', path: '/visit/#reserve' },
];

