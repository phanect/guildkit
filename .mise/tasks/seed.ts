#!/usr/bin/env -S pnpm exec jiti

import { randomUUID } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type User } from "../../src/lib/prisma/client.ts";

const candidates: User[] = [
  {
    id: "heizou",
    name: "Heizou Shikanoin",
    email: "heizou9876@yaemail.example.net",
    emailVerified: true,
    role: "none",
    props: {
      type: "candidate",
    },
  },
  {
    id: "shinobu",
    name: "Shinobu Kuki",
    email: "kuki@yaemail.example.net",
    emailVerified: true,
    role: "none",
    props: {
      type: "candidate",
    },
  },
  {
    id: "kazuha",
    name: "Kazuha Kaedehara",
    email: "kazuha.kaedehara@yaemail.example.net",
    emailVerified: true,
    role: "none",
    props: {
      type: "candidate",
    },
  },
];

const recruiterYae: User = {
  id: "yae",
  name: "Miko Yae",
  email: "miko.yae@yaedo.example.co.jp",
  emailVerified: true,
  role: "recruiter",
  props: {
    type: "recruiter",
  },
} as const;
const recruiterRaiden: User = {
  id: "ei",
  name: "Ei Raiden",
  email: "ei.raiden@shogunate.example.go.jp",
  emailVerified: true,
  role: "recruiter",
  props: {
    type: "recruiter",
  },
} as const;
const recruiterHiiragi: User = {
  id: "chisato",
  name: "Chisato Hiiragi",
  email: "chisato.hiiragi@shogunate.example.go.jp",
  emailVerified: true,
  role: "recruiter",
  props: {
    type: "recruiter",
  },
} as const;
const recruiterZhongli: User = {
  id: "zhongli",
  name: "Zhongli",
  email: "zhongli@wangsheng.example.com",
  emailVerified: true,
  role: "recruiter",
  props: {
    type: "recruiter",
  },
} as const;

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
    || Boolean(await prisma.job.findFirst());

  if (alreadySeeded) {
    console.info("The data already exists in the database. Skip seeding.");
    return;
  }

  await prisma.organization.createMany({
    data: [
      {
        id: "yph",
        slug: "yaedo",
        name: "Yae Publishing House, K.K.",
        about: "Yae Publishing House is a leading light novel publisher from Inazuma. We also provide digital platforms to deliver the light novels and the other books to the global audience all over the Teyvat.",
        url: "https://yaedo.example.co.jp",
        addresses: [ "2-14-3, Hanamizaka, Inazuma City, Narukami Island, Inazuma" ],
        emails: [ "hr@yaedo.example.co.jp" ],
        currencies: [ "JPY" ],
        createdAt: new Date(),
        members: {
          create: [
            {
              id: randomUUID(),
              user: {
                create: recruiterYae,
              },
              createdAt: new Date(),
            },
          ],
        },
      },
      {
        id: "kanjou",
        slug: "kanjou",
        name: "Kanjou Commission, The Shogunate of Inazuma",
        about: "Kanjou Commission is a part of the Tri-Commission, The Shogunate of Inazuma. We are responsible for the Shogunate's financial and international affairs.",
        url: "https://shogunate.example.go.jp",
        addresses: [
          "The Inazuma Castle, 1-1-1, Inazuma City, Narukami Island, Inazuma",
          "Tenryou Commission Office, 1-2-5, Inazuma City, Narukami Island, Inazuma",
          "The Hiiragi Estate, 5-1-1, Rito, Narukami Island, Inazuma",
        ],
        emails: [ "personnel@kanjou.example.go.jp" ],
        currencies: [ "JPY" ],
        createdAt: new Date(),
        recruiters: [ recruiterRaiden, recruiterHiiragi ],
      },
      {
        id: "wangsheng",
        slug: "wangsheng",
        name: "Wangsheng Funeral Parlor",
        url: "https://wangsheng.example.com",
        addresses: [
          "123456 Feiyun Slope, Liyue Harbor, Liyue",
        ],
        emails: [ "hutao@wangsheng.example.com" ],
        currencies: [ "CNY" ],
        createdAt: new Date(),
        recruiters: [ recruiterZhongli ],
        // Lazy Hu Tao didn't write `about` ― to test layout when about is not written.
      },
    ],
  });
};

await seed();
