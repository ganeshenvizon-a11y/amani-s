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
  { label: 'OUR STORY',  path: '/stories/' },
  { label: 'GATHERINGS', path: '/gatherings/' },
  { label: 'CATERING',   path: '/catering/' },
  { label: 'FRANCHISE',  path: '/franchise/' },
  { label: 'VISIT',      path: '/visit/' },
];

export const SECONDARY_OPEN_NAV_LINKS: NavLinkItem[] = [
  { label: 'INSTAGRAM ↗', path: 'https://instagram.com', isExternal: true },
  { label: 'FACEBOOK ↗', path: 'https://facebook.com', isExternal: true },
  { label: 'YOUTUBE ↗', path: 'https://youtube.com', isExternal: true },
  { label: 'PINTEREST ↗', path: 'https://pinterest.com', isExternal: true },
  { label: 'GET DIRECTIONS ↗', path: '/visit/#location', isExternal: false },
];

export const MAIN_NAV_LINKS: NavLinkItem[] = [
  { label: 'HOME', path: '/' },
  { label: 'MENU', path: '/menu/' },
  { label: 'OUR STORY', path: '/stories/' },
  { label: 'GATHERINGS', path: '/gatherings/' },
  { label: 'CATERING', path: '/catering/' },
  { label: 'FRANCHISE', path: '/franchise/' },
  { label: 'VISIT', path: '/visit/' },
  { label: 'INSTAGRAM ↗', path: 'https://instagram.com', isExternal: true },
  { label: 'GET DIRECTIONS ↗', path: '/visit/#location', isExternal: false },
];

export const CTA_NAV_LINK: NavLinkItem = {
  label: 'RESERVE A TABLE',
  path: '/#home-contact',
  isPrimary: true,
};

export const FOOTER_NAV_LINKS: NavLinkItem[] = [
  { label: 'Menu',       path: '/menu/' },
  { label: 'Our Story',  path: '/stories/' },
  { label: 'Gatherings', path: '/gatherings/' },
  { label: 'Catering',   path: '/catering/' },
  { label: 'Franchise',  path: '/franchise/' },
  { label: 'Visit',      path: '/visit/' },
  { label: 'Reservations', path: '/visit/#reserve' },
];
