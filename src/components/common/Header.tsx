import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 bg-gray-100">
      <Link href="/">
        <h1 className="text-2xl font-bold cursor-pointer hover:text-blue-600 transition-colors">
          Mini Hub
        </h1>
      </Link>
    </header>
  );
};

export default Header;
