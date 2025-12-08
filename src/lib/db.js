import prisma from "./prisma";

/* -------------------------------------------------- */
/* PRODUCTS */
/* -------------------------------------------------- */

// Customer-facing: only show non-deleted products
export async function getAllProducts() {
  return await prisma.product.findMany({
    where: { isDeleted: false },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug) {
  return await prisma.product.findFirst({
    where: { slug, isDeleted: false },
    include: { category: true },
  });
}

export async function getProductsByCategorySlug(slug) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return [];

  return await prisma.product.findMany({
    where: {
      categoryId: category.id,
      isDeleted: false,
    },
    include: { category: true },
  });
}

/* -------------------------------------------------- */
/* CATEGORIES */
/* -------------------------------------------------- */

// Fetch ALL categories (used in homepage & filters)
export async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

// ADMIN: fetch ALL products, including soft-deleted ones
export async function adminGetAllProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}
