import { useState } from 'react';

const moods = [
  { name: 'Something comforting', suggestion: "Amani's South Veg Thali", image: '/media/images/thali/south-indian-thali.png' },
  { name: 'Bring the heat', suggestion: 'Chilli Chicken with Masala Cola', image: '/media/images/dish-chicken-majestic.jpg' },
  { name: 'Share the table', suggestion: 'Chicken Dum Biryani for the table', image: '/media/images/story/3.png' },
];

export function MoodFinder() {
  const [active, setActive] = useState(0); const mood = moods[active];
  return <section className="menu-mood" aria-labelledby="menu-mood-title"><div className="menu-container menu-mood__grid">
    <div><h2 id="menu-mood-title">Tell us what<br />you are <em>feeling.</em></h2><div className="menu-mood__options" role="tablist" aria-label="Choose a dining mood">{moods.map((item, index) => <button type="button" role="tab" aria-selected={active === index} key={item.name} onClick={() => setActive(index)}>{item.name}<span aria-hidden="true">↗</span></button>)}</div></div>
    <div className="menu-mood__answer"><img src={mood.image} alt="" loading="lazy" /><div><p>We would bring you</p><h3>{mood.suggestion}</h3><a href="#menu-categories" className="menu-link">Find it on the menu <span aria-hidden="true">→</span></a></div></div>
  </div></section>;
}
