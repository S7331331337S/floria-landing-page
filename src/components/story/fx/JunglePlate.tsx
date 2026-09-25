// Art-directed <picture>: a wide plate for desktop, a tall one for phones.

/**
 * The rendered rainforest backdrop (scripts/render-elements.ts): a wide
 * plate for desktop, a tall one for phones. Already WebP-optimised.
 */
export function JunglePlate({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <picture className={`pointer-events-none absolute inset-0 block ${className}`}>
      <source media="(min-width: 768px)" srcSet="/story/elements/jungle-wide.webp" />
      <img
        src="/story/elements/jungle-tall.webp"
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
        fetchPriority={priority ? "high" : "auto"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
