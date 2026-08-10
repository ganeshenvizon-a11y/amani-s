import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Reveal } from '../../components/motion/Reveal';

type Faq = { q: string; a: ReactNode };

const faqs: Faq[] = [
  {
    q: 'Do I need a reservation?',
    a: 'Walk-ins are always welcome, but we recommend reserving for dinner and on weekends when the room fills up quickly. Call us and we’ll hold a table for you.',
  },
  {
    q: 'Is Amani suitable for kids?',
    a: 'Absolutely — families are the heart of the room. We have high chairs, milder dishes on request, and plenty of space for little ones.',
  },
  {
    q: 'Do you accommodate dietary restrictions — vegetarian, Jain, allergies?',
    a: 'Yes. A large part of the menu is vegetarian, and we can prepare Jain and no-onion-no-garlic versions of many dishes. Please tell our team about any allergies before ordering so we can guide you safely.',
  },
  {
    q: 'Can I book for a large group?',
    a: (
      <>
        Of course. For birthdays, weddings, corporate events and family celebrations, head to our{' '}
        <NavLink to="/gatherings/">Gatherings</NavLink> page to see how it works and send an enquiry.
      </>
    ),
  },
  {
    q: 'Do you offer takeaway or delivery?',
    a: 'Takeaway is available for the full menu — call ahead and we’ll have it packed and ready. Delivery is offered through our partner apps in the Jubilee Hills area.',
  },
  {
    q: 'Is outdoor / private seating available?',
    a: 'Yes to both — covered outdoor tables for a relaxed meal, and a private dining area that can be reserved for gatherings.',
  },
];

export function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="vst-faq" aria-labelledby="vst-faq-title">
      <div className="vst-container">
        <Reveal className="vst-head">
          <p className="vst-eyebrow">FAQ / 04</p>
          <h2 id="vst-faq-title">Frequently asked <em>questions.</em></h2>
        </Reveal>

        <div className="vst-faq__list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="vst-faq__item" data-open={isOpen}>
                <button
                  type="button"
                  className="vst-faq__q"
                  aria-expanded={isOpen}
                  aria-controls={`vst-faq-panel-${index}`}
                  id={`vst-faq-q-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {faq.q}
                  <span className="vst-faq__icon" aria-hidden="true" />
                </button>
                <div
                  className="vst-faq__a"
                  id={`vst-faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`vst-faq-q-${index}`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
