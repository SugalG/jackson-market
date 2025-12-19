import { getAllProducts, getAllCategories } from "@/lib/db";

export default async function HomePage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div className="">
      {/* ✅ HERO SECTION (same content as your recent simple code, design like 1st code) */}
    <section
  className="
    relative
    w-full
    min-h-screen
    overflow-hidden
    bg-gradient-to-r
    from-[#0b3b25]
    via-[#0a4729]
    to-[#0b3b25]
    text-white
    flex
    items-center
  "
>
  {/* grid overlay */}
  <div className="pointer-events-none absolute inset-0 opacity-20">
    <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:28px_28px]" />
  </div>

  {/* top fade */}
  <div className="pointer-events-none absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/30 to-transparent" />

  <div className="relative w-full px-4 sm:px-6 lg:px-12 py-24">
    <div className="mx-auto w-full max-w-7xl py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
        <h1
  className="
  font-[Quicksand]
font-semibold
tracking-[0.02em] md:tracking-[0.025em] lg:tracking-[0.03em]
text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem]
leading-[1.1] md:leading-[1.15]

    
  "
>
  Fresh Groceries For Everyday Healthy Living
</h1>



     
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="/products"
              className="
                font-quicksand
                bg-[#f6c744]
                text-[#143626]
                px-6
                py-3
                rounded-full
                text-sm
                font-bold
                shadow
                hover:brightness-95
                transition
              "
            >
              Browse Products
            </a>

            <a
              href="/login"
              className="
                font-quicksand
                border
                border-white/30
                text-white
                px-6
                py-3
                rounded-full
                text-sm
                font-medium
                hover:bg-white/10
                transition
              "
            >
              Join Us Now
            </a>
          </div>

          {/* benefits row */}
          <div
            className="
              font-quicksand
              mt-10
              flex
              flex-wrap
              gap-x-10
              gap-y-3
              text-sm
              text-white/85
            "
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#39d98a]" />
              Lower Bills with Deals
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#39d98a]" />
              Fresh &amp; Quality
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#39d98a]" />
              Fast Delivery
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="lg:flex lg:justify-end">
          <div
            className="
              relative
              w-full
              max-w-xl
              lg:max-w-lg
              xl:max-w-2xl
              rounded-3xl
              overflow-hidden
              shadow-2xl
              ring-1 ring-white/10
            "
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=70"
              alt="Fresh groceries"
              className="
                w-full
                h-[300px]
                md:h-[360px]
                lg:h-[320px]
                xl:h-[420px]
                object-cover
              "
            />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </div>

      </div>
    </div>
  </div>
</section>


     {/* ✅ ABOUT / STORY SECTION */}
<section
  className="
    relative
    bg-[#eff5ee]
    overflow-hidden
    px-4
    sm:px-6
    lg:px-12
    pt-20
    pb-28
  "
>
  {/* LEFT DECOR IMAGE */}
  <img
    src="/uploads/imgleft.webp"
    alt=""
    className="
      hidden md:block
      absolute
      left-16
      lg:left-24
      top-12
      w-44
      lg:w-52
      opacity-70
    "
  />

  {/* RIGHT DECOR IMAGE */}
  <img
    src="/uploads/imgright.webp"
    alt=""
    className="
      hidden md:block
      absolute
      right-16
      lg:right-24
      top-12
      w-44
      lg:w-52
      opacity-70
    "
  />

  <div className="relative max-w-5xl mx-auto text-center">
    {/* CENTER IMAGE */}
    <div className="mx-auto mb-14 w-80 md:w-96 lg:w-[26rem]">
      <img
        src="/uploads/imgcenter.webp"
        alt="Fresh farm products"
        className="mx-auto"
      />
    </div>

    {/* TEXT CONTENT */}
    <p
      className="
        font-quicksand
        text-lg
        md:text-xl
        text-gray-700
        leading-relaxed
        max-w-3xl
        mx-auto
      "
    >
      Welcome to{" "}
      <span className="font-semibold text-[#1f5b3f]">Jackson Market</span>, where
      freshness meets trust. We carefully source our groceries from reliable
      farmers and suppliers to ensure every product you receive meets our
      quality standards.
      <br />
      <br />
      From handpicked produce to everyday essentials, our goal is simple —
      deliver honest food, fair prices, and a shopping experience you can rely
      on.
    </p>

    {/* SIGNATURE */}
    <div className="mt-14 font-quicksand">
      <p className="text-xl font-semibold text-[#1f5b3f]">
        Jackson Team
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Your Neighborhood Grocery Partner
      </p>
    </div>
  </div>
</section>

{/* ✅ POPULAR CATEGORIES – CARD STYLE (MATCH PRODUCTS PAGE) */}
<section className="px-4 sm:px-6 lg:px-12 py-10 bg-[#eff5ee]">
  <div className="mx-auto w-full max-w-7xl">

    <div className="bg-white rounded-3xl shadow-sm border border-[#1f5b3f]/10 p-8">

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <h2
          className="
            font-quicksand
            text-2xl
            md:text-3xl
            font-extrabold
            text-[#1f5b3f]
            whitespace-nowrap
          "
        >
          Popular Categories
        </h2>
        <div className="h-[2px] flex-1 bg-[#1f5b3f]/20 rounded-full" />
      </div>

 
   {/* CATEGORY ROW */}
<div
  className="
    grid grid-cols-2 gap-6
    sm:grid-cols-3
    md:flex md:gap-8 md:overflow-x-auto md:pb-2
    [scrollbar-width:none]
    md:[&::-webkit-scrollbar]:hidden
  "
>
  {categories.map((c) => (
    <a
      key={c.id}
      href={`/products?category=${c.slug}`}
      className="
        group
        flex flex-col items-center text-center
        transition
        md:min-w-[160px]
      "
    >
      <div
        className="
          h-24 w-24
          rounded-full
          bg-[#f8fbf7]
          border border-[#1f5b3f]/20
          shadow-sm
          flex items-center justify-center
          group-hover:shadow-md
          group-hover:-translate-y-1
          transition
        "
      >
        <img
          src={c.image || '/placeholder.png'}
          alt={c.name}
          className="h-14 w-14 object-contain"
        />
      </div>

      <p className="mt-4 font-quicksand text-base font-semibold text-gray-900 group-hover:text-[#1f5b3f] transition">
        {c.name}
      </p>

      {(c.productCount ?? c.productsCount ?? c._count?.products) != null && (
        <p className="mt-1 font-quicksand text-sm text-gray-500">
          {c.productCount ?? c.productsCount ?? c._count?.products} Products
        </p>
      )}
    </a>
  ))}
</div>


    </div>
  </div>
</section>


{/* ✅ FEATURED PRODUCTS – CARD STYLE (MATCH PRODUCTS PAGE) */}
<section className="px-4 sm:px-6 lg:px-12 pb-16 bg-[#eff5ee]">
  <div className="mx-auto w-full max-w-7xl">

    <div className="bg-white rounded-3xl shadow-sm border border-[#1f5b3f]/10 p-8">

      {/* TITLE */}
      <div className="flex items-center gap-4 mb-8">
        <h2
          className="
            font-quicksand
            text-2xl
            md:text-3xl
            font-extrabold
            tracking-tight
            text-[#1f5b3f]
            whitespace-nowrap
          "
        >
          Featured Products
        </h2>

        <div className="flex-1 h-px bg-[#1f5b3f]/30" />

        <a
          href="/products"
          className="
            hidden sm:inline-flex
            items-center
            justify-center
            rounded-full
            border border-[#1f5b3f]/30
            bg-white
            px-5
            py-2
            text-sm
            font-quicksand
            font-semibold
            text-[#1f5b3f]
            shadow-sm
            hover:bg-[#1f5b3f]
            hover:text-white
            transition
            whitespace-nowrap
          "
        >
          Browse all →
        </a>
      </div>

      {/* CONTENT */}
      {products.length === 0 ? (
        <div className="rounded-2xl bg-[#eff5ee] p-6 text-sm font-quicksand text-gray-600">
          No products found. Add some from the Admin panel.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 8).map((p) => (
            <a
              key={p.id}
              href={`/products/${p.slug}`}
              className="
                group
                block
                rounded-3xl
                bg-[#f8fbf7]
                border border-black/5
                shadow-sm
                hover:shadow-md
                transition
                overflow-hidden
              "
            >
              {/* IMAGE */}
              <div className="p-6">
                <div className="w-full h-44 md:h-56 flex items-center justify-center">
                  <img
                    src={p.images?.[0] || "/placeholder.png"}
                    alt={p.name}
                    className="
                      max-h-full
                      max-w-full
                      object-contain
                      group-hover:scale-105
                      transition-transform
                    "
                  />
                </div>
              </div>

              {/* DETAILS */}
              <div className="px-6 pb-6">
                <h3 className="font-quicksand text-[15px] md:text-base font-semibold text-gray-900 leading-snug line-clamp-2">
                  {p.name}
                </h3>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="font-quicksand text-[#1f5b3f] font-extrabold text-lg">
                    ₹{p.price}
                  </p>

                  <span
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-[#eaf3ee]
                      text-[#1f5b3f]
                      font-quicksand
                      font-bold
                      text-sm
                      px-5
                      py-2.5
                      border border-[#1f5b3f]/15
                      group-hover:bg-[#1f5b3f]
                      group-hover:text-white
                      transition
                    "
                  >
                    Add
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

    </div>
  </div>
</section>


   {/* ✅ CTA SECTION */}
<section
  className="
    w-full
    bg-cover
    bg-center
    py-24
    bg-[#eff5ee]
  "
  style={{ backgroundImage: "url('/uploads/imgcta.webp')" }}
>
  <div className="w-full px-4 sm:px-6 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <div className="max-w-xl text-left">

        <h3
          className="
            font-quicksand
            text-2xl
            md:text-3xl
            font-extrabold
            text-[#1f5b3f]
          "
        >
          Cash on Delivery Available
        </h3>

        <p
          className="
            font-quicksand
            mt-4
            text-[#1f5b3f]/80
            text-sm
            md:text-base
          "
        >
          Place your order now and pay when it arrives at your doorstep.
        </p>

        <a
          href="/products"
          className="
            inline-flex
            mt-8
            px-10
            py-3
            rounded-full
            bg-[#7ab54a]
            text-white
            font-quicksand
            font-bold
            shadow
            hover:brightness-95
            transition
          "
        >
          Shop Now →
        </a>

      </div>
    </div>
  </div>
</section>


<section className="w-full px-4 sm:px-6 lg:px-12 py-10 bg-[#eff5ee]">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* VEG BANNER */}
        <div className="relative overflow-hidden rounded-3xl min-h-[260px] sm:min-h-[320px]">
          {/* background image */}
          <img
            src="/uploads/vegbanner.jpg"
            alt="Vegetables Banner"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* left content */}
          <div className="relative z-10 h-full w-full p-8 sm:p-10 flex items-center">
            <div className="max-w-[300px] sm:max-w-[340px]">
              <h2
                className="
                  font-[Quicksand] font-semibold
                  tracking-[0.02em] md:tracking-[0.025em]
                  text-[#24443e]
                  text-[2.1rem] sm:text-[2.5rem] md:text-[2.8rem]
                  leading-[1.05]
                "
              >
                Tasty Vegetables
                <br />
                from Farm
                <br />
                Vendors
              </h2>

              <p className="mt-5 font-[Quicksand] text-[#24443e]/90 text-base sm:text-lg leading-snug">
                Every Fridays Check
                <br />
                Best Market Deals!
              </p>

              <button
                className="
                  mt-7 inline-flex items-center justify-center
                  font-[Quicksand] font-semibold
                  px-7 py-3 rounded-full
                  bg-[#e8745b] text-white
                  shadow-sm
                  hover:opacity-95 active:scale-[0.98]
                  transition
                "
              >
                Top Notch Support
              </button>
            </div>
          </div>
        </div>

        {/* FRUIT BANNER */}
        <div className="relative overflow-hidden rounded-3xl min-h-[260px] sm:min-h-[320px]">
          {/* background image */}
          <img
            src="/uploads/fruitbanner.jpg"
            alt="Fruits Banner"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* left content */}
          <div className="relative z-10 h-full w-full p-8 sm:p-10 flex items-center">
            <div className="max-w-[320px] sm:max-w-[360px]">
              <h2
                className="
                  font-[Quicksand] font-semibold
                  tracking-[0.02em] md:tracking-[0.025em]
                  text-[#24443e]
                  text-[2.1rem] sm:text-[2.5rem] md:text-[2.8rem]
                  leading-[1.05]
                "
              >
                Delicious Fruits
                <br />
                for Everyday
                <br />
                Living
              </h2>

              <p className="mt-5 font-[Quicksand] text-[#24443e]/90 text-base sm:text-lg leading-snug">
                Fresh &amp; Non GMO
                <br />
                Sweet Fruits
              </p>

              <button
                className="
                  mt-7 inline-flex items-center justify-center
                  font-[Quicksand] font-semibold
                  px-7 py-3 rounded-full
                  bg-[#e8745b] text-white
                  shadow-sm
                  hover:opacity-95 active:scale-[0.98]
                  transition
                "
              >
                Trusted Payments
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
}
