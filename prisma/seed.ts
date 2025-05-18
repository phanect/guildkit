import dayjs from "dayjs";
import { PrismaClient, type Prisma } from "@prisma/client";

const candidates: Prisma.UserCreateInput[] = [
  {
    name: "Heizou Shikanoin",
    email: "heizou9876@yaemail.example.net",
    emailVerified: true,
    type: "candidate",
    role: "none",
  },
  {
    name: "Shinobu Kuki",
    email: "kuki@yaemail.example.net",
    emailVerified: true,
    type: "candidate",
    role: "none",
  },
  {
    name: "Kazuha Kaedehara",
    email: "kazuha.kaedehara@yaemail.example.net",
    emailVerified: true,
    type: "candidate",
    role: "none",
  },
];

const recruiterYae = {
  name: "Miko Yae",
  email: "miko.yae@yaedo.example.com",
  emailVerified: true,
  type: "recruiter",
  role: "recruiter",
} as const satisfies Prisma.UserCreateInput;
const recruiterRaiden = {
  name: "Ei Raiden",
  email: "ei.raiden@shogunate.example.go.jp",
  emailVerified: true,
  type: "recruiter",
  role: "recruiter",
} as const satisfies Prisma.UserCreateInput;

const jobs: Prisma.JobCreateInput[] = [
  {
    title: "[WFH] TypeScript Developer for our ebook store (Svelte / Hono / React Native)",
    description: `
      We are hiring a software developer for our ebook store. Your will be responsibile for one or some of the frontend, backend, and mobile app development.

      # Responsibilities

      You will be responsible for the one or more of the followings:

      - Web frontend development for our ebook store (Svelte)
      - Backend development for our ebook store (Hono + Cloudflare Workers)
      - Mobile app development for our ebook store (React Native)
      ...
    `.trim(),
    requirements: `
      # Required

      - One year or more experience in TypeScript development
      - Two years or more experience in JavaScript or altJS (e.g. TypeScript, Elm, CoffeeScript)
      - One year or more experience in one of the followings:
        - Svelte, React, Vue.js, Angular, or any other component-oriented frontend framework(s)
        - Node.js, Cloudflare Workers, or any other backend JavaScript/TypeScript framework(s)/platform(s)
        - React Native or any other mobile JavaScript/TypeScript framework(s)
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-1",
    location: "Remote (any location in Inazuma)",
    salary: 8000000,
    currency: "JPY",
    salaryPer: "YEAR",
    company: "Yae Publishing House K.K.",
    expiresAt: dayjs().add(1, "month").toDate(),
    employer: {
      connectOrCreate: {
        where: {
          email: recruiterYae.email,
        },
        create: recruiterYae,
      },
    },
  },
  {
    title: "[WFH] SRE for our ebook store",
    description: `
      We are hiring an SRE for our ebook store.

      # Responsibilities

      You will be responsible for the infrastructure administration and the site reliability engineering for our online ebook store.
      ...
    `.trim(),
    requirements: `
      # Required

      - Two year or more experience as an SRE or an infrastructure engineer.
      - One year or more experience in the production Docker server administration
      - One year or more experience in Infrastructure as Code tools such as Terraform and Ansible

      # Nice to have

      - Experience in Node.js server administration
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-2",
    location: "Remote (any location in Inazuma)",
    salary: 8000000,
    currency: "JPY",
    salaryPer: "YEAR",
    company: "Yae Publishing House K.K.",
    expiresAt: dayjs().add(1, "month").toDate(),
    employer: {
      connectOrCreate: {
        where: {
          email: recruiterYae.email,
        },
        create: recruiterYae,
      },
    },
  },
  {
    title: "[WFH] Marketing lead",
    description: `
      We are hiring a marketing lead for our ebook store.

      # Responsibilities

      - Marketing for our ebook store
      - Marketers management
      ...
    `.trim(),
    requirements: `
      # Required

      - Two year or more experience as a digital marketer in B2C field

      # Nice to have

      - Basic understandings for HTML
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-3",
    location: "Remote (any location in Inazuma)",
    salary: 8000000,
    currency: "JPY",
    salaryPer: "YEAR",
    company: "Yae Publishing House K.K.",
    expiresAt: dayjs().add(1, "month").toDate(),
    employer: {
      connectOrCreate: {
        where: {
          email: recruiterYae.email,
        },
        create: recruiterYae,
      },
    },
  },
  {
    title: "Corporate Engineer",
    description: `
      We are hiring a software engineer for the Shogunate's internal systems.

      # Responsibilities

      - Development for the Shogunate's internal accounting systems (The Kanjou-kei)
      - Vendor management for the Shogunate's internal accounting systems (The Kanjou-kei)
      ...
    `.trim(),
    requirements: `
      # Required

      - Two or more experience in Java

      # Nice to have

      - Experience in vendor management
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-4",
    location: "The Hiiragi Estate, 4-1-1, Rito, Narukami Island, Inazuma",
    salary: 9000000,
    currency: "JPY",
    salaryPer: "YEAR",
    company: "Kanjou Commission, The Shogunate of Inazuma",
    expiresAt: dayjs().add(1, "month").toDate(),
    employer: {
      connectOrCreate: {
        where: {
          email: recruiterRaiden.email,
        },
        create: recruiterRaiden,
      },
    },
  },
];

const prisma = new PrismaClient();

// Allow N+1 problem here since we don't have to be serious for performance here.
for (const candidate of candidates) {
  await prisma.user.create({
    data: candidate,
  });
}

// Allow N+1 problem here since we don't have to be serious for performance here.
for (const job of jobs) {
  await prisma.job.create({
    data: job,
  });
}
