import { describe, it, expect } from 'vitest';
import {
  HERO_CONTENT,
  MOOD_FINDER_CONTENT,
  EXPERIENCES_CONTENT,
  SIGNATURE_DISHES_CONTENT,
  AMANI_WAY_CONTENT,
  INSIDE_AMANI_CONTENT,
  VISIT_PREVIEW_CONTENT,
  GATHERINGS_PREVIEW_CONTENT,
} from '../content/home';
import { GUEST_REVIEWS_CONTENT } from '../content/reviews';

describe('Homepage Content Structure', () => {
  it('should have valid Hero content', () => {
    expect(HERO_CONTENT.headline.split('\n')).toHaveLength(2);
    expect(HERO_CONTENT.image).toBeTruthy();
  });

  it('should have mood options in Mood Finder', () => {
    expect(MOOD_FINDER_CONTENT.moods.length).toBeGreaterThanOrEqual(5);
    expect(MOOD_FINDER_CONTENT.moods[0].title).toBe('Comfort from home');
  });

  it('should have 4 signature experiences', () => {
    expect(EXPERIENCES_CONTENT.experiences).toHaveLength(4);
  });

  it('should have 4 signature dishes', () => {
    expect(SIGNATURE_DISHES_CONTENT.dishes).toHaveLength(4);
    expect(SIGNATURE_DISHES_CONTENT.dishes[0].name).toBe('Ghee Podi Idli');
  });

  it('should have 3 principles in Amani Way', () => {
    expect(AMANI_WAY_CONTENT.principles).toHaveLength(3);
  });

  it('should have 5 gallery items in Inside Amani', () => {
    expect(INSIDE_AMANI_CONTENT.gallery).toHaveLength(5);
  });

  it('should have real reviews in Guest Reviews', () => {
    expect(GUEST_REVIEWS_CONTENT.reviews.length).toBeGreaterThan(0);
    expect(GUEST_REVIEWS_CONTENT.reviews[0].author).toBe('Ananya Rao');
  });

  it('should have Visit Preview and Gatherings Preview content', () => {
    expect(VISIT_PREVIEW_CONTENT.primaryCta).toBe('Get Directions');
    expect(GATHERINGS_PREVIEW_CONTENT.finalInvitation.heading).toBe('Meet us around the table');
  });
});
