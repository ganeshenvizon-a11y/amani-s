/**
 * Amani — Verified Guest Reviews Content
 */

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  source: string;
  date?: string;
  dishMentioned?: string;
}

export const GUEST_REVIEWS_CONTENT = {
  label: '06 / AT THE TABLE',
  heading: 'In the words of our guests',
  intro: "The clearest expression of Amani's is often found in what people remember after the meal ends.",
  reviews: [
    {
      id: 'rev-01',
      quote: 'The Ghee Podi Idli took me straight back to Sunday mornings in Chennai. Restrained, deeply aromatic, and served in an atmosphere that makes you want to stay for hours.',
      author: 'Ananya Rao',
      source: 'Diner Review',
      date: 'July 2026',
      dishMentioned: 'Ghee Podi Idli',
    },
    {
      id: 'rev-02',
      quote: 'Finally a South Indian restaurant that treats regional cuisine with the quiet elegance it deserves. The Mysore Masala Dosa is crisp perfection.',
      author: 'Vikram & Priya Mehta',
      source: 'Google Review',
      date: 'June 2026',
      dishMentioned: 'Mysore Masala Dosa',
    },
    {
      id: 'rev-03',
      quote: 'We hosted a family gathering of fourteen here. The warmth of the hospitality and the rhythm of food coming fresh from the kitchen made everyone feel completely at home.',
      author: 'Srinivas Reddy',
      source: 'Verified Reservation Guest',
      date: 'May 2026',
      dishMentioned: "Amani's Banana Leaf Feast",
    },
    {
      id: 'rev-04',
      quote: 'The filter coffee in the brass davara tumbler at the end of the meal is non-negotiable. Pure nostalgic comfort.',
      author: 'Kavitha Sundaram',
      source: 'Food & Dining Guide',
      date: 'April 2026',
      dishMentioned: 'Filter Coffee',
    },
  ] as ReviewItem[],
};
