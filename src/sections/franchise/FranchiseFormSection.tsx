import { useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Button } from '../../components/actions/Button';
import { ContactCard } from '../../components/editorial/ContactCard';
import { Input } from '../../components/forms/Input';
import { RadioGroup } from '../../components/forms/RadioGroup';
import { ReCaptchaWrapper } from '../../components/forms/ReCaptchaWrapper';
import { Select } from '../../components/forms/Select';
import { Textarea } from '../../components/forms/Textarea';
import { Container } from '../../components/layout/Container';

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
  const reduceMotion = useReducedMotion();
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
    <section id="franchise-form" className="franchise-form-section py-20 lg:py-28 bg-[#230E07] text-[var(--amani-cream-on-dark)] border-t border-[rgba(244,237,223,0.08)] relative">
      <Container size="wide">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[var(--amani-turmeric)] uppercase mb-3 block">
            — START YOUR FRANCHISE JOURNEY
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-[var(--amani-cream-on-dark)]">
            Apply for an Amani&apos;s Outlet
          </h2>
          <p className="text-sm sm:text-base text-[var(--amani-cream-muted)] leading-relaxed font-sans">
            Please fill out the comprehensive franchise application form below. Our expansion committee reviews every submission carefully and will get back to you within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sidebar: GET IN TOUCH ContactCard */}
          <motion.div
            className="lg:col-span-4"
            initial={reduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactCard />
          </motion.div>

          {/* Right Column: Form Container */}
          <motion.div
            className="lg:col-span-8 p-6 sm:p-10 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(216,199,170,0.15)] backdrop-blur-sm"
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div className="text-center py-12 px-4" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,151,50,0.15)] border-2 border-[var(--amani-turmeric)] text-[var(--amani-turmeric)] flex items-center justify-center text-3xl mx-auto mb-6">
                  ✓
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[var(--amani-cream-on-dark)] mb-3">
                  Franchise Application Submitted
                </h3>
                <p className="text-sm sm:text-base text-[var(--amani-cream-muted)] max-w-lg mx-auto leading-relaxed mb-8 font-sans">
                  Thank you, <strong>{fields.name}</strong>! We have received your application for interest in <strong>{fields.interestedLocation || 'your location'}</strong>. Our franchise evaluation team will review your details and contact you at <strong>{fields.email}</strong> or <strong>{fields.mobile}</strong> within 48 hours.
                </p>
                <Button variant="gold" onClick={handleReset}>
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <Input
                    id="franchise-name"
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
                  name="howHeardAndWhy"
                  label="How Did You Hear About Us? Why Do You Want To Franchise Amani's Restaurant?"
                  required
                  rows={4}
                  placeholder="Tell us what draws you to Amani's and your goals for this partnership..."
                  value={fields.howHeardAndWhy}
                  onChange={updateField('howHeardAndWhy')}
                />

                {/* reCAPTCHA Notice */}
                <ReCaptchaWrapper />

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT FRANCHISE APPLICATION'}
                    {!isSubmitting && <span className="ml-2" aria-hidden="true">&rarr;</span>}
                  </Button>
                  <p className="text-xs text-[var(--amani-cream-muted)] text-center sm:text-right font-sans">
                    Strictly confidential. Your financial and business information is protected.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
