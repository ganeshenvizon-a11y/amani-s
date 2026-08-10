/**
 * Section 04 — Thali Experience
 * Compact, minimal UI dietary-choice panel with tactile hover reveal of the thali.
 * Uses Manrope & Clash Display typography.
 */

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { NavLink } from 'react-router-dom';

type ThaliChoice = {
  id: 'vegetarian' | 'non-vegetarian' | 'jain';
  label: string;
  title: string;
  description: string;
  items: string[];
};

const THALI_CHOICES: ThaliChoice[] = [
  {
    id: 'vegetarian',
    label: 'VEGETARIAN',
    title: 'A generous garden table.',
    description: 'Seasonal vegetables, slow-cooked dal, sambar and fresh chutneys.',
    items: [
      'Sona Masoori Rice',
      'Slow-Cooked Dal & Sambar',
      'Seasonal Poriyal & Aviyal',
      'Homestyle Pepper Rasam & Curd',
      'Fresh Coconut & Tomato Chutneys',
      'Crisp Appalam & Elaneer Payasam',
    ],
  },
  {
    id: 'non-vegetarian',
    label: 'NON-VEG',
    title: 'Deeply spiced & coastal.',
    description: 'Coastal curries, roasted meats and cooling accompaniments balanced with rice.',
    items: [
      'Coastal Fish Curry & Ghee Rice',
      'Chettinad Chicken Pepper Fry',
      'Slow-Cooked Mutton Roast',
      'Crab Milagu Masala Curry',
      'House Special Sambar & Egg Gravy',
      'Malabar Parotta & Payasam',
    ],
  },
  {
    id: 'jain',
    label: 'JAIN',
    title: 'Thoughtfully prepared.',
    description: 'Made without onion or garlic, with equal generosity, warmth and texture.',
    items: [
      'Fragrant Steamed Basmati Rice',
      'Tuvar Dal Sambar (No Onion/Garlic)',
      'Raw Banana & Beans Poriyal',
      'Fresh Coconut & Curry Leaf Chutney',
      'Cumin Pepper Rasam & Curd',
      'Crisp Appalam & Traditional Payasam',
    ],
  },
];

const DYNAMIC_WORDS = ['Style', 'Way', 'Taste'] as const;
const WORD_DELAYS = [3200, 2600, 2600] as const;

