"use client";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto">
      <div className="max-w-7xl mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Property Management. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
