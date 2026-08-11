import { motion, useReducedMotion } from 'motion/react';
import { Card } from '../../components/editorial/Card';
import { Container } from '../../components/layout/Container';
import { Section } from '../../components/layout/Section';

const VALUE_PROPOSITIONS = [
  {
    numberTag: '01 — Kitchen',
    title: 'Authentic Heritage',
    description: 'Traditional recipes that guests know, love, and return for',
  },
  {
    numberTag: '02 — Launch',
    title: 'Strategic Location Assistance',
    description: 'Helping you choose the right location for maximum business potential',
  },
  {
    numberTag: '03 — Growth',
    title: 'Training & Operations',
    description: 'Comprehensive staff training and proven operating systems',
  },
  {
    numberTag: '04 — Brand',
    title: 'Trusted Brand',
    description: 'A loyal customer base built on consistent quality',
  },
  {
    numberTag: '05 — Support',
    title: 'Complete Franchise Support',
    description: 'Expert guidance from planning to grand opening',
  },
  {
    numberTag: '06 — Scale',
    title: 'Long-Term Business Growth',
    description: 'Continuous support to help your outlet perform and expand',
  },
];

export function ValuePropositionGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <Section dark className="franchise-value-props border-t border-[rgba(244,237,223,0.08)]">
      <Container size="wide">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-widest text-[var(--amani-turmeric)] uppercase mb-3 block">
            — WHY FRANCHISE WITH AMANI&apos;S
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-relaxed text-[var(--amani-cream-on-dark)]">
            Own an Amani&apos;s Restaurant franchise today. Partner with us to bring authentic, rich culinary experiences to food lovers everywhere, and grow a brand people keep coming back for.
          </h2>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {VALUE_PROPOSITIONS.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card
                numberTag={prop.numberTag}
                title={prop.title}
                description={prop.description}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
