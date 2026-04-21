import Link from "next/link";
import { MdApps } from "react-icons/md";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-violet-500 via-pink-500 to-orange-400 px-6 py-3 shadow-[0_3px_0_#fff]">
      <div className="mx-auto w-full max-w-300 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity cursor-pointer"
        >
          <MdApps className="text-2xl" />
          <span className="text-xl font-display mt-0.5">Mini Hub</span>
        </Link>
        <nav>
          <Link
            href="/"
            className="text-sm font-display text-white/80 hover:text-white transition-colors"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
