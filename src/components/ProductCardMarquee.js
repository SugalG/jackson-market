"use client";

export default function ProductCardMarquee() {
  // Dummy promo data (later fetch from DB)
  const promos = [
    {
      id: 1,
      title: "Kasthamandap Lakhamari",
      subtitle: "Aaitha, Aati, Joprasad",
      image: "/lakhamari.jpg",
    },
    {
      id: 2,
      title: "Authentic Nepali Wai Wai",
      subtitle: "Spicy | Chicken | Veg",
      image: "/waiwai.png",
    },
    {
      id: 3,
      title: "Buff Sukuti Special",
      subtitle: "Premium Quality",
      image: "/sukuti.png",
    },
    {
      id: 4,
      title: "Nepali Titaura Pack",
      subtitle: "Sweet & Spicy Mix",
      image: "/titaura.png",
    },
  ];

  return (
    <section className="w-full overflow-hidden py-14 bg-white">
      <div className="flex w-max animate-marquee gap-8">

        {/* First Set */}
        {promos.map((promo) => (
          <PromoCard key={promo.id} promo={promo} />
        ))}

        {/* Duplicate Set for seamless loop */}
        {promos.map((promo) => (
          <PromoCard key={`dup-${promo.id}`} promo={promo} />
        ))}
      </div>
    </section>
  );
}

function PromoCard({ promo }) {
  return (
    <div
      className="
        relative
        w-[420px]
        h-[520px]
        rounded-[40px]
        overflow-hidden
        shadow-xl
        flex-shrink-0
        bg-gradient-to-r 
from-[#dff5e8] 
via-[#c8f0d9] 
to-[#e6f9ef]

      "
    >
      {/* Bottom purple section */}
      <div className="absolute bottom-0 left-0 w-full h-36  bg-gradient-to-r
    from-[#0b3b25]
    via-[#1f4833]
    to-[#133928]" />

      <div className="relative z-10 px-8 pt-10 pb-24 text-center">
        <h3 className="text-2xl font-extrabold text-green-800 leading-tight">
          {promo.title}
        </h3>

        <p className="text-lg font-semibold text-green-700 mt-2">
          {promo.subtitle}
        </p>

        <div className="mt-10 flex justify-center">
          <img
            src={promo.image}
            alt={promo.title}
            className="w-72 object-contain drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Bottom Badge */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center text-white text-sm font-semibold">
        <span className="bg-yellow-400 text-black px-4 py-2 rounded-full">
          🚚 Shipping all over USA
        </span>
        <span>Order Now</span>
      </div>
    </div>
  );
}
