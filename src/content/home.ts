/**
 * Amani — Homepage Content Definitions (Typed)
 */

export interface MoodItem {
  id: string;
  title: string;
  description: string;
  image: string;
  dishes: string[];
  menuLink: string;
}

export interface ExperienceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface SignatureDishItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  isVeg: boolean;
  spiceLevel?: 1 | 2 | 3;
  allergens?: string[];
  image: string;
  categoryLink: string;
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  label: string;
  title: string;
  caption: string;
  image: string;
  aspectRatio: '4:5' | '16:9' | '3:4' | '1:1';
}

export interface HeroSlideItem {
  image: string;
  alt: string;
  titleLines: string[];
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const HERO_CONTENT = {
  headline: 'FLAVOUR FROM FIRE.\nMEMORY FROM HOME.',
  image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=85&w=2000&auto=format&fit=crop',
  slides: [
    {
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=85&w=2000&auto=format&fit=crop',
      alt: 'Golden crisp Mysore masala dosa served with sambar and coconut chutneys',
      titleLines: ['Where every', 'gathering finds', 'its flavour'],
      description: "Rooted in the generous spirit of the South, Amani's brings fire, fragrance and thoughtful hospitality to every table.",
      ctaText: 'Explore gatherings',
      ctaLink: '/gatherings/',
    },
    {
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=85&w=2000&auto=format&fit=crop',
      alt: 'Authentic South Indian banana leaf feast with aromatic curries, rice, and papad',
      titleLines: ['Tradition served', 'on fresh', 'banana leaves'],
      description: 'Experience traditional communal feasting where rich curries, fragrant rice, and time-honored recipes come together in abundance.',
      ctaText: 'Explore gatherings',
      ctaLink: '/gatherings/',
    },
    {
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=85&w=2000&auto=format&fit=crop',
      alt: 'Warmly lit homely South Indian restaurant dining room with wood and brass accents',
      titleLines: ['An ambiance', 'built for slow', 'conversations'],
      description: 'Warm teak, brass details, and soft glow welcome you into a sanctuary designed for unhurried meals and shared memories.',
      ctaText: 'Explore gatherings',
      ctaLink: '/gatherings/',
    },
    {
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=85&w=2000&auto=format&fit=crop',
      alt: 'Fiery South Indian Chettinad spice roast curry prepared with fresh spices',
      titleLines: ['Crafted with', 'fire and roasted', 'Chettinad spices'],
      description: 'Freshly ground masalas, slow-simmered gravies, and vibrant heat bring the legendary culinary heritage of Tamil Nadu to life.',
      ctaText: 'Explore gatherings',
      ctaLink: '/gatherings/',
    },
    {
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=85&w=2000&auto=format&fit=crop',
      alt: 'Family and friends enjoying a shared South Indian meal together',
      titleLines: ['Moments that', 'become cherished', 'memories'],
      description: 'Gather your loved ones around overflowing platters, passing plates and celebrating life’s sweetest milestones around our table.',
      ctaText: 'Explore gatherings',
      ctaLink: '/gatherings/',
    },
  ] as HeroSlideItem[],
};

export const MOOD_FINDER_CONTENT = {
  heading: 'What feels right today?',
  description: 'Start with the mood. We will bring forward the flavours and dishes that belong to the moment.',
  moods: [
    {
      id: 'comfort',
      title: 'Comfort from home',
      description: 'Gentle, familiar flavours made for an easy and unhurried meal.',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Steaming Ven Pongal', 'Ghee Podi Idli', 'Classic Sambar Vadai'],
      menuLink: '/menu/#tiffin',
    },
    {
      id: 'lively',
      title: 'Crisp and lively',
      description: 'Dosas, vadas and bright accompaniments with texture and freshness.',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Mysore Masala Dosa', 'Paper Roast Dosa', 'Golden Medu Vadai'],
      menuLink: '/menu/#dosas',
    },
    {
      id: 'spicy',
      title: 'Bold and spicy',
      description: 'Deeper heat, roasted spices and flavours with a little more energy.',
      image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=84&w=1400&auto=format&fit=crop',
      dishes: ['Chettinad Spice Roast', 'Kara Podi Dosa', 'Pepper Roasted Mushroom'],
      menuLink: '/menu/#curries',
    },
    {
      id: 'share',
      title: 'Made to share',
      description: 'Plates for passing, tasting and bringing everyone into the meal.',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=84&w=1400&auto=format&fit=crop',
      dishes: ["Amani's Banana Leaf Feast", 'Family Tiffin Platter', 'Shared Curry Bowls'],
      menuLink: '/menu/#feasts',
    },
    {
      id: 'first',
      title: "My first time at Amani's",
      description: "A considered introduction to the dishes that represent Amani's best.",
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=84&w=1400&auto=format&fit=crop',
      dishes: ['Ghee Podi Idli', 'Mysore Masala Dosa', 'Filter Coffee'],
      menuLink: '/menu/#signatures',
    },
    {
      id: 'tiffin',
      title: 'Evening Tiffin & Kaapi',
      description: 'Aromatic filter coffee, golden vadas and hot savory tiffin for a slow afternoon.',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Filter Coffee', 'Golden Medu Vadai', 'Rava Onion Dosa'],
      menuLink: '/menu/#beverages',
    },
    {
      id: 'curries',
      title: 'Slow-cooked Curries',
      description: 'Rich coconut stew, roasted Malabar spices and layered coin parottas.',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Kerala Coconut Stew', 'Malabar Coin Parotta', 'Avial Platter'],
      menuLink: '/menu/#curries',
    },
    {
      id: 'desserts',
      title: 'Sweet & Nostalgic',
      description: 'Warm payasam, tender coconut and traditional sweets to close the meal.',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Elaneer Payasam', 'Badam Halwa', 'Filter Coffee Ice Cream'],
      menuLink: '/menu/#desserts',
    },
    {
      id: 'feast',
      title: 'Sunday Family Feast',
      description: 'An expansive spread served on fresh banana leaves for the whole family.',
      image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Royal Sadya Feast', 'Ghee Rice & Kurma', 'Pineapple Rasam'],
      menuLink: '/menu/#feasts',
    },
  ] as MoodItem[],
};

export const EXPERIENCES_CONTENT = {
  heading: 'Different ways to feel at home',
  intro: 'Every visit brings its own rhythm—from quiet cravings to shared family celebrations.',
  experiences: [
    {
      id: 'home-memory',
      number: '01',
      title: 'A meal that remembers home',
      description: 'Familiar South Indian flavours presented with care, clarity and thoughtful restraint.',
      image: '/media/images/experiences/exp-01.jpg',
    },
    {
      id: 'griddle-fresh',
      number: '02',
      title: 'From the griddle to the table',
      description: 'The sound, aroma and immediacy of crisp dosas and hot tiffin prepared to order.',
      image: '/media/images/experiences/exp-02.jpg',
    },
    {
      id: 'family-table',
      number: '03',
      title: 'The shared family table',
      description: 'Plates designed for passing, tasting and letting the meal unfold through conversation.',
      image: '/media/images/experiences/exp-03.jpg',
    },
    {
      id: 'gatherings',
      number: '04',
      title: 'Moments worth gathering for',
      description: 'A warm setting for birthdays, milestones and occasions that deserve extra care.',
      image: '/media/images/experiences/exp-04.jpg',
    },
    {
      id: 'intimate-setting',
      number: '05',
      title: 'An intimate setting for every mood',
      description: 'Warm banquette seating and handcrafted brass details that set a tranquil pace.',
      image: '/media/images/experiences/exp-05.jpg',
    },
  ] as ExperienceItem[],
};

export const SIGNATURE_DISHES_CONTENT = {
  heading: 'Flavours that stay with you',
  intro: 'A small selection of dishes that express the kitchen’s point of view—familiar at heart, prepared with intention and made for the present moment.',
  dishes: [
    {
      id: 'ghee-podi-idli',
      name: 'Ghee Podi Idli',
      description: 'Fluffy steamed rice cakes tossed in coarse roasted crimson spice mix and hot aromatic ghee. Served with coconut chutney.',
      price: '₹240',
      isVeg: true,
      spiceLevel: 2,
      allergens: ['Dairy', 'Nuts'],
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop',
      categoryLink: '/menu/#tiffin',
    },
    {
      id: 'mysore-masala-dosa',
      name: 'Mysore Masala Dosa',
      description: 'Thin, golden crisp rice crepe lined with spicy red garlic chutney and filled with seasoned potato masala.',
      price: '₹290',
      isVeg: true,
      spiceLevel: 2,
      allergens: ['Dairy'],
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop',
      categoryLink: '/menu/#dosas',
    },
    {
      id: 'traditional-filter-coffee',
      name: 'South Indian Filter Coffee',
      description: 'Dark roasted South Indian coffee beans brewed through a brass drip filter, frothed with hot milk in a traditional davara tumbler.',
      price: '₹140',
      isVeg: true,
      allergens: ['Dairy'],
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
      categoryLink: '/menu/#beverages',
    },
    {
      id: 'elaneer-payasam',
      name: 'Elaneer Payasam',
      description: 'Delicate tender coconut milk dessert subtly infused with cardamom and topped with toasted golden cashews.',
      price: '₹260',
      isVeg: true,
      allergens: ['Nuts', 'Coconut'],
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop',
      categoryLink: '/menu/#desserts',
    },
  ] as SignatureDishItem[],
  ctaText: 'Explore the Full Menu',
  ctaLink: '/menu/',
};

export const AMANI_WAY_CONTENT = {
  heading: 'Thoughtful in every detail',
  body: 'We believe hospitality is felt in the details: food prepared with attention, a welcome that feels natural, thoughtful recommendations and a room where every table can find its own rhythm.',
  principles: [
    {
      number: '01',
      title: 'Recipes with memory',
      description: 'Familiar flavours should retain the comfort and clarity that made people love them in the first place.',
    },
    {
      number: '02',
      title: 'Prepared with intention',
      description: 'Every element should have a reason to be present, from the tempering of spices to the final service.',
    },
    {
      number: '03',
      title: 'Hospitality like home',
      description: 'Attentive when needed, unhurried where it matters and always respectful of the table.',
    },
  ] as PrincipleItem[],
  ctaText: "Discover the Amani's Story",
  ctaLink: '/stories/',
};

export const INSIDE_AMANI_CONTENT = {
  heading: 'Where the atmosphere takes shape',
  body: 'Light, texture, movement and the quiet energy of a room coming alive—from the first table prepared to the final conversation of the evening.',
  gallery: [
    {
      id: 'space',
      label: 'The Space',
      title: 'Warm Teak & Plaster',
      caption: 'Quiet corners designed for slow dining and easy conversation.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
      aspectRatio: '4:5',
    },
    {
      id: 'kitchen',
      label: 'The Kitchen',
      title: 'Heat & Precision',
      caption: 'The steady sizzle of the griddle and tempering spices.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
      aspectRatio: '16:9',
    },
    {
      id: 'table',
      label: 'At the Table',
      title: 'Prepared for Gathering',
      caption: 'Handcrafted stoneware, woven cloth, and natural light.',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1200&auto=format&fit=crop',
      aspectRatio: '3:4',
    },
    {
      id: 'details',
      label: 'The Details',
      title: 'Curry Leaves & Brass',
      caption: 'Sensory accents that root our kitchen in tradition.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop',
      aspectRatio: '1:1',
    },
    {
      id: 'evening',
      label: 'The Evening',
      title: 'Golden Glow',
      caption: 'As sun sets, warm lantern light transforms the room.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
      aspectRatio: '4:5',
    },
  ] as GalleryItem[],
  ctaText: 'Step Inside',
  ctaLink: '/visit/',
};

export const VISIT_PREVIEW_CONTENT = {
  heading: 'Come find your table.',
  description: 'Find us in Jubilee Hills. Check today’s hours, get directions or call before you arrive.',
  image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
  primaryCta: 'GET DIRECTIONS',
};

export const GATHERINGS_PREVIEW_CONTENT = {
  heading: 'Made to gather.',
  body: 'From family dinners to meaningful celebrations, we make room for the moments worth sharing.',
  occasions: [
    { label: 'Family celebrations', path: '/gatherings/#family' },
    { label: 'Intimate dinners', path: '/gatherings/#intimate' },
    { label: 'Milestones', path: '/gatherings/#milestones' },
  ],
  image: '/media/images/happy-south-indian-dining.png',
  primaryCta: 'PLAN A GATHERING',
  primaryCtaLink: '/gatherings/',
  secondaryCta: 'Explore the Spaces',
  secondaryCtaLink: '/gatherings/#spaces',
  
  finalInvitation: {
    heading: 'Meet us around the table',
    description: "Choose the time, bring the people and let the rest of the meal unfold at Amani's.",
    ctaText: 'Reserve a Table',
    ctaLink: '/visit/#reserve',
  },
};
