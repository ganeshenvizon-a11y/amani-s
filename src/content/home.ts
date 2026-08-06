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

export const HERO_CONTENT = {
  headline: 'FLAVOUR FROM FIRE.\nMEMORY FROM HOME.',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop',
};

export const MOOD_FINDER_CONTENT = {
  label: '01 / CHOOSE BY FEELING',
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
      image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Chettinad Spice Roast', 'Kara Podi Dosa', 'Pepper Roasted Mushroom'],
      menuLink: '/menu/#curries',
    },
    {
      id: 'share',
      title: 'Made to share',
      description: 'Plates for passing, tasting and bringing everyone into the meal.',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Amani Banana Leaf Feast', 'Family Tiffin Platter', 'Shared Curry Bowls'],
      menuLink: '/menu/#feasts',
    },
    {
      id: 'first',
      title: 'My first time at Amani',
      description: 'A considered introduction to the dishes that represent Amani best.',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
      dishes: ['Ghee Podi Idli', 'Mysore Masala Dosa', 'Filter Coffee'],
      menuLink: '/menu/#signatures',
    },
  ] as MoodItem[],
};

export const EXPERIENCES_CONTENT = {
  label: '02 / SIGNATURE EXPERIENCES',
  heading: 'Different ways to feel at home',
  intro: 'Some visits begin with a craving. Others begin with a conversation, a family plan or a table that simply feels right.',
  experiences: [
    {
      id: 'home-memory',
      number: '01',
      title: 'A meal that remembers home',
      description: 'Familiar South Indian flavours presented with care, clarity and enough restraint to let every ingredient remain recognisable.',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'griddle-fresh',
      number: '02',
      title: 'From the griddle to the table',
      description: 'The sound, aroma and immediacy of dishes prepared fresh and served at their best.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'family-table',
      number: '03',
      title: 'The shared family table',
      description: 'Food designed for passing, tasting and letting the meal unfold through conversation.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    },
    {
      id: 'gatherings',
      number: '04',
      title: 'Moments worth gathering for',
      description: 'A warm setting for birthdays, family meals and the occasions that deserve a little more attention.',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop',
    },
  ] as ExperienceItem[],
};

export const SIGNATURE_DISHES_CONTENT = {
  label: '03 / FROM THE KITCHEN',
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
  label: '04 / THE AMANI WAY',
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
  ctaText: 'Discover the Amani Story',
  ctaLink: '/stories/',
};

export const INSIDE_AMANI_CONTENT = {
  label: '05 / INSIDE AMANI',
  heading: 'Where the atmosphere takes shape',
  body: 'Light, texture, movement and the quiet energy of a room coming alive—from the first table prepared to the final conversation of the evening.',
  gallery: [
    {
      id: 'space',
      label: 'The Space',
      title: 'Warm Teak & Plaster',
      caption: 'Quiet corners designed for slow dining and easy conversation.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1200&auto=format&fit=crop',
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
  label: '07 / VISIT AMANI',
  heading: 'Your table is closer than you think',
  description: 'Plan your route, check today’s opening status or speak with the team before your visit.',
  image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?q=80&w=1200&auto=format&fit=crop',
  primaryCta: 'Get Directions',
  secondaryCta: 'View Visit Information',
  secondaryCtaLink: '/visit/',
};

export const GATHERINGS_PREVIEW_CONTENT = {
  label: '08 / GATHERINGS',
  heading: 'Made for more than an ordinary meal',
  body: 'From intimate family dinners to larger celebrations, Amani creates gatherings around good food, considered service and a setting that feels naturally special.',
  occasions: [
    { label: 'Family celebrations', path: '/gatherings/#family' },
    { label: 'Intimate dinners', path: '/gatherings/#intimate' },
    { label: 'Birthdays and milestones', path: '/gatherings/#milestones' },
  ],
  image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1200&auto=format&fit=crop',
  primaryCta: 'Plan a Gathering',
  primaryCtaLink: '/gatherings/',
  secondaryCta: 'Explore the Spaces',
  secondaryCtaLink: '/gatherings/#spaces',
  
  finalInvitation: {
    heading: 'Meet us around the table',
    description: 'Choose the time, bring the people and let the rest of the meal unfold at Amani.',
    ctaText: 'Reserve a Table',
    ctaLink: '/visit/#reserve',
  },
};
