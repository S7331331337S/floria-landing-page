/** Fine film grain over the whole story. Fixed and static, so it costs nothing to scroll. */
export function Grain() {
  return <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[60]" />;
}
