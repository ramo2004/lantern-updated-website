import React, { Suspense, lazy, useEffect, useState } from 'react';
import { ArrowDown, ShieldCheck, Sun } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { VISUAL_THEME } from './visualTheme';

const LazyMiniGame = lazy(() =>
  import('./MiniGame').then((mod) => ({ default: mod.MiniGame }))
);

const NETLIFY_WAITLIST_FORM_NAME = 'waitlist';

const encodeFormBody = (formData: FormData) => {
  const params = new URLSearchParams();
  formData.forEach((value, key) => {
    if (typeof value === 'string') {
      params.append(key, value);
    }
  });
  return params.toString();
};

const Hero: React.FC = () => {
  const heroPink = VISUAL_THEME.heroTitleText;
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isDesktopPreviewEnabled, setIsDesktopPreviewEnabled] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(min-width: 768px)').matches
      : false
  );
  const [waitlistStatus, setWaitlistStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event: MediaQueryListEvent) => {
      setIsDesktopPreviewEnabled(event.matches);
    };

    setIsDesktopPreviewEnabled(mediaQuery.matches);
    if ('addEventListener' in mediaQuery) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if ('removeEventListener' in mediaQuery) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement | null;
    if (!emailInput) {
      setWaitlistStatus('error');
      return;
    }

    if (!emailInput.validity.valid) {
      setWaitlistStatus('idle');
      setEmailError(
        emailInput.validity.valueMissing
          ? 'Please enter your email address.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    const formData = new FormData(form);
    setEmailError(null);

    setWaitlistStatus('submitting');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormBody(formData),
      });

      if (!response.ok) {
        throw new Error(`Netlify form submission failed with ${response.status}`);
      }

      form.reset();
      setEmailValue('');
      setWaitlistStatus('success');
      setIsEmailFocused(false);
    } catch {
      setWaitlistStatus('error');
    }
  };

  return (
    <section className="relative pt-36 sm:pt-40 pb-8 md:pt-48 md:pb-16 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col justify-center mt-1 md:-mt-20 space-y-8 sm:space-y-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-normal leading-tight tracking-tight mb-5 sm:mb-8 text-ink">
                <span
                  className="text-lantern relative inline-block drop-shadow-sm italic underline decoration-4 underline-offset-8"
                  style={{ color: VISUAL_THEME.heroTitleText, textDecorationColor: VISUAL_THEME.heroUnderline }}
                >
                  A Safer Walk.
                </span>
              </h1>
              <p
                className="text-xl sm:text-2xl md:text-3xl font-centaur max-w-md leading-relaxed"
                style={{ color: VISUAL_THEME.heroParagraphText }}
              >
                Lantern finds the best-lit, most populated routes for your walk home. Because peace of mind is the best destination.
              </p>
            </m.div>

            <m.div 
              className="w-full max-w-lg mt-2 sm:mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form 
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 w-full bg-white rounded-3xl sm:rounded-full p-2 overflow-hidden border-2 border-transparent focus-within:border-lantern/50 focus-within:shadow-[0_0_25px_rgba(255,107,107,0.3)] transition-all duration-300 shadow-xl"
                name={NETLIFY_WAITLIST_FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                noValidate
                onSubmit={handleWaitlistSubmit}
                aria-label="Join the waitlist"
              >
                <input type="hidden" name="form-name" value={NETLIFY_WAITLIST_FORM_NAME} />
                <input type="hidden" name="bot-field" />
                <label htmlFor="waitlist-email" className="sr-only">Email address</label>
                <input 
                  id="waitlist-email"
                  type="email" 
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  enterKeyHint="send"
                  aria-label="Email address"
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'waitlist-email-error' : undefined}
                  placeholder="Enter your email address" 
                  className="w-full sm:flex-1 min-w-0 bg-transparent rounded-2xl sm:rounded-full px-4 sm:px-6 py-2 focus:outline-none font-centaur text-base sm:text-xl placeholder:text-gray-400 text-ink"
                  value={emailValue}
                  onChange={(e) => {
                    setEmailValue(e.target.value);
                    if (emailError) setEmailError(null);
                    if (waitlistStatus === 'success' || waitlistStatus === 'error') setWaitlistStatus('idle');
                  }}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  required
                />
                <button
                  type="submit"
                  disabled={waitlistStatus === 'submitting'}
                  className="w-full sm:w-auto text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-centaur font-bold text-base sm:text-xl transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap shadow-md disabled:opacity-80 disabled:cursor-not-allowed"
                  style={{ backgroundColor: heroPink }}
                >
                  {waitlistStatus === 'submitting' ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>

              <div className="min-h-[38px] pt-2 flex items-start" aria-live="polite">
                {emailError && (
                  <p
                    id="waitlist-email-error"
                    className="inline-flex max-w-full rounded-xl bg-white/75 px-3.5 py-1.5 text-[0.95rem] leading-snug text-lantern-dark font-centaur text-left shadow-sm border border-lantern/10"
                    style={{ color: heroPink, borderColor: 'rgba(255,107,107,0.22)' }}
                  >
                    {emailError}
                  </p>
                )}
                {!emailError && waitlistStatus === 'success' && (
                  <p className="inline-flex items-center gap-1.5 max-w-full rounded-xl bg-white/75 px-3.5 py-1.5 text-[0.95rem] leading-snug text-emerald-700 font-centaur text-left shadow-sm border border-emerald-200/70">
                    <span aria-hidden="true">✓</span>
                    You&apos;re in. We&apos;ll send your invite as soon as we launch.
                  </p>
                )}
                {!emailError && waitlistStatus === 'error' && (
                  <p
                    className="inline-flex max-w-full rounded-xl bg-white/75 px-3.5 py-1.5 text-[0.95rem] leading-snug font-centaur text-left shadow-sm border"
                    style={{ color: heroPink, borderColor: 'rgba(255,107,107,0.22)' }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>

              <div
                className={`md:hidden flex justify-center pt-5 transition-opacity duration-150 ${
                  isEmailFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
                aria-hidden="true"
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/65 backdrop-blur-sm border shadow-md ${prefersReducedMotion ? '' : 'animate-bounce'}`}
                  style={{ color: heroPink, borderColor: 'rgba(255,107,107,0.25)' }}
                >
                  <ArrowDown size={18} />
                </div>
              </div>
            </m.div>
          </div>

          {isDesktopPreviewEnabled && (
          <div className="relative hidden md:block">
             {/* Decorative blob background */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-mustard/20 rounded-full blur-3xl -z-10 animate-pulse" />
             
             {/* Abstract Map Illustration */}
             <m.div 
               className="relative w-full h-[500px]"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
             >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-[300px] h-[460px] rounded-[40px] bg-white border-[6px] border-slate-900 shadow-2xl">
                    <div className="absolute top-[15px] left-[15px] right-[15px] bottom-[15px] rounded-[25px] overflow-hidden">
                      <Suspense fallback={<div className="w-full h-full bg-slate-900" />}>
                        <LazyMiniGame />
                      </Suspense>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <m.div 
                  className="absolute top-20 -right-4 bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] pointer-events-none"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(255,107,107,0.2)', color: heroPink }}
                    >
                      <Sun size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">Street Lighting</div>
                      <div className="font-bold text-slate-900">Excellent</div>
                    </div>
                  </div>
                </m.div>

                <m.div 
                  className="absolute bottom-32 -left-8 bg-white p-3 rounded-xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] pointer-events-none"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="p-1.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(255,107,107,0.2)', color: heroPink }}
                    >
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-500">Crowd Report</div>
                      <div className="font-bold text-slate-900">Safe Zone</div>
                    </div>
                  </div>
                </m.div>

             </m.div>
             
             <div className="text-center mt-6 px-4">
               <p className="mx-auto max-w-xl text-sm md:text-[0.95rem] text-slate-700 font-centaur px-2 leading-relaxed">
                 Use your <strong className="text-ink">arrow keys</strong> to move. Stay in the light to maximize your score. Reach the Lantern to win!
               </p>
             </div>
          </div>
          )}

        </div>
        
        <div
          aria-hidden="true"
          className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 transition-opacity duration-150 ${
            isEmailFocused ? 'opacity-0 pointer-events-none' : `opacity-100 ${prefersReducedMotion ? '' : 'animate-bounce'}`
          }`}
        >
          <ArrowDown />
        </div>
      </div>
    </section>
  );
};

export default Hero;
