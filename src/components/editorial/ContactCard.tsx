export interface ContactCardProps {
  phone?: string[];
  email?: string;
  className?: string;
}

export function ContactCard({
  phone = ['+91 98765 43210', '+91 40 2345 6789'],
  email = 'franchise@amanisrestaurant.com',
  className = '',
}: ContactCardProps) {
  return (
    <div
      className={`contact-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[rgba(58,25,14,0.9)] to-[rgba(35,14,7,0.95)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] shadow-xl flex flex-col gap-6 ${className}`}
    >
      <div>
        <span className="text-xs font-bold tracking-widest text-[var(--amani-turmeric)] uppercase mb-2 block">
          — GET IN TOUCH
        </span>
        <h3 className="font-display text-2xl font-bold mb-2">Franchise Inquiry Desk</h3>
        <p className="text-xs sm:text-sm text-[var(--amani-cream-muted)] leading-relaxed font-sans">
          Ready to partner with Amani&apos;s Restaurant? Our franchise expansion team is available to assist with location evaluation, business models, and investment guidance.
        </p>
      </div>

      <div className="space-y-5 pt-4 border-t border-[rgba(244,237,223,0.1)]">
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(201,151,50,0.12)] border border-[rgba(201,151,50,0.3)] flex items-center justify-center text-[var(--amani-turmeric)] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--amani-cream-muted)] block font-semibold">Phone Support</span>
            {phone.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s+/g, '')}`} className="text-sm font-medium hover:text-[var(--amani-turmeric)] transition-colors block mt-0.5">
                {p}
              </a>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(201,151,50,0.12)] border border-[rgba(201,151,50,0.3)] flex items-center justify-center text-[var(--amani-turmeric)] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--amani-cream-muted)] block font-semibold">Email Address</span>
            <a href={`mailto:${email}`} className="text-sm font-medium hover:text-[var(--amani-turmeric)] transition-colors block mt-0.5 break-all">
              {email}
            </a>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(201,151,50,0.12)] border border-[rgba(201,151,50,0.3)] flex items-center justify-center text-[var(--amani-turmeric)] flex-shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-[var(--amani-cream-muted)] block font-semibold">Corporate Office</span>
            <p className="text-sm font-medium mt-0.5">
              Road No. 36, Jubilee Hills,<br />Hyderabad, Telangana 500033
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 p-4 rounded-xl bg-[rgba(201,151,50,0.08)] border border-[rgba(201,151,50,0.2)]">
        <p className="text-xs text-[var(--amani-cream-muted)] leading-relaxed">
          <strong className="text-[var(--amani-turmeric)] block mb-1">Franchise Desk Hours</strong>
          Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST
        </p>
      </div>
    </div>
  );
}
