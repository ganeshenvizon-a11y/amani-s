import { MENU_GROUPS } from '../../content/menu';

export function StickyCategories() {
  return <nav className="menu-category-nav" aria-label="Menu categories"><div className="menu-container"><span>Jump to</span>{MENU_GROUPS.map(group => <a key={group.id} href={`#${group.id}`}>{group.title}</a>)}<a href="#dietary">Dietary guide</a></div></nav>;
}
