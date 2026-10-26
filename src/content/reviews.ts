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
      quote: 'The Gongura Mutton Biryani took me straight back to Sunday lunches at home. Tangy, deeply aromatic, and served in an atmosphere that makes you want to stay for hours.',
      author: 'Ananya Rao',
      source: 'Diner Review',
      date: 'July 2026',
      dishMentioned: 'Gongura Mutton Biryani',
    },
    {
      id: 'rev-02',
      quote: 'Finally a South Indian restaurant that treats regional cuisine with the quiet elegance it deserves. The Ulavacharu Chicken Biryani is perfection.',
      author: 'Vikram & Priya Mehta',
      source: 'Google Review',
      date: 'June 2026',
      dishMentioned: 'Ulavacharu Chicken Biryani',
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
      quote: 'The Qubani ka Meetha at the end of the meal is non-negotiable. Pure Hyderabadi comfort.',
      author: 'Kavitha Sundaram',
      source: 'Food & Dining Guide',
      date: 'April 2026',
      dishMentioned: 'Qubani Ka Meetha',
    },
  ] as ReviewItem[],
};
