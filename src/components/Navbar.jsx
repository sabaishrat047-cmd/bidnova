"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBars,
  FaBell,
  FaGavel,
  FaSearch,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Auctions", href: "/auctions" },
  { label: "Categories", href: "/categories" },
  { label: "Sell Item", href: "/sell-item" },
  { label: "Dashboard", href: "/dashboard" },
];

const profileLinks = [
  { label: "Profile", href: "/profile" },
  { label: "My Bids", href: "/my-bids" },
  { label: "My Auctions", href: "/my-auctions" },
  { label: "Settings", href: "/settings" },
];

const initialAlerts = [
  "Your bid on Vintage Watch has been outbid.",
  "Auction for Rare Painting ends in 15 minutes.",
  "New bidder activity on your listed item.",
];

function linkClass(active) {
  return `rounded-full px-3 py-2 text-sm font-medium transition ${
    active
      ? "bg-amber-400/20 text-amber-300"
      : "text-amber-100/90 hover:bg-amber-300/10 hover:text-amber-200"
  }`;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const profileMenuRef = useRef(null);
  const alertMenuRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem("bidnova-auth") === "true";
  });
  const [alerts, setAlerts] = useState(initialAlerts);

  const unreadAlerts = alerts.length;

  const activePath = useMemo(
    () => (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href)),
    [pathname],
  );

  useEffect(() => {
    window.localStorage.setItem("bidnova-auth", String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    function onClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (alertMenuRef.current && !alertMenuRef.current.contains(event.target)) {
        setAlertsOpen(false);
      }
    }

    function onEscape(event) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setProfileOpen(false);
        setAlertsOpen(false);
      }
    }

    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  function onSearchSubmit(event) {
    event.preventDefault();
    const query = searchValue.trim();
    if (!query) {
      return;
    }
    setMobileOpen(false);
    setProfileOpen(false);
    setAlertsOpen(false);
    router.push(`/auctions?search=${encodeURIComponent(query)}`);
  }

  function handleLogin() {
    setIsLoggedIn(true);
    router.push("/dashboard");
  }

  function handleRegister() {
    setIsLoggedIn(true);
    router.push("/dashboard");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setMobileOpen(false);
    setProfileOpen(false);
    setAlertsOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-7xl rounded-2xl border border-amber-400/20 bg-gradient-to-r from-black/80 via-zinc-950/80 to-black/80 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-amber-300/10"
          >
            <motion.span
              whileHover={{ rotate: -12, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 280, damping: 15 }}
              className="text-xl text-amber-300"
            >
              <FaGavel />
            </motion.span>
            <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-lg font-bold tracking-wide text-transparent">
              BidNova
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(activePath(item.href))}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <form
              onSubmit={onSearchSubmit}
              className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/45 px-3 py-2"
            >
              <FaSearch className="text-xs text-amber-300/80" />
              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search auctions..."
                aria-label="Search auctions"
                className="w-40 bg-transparent text-sm text-amber-50 outline-none placeholder:text-amber-100/45 lg:w-56"
              />
            </form>

            <div className="relative" ref={alertMenuRef}>
              <button
                type="button"
                onClick={() => setAlertsOpen((value) => !value)}
                className="relative rounded-full border border-amber-400/25 bg-zinc-900/70 p-2 text-amber-200 transition hover:border-amber-300/50 hover:text-amber-100"
                aria-label="Notifications"
              >
                <FaBell />
                {unreadAlerts > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black">
                    {unreadAlerts}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {alertsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-12 w-80 rounded-xl border border-amber-300/20 bg-zinc-950/95 p-3 shadow-xl"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-sm font-semibold text-amber-200">Notifications</p>
                      <button
                        type="button"
                        onClick={() => setAlerts([])}
                        className="text-xs text-amber-300/80 hover:text-amber-200"
                      >
                        Clear all
                      </button>
                    </div>
                    {alerts.length === 0 ? (
                      <p className="text-sm text-amber-100/60">No new alerts.</p>
                    ) : (
                      <ul className="space-y-2">
                        {alerts.map((alert) => (
                          <li
                            key={alert}
                            className="rounded-lg border border-amber-300/10 bg-black/40 p-2 text-xs text-amber-50/90"
                          >
                            {alert}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((value) => !value)}
                  className="flex items-center gap-2 rounded-full border border-amber-300/25 bg-zinc-900/70 px-3 py-2 text-sm text-amber-100 transition hover:border-amber-200/50"
                >
                  <FaUserCircle className="text-base" />
                  Account
                  <IoChevronDown
                    className={`text-xs transition ${profileOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 w-52 overflow-hidden rounded-xl border border-amber-300/20 bg-zinc-950/95 shadow-xl"
                    >
                      {profileLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-amber-50/90 transition hover:bg-amber-300/10"
                        >
                          {item.label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full border-t border-amber-300/15 px-4 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLogin}
                  className="rounded-full border border-amber-400/30 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-300 hover:bg-amber-300/10"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleRegister}
                  className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:scale-[1.02]"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="rounded-full border border-amber-300/30 bg-zinc-900/70 p-2 text-amber-200 transition hover:border-amber-200/60 lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-black/70"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              className="fixed right-0 top-0 z-50 h-full w-[86vw] max-w-sm border-l border-amber-300/15 bg-zinc-950 p-5 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-lg font-semibold text-amber-200">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-amber-200/30 p-2 text-amber-200"
                  aria-label="Close mobile menu"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={onSearchSubmit} className="mb-5 flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/45 px-3 py-2">
                <FaSearch className="text-xs text-amber-300/80" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search auctions..."
                  aria-label="Search auctions mobile"
                  className="w-full bg-transparent text-sm text-amber-50 outline-none placeholder:text-amber-100/45"
                />
              </form>

              <div className="space-y-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClass(activePath(item.href))}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-amber-300/15 bg-black/40 p-3">
                <div className="mb-2 flex items-center gap-2 text-amber-200">
                  <FaBell />
                  <span className="text-sm font-medium">Alerts ({unreadAlerts})</span>
                </div>
                <p className="text-xs text-amber-50/70">
                  {unreadAlerts > 0
                    ? "You have unread notifications."
                    : "All notifications are read."}
                </p>
              </div>

              <div className="mt-6 border-t border-amber-300/10 pt-5">
                {isLoggedIn ? (
                  <div className="space-y-1">
                    {profileLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-amber-100 transition hover:bg-amber-300/10"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-lg border border-red-400/30 px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-400/10"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="rounded-lg border border-amber-400/30 px-3 py-2 text-sm font-semibold text-amber-100"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-2 text-sm font-semibold text-black"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
