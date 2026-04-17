import React from "react";
import Link from "next/link";
import { MdApps } from "react-icons/md";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-white/20 px-6 py-3">
      <div className="mx-auto w-full max-w-300 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity cursor-pointer"
        >
          <MdApps className="text-2xl" />
          <span className="text-xl font-bold mt-0.5">Mini Hub</span>
        </Link>
        <nav>
          <Link
            href="/"
            className="text-sm font-bold text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
