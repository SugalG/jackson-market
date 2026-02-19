import prisma from "../src/lib/prisma.js";
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
  // const categories = [
  //   { name: "Fruits", slug: "fruits" },
  //   { name: "Vegetables", slug: "vegetables" },
  //   { name: "Snacks", slug: "snacks" },
  //   { name: "Beverages", slug: "beverages" },
  // ];

  // for (const cat of categories) {
  //   await prisma.category.upsert({
  //     where: { slug: cat.slug },
  //     update: {},
  //     create: cat,
  //   });
  // }

  // // --- Example Products ---
  // const products = [
  //   {
  //     name: "Fresh Apple",
  //     slug: "fresh-apple",
  //     price: 2.99,
  //     description: "Crisp and sweet apples.",
  //     images: ["https://res.cloudinary.com/demo/image/upload/v1720000000/apple.jpg"],
  //     stock: 100,
  //     categorySlug: "fruits",
  //   },

  // ];

  // for (const p of products) {
  //   const category = await prisma.category.findUnique({
  //     where: { slug: p.categorySlug },
  //   });

  //   await prisma.product.upsert({
  //     where: { slug: p.slug },
  //     update: {},
  //     create: {
  //       name: p.name,
  //       slug: p.slug,
  //       price: p.price,
  //       description: p.description,
  //       images: p.images,
  //       stock: p.stock,
  //       categoryId: category.id,
  //     },
  //   });
  // }

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
