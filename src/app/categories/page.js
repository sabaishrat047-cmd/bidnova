import Navbar from "../../components/Navbar";

const categories = ["Art", "Collectibles", "Electronics", "Fashion", "Vehicles"];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-3xl font-bold text-amber-100">Categories</h1>
        <p className="mt-2 text-sm text-amber-100/70">
          Explore curated collections by auction category.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {categories.map((item) => (
            <span
              key={item}
              className="rounded-full border border-amber-300/20 bg-black/35 px-4 py-2 text-sm text-amber-100"
            >
              {item}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
