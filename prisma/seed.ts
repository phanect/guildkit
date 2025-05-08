import dayjs from "dayjs";
import { PrismaClient, type Prisma } from "@prisma/client";
import { hashPassword } from "../src/lib/utils/bcrypt.utils.ts";

const candidates: Prisma.UserCreateInput[] = [
  {
    full_name: "Ayaka Kamisato",
    email: "ayaka.kamisato@yaemail.example.net",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
  {
    full_name: "Shinobu Kuki",
    email: "kuki@yaemail.example.net",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
  {
    full_name: "Thoma",
    email: "thoma@yaemail.example.net",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
];

const employers = [
  {
    id: "yaemiko",
    full_name: "Miko Yae",
    email: "miko.yae@yaedo.example.com",
    password: await hashPassword("Pa$$w0rd!"),
    role: "EMPLOYER",
  } as const satisfies Prisma.UserCreateInput,
  {
    id: "raidenei",
    full_name: "Ei Raiden",
    email: "ei.raiden@inazuma.gov",
    password: await hashPassword("Pa$$w0rd!"),
    role: "EMPLOYER",
  } as const satisfies Prisma.UserCreateInput,
];

const jobs: Prisma.JobCreateInput[] = [
  {
    id: "dummy-job-1",
    title: "[WFH] TypeScript Developer for our ebook store (Svelte / Hono / React Native)",
    description: `
      We are hiring a software developer for our ebook store. Your will be responsibile for one or some of the frontend, backend, and mobile app development.
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
    responsibilities: `
      You will be responsible for the one or more of the followings:

      - Web frontend development for our ebook store (Svelte)
      - Backend development for our ebook store (Hono + Cloudflare Workers)
      - Mobile app development for our ebook store (React Native)
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-1",
    location: "Remote (any location in Inazuma)",
    salary: "8,000,000 Mora/year",
    company: "Yae Publishing House K.K.",
    deadline: dayjs().add(1, "month").toDate(),
    employer: {
      connect: { id: employers[0].id },
    },
  },
  {
    id: "dummy-job-2",
    title: "[WFH] SRE for our ebook store",
    description: `
      We are hiring an SRE for our ebook store.
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
    responsibilities: `
      You will be responsible for the infrastructure administration and the site reliability engineering for our online ebook store.
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-2",
    location: "Remote (any location in Inazuma)",
    salary: "8,000,000 Mora/year",
    company: "Yae Publishing House K.K.",
    deadline: dayjs().add(1, "month").toDate(),
    employer: {
      connect: { id: employers[0].id },
    },
  },
  {
    id: "dummy-job-3",
    title: "[WFH] Marketing lead",
    description: `
      We are hiring a marketing lead for our ebook store.
      ...
    `.trim(),
    requirements: `
      # Required

      - Two year or more experience as a digital marketer in B2C field

      # Nice to have

      - Basic understandings for HTML
    `.trim(),
    responsibilities: `
      - Marketing for our ebook store
      - Marketers management
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-3",
    location: "Remote (any location in Inazuma)",
    salary: "8,000,000 Mora/year",
    company: "Yae Publishing House K.K.",
    deadline: dayjs().add(1, "month").toDate(),
    employer: {
      connect: { id: employers[0].id },
    },
  },
  {
    id: "dummy-job-4",
    title: "Corporate Engineer",
    description: `
      We are hiring a software engineer for the Shogunate's internal systems.
      ...
    `.trim(),
    requirements: `
      # Required

      - Two or more experience in Java

      # Nice to have

      - Experience as a corporate IT admin
    `.trim(),
    responsibilities: `
      - Development for the Shogunate's internal systems
      - Vendor management for the Shogunate's internal systems
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-4",
    location: "The Inazuma Castle, 1-1-1, Inazuma City, Narukami Island, Inazuma",
    salary: "9,000,000 Mora/year",
    company: "Tenryou Commission, The Shogunate of Inazuma",
    deadline: dayjs().add(1, "month").toDate(),
    employer: {
      connect: { id: employers[1].id },
    },
  },
];

const prisma = new PrismaClient();

// Allow N+1 problem here since we don't have to be serious for performance here.
for (const user of [ ...candidates, ...employers ]) {
  await prisma.user.upsert({
    where: {
      email: user.email,
    },
    update: user,
    create: user,
  });
}

// Allow N+1 problem here since we don't have to be serious for performance here.
for (const job of jobs) {
  await prisma.job.upsert({
    where: {
      id: job.id,
    },
    update: job,
    create: job,
  });
}
