import { useState, type FormEvent } from 'react';
import { Button } from '../../components/actions/Button';
import { ContactCard } from '../../components/editorial/ContactCard';
import { Input } from '../../components/forms/Input';
import { RadioGroup } from '../../components/forms/RadioGroup';
import { ReCaptchaWrapper } from '../../components/forms/ReCaptchaWrapper';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { Container } from '../../components/layout/Container';
import { Reveal } from '../../components/motion/Reveal';

type FranchiseFormFields = {
  name: string;
  mobile: string;
  email: string;
  interestedLocation: string;
  sourceOfCapital: string;
  monthlySalaryIncome: string;
  otherMonthlyIncome: string;
  desiredStoreOpenDate: string;
  franchiseExperience: string;
  managementExperience: string;
  howHeardAndWhy: string;
};

const INITIAL_FIELDS: FranchiseFormFields = {
  name: '',
  mobile: '',
  email: '',
  interestedLocation: '',
  sourceOfCapital: '',
  monthlySalaryIncome: '',
  otherMonthlyIncome: '',
  desiredStoreOpenDate: '',
  franchiseExperience: 'No',
  managementExperience: '',
  howHeardAndWhy: '',
};

const OPEN_DATE_OPTIONS = [
  'Within 3 months',
  '3-6 months',
  '6-12 months',
  'Over 1 year',
];

