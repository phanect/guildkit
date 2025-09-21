import { randomUUID } from "node:crypto";
import { exit } from "node:process";
import dayjs from "dayjs";
import { betterAuth } from "better-auth";
import { eq, type InferInsertModel } from "drizzle-orm";
import { auth as prodAuth } from "../src/lib/auth.ts";
import { db } from "../src/lib/db/db.ts";
import { job as jobTable } from "../src/lib/db/schema/job.ts";
import { organization as organizationTable, user as userTable } from "../src/lib/db/schema/better-auth.ts";
import { userProps as userPropsTable } from "../src/lib/db/schema/user.ts";
import type { User as BetterAuthUser } from "better-auth";

type Auth = typeof auth;

const generatePassword = (length: number) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-=+";

  return [ ...new Array(length) as unknown[] ].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join("");
};

const toDrizzleUser = async (betterAuthUser: BetterAuthUser) => {
  const drizzleUser = await db.query.user.findFirst({
    where: (userTable, { eq }) => eq(userTable.id, betterAuthUser.id),
  });

  if (!drizzleUser) {
    throw new Error("Given betterAuth user does not exist on DB.");
  }

  return drizzleUser;
};

type InitialUser = {
  name: string;
  email: string;
  props: InferInsertModel<typeof userPropsTable>;
};

const createUser = async (user: InitialUser, auth: Auth) => {
  console.info(`Creating user ${ user.name }...`);

  const [{ propsId }] = await db.insert(userPropsTable)
    .values({ type: user.props.type })
    .returning({ propsId: userPropsTable.id });

  const password = generatePassword(72);

  const { response: { user: baUser }} = await auth.api.signUpEmail({
    body: {
      name: user.name,
      email: user.email,
      password,
      propsId,
    },
    returnHeaders: true,
  });

  console.info(`Created user ${ user.name }.`);

  const drizzleUser = await toDrizzleUser(baUser);

  await db.update(userTable)
    .set({ emailVerified: true })
    .where(eq(userTable.id, drizzleUser.id));

  return drizzleUser;
};

type InitialOrg = {
  name: string;
  slug: string;
  about?: string;
  url: string;
  addresses: string[];
  emails: string[];
  currencies: string[];
  recruiters: InitialUser[];
  jobs: Omit<InferInsertModel<typeof jobTable>, "employer">[];
};

const createOrganizationAndRecruiters = async (org: InitialOrg, auth: Auth) => {
  // get only first user's info
  const recruiters = await Promise.all(org.recruiters.map(async (recruiter) => createUser(recruiter, auth)));

  console.info(`Creating organization "${ org.name }"...`);

  const [{ organizationId }] = await db.insert(organizationTable).values([{
    name: org.name,
    slug: org.slug,
    url: org.url,
    addresses: org.addresses,
    currencies: org.currencies,

    id: randomUUID(),
    createdAt: new Date(),
  }]).returning({ organizationId: organizationTable.id });

  if (!organizationId) {
    throw new Error(`Failed to create organization "${ org.name }"`);
  }

  console.info(`Created organization ${ org.name }. Adding members...`);

  await Promise.all(
    recruiters.map(async (recruiter) => auth.api.addMember({
      body: {
        userId: recruiter.id,
        role: [ "recruiter" ],
        organizationId,
      },
    }))
  );

  console.info(`Creating jobs for organization ${ org.name }...`);

  await db.insert(jobTable).values([
    ...org.jobs.map((job) => ({
      ...job,
      employer: organizationId,
    })),
  ]);

  console.info(`Created organization ${ org.name } and its associated members and jobs.`);
};

const userExists = Boolean(await db.query.user.findFirst());
const jobExists = Boolean(await db.query.job.findFirst());
const alreadySeeded = userExists || jobExists;

if (alreadySeeded) {
  console.info("The data already exists in the database. Skip seeding.");
  exit(0);
}

const auth = betterAuth({
  ...prodAuth.options,

  emailAndPassword: {
    enabled: true,
  },
});

await Promise.all([
  createUser({
    name: "Heizou Shikanoin",
    email: "heizou9876@yaemail.example.net",
    props: {
      type: "candidate",
    },
  }, auth),
  createUser({
    name: "Shinobu Kuki",
    email: "kuki@yaemail.example.net",
    props: {
      type: "candidate",
    },
  }, auth),
  createUser({
    name: "Kazuha Kaedehara",
    email: "kazuha.kaedehara@yaemail.example.net",
    props: {
      type: "candidate",
    },
  }, auth),

  createOrganizationAndRecruiters({
    slug: "yaedo",
    name: "Yae Publishing House, K.K.",
    about: "Yae Publishing House is a leading light novel publisher from Inazuma. We also provide digital platforms to deliver the light novels and the other books to the global audience all over the Teyvat.",
    url: "https://yaedo.example.co.jp",
    addresses: [ "2-14-3, Hanamizaka, Inazuma City, Narukami Island, Inazuma" ],
    emails: [ "hr@yaedo.example.co.jp" ],
    currencies: [ "JPY" ],
    recruiters: [{
      name: "Miko Yae",
      email: "miko.yae@yaedo.example.co.jp",
      props: {
        type: "recruiter",
      },
    }],
    jobs: [
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
        expiresAt: dayjs().add(1, "month").toDate(),
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
        expiresAt: dayjs().add(1, "month").toDate(),
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
        expiresAt: dayjs().add(1, "month").toDate(),
      },
    ],
  }, auth),
  createOrganizationAndRecruiters({
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
    recruiters: [
      {
        name: "Ei Raiden",
        email: "ei.raiden@shogunate.example.go.jp",
        props: {
          type: "recruiter",
        },
      },
      {
        name: "Chisato Hiiragi",
        email: "chisato.hiiragi@shogunate.example.go.jp",
        props: {
          type: "recruiter",
        },
      },
    ],
    jobs: [{
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
      expiresAt: dayjs().add(1, "month").toDate(),
    }],
  }, auth),
  createOrganizationAndRecruiters({
    slug: "wangsheng",
    name: "Wangsheng Funeral Parlor",
    url: "https://wangsheng.example.com",
    addresses: [
      "123456 Feiyun Slope, Liyue Harbor, Liyue",
    ],
    emails: [ "jobs@wangsheng.example.com" ],
    currencies: [ "CNY" ],
    recruiters: [
      {
        name: "Hu Tao",
        email: "hutao@wangsheng.example.com",
        props: {
          type: "recruiter",
        },
      },
      {
        name: "Zhongli",
        email: "zhongli@wangsheng.example.com",
        props: {
          type: "recruiter",
        },
      },
    ],
    jobs: [{
      title: "Web designer",
      description: `
        We are hiring a web designer to promote Wangsheng Funeral Parlor.

        # Responsibilities

        - Create and maintain our websites
        ...
      `.trim(),
      requirements: `
        # Required

        - Two or more experience in web design
        - Two or more experience in HTML and CSS

        # Nice to have

        - Experience in JavaScript
        - Experience in SEO
        - Interest in the tradition of funerary practices in Liyue
      `.trim(),
      applicationUrl: "https://phanective.org/job-example-4",
      location: "123456 Feiyun Slope, Liyue Harbor, Liyue",
      salary: 4500000,
      currency: "CNY",
      salaryPer: "YEAR",
      expiresAt: dayjs().add(1, "month").toDate(),
    }],
  // Lazy Hu Tao didn't write `about` ― to test layout when about is not written.
  }, auth),
]);
