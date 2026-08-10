/**
 * Amani — SEO Metadata and Structured Data (JSON-LD)
 */
import { RESTAURANT_CONFIG } from './restaurant';

export const SEO_CONFIG = {
  defaultTitle: "Amani's — South Indian Restaurant in Jubilee Hills, Hyderabad",
  defaultDescription: "Discover Amani's in Jubilee Hills, Hyderabad—South Indian food shaped by familiar recipes, genuine hospitality and a warm setting for everyday meals and meaningful gatherings.",
  siteUrl: 'https://amanirestaurant.in',
  ogImage: 'https://amanirestaurant.in/og/amani-og.jpg',
};

export function getRestaurantJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    'name': RESTAURANT_CONFIG.name,
    'image': SEO_CONFIG.ogImage,
    '@id': SEO_CONFIG.siteUrl,
    'url': SEO_CONFIG.siteUrl,
    'telephone': RESTAURANT_CONFIG.contact.phone,
    'priceRange': '₹₹',
    'servesCuisine': ['South Indian', 'Indian'],
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': RESTAURANT_CONFIG.address.street,
      'addressLocality': RESTAURANT_CONFIG.address.area,
      'addressRegion': RESTAURANT_CONFIG.address.city,
      'postalCode': RESTAURANT_CONFIG.address.postalCode,
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 17.4319,
      'longitude': 78.4071,
    },
    'openingHoursSpecification': RESTAURANT_CONFIG.schedule.map(s => ({
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': s.dayName,
      'opens': s.slots[0]?.open || '12:00',
      'closes': s.slots[0]?.close || '22:30',
    })),
    'menu': `${SEO_CONFIG.siteUrl}/menu/`,
    'acceptsReservations': 'True',
  };
}
