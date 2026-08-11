import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_SECTIONS, type MenuDish } from '../../content/menu';
import { DietarySymbol } from '../../components/restaurant/DietarySymbol';

const DEFAULT_ITEM_LIMIT = 10;

// Curated image map for key signature dishes
const DISH_IMAGE_MAP: Record<string, string> = {
  'Natukodi Pulusu': '/media/images/dish-naatu-kodi-pulusu.jpg',
  'Andhra Chicken Curry': '/media/images/dish-andhra-chicken-curry.jpg',
  'Nellore Chepala Pulusu': '/media/images/dish-chepala-pulusu.jpg',
  'Chicken Majestic': '/media/images/dish-chicken-majestic.jpg',
  'Paneer Tikka': '/media/images/signatures/paneer-tikka.webp',
  'Chicken Dum Biryani': '/media/images/signatures/chicken-biryani.webp',
  'Gongura Mutton Biryani': '/media/images/signatures/gongura-mutton-curry.webp',
  'Bheemavaram Mix Biryani': '/media/images/signatures/bhimavaram-mixed-pulav.webp',
  'Avakai Chicken Biryani': '/media/images/signatures/avakai-biryani.webp',
  'Bommidala Pulusu': '/media/images/signatures/bommidala-pulusu.webp',
};

// Fallback images per category section ensuring ALL items display an image thumbnail
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'starters-soups': '/media/images/signatures/paneer-tikka.webp',
  'main-course': '/media/images/dish-andhra-chicken-curry.jpg',
  'rice-biryanis': '/media/images/signatures/chicken-biryani.webp',
  'breads-indo-chinese': '/media/images/dish-chicken-majestic.jpg',
  'sweets-drinks': '/media/images/signatures/avakai-biryani.webp',
};

// Signature dish set for visual badge highlight
const DISH_SIGNATURE_SET = new Set([
  'Natukodi Pulusu',
  'Paneer Tikka',
  'Chicken Majestic',
  'Butter Chicken',
  'Nellore Chepala Pulusu',
  'Chicken Dum Biryani',
  'Mutton Dum Biryani',
  'Avakai Chicken Biryani',
  'Bheemavaram Mix Biryani',
  'Rajugari Kodi Pulao',
  'Qubani Ka Meetha with Ice Cream',
  'Apricot Delight',
  'Butter Naan',
]);

// Helper for generating subtle editorial dish descriptions
function getDishDescription(dish: MenuDish, categoryTitle: string): string {
  if (dish.description) return dish.description;
  const name = dish.name;
  if (name.includes('Soup')) return 'Warm and comforting broth infused with fresh ginger, garlic, herbs, and aromatic spices.';
  if (name.includes('Tikka') || name.includes('Kebab')) return 'Marinated in rich spiced yogurt and roasted over charcoal in our clay tandoor oven.';
  if (name.includes('Manchurian') || name.includes('Chilli') || name.includes('65')) return 'Wok-tossed in high flame with dark soy, fresh green chilli, garlic, and fried curry leaves.';
  if (name.includes('Biryani')) return 'Long-grain Basmati rice slow-cooked dum style with saffron, star anise, and signature spices.';
  if (name.includes('Pulao') || name.includes('Pulav')) return 'Fragrant Chitti Muthyalu rice sautéed in pure desi ghee with roasted spices and regional herbs.';
  if (name.includes('Curry') || name.includes('Masala') || name.includes('Pulusu') || name.includes('Iguru')) return 'Simmered in an authentic regional Andhra gravy crafted with freshly ground roasted spices.';
  if (name.includes('Naan') || name.includes('Roti') || name.includes('Paratha')) return 'Freshly baked hand-stretched Indian flatbread prepared in our traditional clay tandoor.';
  if (name.includes('Noodles') || name.includes('Fried Rice')) return 'Wok-tossed Basmati rice or soft noodles with fresh garden vegetables and house seasonings.';
  if (name.includes('Ice Cream') || name.includes('Meetha') || name.includes('Jamun') || name.includes('Delight')) return 'Decadent traditional South Indian dessert crafted with rich milk solids, saffron, and nuts.';
  if (name.includes('Juice') || name.includes('Soda') || name.includes('Lassi') || name.includes('Mojito')) return 'Chilled refreshing beverage crafted with fresh fruit extracts and natural botanicals.';
  return `Authentic ${categoryTitle.toLowerCase()} preparation crafted with fresh natural ingredients and signature house spices.`;
}

