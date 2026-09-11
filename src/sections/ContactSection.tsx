import React, { useState, useEffect, useRef } from 'react';
import { PixelCard } from '../components/ui/PixelCard';
import { PixelButton } from '../components/ui/PixelButton';
import { Mail, Send, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';
import userData from '../data/user_data.json';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            AnalyticsService.trackSectionView('contact');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
      AnalyticsService.trackSectionDwellTime('contact', (Date.now() - startTime) / 1000);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    AnalyticsService.trackCtaClick('CONTACT_FORM_SUBMIT', formData.email);
    setSent(true);
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github size={16} />;
      case 'linkedin':
        return <Linkedin size={16} />;
      case 'twitter / x':
      case 'twitter':
        return <Twitter size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full scroll-mt-24">
      <PixelCard
        title="DIRECT_COMMUNICATION // TRANSMISSION_STATION"
        subtitle="AVAILABLE FOR FULL-TIME & CONTRACT ROLES"
        icon={<Mail size={14} className="text-pixel-primary" />}
        elevation="lg"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Links & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-pixel-surface-dim p-5 border-2 border-pixel-border">
            <div className="flex flex-col gap-3">
              <h3 className="font-arcade text-sm text-pixel-text">
                LET&apos;S BUILD TOGETHER
              </h3>
              <p className="font-body text-xs sm:text-sm text-pixel-text-muted leading-relaxed">
                Looking for a staff-level Flutter engineer, Skia/Impeller renderer specialist, or an architect to take your mobile product from 0 to 1? Get in touch directly:
              </p>

              <div className="mt-2 p-3 bg-pixel-surface border border-pixel-border font-code text-xs flex flex-col gap-1">
                <span className="text-pixel-primary font-bold">PRIMARY INBOX:</span>
                <a
                  href={`mailto:${userData.email}`}
                  onClick={() => AnalyticsService.trackCtaClick('DIRECT_EMAIL_LINK', userData.email)}
                  className="text-pixel-text hover:text-pixel-primary transition-colors underline break-all font-bold"
                >
                  {userData.email}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-2">
              <span className="font-code text-[11px] text-pixel-text font-bold">
                NETWORK CHANNELS:
              </span>
              <div className="flex flex-wrap gap-2">
                {userData.social.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => AnalyticsService.trackCtaClick(`SOCIAL_${soc.name?.toUpperCase()}`, soc.url)}
                  >
                    <PixelButton
                      variant="secondary"
                      size="sm"
                      icon={getSocialIcon(soc.name)}
                    >
                      {soc.name}
                    </PixelButton>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Transmission Form */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-4">
            {sent ? (
              <div className="p-8 bg-pixel-surface-dim border-2 border-pixel-border flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 bg-pixel-primary text-pixel-primary-contrast flex items-center justify-center border-2 border-pixel-border shadow-pixel-xs">
                  <Send size={24} />
                </div>
                <h4 className="font-arcade text-sm text-pixel-primary">
                  TRANSMISSION DISPATCHED!
                </h4>
                <p className="font-code text-xs text-pixel-text-muted">
                  Thank you for reaching out. I will review your message and reply promptly.
                </p>
                <PixelButton
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSent(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                >
                  SEND ANOTHER TRANSMISSION
                </PixelButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-code text-xs">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-pixel-text font-bold uppercase">
                    [NAME / ORGANIZATION]:
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Rivera or Apex Fintech"
                    className="p-3 bg-pixel-surface-dim border-2 border-pixel-border text-pixel-text focus:border-pixel-primary outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-pixel-text font-bold uppercase">
                    [RETURN EMAIL ADDRESS]:
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. founder@company.com"
                    className="p-3 bg-pixel-surface-dim border-2 border-pixel-border text-pixel-text focus:border-pixel-primary outline-none text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-pixel-text font-bold uppercase">
                    [PROJECT / ROLE BRIEF]:
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail your requirements, project timeline, or role scope..."
                    className="p-3 bg-pixel-surface-dim border-2 border-pixel-border text-pixel-text focus:border-pixel-primary outline-none text-xs resize-none"
                  />
                </div>

                <PixelButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  icon={<MessageSquare size={16} />}
                >
                  TRANSMIT MESSAGE NOW
                </PixelButton>
              </form>
            )}
          </div>
        </div>
      </PixelCard>
    </section>
  );
};
