import { MENU_SECTIONS } from '../../content/menu';

export function StickyCategories() {
  return (
    <nav className="menu-category-nav" aria-label="Menu sections">
      <div className="menu-container">
        <span>Jump to</span>
        {MENU_SECTIONS.map(section => (
          <a key={section.id} href={`#${section.id}`}>{section.title}</a>
        ))}
        <a href="#dietary">Dietary guide</a>
      </div>
    </nav>
  );
}

