import Navbar from "../components/Navbar";

const highlights = [
  {
    title: "Live Auctions",
    text: "Track high-value items in real time and place instant bids with confidence.",
  },
  {
    title: "Secure Seller Space",
    text: "List premium products, manage offers, and monitor bidder activity from one dashboard.",
  },
  {
    title: "Smart Discovery",
    text: "Use advanced search and category filters to discover trending auction opportunities.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <section className="rounded-3xl border border-amber-300/20 bg-black/35 p-8 shadow-[0_10px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-12">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-amber-300/80">
            BidNova Premium Auctions
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-amber-50 sm:text-5xl">
            Where rare collections meet competitive bidding.
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-amber-100/70 sm:text-base">
            Experience a luxury-first online auction platform with modern design,
            responsive performance, and interactive bidding workflows.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-amber-300/15 bg-zinc-950/55 p-5 transition hover:-translate-y-0.5 hover:border-amber-300/30"
            >
              <h2 className="text-lg font-semibold text-amber-200">{card.title}</h2>
              <p className="mt-2 text-sm text-amber-100/70">{card.text}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
