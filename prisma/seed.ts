import { randomUUID } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/lib/prisma/client.ts";

const seed = async () => {
  if (process.env.SERVER_ENV !== "development") {
    console.info("Seeding are only allowed when SERVER_ENV is development. Seeding skipped.");
    return;
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    }),
  });

  const alreadySeeded = Boolean(await prisma.organization.findFirst())
    || Boolean(await prisma.user.findFirst())
    || Boolean(await prisma.item.findFirst());

  if (alreadySeeded) {
    console.info("The data already exists in the database. Skip seeding.");
    return;
  }

  await prisma.organization.create({
    data: {
      id: "yaedo-id",
      slug: "yaedo",
      name: "Yae Publishing House Original Products",
      about: "The list of the original products by Yae Publishing House.",
      contentUpdatedAt: new Date(),
      createdAt: new Date(),
      members: {
        create: [
          {
            id: randomUUID(),
            user: {
              create: {
                id: "yae",
                name: "Miko Yae",
                email: "yae@yaedo.example.co.jp",
                emailVerified: true,
              },
            },
            createdAt: new Date(),
          },
          {
            id: randomUUID(),
            user: {
              create: {
                id: "hirayama",
                name: "Hirayama",
                email: "hirayama@yaedo.example.co.jp",
                emailVerified: true,
              },
            },
            createdAt: new Date(),
          },
        ],
      },
      fields: {
        create: [
          {
            name: "Name",
            description: "Product name",
            type: "text",
            isTitle: true,
          },
          {
            name: "Category",
            description: "Type of the product",
            type: "literal",
            literals: [ "Book", "Figurine", "TCG" ],
          },
          {
            name: "Authors",
            description: "Authors of the book",
            type: "text",
            array: true,
            optional: true,
          },
        ],
      },
      items: {
        create: [
          {
            slug: "legend-of-sword",
            doc: {
              Name: "A Legend of Sword",
              Category: "Book",
              Authors: [ "Zhenyu", "Calx" ],
            },
          },
          {
            slug: "reborn-as-raiden",
            doc: {
              Name: "Shogun Almighty: Reborn as Raiden With Unlimited Power",
              Category: "Book",
              Authors: [ "Kenzaburou Kadenokouji" ],
            },
          },
          {
            slug: "statue-of-shogun",
            doc: {
              Name: "Statue of Her Excellency, the Almighty Narukami Ogosho, God of Thunder",
              Category: "Figurine",
            },
          },
        ],
      },
    },
  });
};

await seed();
