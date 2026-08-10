export function DietaryInformation() {
  return <section id="dietary" className="menu-dietary" aria-labelledby="dietary-title"><div className="menu-container menu-dietary__grid">
    <div><p className="menu-eyebrow">Good to know / 03</p><h2 id="dietary-title">Made for every<br /><em>place at the table.</em></h2></div>
    <div className="menu-dietary__list"><article><i className="menu-diet menu-diet--veg">Vegetarian</i><p>Vegetarian dishes are marked throughout the menu.</p></article><article><i className="menu-diet menu-diet--non_veg">Non-vegetarian</i><p>Meat and seafood dishes are marked throughout the menu.</p></article><article><i className="menu-diet menu-diet--egg">Contains egg</i><p>Egg dishes are marked separately from vegetarian and non-vegetarian choices.</p></article><article><span>✦</span><p>Please share allergies or dietary needs with our team before ordering.</p></article></div>
  </div></section>;
}