type DietaryFilter = 'all' | 'veg' | 'non_veg' | 'egg';
export function MenuCategories() {
  // Selected category section state (starts on 'starters-soups', or 'search-all' when searching)
  const [activeSectionId, setActiveSectionId] = useState<string>(MENU_SECTIONS[0]?.id || 'starters-soups');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>('all');
  const [itemLimits, setItemLimits] = useState<Record<string, number>>({});
  
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleClearSearch = () => {
    setSearchQuery('');
    if (activeSectionId === 'search-all') {
      setActiveSectionId(MENU_SECTIONS[0]?.id || 'starters-soups');
    }
  };

  // Category row selection handler — switches active category pane smoothly
  const handleCategorySelect = (sectionId: string) => {
    setActiveSectionId(sectionId);

    // Scroll menu container into comfortable view if needed
    const menuEl = document.getElementById('menu-categories');
    if (menuEl) {
      const navOffset = 90;
      const elementPosition = menuEl.getBoundingClientRect().top;
      if (elementPosition < 0 || elementPosition > 300) {
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  // Increase item limit by 10 when user clicks "Show More"
  const handleShowMore = (groupId: string) => {
    setItemLimits(prev => ({
      ...prev,
      [groupId]: (prev[groupId] || DEFAULT_ITEM_LIMIT) + 10,
    }));
  };

  // Filter dish matching helper
  const matchesDish = (dish: MenuDish) => {
    if (dietaryFilter !== 'all' && dish.dietary !== dietaryFilter) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      return (
        dish.name.toLowerCase().includes(q) ||
        (dish.description && dish.description.toLowerCase().includes(q))
      );
    }
    return true;
  };

  const hasSearchQuery = searchQuery.trim() !== '';

  // Process matching categories and dishes for ALL sections
  const allMatchingSections = MENU_SECTIONS.map((section) => {
    const matchingCategories = section.categories.map((cat) => ({
      ...cat,
      matchingDishes: cat.dishes.filter(matchesDish),
    })).filter((cat) => cat.matchingDishes.length > 0);

    const sectionTotalCount = matchingCategories.reduce((acc, cat) => acc + cat.matchingDishes.length, 0);

    return {
      ...section,
      categories: matchingCategories,
      sectionTotalCount,
    };
  }).filter((sec) => sec.sectionTotalCount > 0);

  const totalMatchingDishesAllSections = allMatchingSections.reduce(
    (acc, sec) => acc + sec.sectionTotalCount,
    0
  );

  // Active Category Section object for single section view
  const activeSection = MENU_SECTIONS.find(s => s.id === activeSectionId) || MENU_SECTIONS[0];

  // Active Category Groups for single active section view
  const activeCategoryGroups = activeSection.categories.map(cat => ({
    ...cat,
    matchingDishes: cat.dishes.filter(matchesDish),
  })).filter(cat => cat.matchingDishes.length > 0);

  const activeSectionTotalCount = activeCategoryGroups.reduce((acc, cat) => acc + cat.matchingDishes.length, 0);

  const isSearchAllMode = activeSectionId === 'search-all';

  return (
    <section id="menu-categories" className="menu-categories" aria-label="Restaurant Menu">
      <div className="menu-container">
        
        {/* MOBILE STICKY HORIZONTAL CATEGORY BAR (< 992px) */}
        <nav className="menu-mobile-catbar" aria-label="Mobile Menu Categories">
          <div className="menu-mobile-catbar__inner">
            <div className={`menu-mobile-catbar__search-wrap ${isSearchAllMode || searchQuery ? 'is-active' : ''}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onFocus={() => {
                  if (activeSectionId !== 'search-all') setActiveSectionId('search-all');
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeSectionId !== 'search-all') setActiveSectionId('search-all');
                }}
                aria-label="Search menu items mobile"
              />
              {searchQuery && (
                <button type="button" className="menu-cat-search-field__clear" onClick={handleClearSearch} aria-label="Clear search">✕</button>
              )}
            </div>
            {MENU_SECTIONS.map((sec) => {
              const isActive = sec.id === activeSectionId && !isSearchAllMode;
              return (
                <button
                  key={sec.id}
                  type="button"
                  className={`menu-mobile-catbar__btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleCategorySelect(sec.id)}
                >
                  {sec.title}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 2-COLUMN MAIN EDITORIAL MENU LAYOUT */}
        <div className="menu-categories__layout">

          {/* LEFT COLUMN — CATEGORY NAVIGATION (~36% WIDTH) */}
          <aside className="menu-sidebar" aria-label="Menu category sidebar">
            <nav className="menu-sidebar__nav">
              
              {/* 1. Integrated Left Sidebar Search Field */}
              <div className="menu-sidebar__search-wrap">
                <div className={`menu-cat-search-field ${isSearchAllMode || searchQuery ? 'is-active' : ''}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="menu-cat-search-field__icon">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search menu dishes..."
                    value={searchQuery}
                    onFocus={() => {
                      if (activeSectionId !== 'search-all') {
                        setActiveSectionId('search-all');
                      }
                    }}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeSectionId !== 'search-all') {
                        setActiveSectionId('search-all');
                      }
                    }}
                    aria-label="Search restaurant menu dishes"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="menu-cat-search-field__clear"
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* 2. Dietary Quick Filter Pills (Placed directly AFTER Search) */}
              <div className="menu-sidebar__diet-filters" role="group" aria-label="Dietary filter options">
                <span className="menu-sidebar__diet-label">Filter:</span>
                <div className="menu-sidebar__diet-btns">
                  <button
                    type="button"
                    className={`menu-diet-chip ${dietaryFilter === 'all' ? 'is-active' : ''}`}
                    onClick={() => setDietaryFilter('all')}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`menu-diet-chip menu-diet-chip--veg ${dietaryFilter === 'veg' ? 'is-active' : ''}`}
                    onClick={() => setDietaryFilter('veg')}
                  >
                    <span className="dot dot--veg" />
                    Veg
                  </button>
                  <button
                    type="button"
                    className={`menu-diet-chip menu-diet-chip--non_veg ${dietaryFilter === 'non_veg' ? 'is-active' : ''}`}
                    onClick={() => setDietaryFilter('non_veg')}
                  >
                    <span className="dot dot--non_veg" />
                    Non-Veg
                  </button>
                  <button
                    type="button"
                    className={`menu-diet-chip menu-diet-chip--egg ${dietaryFilter === 'egg' ? 'is-active' : ''}`}
                    onClick={() => setDietaryFilter('egg')}
                  >
                    <span className="dot dot--egg" />
                    Egg
                  </button>
                </div>
              </div>

              {/* 3. Main Category Rows (Soups & Starters, Main Course, Rice & Biryanis, etc.) */}
              <ul className="menu-sidebar__rows">
                {MENU_SECTIONS.map((section, idx) => {
                  const isActive = section.id === activeSectionId && !isSearchAllMode;
                  const secMatch = allMatchingSections.find(s => s.id === section.id);
                  const count = secMatch ? secMatch.sectionTotalCount : 0;

                  return (
                    <li key={section.id} className="menu-sidebar__row-item">
                      <button
                        type="button"
                        className={`menu-cat-row ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleCategorySelect(section.id)}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="menu-cat-row__left">
                          <span className="menu-cat-row__num">0{idx + 1}</span>
                          <span className="menu-cat-row__title">{section.title}</span>
                        </span>
                        <span className="menu-cat-row__count">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>

            </nav>
          </aside>

          {/* RIGHT COLUMN — MENU CONTENT PANE (~64% WIDTH) */}
          <main className="menu-content" id="menu-content-pane">


            {/* Smooth Transition Pane */}
            <AnimatePresence mode="wait">
              {isSearchAllMode ? (
                /* ALL SECTIONS SEARCH VIEW */
                <motion.section
                  key="search-all-pane"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="menu-section-pane"
                  aria-label="All Menu Search Results"
                >
                  <header className="menu-section-group__header">
                    <div className="menu-section-group__eyebrow">
                      <span>ALL MENU CATEGORIES</span>
                      <span className="menu-section-group__eyebrow-sep">/</span>
                      <span>SEARCH MODE</span>
                    </div>
                    <div className="menu-section-group__title-row">
                      <h2>
                        {hasSearchQuery ? (
                          <>Search results for <em>"{searchQuery}"</em></>
                        ) : (
                          <>All Restaurant <em>Dishes</em></>
                        )}
                      </h2>
                      <span className="menu-section-group__badge">{totalMatchingDishesAllSections} items</span>
                    </div>
                  </header>

                  {totalMatchingDishesAllSections > 0 ? (
                    <div className="menu-section-group__body">
                      {allMatchingSections.map((sec) => (
                        <div key={sec.id} className="menu-search-section-block" style={{ marginBottom: '3rem' }}>
                          <div
                            className="menu-subgroup__title"
                            style={{
                              fontSize: '1.25rem',
                              fontFamily: 'var(--amani-font-display)',
                              color: 'var(--amani-maroon)',
                              borderBottom: '1px solid var(--amani-hairline)',
                              paddingBottom: '0.5rem',
                              marginBottom: '1.5rem',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'baseline'
                            }}
                          >
                            <span>{sec.number}. {sec.title}</span>
                            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--amani-font-ui)', opacity: 0.7, fontWeight: 'normal' }}>
                              {sec.sectionTotalCount} dish{sec.sectionTotalCount !== 1 ? 'es' : ''}
                            </span>
                          </div>

                          {sec.categories.map((group) => (
                            <div key={group.id} className="menu-subgroup" style={{ marginBottom: '1.75rem' }}>
                              {sec.categories.length > 1 && (
                                <h4 className="menu-subgroup__title" style={{ fontSize: '0.95rem', opacity: 0.85, marginBottom: '0.85rem' }}>
                                  {group.title}
                                </h4>
                              )}
                              <div className="menu-subgroup__grid">
                                {group.matchingDishes.map((dish) => {
                                  const isSignature = dish.signature || DISH_SIGNATURE_SET.has(dish.name);
                                  const imageSrc = dish.image || DISH_IMAGE_MAP[dish.name] || CATEGORY_FALLBACK_IMAGES[sec.id] || '/media/images/dish-naatu-kodi-pulusu.jpg';
                                  const descriptionText = getDishDescription(dish, sec.title);

                                  return (
                                    <article key={dish.name} className={`menu-dish-card ${isSignature ? 'menu-dish-card--signature' : ''}`}>
                                      <div className="menu-dish-card__media">
                                        <img
                                          src={imageSrc}
                                          alt={dish.name}
                                          loading="lazy"
                                        />
                                        {isSignature && (
                                          <span className="menu-dish-card__signature-tag">Signature</span>
                                        )}
                                      </div>

                                      <div className="menu-dish-card__content">
                                        <div className="menu-dish-card__top">
                                          <div className="menu-dish-card__meta">
                                            <DietarySymbol dietary={dish.dietary} showLabel={false} size={14} />
                                          </div>
                                          <span className="menu-dish-card__price">
                                            {dish.price === null ? 'Market Price' : `₹${dish.price}`}
                                          </span>
                                        </div>

                                        <h4 className="menu-dish-card__name">{dish.name}</h4>
                                        <p className="menu-dish-card__desc">{descriptionText}</p>
                                      </div>
                                    </article>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="menu-empty-state">
                      <h3>No dishes found</h3>
                      <p>
                        No menu items matched {searchQuery ? `"${searchQuery}"` : ''} {dietaryFilter !== 'all' ? `with ${dietaryFilter === 'veg' ? 'Vegetarian' : dietaryFilter === 'non_veg' ? 'Non-Vegetarian' : 'Egg'} filter` : ''} across all categories.
                      </p>
                      <button
                        type="button"
                        className="menu-button"
                        onClick={handleClearSearch}
                      >
                        Reset Search & Filters
                      </button>
                    </div>
                  )}
                </motion.section>
              ) : (
                /* SINGLE CATEGORY VIEW */
                <motion.section
                  key={activeSection.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="menu-section-pane"
                  aria-labelledby={`heading-${activeSection.id}`}
                >
                  {/* Category Header */}
                  <header className="menu-section-group__header">
                    <div className="menu-section-group__eyebrow">
                      <span>{activeSection.number}</span>
                      <span className="menu-section-group__eyebrow-sep">/</span>
                      <span>MENU CATEGORY</span>
                    </div>
                    <div className="menu-section-group__title-row">
                      <h2 id={`heading-${activeSection.id}`}>{activeSection.title}</h2>
                      <span className="menu-section-group__badge">{activeSectionTotalCount} items</span>
                    </div>
                    {activeSection.note && (
                      <p className="menu-section-group__note">{activeSection.note}</p>
                    )}
                  </header>

                  {/* Active Category Group Dishes Listing */}
                  {activeSectionTotalCount > 0 ? (
                    <div className="menu-section-group__body">
                      {activeCategoryGroups.map(group => {
                        const limit = itemLimits[group.id] || DEFAULT_ITEM_LIMIT;
                        const visibleDishes = group.matchingDishes.slice(0, limit);
                        const remainingCount = group.matchingDishes.length - visibleDishes.length;

                        return (
                          <div key={group.id} className="menu-subgroup">
                            {activeSection.categories.length > 1 && (
                              <h3 className="menu-subgroup__title">{group.title}</h3>
                            )}
                            <div className="menu-subgroup__grid">
                              {visibleDishes.map((dish) => {
                                const isSignature = dish.signature || DISH_SIGNATURE_SET.has(dish.name);
                                const imageSrc = dish.image || DISH_IMAGE_MAP[dish.name] || CATEGORY_FALLBACK_IMAGES[activeSection.id] || '/media/images/dish-naatu-kodi-pulusu.jpg';
                                const descriptionText = getDishDescription(dish, activeSection.title);

                                return (
                                  <article key={dish.name} className={`menu-dish-card ${isSignature ? 'menu-dish-card--signature' : ''}`}>
                                    <div className="menu-dish-card__media">
                                      <img
                                        src={imageSrc}
                                        alt={dish.name}
                                        loading="lazy"
                                      />
                                      {isSignature && (
                                        <span className="menu-dish-card__signature-tag">Signature</span>
                                      )}
                                    </div>

                                    <div className="menu-dish-card__content">
                                      <div className="menu-dish-card__top">
                                        <div className="menu-dish-card__meta">
                                          <DietarySymbol dietary={dish.dietary} showLabel={false} size={14} />
                                        </div>
                                        <span className="menu-dish-card__price">
                                          {dish.price === null ? 'Market Price' : `₹${dish.price}`}
                                        </span>
                                      </div>

                                      <h4 className="menu-dish-card__name">{dish.name}</h4>
                                      <p className="menu-dish-card__desc">{descriptionText}</p>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>

                            {/* Show More Button if more than 10 items exist in this group */}
                            {remainingCount > 0 && (
                              <div className="menu-subgroup__footer">
                                <button
                                  type="button"
                                  className="menu-see-more-btn"
                                  onClick={() => handleShowMore(group.id)}
                                  aria-label={`Show more items in ${group.title}`}
                                >
                                  <span>Show More ({remainingCount} remaining)</span>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="6 9 12 15 18 9" />
                                  </svg>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Empty State when Search Query returns no results in this category */
                    <div className="menu-empty-state">
                      <h3>No dishes found in {activeSection.title}</h3>
                      <p>
                        No items matched {searchQuery ? `"${searchQuery}"` : ''} {dietaryFilter !== 'all' ? `with ${dietaryFilter === 'veg' ? 'Vegetarian' : dietaryFilter === 'non_veg' ? 'Non-Vegetarian' : 'Egg'} filter` : ''} in this category.
                      </p>
                      <button
                        type="button"
                        className="menu-button"
                        onClick={() => {
                          setSearchQuery('');
                          setDietaryFilter('all');
                        }}
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </motion.section>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </section>
  );
}
