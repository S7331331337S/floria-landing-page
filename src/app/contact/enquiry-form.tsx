"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { ENQUIRY_TYPES, SITE } from "@/lib/content";

/**
 * NOTE: this form is presentation-only — there is no submit endpoint wired up yet.
 * Nothing is transmitted or persisted; submitting only advances local UI state.
 * Before going live, POST `form` to a real handler (route handler, form service or CRM)
 * and surface genuine success/error states. The mailto link below is the working path
 * in the meantime.
 */

const FIELD =
    "w-full rounded-2xl border border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all";

export function EnquiryForm() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        type: ENQUIRY_TYPES[0],
        date: "",
        message: "",
    });

    const update =
        (field: keyof typeof form) =>
            (
                e: React.ChangeEvent<
                    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
                >
            ) =>
                setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="rounded-[2.5rem] border border-border bg-muted/40 p-8 md:p-12">
            <AnimatePresence mode="wait">
                {submitted ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-start py-8"
                    >
                        <CheckCircle weight="duotone" className="w-14 h-14 text-accent dark:text-accent-bright mb-6" />
                        <h3 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
                            Thank you, {form.name.split(" ")[0] || "friend"}.
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-[42ch] mb-8">
                            Your enquiry is with the studio. We reply to everything within two working
                            days — if it is urgent, the studio line is the faster route.
                        </p>
                        <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="text-sm font-semibold uppercase tracking-widest text-accent dark:text-accent-bright hover:text-foreground transition-colors"
                        >
                            Send another enquiry
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={update("name")}
                                    placeholder="Your full name"
                                    className={FIELD}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={update("email")}
                                    placeholder="you@example.com"
                                    className={FIELD}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="type" className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Enquiry type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={form.type}
                                    onChange={update("type")}
                                    className={FIELD}
                                >
                                    {ENQUIRY_TYPES.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="date" className="text-xs uppercase tracking-widest text-muted-foreground">
                                    Date <span className="normal-case tracking-normal">(if you have one)</span>
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={update("date")}
                                    className={FIELD}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground">
                                The brief
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                value={form.message}
                                onChange={update("message")}
                                placeholder="Tell us about the space, the season and the hour it will be used."
                                className={`${FIELD} resize-y min-h-[140px]`}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-2">
                            <button
                                type="submit"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background px-8 h-14 text-base font-medium tracking-tight transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Send enquiry
                                <ArrowRight weight="bold" className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-sm text-muted-foreground">
                                or email{" "}
                                <a href={`mailto:${SITE.email}`} className="text-accent dark:text-accent-bright hover:underline">
                                    {SITE.email}
                                </a>
                            </p>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
