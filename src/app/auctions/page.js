import Navbar from "../../components/Navbar";

const items = [
  "Vintage Watch",
  "Luxury Handbag",
  "Antique Vase",
  "Signed Football Jersey",
  "Classic Camera",
];

export default async function AuctionsPage({ searchParams }) {
  const params = await searchParams;
  const query =
    typeof params?.search === "string" ? params.search.toLowerCase().trim() : "";
  const filteredItems = items.filter((item) => item.toLowerCase().includes(query));

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-3xl font-bold text-amber-100">Auctions</h1>
        <p className="mt-2 text-sm text-amber-100/70">
          {query ? `Search results for "${query}"` : "Browse all active auctions."}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <article
                key={item}
                className="rounded-xl border border-amber-300/15 bg-black/35 p-4 text-amber-50/90"
              >
                {item}
              </article>
            ))
          ) : (
            <p className="text-sm text-amber-200/80">No auctions found for this search.</p>
          )}
        </div>
      </main>
    </div>
  );
}
