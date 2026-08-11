import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../components/actions/Button';
import { StatCounter, StatGroup } from '../../components/editorial/StatCounter';
import { Container } from '../../components/layout/Container';

export function FranchiseHero() {
  const reduceMotion = useReducedMotion();

  const handleApplyClick = () => {
    const formElement = document.getElementById('franchise-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="franchise-hero relative min-h-[90vh] lg:min-h-screen flex items-center bg-[var(--amani-void)] text-[var(--amani-cream-on-dark)] pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(15,6,3,0.85)] via-[var(--amani-void)] to-[rgba(20,8,4,0.95)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c99732_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Hero Copy & Stats */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start"
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(201,151,50,0.12)] border border-[rgba(201,151,50,0.3)] text-[var(--amani-turmeric)] text-xs font-semibold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--amani-turmeric)] animate-pulse" />
              — MASTER FRANCHISE
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-[var(--amani-cream-on-dark)] mb-6">
              Serve Happiness.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--amani-turmeric)] to-[#E6C378] italic font-serif font-normal">
                Build Your Future.
              </span>
            </h1>

            {/* Body Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[var(--amani-cream-muted)] leading-relaxed mb-8 max-w-2xl font-sans">
              Every plate we serve creates memories. Every guest who walks in becomes family. Now it&apos;s your turn to create those memories while building a successful business with Amani&apos;s Restaurant.
            </p>

            {/* Primary Action */}
            <div className="mb-12">
              <Button
                variant="primary"
                size="lg"
                onClick={handleApplyClick}
                className="shadow-[0_10px_30px_rgba(122,31,36,0.5)] hover:scale-105"
              >
                Apply for a Franchise <span className="ml-2" aria-hidden="true">&rarr;</span>
              </Button>
            </div>

            {/* Stat Counters */}
            <div className="w-full pt-8 border-t border-[rgba(244,237,223,0.12)]">
              <StatGroup>
                <StatCounter value="8 OUTLETS" label="Active Operating Locations" />
                <div className="hidden sm:block w-px h-10 bg-[rgba(244,237,223,0.15)]" />
                <StatCounter value="25+ YEARS" label="Culinary Legacy & Expertise" />
                <div className="hidden sm:block w-px h-10 bg-[rgba(244,237,223,0.15)]" />
                <StatCounter value="Est. 2015" label="Brand Inception Year" />
              </StatGroup>
            </div>
          </motion.div>

          {/* Right Visual: Gold Border Accent Frame & Badge */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Outer Decorative Gold Ring Frame */}
            <div className="relative p-3 rounded-2xl bg-gradient-to-tr from-[var(--amani-turmeric)] via-[rgba(201,151,50,0.3)] to-[rgba(122,31,36,0.5)] shadow-2xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-[var(--amani-dark-warm)]">
                <img
                  src="/media/images/happy-south-indian-dining.png"
                  alt="Amani's Restaurant Master Franchise Experience"
                  className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(23,10,5,0.85)] via-transparent to-transparent pointer-events-none" />

                {/* Est. 2015 Badge Overlay */}
                <div className="absolute bottom-6 right-6 px-4 py-2.5 rounded-lg bg-[rgba(23,20,17,0.85)] backdrop-blur-md border border-[var(--amani-turmeric)] text-[var(--amani-turmeric)] text-xs font-bold tracking-widest uppercase shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--amani-turmeric)]" />
                  Est. 2015
                </div>

                <div className="absolute top-6 left-6 px-4 py-2 rounded-md bg-[rgba(122,31,36,0.9)] backdrop-blur-md text-[var(--amani-cream-on-dark)] text-xs font-semibold tracking-wider uppercase">
                  South Indian Authentic Kitchen
                </div>
              </div>
            </div>

            {/* Decorative Background Glow Accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-[var(--amani-turmeric)] opacity-20 filter blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
