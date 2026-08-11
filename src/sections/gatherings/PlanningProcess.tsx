import { Reveal } from '../../components/motion/Reveal';

const steps = [
  { title: 'Tell us the occasion', copy: 'Date, headcount, and what you’re celebrating.' },
  { title: 'We’ll get in touch', copy: 'Within 24 hours, to talk through the details.' },
  { title: 'We build it together', copy: 'Menu, setup, and any special requests.' },
  { title: 'You show up. We handle the rest.', copy: 'On the day, it’s just you and your guests.' },
];

export function PlanningProcess() {
  return (
    <section id="process" className="gath-process" aria-labelledby="gath-process-title">
      <div className="gath-container">
        <Reveal className="gath-head">
          <h2 id="gath-process-title">How it <em>works.</em></h2>
        </Reveal>
        <div className="gath-steps">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08}>
              <article className="gath-step">
                <span className="gath-step__num">{String(index + 1).padStart(2, '0')}</span>
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
