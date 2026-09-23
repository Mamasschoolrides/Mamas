const ITEMS = [
  "Door-to-door",
  "Mom-driven",
  "McConachie & surrounding communities",
  "Same driver, every day",
  "Private school transportation",
  "Small routes. Big care.",
];

export const Marquee = () => (
  <div data-testid="editorial-marquee" className="overflow-hidden border-y border-line bg-ink py-4" aria-hidden="true">
    <div className="flex w-max animate-marquee items-center">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {ITEMS.map((item, i) => (
            <span key={`${copy}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-serif text-lg italic tracking-wide text-cream/90 sm:text-xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-terra" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
