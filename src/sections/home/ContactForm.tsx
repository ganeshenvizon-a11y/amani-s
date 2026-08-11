/**
 * Home Contact Form — Contact section on the homepage above the footer.
 * Matches Amani's warm editorial luxury design aesthetic with accessible inputs.
 */

import { useState, type FormEvent } from 'react';
import { Reveal } from '../../components/motion/Reveal';

type ContactFields = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
};

const INITIAL_FIELDS: ContactFields = {
  name: '',
  email: '',
  phone: '',
  topic: 'General Inquiry',
  message: '',
};

const TOPICS = [
  'General Inquiry',
  'Table Reservation',
  'Private Dining & Gatherings',
  'Catering Service',
  'Dietary Preferences',
  'Feedback & Compliments',
];

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(INITIAL_FIELDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof ContactFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate clean network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFields(INITIAL_FIELDS);
    setSubmitted(false);
  };

  return (
    <section id="home-contact" className="home-contact-section" aria-labelledby="home-contact-heading">
      <div className="home-contact-container">
        {/* Left Column: Editorial Information */}
        <Reveal direction="up" className="home-contact-info">
          <span className="home-contact-eyebrow">GET IN TOUCH</span>
          <h2 id="home-contact-heading" className="home-contact-title">
            We&rsquo;d love to <em>connect.</em>
          </h2>
          <p className="home-contact-description">
            Have a question about our menu, special dietary options, table reservations, or private dining? Send us a message and our team will respond within 24 hours.
          </p>
        </Reveal>

        {/* Right Column: Contact Form Card */}
        <Reveal direction="up" delay={0.15} className="home-contact-card-wrapper">
          <div className="home-contact-card">
            {submitted ? (
              <div className="home-contact-success" role="status" aria-live="polite">
                <div className="home-contact-success-icon" aria-hidden="true">✓</div>
                <h3 className="home-contact-success-title">Message Received</h3>
                <p className="home-contact-success-text">
                  Thank you, <strong>{fields.name || 'Friend'}</strong>! We&rsquo;ve received your message regarding <em>{fields.topic}</em> and will get back to you at <strong>{fields.email}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="home-contact-reset-btn"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="home-contact-form" onSubmit={handleSubmit}>
                <div className="home-contact-form-grid">
                  <div className="home-contact-field">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={fields.name}
                      onChange={updateField('name')}
                    />
                  </div>

                  <div className="home-contact-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="ananya@example.com"
                      value={fields.email}
                      onChange={updateField('email')}
                    />
                  </div>

                  <div className="home-contact-field">
                    <label htmlFor="contact-phone">Phone Number <span>(optional)</span></label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={fields.phone}
                      onChange={updateField('phone')}
                    />
                  </div>

                  <div className="home-contact-field">
                    <label htmlFor="contact-topic">Subject / Topic *</label>
                    <select
                      id="contact-topic"
                      name="topic"
                      required
                      value={fields.topic}
                      onChange={updateField('topic')}
                    >
                      {TOPICS.map((topic) => (
                        <option key={topic} value={topic}>
                          {topic}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="home-contact-field home-contact-field--full">
                    <label htmlFor="contact-message">Your Message *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us how we can help you..."
                      value={fields.message}
                      onChange={updateField('message')}
                    />
                  </div>
                </div>

                <div className="home-contact-actions">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="home-contact-submit-btn"
                  >
                    <span>{isSubmitting ? 'SENDING MESSAGE...' : 'SEND MESSAGE'}</span>
                    <span className="arrow" aria-hidden="true">→</span>
                  </button>
                  <p className="home-contact-note">
                    We keep your information private. No spam ever.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
