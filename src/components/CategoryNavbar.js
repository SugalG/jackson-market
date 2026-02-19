import { fetchParentCategories } from "@/actions/fetchParentCategory";

export async function CategoryNavbar() {
  const { result } = await fetchParentCategories();

  const categories = [
    ...result,
    { slug: "black-friday", name: "Black Friday", children: [] },
    { slug: "gifts", name: "Gifts", children: [] },
  ];

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-3 flex items-center gap-6 text-sm font-medium text-gray-700">

        {categories.map((cat) => (
          <div key={cat.slug} className="relative group">

            {/* Parent */}
            <a
              href={`/categories/${cat.slug}`}
              className="whitespace-nowrap hover:text-purple-700 transition text-base font-semibold"
            >
              {cat.name}
            </a>

            {/* Dropdown (only if children exist) */}
            {cat.children?.length > 0 && (
              <div className="
                 absolute left-0 top-full
  hidden group-hover:block
  pt-2
                bg-white shadow-lg border rounded-xl
                min-w-[200px] z-50
              ">
                {cat.children.map((child) => (
                  <a
                    key={child.slug}
                    href={`/categories/${child.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    {child.name}
                  </a>
                ))}
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}
