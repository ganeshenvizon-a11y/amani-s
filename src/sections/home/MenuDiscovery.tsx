/**
 * MenuDiscovery — Home page section displaying category grid.
 * Positioned right after Signature Dishes section on the Home Page.
 */
import { NavLink } from 'react-router-dom';

interface MenuDiscoveryCategory {
  title: string;
  path: string;
  isHighlight?: boolean;
}

const DISCOVERY_CATEGORIES: MenuDiscoveryCategory[] = [
  {
    title: "Amani's Signatures",
    path: '/menu?section=starters-soups',
  },
  {
    title: 'Traditional Andhra Bhojanam',
    path: '/menu?section=main-course',
  },
  {
    title: 'Tiffins & Dosas',
    path: '/menu?section=starters-soups',
  },
  {
    title: 'Andhra Curries & Pulusus',
    path: '/menu?section=main-course',
  },
  {
    title: 'Rice, Pulao & Biryani',
    path: '/menu?section=rice-biryanis',
  },
  {
    title: 'Vegetarian Choices',
    path: '/menu?dietary=veg',
  },
  {
    title: 'Beverages & Desserts',
    path: '/menu?section=sweets-drinks',
  },
  {
    title: 'More from Our Kitchen',
    path: '/menu',
    isHighlight: true,
  },
];

export function MenuDiscovery() {
  return (
    <section className="menu-discovery" aria-labelledby="menu-discovery-heading">
      <div className="menu-discovery__shell">
        <header className="menu-discovery__header">
          <div className="menu-discovery__heading-group">
            <h2 id="menu-discovery-heading" className="menu-discovery__title">
              Find What You Feel Like Eating
            </h2>
            <div className="menu-discovery__divider" aria-hidden="true" />
          </div>
          <p className="menu-discovery__subtitle">
            Browse the menu by appetite, occasion or preference.
          </p>
        </header>

        <div className="menu-discovery__grid" role="list">
          {DISCOVERY_CATEGORIES.map((cat) => (
            <NavLink
              key={cat.title}
              to={cat.path}
              className={`menu-discovery__card ${cat.isHighlight ? 'menu-discovery__card--highlight' : ''}`}
              role="listitem"
            >
              <span className="menu-discovery__card-text">{cat.title}</span>
            </NavLink>
          ))}
        </div>

        <div className="menu-discovery__footer">
          <NavLink to="/menu" className="menu-discovery__btn">
            View the Complete Menu
          </NavLink>
        </div>
      </div>
    </section>
  );
}
