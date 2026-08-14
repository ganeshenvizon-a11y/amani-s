import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';
import { Reveal } from '../../components/motion/Reveal';
import { RangoliPattern } from '../../components/motion/RangoliPattern';

const VALUE_PROPOSITIONS = [
  {
    number: '01',
    tag: 'Kitchen',
    title: 'Authentic Heritage',
    description: 'Traditional recipes that guests know, love, and return for.',
  },
  {
    number: '02',
    tag: 'Launch',
    title: 'Strategic Location Assistance',
    description: 'Helping you choose the right location for maximum business potential.',
  },
  {
    number: '03',
    tag: 'Growth',
    title: 'Training & Operations',
    description: 'Comprehensive staff training and proven operating systems.',
  },
  {
    number: '04',
    tag: 'Brand',
    title: 'Trusted Brand',
    description: 'A loyal customer base built on consistent quality.',
  },
  {
    number: '05',
    tag: 'Support',
    title: 'Complete Franchise Support',
    description: 'Expert guidance from planning to grand opening.',
  },
  {
    number: '06',
    tag: 'Scale',
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
            <span className="text-[11px] font-semibold tracking-[0.16em] text-[var(--amani-turmeric)] uppercase mb-5 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[var(--amani-turmeric)]" />
              Why franchise with Amani&apos;s
            </span>
            <h2 className="font-display text-[length:var(--font-heading-1)] font-medium leading-[1.12] tracking-[-0.01em] text-[var(--amani-cream-on-dark)]">
              Partner with us to bring authentic, rich culinary experiences to food lovers everywhere &mdash; and grow{' '}
              <em className="not-italic font-medium text-[var(--amani-turmeric)]">a brand people keep coming back for.</em>
            </h2>
            <p className="mt-6 text-[length:var(--font-body)] text-[var(--amani-cream-muted)] leading-relaxed max-w-md">
              Six pillars of partnership, built from years of running kitchens that stay full &mdash; each one working
              behind you from your first plate to your fifth outlet.
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

                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-display text-4xl sm:text-5xl leading-none text-[rgba(244,237,223,0.16)] transition-colors duration-300 group-hover:text-[var(--amani-turmeric)]">
                      {prop.number}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[var(--amani-turmeric)]">
                      {prop.tag}
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
