import { describe, it, expect } from 'vitest';
import { getRestaurantStatus, RESTAURANT_CONFIG } from '../config/restaurant';

describe('Restaurant Status Calculation', () => {
  it('should calculate open status correctly during open hours', () => {
    // 2:00 PM IST (14:00) on Wednesday
    const openTime = new Date('2026-08-05T14:00:00+05:30');
    const status = getRestaurantStatus(openTime);

    expect(status.isOpen).toBe(true);
    expect(status.statusLabel).toBe('Open Now');
    expect(status.closingTimeToday).toBeDefined();
  });

  it('should calculate closed status correctly outside operating hours', () => {
    // 4:00 AM IST (04:00) on Wednesday
    const closedTime = new Date('2026-08-05T04:00:00+05:30');
    const status = getRestaurantStatus(closedTime);

    expect(status.isOpen).toBe(false);
    expect(status.statusLabel).toBe('Closed Now');
  });

  it('should have valid restaurant config properties', () => {
    expect(RESTAURANT_CONFIG.name).toBe("Amani's");
    expect(RESTAURANT_CONFIG.address.city).toBe('Hyderabad');
    expect(RESTAURANT_CONFIG.contact.phone).toBe('+91 40 2355 8899');
  });
});
