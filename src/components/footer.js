export default function Footer() {
  return (
    <footer
      className="
        relative
        mt-16
        text-white
        overflow-hidden
        bg-gradient-to-r
        from-[#0b3b25]
        via-[#0a4729]
        to-[#0b3b25]
        font-quicksand
      "
    >
      {/* subtle background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url(/uploads/footer-bg.jpg)" }}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative px-4 sm:px-6 lg:px-12 py-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/logo.svg"
                alt="Jackson Market"
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-3xl font-extrabold tracking-tight">
                Jackson Market
              </h3>
            </div>

            <p className="mt-5 text-base leading-7 text-white/80 max-w-sm">
              Jackson Market delivers fresh groceries straight to your door,
              helping families save time and enjoy quality food every day.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-xl font-extrabold mb-5">Quick Links</h4>
            <ul className="space-y-3 text-base text-white/85">
              <li>
                <a href="/" className="hover:text-white transition">
                  <span className="text-[#39d98a] mr-2">•</span> Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white transition">
                  <span className="text-[#39d98a] mr-2">•</span> Products
                </a>
              </li>
              <li>
                <a href="/orders" className="hover:text-white transition">
                  <span className="text-[#39d98a] mr-2">•</span> Orders
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition">
                  <span className="text-[#39d98a] mr-2">•</span> Contact
                </a>
              </li>
            </ul>
          </div>

          {/* SERVICE LIST */}
          <div>
            <h4 className="text-xl font-extrabold mb-5">Service List</h4>
            <ul className="space-y-3 text-base text-white/85">
              <li><span className="text-[#39d98a] mr-2">•</span> Fast Delivery</li>
              <li><span className="text-[#39d98a] mr-2">•</span> Fresh Quality</li>
              <li><span className="text-[#39d98a] mr-2">•</span> Secure Payments</li>
              <li><span className="text-[#39d98a] mr-2">•</span> Best Deals</li>
              <li><span className="text-[#39d98a] mr-2">•</span> 24/7 Support</li>
            </ul>
          </div>

          {/* SOCIAL LINKS */}
          <div>
            <h4 className="text-xl font-extrabold mb-5">Social Link</h4>
            <div className="space-y-4 text-base text-white/90">
              {[
                ["f", "Facebook"],
                ["in", "LinkedIn"],
                ["x", "Twitter"],
                ["◎", "Instagram"],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <span className="h-11 w-11 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold">
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mx-auto max-w-7xl mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-base text-white/80">
            © {new Date().getFullYear()} Jackson Market. All rights reserved.
          </p>

          <p className="text-sm text-white/70">
            Powered by{" "}
            <a
              href="https://anrikatech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-extrabold hover:text-[#39d98a] transition"
            >
              ANRIKA
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