export function ThaliExperience() {
  const stageRef = useRef<HTMLDivElement>(null);
  const lensFrameRef = useRef<number | null>(null);
  const lensTargetRef = useRef({ x: 50, y: 50 });
  const lensCurrentRef = useRef({ x: 50, y: 50 });
  const [activeChoice, setActiveChoice] = useState<ThaliChoice>(THALI_CHOICES[0]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [wordIndex, setWordIndex] = useState(0);
  const [wordState, setWordState] = useState<'idle' | 'leaving' | 'entering'>('idle');

  // Hover-reveal is a pointer interaction — enable it only on devices that can
  // actually hover (desktop). On touch (mobile/tablet) the thali shows in full.
  const [canHover, setCanHover] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  const animateLens = () => {
    const stage = stageRef.current;
    if (!stage) {
      lensFrameRef.current = null;
      return;
    }

    const current = lensCurrentRef.current;
    const target = lensTargetRef.current;
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    stage.style.setProperty('--thali-lens-x', `${current.x}%`);
    stage.style.setProperty('--thali-lens-y', `${current.y}%`);

    if (Math.abs(target.x - current.x) > 0.04 || Math.abs(target.y - current.y) > 0.04) {
      lensFrameRef.current = requestAnimationFrame(animateLens);
      return;
    }

    current.x = target.x;
    current.y = target.y;
    stage.style.setProperty('--thali-lens-x', `${target.x}%`);
    stage.style.setProperty('--thali-lens-y', `${target.y}%`);
    lensFrameRef.current = null;
  };

  const startLensAnimation = () => {
    if (lensFrameRef.current === null) {
      lensFrameRef.current = requestAnimationFrame(animateLens);
    }
  };

  const setLensPosition = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;

    const bounds = stage.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    lensTargetRef.current = {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    };
    startLensAnimation();
  };

  useEffect(() => () => {
    if (lensFrameRef.current !== null) cancelAnimationFrame(lensFrameRef.current);
  }, []);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => {
      setCanHover(query.matches);
      if (!query.matches) setIsRevealing(false);
    };
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let timerId: ReturnType<typeof setTimeout>;
    let transitionTimerId: ReturnType<typeof setTimeout>;

    const scheduleNext = (currentIndex: number) => {
      const delay = WORD_DELAYS[currentIndex] ?? 3000;
      timerId = setTimeout(() => {
        setWordState('leaving');

        transitionTimerId = setTimeout(() => {
          const nextIndex = (currentIndex + 1) % DYNAMIC_WORDS.length;
          setWordIndex(nextIndex);
          setWordState('entering');

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setWordState('idle');
              scheduleNext(nextIndex);
            });
          });
        }, 320);
      }, delay);
    };

    scheduleNext(0);

    return () => {
      clearTimeout(timerId);
      clearTimeout(transitionTimerId);
    };
  }, []);

  const selectChoice = (choice: ThaliChoice) => {
    if (choice.id === activeChoice.id) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveChoice(choice);
      setIsTransitioning(false);
    }, 180);
  };

  return (
    <section className="thali-experience" aria-labelledby="thali-experience-heading">
      <div className="thali-experience__shell">

        <div className="thali-experience__content">

          <h2
            id="thali-experience-heading"
            className="thali-experience__heading"
          >
            One table.<br />
            Your{' '}
            <span className="thali-experience__dynamic-wrap">
              <span className={`thali-experience__word--dynamic is-${wordState}`}>
                {DYNAMIC_WORDS[wordIndex]}
              </span>
              <span className="thali-experience__period">.</span>
            </span>
          </h2>

          <div
            className="thali-experience__tabs-wrapper"
            role="tablist"
            aria-label="Choose a meal preference"
          >
            <div className="thali-experience__tabs">
              {THALI_CHOICES.map((choice) => {
                const isActive = choice.id === activeChoice.id;
                return (
                  <button
                    className={`thali-tab ${isActive ? 'is-active' : ''}`}
                    key={choice.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => selectChoice(choice)}
                  >
                    <span>{choice.label}</span>
                    {isActive && <span className="thali-tab__indicator" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <div className="thali-experience__tabs-line" aria-hidden="true" />
          </div>

          <div className={`thali-experience__detail ${isTransitioning ? 'is-transitioning' : ''}`} aria-live="polite">
            <h3 className="thali-experience__detail-heading">
              {activeChoice.title}
            </h3>

            <p className="thali-experience__detail-body">
              {activeChoice.description}
            </p>

            <ul className="thali-experience__items-list" aria-label="Top 6 items included">
              {activeChoice.items.map((item, idx) => (
                <li key={idx} className="thali-experience__item">
                  <span className="thali-experience__item-bullet" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <NavLink className="thali-experience__cta" to="/menu/">
            <span>EXPLORE FOR MORE OPTIONS</span>
            <span className="thali-experience__cta-line" aria-hidden="true" />
          </NavLink>
        </div>

        <div
          ref={stageRef}
          className={`thali-reveal-stage ${canHover ? '' : 'is-touch'} ${isRevealing ? 'is-revealing' : ''}`}
          {...(canHover
            ? {
                onPointerEnter: (event: PointerEvent<HTMLDivElement>) => { setLensPosition(event); setIsRevealing(true); },
                onPointerMove: setLensPosition,
                onPointerLeave: () => setIsRevealing(false),
                onPointerDown: (event: PointerEvent<HTMLDivElement>) => { setLensPosition(event); setIsRevealing(true); },
                onFocus: () => setIsRevealing(true),
                onBlur: () => setIsRevealing(false),
                tabIndex: 0,
                role: 'img',
                'aria-label': 'An empty brass thali reveals a complete South Indian feast as you hover',
              }
            : {
                onClick: () => setIsRevealing((revealed) => !revealed),
                onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setIsRevealing((revealed) => !revealed);
                  }
                },
                tabIndex: 0,
                role: 'button',
                'aria-pressed': isRevealing,
                'aria-label': isRevealing
                  ? 'Hide the thali'
                  : 'Tap to reveal the complete South Indian feast',
              })}
        >
          <img className="thali-reveal-stage__image" src="/media/images/thali/empty-plate.png" alt="" />
          <img className="thali-reveal-stage__image thali-reveal-stage__image--full" src="/media/images/thali/south-indian-thali.png" alt="" />
          {canHover && <span className="thali-reveal-stage__lens" aria-hidden="true" />}
          <p className="thali-reveal-stage__hint">
            <span className="thali-reveal-stage__hint-icon" aria-hidden="true">+</span>
            {canHover
              ? (isRevealing ? 'A FEAST, REVEALED' : 'HOVER TO REVEAL THE THALI')
              : (isRevealing ? 'A FEAST, REVEALED' : 'TAP TO REVEAL THE THALI')}
          </p>
          <span className="thali-reveal-stage__caption">THE AMANI'S THALI</span>
        </div>

      </div>
    </section>
  );
}

