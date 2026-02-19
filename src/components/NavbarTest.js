
import { CategoryNavbar } from "./CategoryNavbar";
import MainHeader from "./MainNavbar";

export default function NavbarTest({ user }) {
  return (
    <header className="w-full font-quicksand shadow-sm">

      {/* 🔹 TOP SHIPPING BAR */}
      <div className="bg-gray-100 text-center text-sm py-2 text-gray-700 font-medium">
        Free Shipping over $50
      </div>

      {/* 🔹 PROMO BAR */}
      <div
        className="
    bg-gradient-to-r
    from-[#0b3b25]
    via-[#0a4729]
    to-[#0b3b25]
    text-white text-sm py-2
    overflow-hidden
  "
      >
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee whitespace-nowrap font-semibold">
            {/* First Copy */}
            <span className="mx-10">
              ⚡ Buff Sukuti & Wai Wai Made in Nepal! Now Available
            </span>
            <span className="mx-10">
              ⚡ Authentic Nepali Groceries Delivered Nationwide
            </span>

            {/* Duplicate Copy for seamless loop */}
            <span className="mx-10">
              ⚡ Buff Sukuti & Wai Wai Made in Nepal! Now Available
            </span>
            <span className="mx-10">
              ⚡ Authentic Nepali Groceries Delivered Nationwide
            </span>
             {/* Duplicate Copy for seamless loop */}
            <span className="mx-10">
              ⚡ Buff Sukuti & Wai Wai Made in Nepal! Now Available
            </span>
            <span className="mx-10">
              ⚡ Authentic Nepali Groceries Delivered Nationwide
            </span>
             {/* Duplicate Copy for seamless loop */}
            <span className="mx-10">
              ⚡ Buff Sukuti & Wai Wai Made in Nepal! Now Available
            </span>
            <span className="mx-10">
              ⚡ Authentic Nepali Groceries Delivered Nationwide
            </span>
          </div>
        </div>
      </div>


      {/* 🔹 MAIN HEADER */}
      <MainHeader user={user}/>

      {/* Category Navbar */}
      <CategoryNavbar/>
    </header>
  );
}
