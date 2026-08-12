import { DietarySymbol } from '../../components/restaurant/DietarySymbol';

export function DietaryInformation() {
  return (
    <section id="dietary" className="menu-dietary" aria-labelledby="dietary-title">
      <div className="menu-container menu-dietary__grid">
        <div>
          <h2 id="dietary-title">
            Made for every<br />
            <em>place at the table.</em>
          </h2>
        </div>
        <div className="menu-dietary__list">
          <article>
            <DietarySymbol dietary="veg" showLabel />
            <p>Vegetarian dishes are marked with the official green dot in a square symbol throughout the menu.</p>
          </article>
          <article>
            <DietarySymbol dietary="non_veg" showLabel />
            <p>Meat and seafood dishes are marked with the official red dot in a square symbol throughout the menu.</p>
          </article>
          <article>
            <DietarySymbol dietary="egg" showLabel />
            <p>Egg dishes are marked separately with the official amber dot in a square symbol.</p>
          </article>
          <article>
            <span>✦</span>
            <p>Please share allergies or dietary needs with our team before ordering.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
