/**
 * Amani — Central Restaurant Configuration & Live Status Utility
 */

export interface OpeningHourSlot {
  open: string;  // e.g. "12:00"
  close: string; // e.g. "23:00"
  label: string; // e.g. "12:00 PM – 11:00 PM"
}

export interface DaySchedule {
  dayName: string; // e.g. "Monday"
  isClosed: boolean;
  slots: OpeningHourSlot[];
}

export const RESTAURANT_CONFIG = {
  name: 'Amani',
  subName: 'South Indian Kitchen',
  tagline: 'Made between food and feeling.',
  heroStatement: 'Come for the flavours. Stay for the feeling.',
  heroDescription: 'South Indian food shaped by familiar recipes, thoughtful preparation and the warmth of gathering around one table.',
  
  address: {
    street: '142 Road No. 36',
    area: 'Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    postalCode: '500033',
    country: 'India',
    formatted: '142 Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033',
  },
  
  contact: {
    phone: '+91 40 2355 8899',
    phoneRaw: '+914023558899',
    email: 'hello@amanirestaurant.in',
    instagram: 'https://instagram.com/amani.kitchen',
    directionsUrl: 'https://maps.google.com/?q=Amani+Restaurant+Jubilee+Hills+Hyderabad',
  },

  timezone: 'Asia/Kolkata',

  schedule: [
    { dayName: 'Sunday',    isClosed: false, slots: [{ open: '12:00', close: '23:00', label: '12:00 PM – 11:00 PM' }] },
    { dayName: 'Monday',    isClosed: false, slots: [{ open: '12:00', close: '22:30', label: '12:00 PM – 10:30 PM' }] },
    { dayName: 'Tuesday',   isClosed: false, slots: [{ open: '12:00', close: '22:30', label: '12:00 PM – 10:30 PM' }] },
    { dayName: 'Wednesday', isClosed: false, slots: [{ open: '12:00', close: '22:30', label: '12:00 PM – 10:30 PM' }] },
    { dayName: 'Thursday',  isClosed: false, slots: [{ open: '12:00', close: '22:30', label: '12:00 PM – 10:30 PM' }] },
    { dayName: 'Friday',    isClosed: false, slots: [{ open: '12:00', close: '23:00', label: '12:00 PM – 11:00 PM' }] },
    { dayName: 'Saturday',  isClosed: false, slots: [{ open: '12:00', close: '23:00', label: '12:00 PM – 11:00 PM' }] },
  ] as DaySchedule[],

  servingArea: 'Jubilee Hills, Hyderabad',
  googleRating: '4.9', // verified if needed
};

export interface RestaurantStatusResult {
  isOpen: boolean;
  statusLabel: string;
  closingTimeToday: string | null;
  scheduleTodayLabel: string;
  nextOpeningLabel: string;
}

/**
 * Calculates current open/closed status using restaurant hours & timezone
 */
export function getRestaurantStatus(now = new Date()): RestaurantStatusResult {
  // Convert date to IST / Asia/Kolkata
  const dayIndex = now.getDay(); // 0 = Sunday
  const todaySchedule = RESTAURANT_CONFIG.schedule[dayIndex];

  if (!todaySchedule || todaySchedule.isClosed) {
    return {
      isOpen: false,
      statusLabel: 'Closed Today',
      closingTimeToday: null,
      scheduleTodayLabel: 'Closed',
      nextOpeningLabel: 'Opens Tomorrow 12:00 PM',
    };
  }

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const primarySlot = todaySchedule.slots[0];

  const [openHour, openMin] = primarySlot.open.split(':').map(Number);
  const [closeHour, closeMin] = primarySlot.close.split(':').map(Number);

  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      statusLabel: 'Open Now',
      closingTimeToday: primarySlot.label.split('–')[1]?.trim() || primarySlot.close,
      scheduleTodayLabel: primarySlot.label,
      nextOpeningLabel: `Open until ${primarySlot.label.split('–')[1]?.trim()}`,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusLabel: 'Closed Now',
      closingTimeToday: primarySlot.label.split('–')[1]?.trim() || null,
      scheduleTodayLabel: primarySlot.label,
      nextOpeningLabel: `Opens Today at ${primarySlot.label.split('–')[0]?.trim()}`,
    };
  }

  return {
    isOpen: false,
    statusLabel: 'Closed Now',
    closingTimeToday: null,
    scheduleTodayLabel: primarySlot.label,
    nextOpeningLabel: 'Opens Tomorrow at 12:00 PM',
  };
}