export function FranchiseFormSection() {
  const [fields, setFields] = useState<FranchiseFormFields>(INITIAL_FIELDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (key: keyof FranchiseFormFields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFields((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleRadioChange = (key: keyof FranchiseFormFields) => (val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFields(INITIAL_FIELDS);
    setSubmitted(false);
  };

  return (
    <section id="franchise-form" className="franchise-form-section py-20 lg:py-28 bg-[var(--amani-paper)] text-[var(--amani-ink)] border-t border-[var(--amani-hairline)] relative">
      <div id="apply" />
      <div id="form" />
      <Container size="wide">
        {/* Section Header */}
        <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-[length:var(--font-heading-1)] font-medium leading-[1.05] tracking-[-0.015em] mb-4 text-[var(--amani-ink)]">
            Apply for an <em className="not-italic font-medium text-[var(--amani-maroon)]">Amani&apos;s outlet.</em>
          </h2>
          <p className="text-[length:var(--font-body)] text-[var(--amani-ink-soft)] leading-relaxed">
            Fill out the application below. Our team reviews every submission and will respond within 48 hours.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sidebar: GET IN TOUCH ContactCard */}
          <Reveal direction="up" className="lg:col-span-4">
            <ContactCard tone="light" />
          </Reveal>

          {/* Right Column: Form Container */}
          <Reveal direction="up" delay={0.15} className="lg:col-span-8 p-6 sm:p-10 rounded-2xl bg-[var(--amani-canvas)] border border-[var(--amani-hairline)] shadow-[0_10px_30px_rgba(23,20,17,0.05)]">
            {submitted ? (
              <div className="text-center py-12 px-4" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-[var(--amani-olive)] text-white flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-[var(--amani-ink)] mb-3">
                  Franchise Application Submitted
                </h3>
                <p className="text-sm sm:text-base text-[var(--amani-ink-soft)] max-w-lg mx-auto leading-relaxed mb-8">
                  Thank you, <strong>{fields.name}</strong>! We have received your application for interest in <strong>{fields.interestedLocation || 'your location'}</strong>. Our franchise evaluation team will review your details and contact you at <strong>{fields.email}</strong> or <strong>{fields.mobile}</strong> within 48 hours.
                </p>
                <Button variant="primary" onClick={handleReset}>
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <Input
                    id="franchise-name"
                    tone="light"
                    name="name"
                    label="Name"
                    required
                    placeholder="Full Legal Name"
                    value={fields.name}
                    onChange={updateField('name')}
                  />

                  {/* Mobile Number */}
                  <Input
                    id="franchise-mobile"
                    tone="light"
                    name="mobile"
                    type="tel"
                    label="Mobile Number"
                    required
                    placeholder="+91 98765 43210"
                    value={fields.mobile}
                    onChange={updateField('mobile')}
                  />

                  {/* Email Address */}
                  <Input
                    id="franchise-email"
                    tone="light"
                    name="email"
                    type="email"
                    label="Email Address"
                    required
                    placeholder="email@example.com"
                    value={fields.email}
                    onChange={updateField('email')}
                  />

                  {/* Interested Location */}
                  <Input
                    id="franchise-location"
                    tone="light"
                    name="interestedLocation"
                    label="Interested Location"
                    required
                    placeholder="City / Area Preferred (e.g. Jubilee Hills, Hyd)"
                    value={fields.interestedLocation}
                    onChange={updateField('interestedLocation')}
                  />

                  {/* Source of Capital */}
                  <Input
                    id="franchise-capital"
                    tone="light"
                    name="sourceOfCapital"
                    label="Source of Capital"
                    required
                    placeholder="e.g. Personal Savings, Business Loan, Partnership"
                    value={fields.sourceOfCapital}
                    onChange={updateField('sourceOfCapital')}
                  />

                  {/* Monthly Salary Income (₹) */}
                  <Input
                    id="franchise-salary-income"
                    tone="light"
                    name="monthlySalaryIncome"
                    type="number"
                    label="Monthly Salary Income (₹)"
                    required
                    placeholder="e.g. 150000"
                    value={fields.monthlySalaryIncome}
                    onChange={updateField('monthlySalaryIncome')}
                  />

                  {/* Other Monthly Income (₹) */}
                  <Input
                    id="franchise-other-income"
                    tone="light"
                    name="otherMonthlyIncome"
                    type="number"
                    label="Other Monthly Income (₹)"
                    placeholder="e.g. 50000 (Optional)"
                    value={fields.otherMonthlyIncome}
                    onChange={updateField('otherMonthlyIncome')}
                  />

                  {/* Desired Store Open Date */}
                  <Select
                    id="franchise-open-date"
                    tone="light"
                    name="desiredStoreOpenDate"
                    label="Desired Store Open Date"
                    required
                    placeholder="Select Target Timeline"
                    options={OPEN_DATE_OPTIONS}
                    value={fields.desiredStoreOpenDate}
                    onChange={updateField('desiredStoreOpenDate')}
                  />
                </div>

                {/* Radio group: Franchise Experience */}
                <div className="pt-2">
                  <RadioGroup
                    tone="light"
                    label="Have You Previously Owned, Or Do You Currently Own A Franchise?"
                    name="franchiseExperience"
                    required
                    options={['Yes', 'No']}
                    value={fields.franchiseExperience}
                    onChange={handleRadioChange('franchiseExperience')}
                  />
                </div>

                {/* Textarea 1: Describe Your Management Experience */}
                <Textarea
                  id="franchise-management-experience"
                  tone="light"
                  name="managementExperience"
                  label="Describe Your Management Experience In The Food & Beverage Industry"
                  required
                  rows={4}
                  placeholder="Detail your prior restaurant, hospitality, or business operational management background..."
                  value={fields.managementExperience}
                  onChange={updateField('managementExperience')}
                />

                {/* Textarea 2: How Did You Hear About Us? Why Do You Want To Franchise Amani's */}
                <Textarea
                  id="franchise-why-amanis"
                  tone="light"
                  name="howHeardAndWhy"
                  label="How Did You Hear About Us? Why Do You Want To Franchise Amani's Restaurant?"
                  required
                  rows={4}
                  placeholder="Tell us what draws you to Amani's and your goals for this partnership..."
                  value={fields.howHeardAndWhy}
                  onChange={updateField('howHeardAndWhy')}
                />

                {/* reCAPTCHA Notice */}
                <ReCaptchaWrapper tone="light" />

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto sm:flex-shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT FRANCHISE APPLICATION'}
                    {!isSubmitting && <span className="ml-2" aria-hidden="true">&rarr;</span>}
                  </Button>
                  <p className="text-xs text-[var(--amani-ink-muted)] text-center sm:text-left leading-snug">
                    Strictly confidential. Your financial and business information is protected.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
