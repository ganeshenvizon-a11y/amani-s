import { useState, type FormEvent } from 'react';
import { Reveal } from '../../components/motion/Reveal';

type CateringFields = {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  venue: string;
  eventType: string;
  mealType: string;
  preference: string;
  service: string;
  notes: string;
};

const EMPTY: CateringFields = {
  name: '',
  phone: '',
  email: '',
  date: '',
  guests: '',
  venue: '',
  eventType: 'Family ceremony',
  mealType: 'Lunch',
  preference: 'Vegetarian',
  service: 'Food with service staff',
  notes: '',
};

const EVENT_TYPES = ['Family ceremony', 'Wedding or engagement', 'Corporate event', 'Social celebration', 'Other'];
const MEAL_TYPES = ['Breakfast / Tiffin', 'Lunch', 'Dinner', 'Full-day service'];
const PREFERENCES = ['Vegetarian', 'Non-vegetarian', 'Both'];
const SERVICES = ['Food only', 'Food with service staff', 'Full setup & counter service'];

export function EnquiryForm() {
  const [fields, setFields] = useState<CateringFields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof CateringFields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="cater-enquiry" aria-labelledby="cater-enquiry-title">
      <div id="quote" />
      <div className="cater-container cater-enquiry__grid">
        <Reveal className="cater-enquiry__intro">
          <h2 id="cater-enquiry-title">Request a <em>Quote.</em></h2>
          <p>Share a few details about your upcoming occasion and our team will get in touch to discuss menus and logistics.</p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="cater-form" role="status" aria-live="polite">
              <div className="cater-form__success">
                <span className="cater-form__success-mark" aria-hidden="true">✓</span>
                <h3>Quote request received</h3>
                <p>
                  Thank you{fields.name ? `, ${fields.name.split(' ')[0]}` : ''}. Our catering team will contact you within 24 hours to discuss your event.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="cater-button"
                  style={{ marginTop: '1rem', alignSelf: 'center' }}
                >
                  Submit another request
                </button>
              </div>
            </div>
          ) : (
            <form className="cater-form" onSubmit={handleSubmit} noValidate={false}>
              <div className="cater-form__grid">
                <div className="cater-field">
                  <label htmlFor="cater-name">Name</label>
                  <input id="cater-name" name="name" type="text" autoComplete="name" required value={fields.name} onChange={update('name')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-phone">Phone number</label>
                  <input id="cater-phone" name="phone" type="tel" autoComplete="tel" required value={fields.phone} onChange={update('phone')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-email">Email</label>
                  <input id="cater-email" name="email" type="email" autoComplete="email" required value={fields.email} onChange={update('email')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-date">Date of event</label>
                  <input id="cater-date" name="date" type="date" required value={fields.date} onChange={update('date')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-guests">Guest count</label>
                  <input id="cater-guests" name="guests" type="number" min="1" inputMode="numeric" required value={fields.guests} onChange={update('guests')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-venue">Venue / Location</label>
                  <input id="cater-venue" name="venue" type="text" placeholder="e.g. Jubilee Hills, Hyderabad" value={fields.venue} onChange={update('venue')} />
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-eventType">Event type</label>
                  <select id="cater-eventType" name="eventType" value={fields.eventType} onChange={update('eventType')}>
                    {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-mealType">Meal type</label>
                  <select id="cater-mealType" name="mealType" value={fields.mealType} onChange={update('mealType')}>
                    {MEAL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-preference">Food Preference</label>
                  <select id="cater-preference" name="preference" value={fields.preference} onChange={update('preference')}>
                    {PREFERENCES.map((p) => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="cater-field">
                  <label htmlFor="cater-service">Service requirement</label>
                  <select id="cater-service" name="service" value={fields.service} onChange={update('service')}>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="cater-field cater-field--full">
                  <label htmlFor="cater-notes">Notes <span>(optional — dietary requirements, special requests)</span></label>
                  <textarea id="cater-notes" name="notes" rows={4} value={fields.notes} onChange={update('notes')} />
                </div>
              </div>
              <div className="cater-form__actions">
                <button type="submit" className="cater-button">Request Quote <span aria-hidden="true">→</span></button>
                <p className="cater-form__note">We respond within 24 hours.</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
