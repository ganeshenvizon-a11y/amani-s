import { Reveal } from '../../components/motion/Reveal';

const steps = [
  { title: 'Share your event details', copy: 'Date, venue, headcount, and preferred meal type.' },
  { title: 'Curated menu proposal', copy: 'We design a custom menu and service layout for review.' },
  { title: 'Finalize & sample', copy: 'Confirm selections, dietary needs, and service details.' },
  { title: 'We cook & serve', copy: 'On event day, our culinary team delivers warm, seamless service.' },
];

export function PlanningProcess() {
  return (
    <section id="process" className="cater-process" aria-labelledby="cater-process-title">
      <div className="cater-container">
        <Reveal className="cater-head">
          <h2 id="cater-process-title">How Planning <em>Works.</em></h2>
          <p>From initial inquiry to final presentation, we make catering simple and stress-free.</p>
        </Reveal>
        <div className="cater-steps">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <article className="cater-step">
                <span className="cater-step__num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
