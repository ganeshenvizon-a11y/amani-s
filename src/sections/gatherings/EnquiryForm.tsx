import { useState, type FormEvent } from 'react';
import { Reveal } from '../../components/motion/Reveal';

type EnquiryFields = {
  name: string;
  phone: string;
  email: string;
  date: string;
  guests: string;
  occasion: string;
  message: string;
};

const EMPTY: EnquiryFields = {
  name: '',
  phone: '',
  email: '',
  date: '',
  guests: '',
  occasion: '',
  message: '',
};

const OCCASIONS = ['Birthday', 'Wedding', 'Corporate', 'Family Celebration', 'Other'];

export function EnquiryForm() {
  const [fields, setFields] = useState<EnquiryFields>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof EnquiryFields) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setFields((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // No backend yet — capture the enquiry client-side and confirm to the guest.
    // Wire this to the enquiry service / email endpoint when it's available.
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="gath-enquiry" aria-labelledby="gath-enquiry-title">
      <div className="gath-container gath-enquiry__grid">
        <Reveal className="gath-enquiry__intro">
          <h2 id="gath-enquiry-title">Start <em>planning.</em></h2>
          <p>Tell us a little about what you&rsquo;re celebrating, and we&rsquo;ll take it from there.</p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="gath-form" role="status" aria-live="polite">
              <div className="gath-form__success">
                <span className="gath-form__success-mark" aria-hidden="true">✓</span>
                <h3>Enquiry received</h3>
                <p>Thank you{fields.name ? `, ${fields.name.split(' ')[0]}` : ''}. We&rsquo;ll be in touch within 24 hours to plan the details.</p>
              </div>
            </div>
          ) : (
            <form className="gath-form" onSubmit={handleSubmit} noValidate={false}>
              <div className="gath-form__grid">
                <div className="gath-field">
                  <label htmlFor="gath-name">Name</label>
                  <input id="gath-name" name="name" type="text" autoComplete="name" required value={fields.name} onChange={update('name')} />
                </div>
                <div className="gath-field">
                  <label htmlFor="gath-phone">Phone number</label>
                  <input id="gath-phone" name="phone" type="tel" autoComplete="tel" required value={fields.phone} onChange={update('phone')} />
                </div>
                <div className="gath-field">
                  <label htmlFor="gath-email">Email</label>
                  <input id="gath-email" name="email" type="email" autoComplete="email" required value={fields.email} onChange={update('email')} />
                </div>
                <div className="gath-field">
                  <label htmlFor="gath-date">Date of event</label>
                  <input id="gath-date" name="date" type="date" required value={fields.date} onChange={update('date')} />
                </div>
                <div className="gath-field">
                  <label htmlFor="gath-guests">Number of guests</label>
                  <input id="gath-guests" name="guests" type="number" min="1" inputMode="numeric" required value={fields.guests} onChange={update('guests')} />
                </div>
                <div className="gath-field">
                  <label htmlFor="gath-occasion">Occasion</label>
                  <select id="gath-occasion" name="occasion" required value={fields.occasion} onChange={update('occasion')}>
                    <option value="" disabled>Select an occasion</option>
                    {OCCASIONS.map((occasion) => <option key={occasion} value={occasion}>{occasion}</option>)}
                  </select>
                </div>
                <div className="gath-field gath-field--full">
                  <label htmlFor="gath-message">Message <span>(optional — anything else we should know)</span></label>
                  <textarea id="gath-message" name="message" rows={4} value={fields.message} onChange={update('message')} />
                </div>
              </div>
              <div className="gath-form__actions">
                <button type="submit" className="gath-button">Send enquiry <span aria-hidden="true">→</span></button>
                <p className="gath-form__note">We reply within 24 hours. No spam, ever.</p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
