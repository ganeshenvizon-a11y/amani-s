export function ReCaptchaWrapper() {
  return (
    <div className="recaptcha-notice flex items-center gap-3 p-3 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(216,199,170,0.12)] text-xs text-[var(--amani-cream-muted)]">
      <div className="w-5 h-5 flex-shrink-0 text-[var(--amani-turmeric)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </div>
      <p className="leading-snug font-sans">
        This form is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--amani-turmeric)] transition-colors">
          Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--amani-turmeric)] transition-colors">
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </div>
  );
}
