import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Reveal } from '../../components/motion/Reveal';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const VALUE_PROPOSITIONS = [
  {
    number: '01',
    title: 'Authentic Heritage',
    description: 'Traditional recipes that guests know, love, and return for.',
  },
  {
    number: '02',
    title: 'Strategic Location Assistance',
    description: 'Helping you choose the right location for maximum business potential.',
  },
  {
    number: '03',
    title: 'Training & Operations',
    description: 'Comprehensive staff training and proven operating systems.',
  },
  {
    number: '04',
    title: 'Trusted Brand',
    description: 'A loyal customer base built on consistent quality.',
  },
  {
    number: '05',
    title: 'Complete Franchise Support',
    description: 'Expert guidance from planning to grand opening.',
  },
  {
    number: '06',
    title: 'Long-Term Business Growth',
    description: 'Continuous support to help your outlet perform and expand.',
  },
];

export function ValuePropositionGrid() {
  return (
    <Section dark className="franchise-value-props border-t border-[var(--amani-hairline-dark)]">
      {/* Decorative Kolam glow — anchored to the corner, purely ornamental */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 text-[var(--amani-turmeric)] opacity-[0.06]"
        aria-hidden="true"
      >
        <RangoliPattern size={420} color="currentColor" strokeWidth={1} />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--amani-turmeric)]/40 to-transparent"
        aria-hidden="true"
      />

      <Container size="wide">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-14 lg:gap-x-16">
          {/* Section Header — sticky editorial column */}
          <Reveal direction="up" className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <h2 className="font-display text-[length:var(--font-heading-1)] font-medium leading-[1.12] tracking-[-0.01em] text-[var(--amani-cream-on-dark)]">
              Bring authentic culinary experiences everywhere &mdash; and grow{' '}
              <em className="not-italic font-medium text-[var(--amani-turmeric)]">a brand people keep coming back for.</em>
            </h2>
            <p className="mt-6 text-[length:var(--font-body)] text-[var(--amani-cream-muted)] leading-relaxed max-w-md">
              Six pillars of partnership built from years of experience &mdash; backing your journey from day one.
            </p>
          </Reveal>

          {/* Value Propositions — editorial numbered list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--amani-hairline-dark)] rounded-2xl overflow-hidden border border-[var(--amani-hairline-dark)]">
            {VALUE_PROPOSITIONS.map((prop, index) => (
              <Reveal key={prop.title} direction="up" delay={index * 0.07}>
                <article className="group relative h-full bg-[var(--amani-void)] hover:bg-[var(--amani-dark-warm)] transition-colors duration-300 p-7 sm:p-8 flex flex-col">
                  {/* Turmeric edge accent that grows on hover */}
                  <span
                    className="absolute left-0 top-0 h-0 w-[3px] bg-[var(--amani-turmeric)] transition-all duration-300 group-hover:h-full"
                    aria-hidden="true"
                  />

                  <div className="mb-6">
                    <span className="font-display text-4xl sm:text-5xl leading-none text-[rgba(244,237,223,0.16)] transition-colors duration-300 group-hover:text-[var(--amani-turmeric)]">
                      {prop.number}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-[1.7rem] font-normal leading-snug text-[var(--amani-cream-on-dark)] mb-3">
                    {prop.title}
                  </h3>
                  <p className="text-sm sm:text-[0.95rem] text-[var(--amani-cream-muted)] leading-relaxed">
                    {prop.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
