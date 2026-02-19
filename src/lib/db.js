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
    include: {
      children: true,
    },
  });

  if (!category) return [];

  const categoryIds = [
    category.id,
    ...category.children.map((child) => child.id),
  ];

  return await prisma.product.findMany({
    where: {
      categoryId: {
        in: categoryIds,
      },
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
    where: { isDeleted: false },
    orderBy: { name: "asc" },
  });
}

// ADMIN: fetch ALL products, including soft-deleted ones
export async function adminGetAllProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getCategoryDataBySlug(slug) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      children: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!category) return null;

  const categoryIds = [
    category.id,
    ...category.children.map((c) => c.id),
  ];

  const products = await prisma.product.findMany({
    where: {
      categoryId: { in: categoryIds },
      isDeleted: false,
    },
  });

  return {
    category,
    children: category.children,
    products,
  };
}
