import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { MENU_GROUPS } from '../../content/menu';
import { DietarySymbol } from '../../components/restaurant/DietarySymbol';

const INITIAL_ITEM_LIMIT = 10;

export function MenuCategories() {
  const reduceMotion = useReducedMotion();

  // Keep the first category ('soups') open by default
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const firstId = MENU_GROUPS[0]?.id || 'soups';
    return { [firstId]: true };
  });

  // Track how many items are visible per category group (default: 10)
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>({});

  const toggleGroup = useCallback((groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  }, []);

  const handleSeeMore = useCallback((groupId: string) => {
    setVisibleCounts(prev => ({
      ...prev,
      [groupId]: (prev[groupId] || INITIAL_ITEM_LIMIT) + INITIAL_ITEM_LIMIT,
    }));
  }, []);

  // Listen to hash changes (e.g., clicking sticky category links)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && MENU_GROUPS.some(g => g.id === hash)) {
        setOpenGroups(prev => ({
          ...prev,
          [hash]: true,
        }));
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <section id="menu-categories" className="menu-categories" aria-label="Amani menu categories">
      <div className="menu-container">
        {MENU_GROUPS.map((group, groupIndex) => {
          const isOpen = Boolean(openGroups[group.id]);
          const limit = visibleCounts[group.id] || INITIAL_ITEM_LIMIT;
          const visibleDishes = group.dishes.slice(0, limit);
          const hasMore = group.dishes.length > limit;
          const remainingCount = group.dishes.length - limit;

          return (
            <section
              id={group.id}
              className={`menu-group ${isOpen ? 'is-expanded' : 'is-collapsed'}`}
              key={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <button
                type="button"
                id={`${group.id}-trigger`}
                className="menu-group__trigger"
                aria-expanded={isOpen}
                aria-controls={`${group.id}-content`}
                onClick={() => toggleGroup(group.id)}
              >
                <div className="menu-group__trigger-left">
                  <span className="menu-group__number">{group.number}</span>
                  <div className="menu-group__head-info">
                    <div className="menu-group__title-row">
                      <h2 id={`${group.id}-title`}>{group.title}</h2>
                      <span className="menu-group__badge">{group.dishes.length} items</span>
                    </div>
                    <p>{group.note}</p>
                  </div>
                </div>
                <div className={`menu-group__chevron ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`${group.id}-content`}
                    role="region"
                    aria-labelledby={`${group.id}-trigger`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="menu-group__body"
                  >
                    <div className="menu-group__grid">
                      {visibleDishes.map((dish, index) => (
                        <motion.article
                          className="menu-dish"
                          key={dish.name}
                          initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: Math.min((groupIndex * 0.02) + index * 0.03, 0.25),
                          }}
                        >
                          <div className="menu-dish__content">
                            <div className="menu-dish__line">
                              <h3>{dish.name}</h3>
                              <span>{dish.price === null ? 'Ask our team' : `₹${dish.price}`}</span>
                            </div>
                            <DietarySymbol dietary={dish.dietary} showLabel />
                          </div>
                        </motion.article>
                      ))}
                    </div>

                    {hasMore && (
                      <div className="menu-group__footer">
                        <button
                          type="button"
                          className="menu-see-more-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSeeMore(group.id);
                          }}
                          aria-label={`See more items in ${group.title}`}
                        >
                          <span>See More ({remainingCount} remaining)</span>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          );
        })}
      </div>
    </section>
  );
}

