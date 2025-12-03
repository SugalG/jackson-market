export default function Footer() {
  return (
    <footer className="bg-[#1f5b3f] text-white mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Jackson Market</p>
        <p className="text-xs text-white/70 mt-1">
          Fresh groceries delivered to your door.
        </p>
      </div>
    </footer>
  );
}
