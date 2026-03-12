import Navbar from "../../components/Navbar";

export default function MyAuctionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-3xl font-bold text-amber-100">My Auctions</h1>
        <p className="mt-2 text-sm text-amber-100/70">
          Review and manage auctions you have listed as a seller.
        </p>
      </main>
    </div>
  );
}
