function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-green-100 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌾</span>

        <h1 className="text-xl font-bold text-green-700">
          KrishiVed
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome, Farmer
        </span>

        <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
          F
        </div>
      </div>
    </nav>
  );
}

export default Navbar;