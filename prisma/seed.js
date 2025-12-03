import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("🌱 Seeding database...");

  // --- Admin User ---
  const adminPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@jackson.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@jackson.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // --- Categories ---
  const categories = [
    { name: "Fruits", slug: "fruits" },
    { name: "Vegetables", slug: "vegetables" },
    { name: "Snacks", slug: "snacks" },
    { name: "Beverages", slug: "beverages" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // --- Example Products ---
  const products = [
    {
      name: "Fresh Apple",
      slug: "fresh-apple",
      price: 2.99,
      description: "Crisp and sweet apples.",
      images: ["https://res.cloudinary.com/demo/image/upload/v1720000000/apple.jpg"],
      stock: 100,
      categorySlug: "fruits",
    },
    {
      name: "Orange Juice",
      slug: "orange-juice",
      price: 4.49,
      description: "100% natural orange juice.",
      images: ["https://res.cloudinary.com/demo/image/upload/v1720000000/orange-juice.jpg"],
      stock: 50,
      categorySlug: "beverages",
    },
  ];

  for (const p of products) {
    const category = await prisma.category.findUnique({
      where: { slug: p.categorySlug },
    });

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        description: p.description,
        images: p.images,
        stock: p.stock,
        categoryId: category.id,
      },
    });
  }

  console.log("🌱 Seed complete!");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
