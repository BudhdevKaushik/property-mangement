"use client";

import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">
          <Link href="/">Property Management</Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
