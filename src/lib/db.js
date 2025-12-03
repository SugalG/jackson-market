import prisma from "./prisma";

// ----- PRODUCTS -----
export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductBySlug(slug) {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

// ----- CATEGORIES -----
export async function getProductsByCategorySlug(slug) {
  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) return [];

  return await prisma.product.findMany({
    where: { categoryId: category.id },
    include: { category: true },
  });
}
