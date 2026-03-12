import Navbar from "../../components/Navbar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-3xl font-bold text-amber-100">Dashboard</h1>
        <p className="mt-2 text-sm text-amber-100/70">
          Monitor bidding performance, watchlist trends, and seller insights.
        </p>
      </main>
    </div>
  );
}
