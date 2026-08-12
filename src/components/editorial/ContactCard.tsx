export interface ContactCardProps {
  phone?: string[];
  email?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

export function ContactCard({
  phone = ['+91 98765 43210', '+91 40 2345 6789'],
  email = 'franchise@amanisrestaurant.com',
  tone = 'dark',
  className = '',
}: ContactCardProps) {
  const isLight = tone === 'light';

  const cardClass = isLight
    ? 'contact-card p-6 sm:p-8 rounded-2xl bg-[var(--amani-canvas)] border border-[var(--amani-hairline)] text-[var(--amani-ink)] shadow-[0_10px_30px_rgba(23,20,17,0.06)] flex flex-col gap-6'
    : 'contact-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[rgba(58,25,14,0.9)] to-[rgba(35,14,7,0.95)] border border-[rgba(216,199,170,0.2)] text-[var(--amani-cream-on-dark)] shadow-xl flex flex-col gap-6';

  const titleColor = isLight ? 'text-[var(--amani-ink)]' : 'text-[var(--amani-cream-on-dark)]';
  const bodyColor = isLight ? 'text-[var(--amani-ink-soft)]' : 'text-[var(--amani-cream-muted)]';
  const dividerBorder = isLight ? 'border-[var(--amani-hairline)]' : 'border-[rgba(244,237,223,0.1)]';
  const iconWrap = isLight
    ? 'w-10 h-10 rounded-full bg-[var(--amani-maroon-tint)] border border-[rgba(122,31,36,0.25)] flex items-center justify-center text-[var(--amani-maroon)] flex-shrink-0'
    : 'w-10 h-10 rounded-full bg-[rgba(201,151,50,0.12)] border border-[rgba(201,151,50,0.3)] flex items-center justify-center text-[var(--amani-turmeric)] flex-shrink-0';
  const detailLabel = isLight ? 'text-[var(--amani-ink-muted)]' : 'text-[var(--amani-cream-muted)]';
  const detailValue = isLight ? 'text-[var(--amani-ink)]' : 'text-[var(--amani-cream-on-dark)]';
  const detailHover = isLight ? 'hover:text-[var(--amani-maroon)]' : 'hover:text-[var(--amani-turmeric)]';
  const hoursBox = isLight
    ? 'mt-2 p-4 rounded-xl bg-[var(--amani-maroon-tint)] border border-[rgba(122,31,36,0.2)]'
    : 'mt-2 p-4 rounded-xl bg-[rgba(201,151,50,0.08)] border border-[rgba(201,151,50,0.2)]';
  const hoursText = isLight ? 'text-[var(--amani-ink-soft)]' : 'text-[var(--amani-cream-muted)]';
  const hoursStrong = isLight ? 'text-[var(--amani-maroon)]' : 'text-[var(--amani-turmeric)]';

  return (
    <div className={`${cardClass} ${className}`}>
      <div>
        <h3 className={`font-display text-2xl sm:text-3xl font-normal mb-2 ${titleColor}`}>Franchise Inquiry Desk</h3>
        <p className={`text-xs sm:text-sm leading-relaxed ${bodyColor}`}>
          Ready to partner with Amani&apos;s Restaurant? Our franchise expansion team is available to assist with location evaluation, business models, and investment guidance.
        </p>
      </div>

      <div className={`space-y-5 pt-4 border-t ${dividerBorder}`}>
        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className={iconWrap}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div>
            <span className={`text-xs uppercase tracking-wider block font-semibold ${detailLabel}`}>Phone Support</span>
            {phone.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s+/g, '')}`} className={`text-sm font-medium transition-colors block mt-0.5 ${detailValue} ${detailHover}`}>
                {p}
              </a>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-4">
          <div className={iconWrap}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <span className={`text-xs uppercase tracking-wider block font-semibold ${detailLabel}`}>Email Address</span>
            <a href={`mailto:${email}`} className={`text-sm font-medium transition-colors block mt-0.5 break-all ${detailValue} ${detailHover}`}>
              {email}
            </a>
          </div>
        </div>

        {/* Location & Hours */}
        <div className="flex items-start gap-4">
          <div className={iconWrap}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <span className={`text-xs uppercase tracking-wider block font-semibold ${detailLabel}`}>Corporate Office</span>
            <p className={`text-sm font-medium mt-0.5 ${detailValue}`}>
              Road No. 36, Jubilee Hills,<br />Hyderabad, Telangana 500033
            </p>
          </div>
        </div>
      </div>

      <div className={hoursBox}>
        <p className={`text-xs leading-relaxed ${hoursText}`}>
          <strong className={`block mb-1 ${hoursStrong}`}>Franchise Desk Hours</strong>
          Monday &ndash; Saturday: 10:00 AM &ndash; 7:00 PM IST
        </p>
      </div>
    </div>
  );
}
