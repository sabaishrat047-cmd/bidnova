import Navbar from "../../components/Navbar";

export default function SellItemPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-3xl font-bold text-amber-100">Sell Item</h1>
        <p className="mt-2 max-w-2xl text-sm text-amber-100/70">
          Create premium listings with item details, reserve prices, and auction duration.
        </p>
      </main>
    </div>
  );
}
