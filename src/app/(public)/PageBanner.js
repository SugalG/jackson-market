export default function PageBanner({
  title,
  breadcrumbBase = "Home",
  breadcrumbCurrent,
}) {
  const current = breadcrumbCurrent || title;

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-r
        from-[#0b3b25]
        via-[#0a4729]
        to-[#0b3b25]
        text-white
        font-quicksand
      "
    >
      {/* GRID OVERLAY */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:28px_28px]" />
      </div>

      {/* TOP DARK FADE */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative w-full px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl min-h-[240px] flex items-end">
          <div className="pb-10">
            {/* TITLE */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {title}
            </h1>

            {/* BREADCRUMB */}
            <div className="mt-3 flex items-center gap-3 text-white/85 text-sm">
              <a href="/" className="hover:text-white transition font-medium">
                {breadcrumbBase}
              </a>
              <span className="opacity-60">/</span>
              <span className="font-semibold">{current}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
