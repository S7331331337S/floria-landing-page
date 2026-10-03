"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Envelope, FacebookLogo, InstagramLogo, Phone, PinterestLogo, TiktokLogo } from "@phosphor-icons/react";
import { site } from "@/content/story";
import {
  CONTACT_EMAIL,
  CONTACT_PAGE,
  NEWSLETTER_ENDPOINT,
  PHONE_DISPLAY,
  PHONE_TEL,
  VERIFIED_SOCIAL_PROFILES,
  type SocialPlatform,
} from "@/content/social";

const SOCIAL_ICONS: Record<SocialPlatform, typeof InstagramLogo> = {
  instagram: InstagramLogo,
  facebook: FacebookLogo,
  tiktok: TiktokLogo,
  pinterest: PinterestLogo,
};

type Status = { state: "idle" | "sending" | "success" | "error"; message: string };

const iconLink =
  "grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream/75 transition duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

function NewsletterForm() {
  const id = useId();
  const startedAt = useRef<number>(0);
  const [status, setStatus] = useState<Status>({ state: "idle", message: "" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    if (form.get("consent") !== "yes") {
      setStatus({ state: "error", message: "Please tick the box to agree to receive studio emails." });
      return;
    }
    setStatus({ state: "sending", message: "" });
    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          consent: "yes",
          company_website: String(form.get("company_website") ?? ""),
          form_started_at: startedAt.current,
        }),
      });
      const data = (await res.json().catch(() => null)) as { status?: string; message?: string } | null;
      if (res.ok && data?.status === "success") {
        setStatus({ state: "success", message: data.message || "Thank you. You're on the list." });
      } else {
        setStatus({ state: "error", message: data?.message || "Something went wrong. Please try again in a moment." });
      }
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the studio just now. Please try again in a moment." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-sm border border-gold/30 bg-cream/5 px-5 py-4 text-sm text-cream/85">
        <p className="display text-xl italic text-gold">Welcome to the growing room.</p>
        <p className="mt-1">{status.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex w-full flex-col gap-3">
      {/* honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          aria-invalid={status.state === "error" || undefined}
          aria-describedby={`${id}-status`}
          className="h-12 w-full min-w-0 rounded-full sm:w-auto sm:flex-1 border border-cream/25 bg-night/40 px-5 text-sm text-cream placeholder:text-cream/45 focus:border-gold focus:outline-none aria-[invalid=true]:border-[#e89a8a]"
        />
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="h-12 rounded-full bg-gold px-6 text-sm font-semibold tracking-wide text-night transition duration-300 hover:bg-cream disabled:cursor-progress disabled:opacity-60"
        >
          {status.state === "sending" ? "Joining…" : "Join the list"}
        </button>
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-left text-xs leading-relaxed text-cream/70">
        {/* unticked by default: subscribing needs an explicit opt-in */}
        <input type="checkbox" name="consent" value="yes" defaultChecked={false} className="mt-0.5 h-4 w-4 flex-none accent-[#e9c979]" />
        <span>Yes, email me about new pieces, workshops and studio news. Unsubscribe any time.</span>
      </label>
      <p id={`${id}-status`} role={status.state === "error" ? "alert" : undefined} aria-live="polite" className="min-h-[1.25rem] text-left text-xs text-[#f0b2a5]">
        {status.state === "error" ? status.message : ""}
      </p>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-cream/10 bg-night/90 px-6 pb-6 pt-12 text-cream/60 backdrop-blur-md md:px-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.15fr] md:items-start">
        <section aria-labelledby="welcome-newsletter-title" className="text-left">
          <h2 id="welcome-newsletter-title" className="display text-3xl text-cream md:text-4xl">
            Letters from the greenhouse
          </h2>
          <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-cream/70">
            New pieces, workshop dates and seasonal care notes. A few times a season, never more.
          </p>
        </section>
        <NewsletterForm />
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center justify-between gap-5 border-t border-cream/10 pt-6 text-xs tracking-wide md:flex-row">
        <span className="display text-base italic text-cream/70">{site.name}</span>
        <span className="text-center">
          {site.place} · Grown by hand by {site.owner} ·{" "}
          <a href={CONTACT_PAGE} className="underline-offset-4 transition hover:text-gold hover:underline">
            Contact
          </a>
        </span>
        <div className="flex items-center gap-3">
          <nav aria-label="Contact the studio" className="flex gap-3">
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label={`Email the studio at ${CONTACT_EMAIL}`} className={iconLink}>
              <Envelope size={18} aria-hidden="true" />
            </a>
            <a href={`tel:${PHONE_TEL}`} aria-label={`Call the studio at ${PHONE_DISPLAY}`} className={iconLink}>
              <Phone size={18} aria-hidden="true" />
            </a>
          </nav>
          {VERIFIED_SOCIAL_PROFILES.length > 0 && (
            <nav aria-label="Follow La Casa Del Amor" className="flex gap-3">
              {VERIFIED_SOCIAL_PROFILES.map((profile) => {
                const Icon = SOCIAL_ICONS[profile.platform];
                return (
                  <a key={profile.platform} href={profile.url} target="_blank" rel="noopener noreferrer me" aria-label={`${profile.label} (opens in a new tab)`} className={iconLink}>
                    <Icon size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
