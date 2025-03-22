import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/utils/bcrypt.utils.ts";

const candidates: Parameters<typeof prisma.user.upsert>[0]["create"][] = [
  {
    full_name: "神里 綾華",
    email: "ayaka.kamisato@phanective.org",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
  {
    full_name: "久岐忍",
    email: "kuki@phanective.org",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
  {
    full_name: "Thoma",
    email: "thoma@phanective.org",
    password: await hashPassword("Pa$$w0rd!"),
    role: "CANDIDATE",
  },
];

const employers = [
  {
    id: "yaemiko",
    full_name: "八重 神子",
    email: "miko.yae@phanective.org",
    password: await hashPassword("Pa$$w0rd!"),
    role: "EMPLOYER",
  } as const satisfies Parameters<typeof prisma.user.upsert>[0]["create"],
  {
    id: "raidenei",
    full_name: "雷電 影",
    email: "ei.raiden@phanective.org",
    password: await hashPassword("Pa$$w0rd!"),
    role: "EMPLOYER",
  } as const satisfies Parameters<typeof prisma.user.upsert>[0]["create"],
];

const jobs: Parameters<typeof prisma.job.create>[0]["data"][] = [
  {
    id: "dummy-job-1",
    title: "【フルリモート】TypeScript エンジニア (Svelte / Hono / React Native)",
    description: `
      弊社オンライン書店のフロントエンド、バックエンド、モバイルアプリのうちいずれかまたは複数に関して開発を担当するソフトウェアエンジニアを募集します。
      …
    `.trim(),
    requirements: `
      # 必須要件

      - TypeScript の経験2年以上
      - Svelte、React、Vue.js、Angular などのコンポーネント志向フロントエンドフレームワークの経験1年以上

      # 歓迎要件

      - Node.js や WinterCG 互換プラットフォームなど、バックエンド JavaScript/TypeScript の経験
      - フロントエンドとバックエンド (JavaScript/TypeScript 以外の言語によるものも含む) 両方の経験
    `.trim(),
    responsibilities: `
      弊社サービス ○○ の開発のうち、以下の1つまたはそれ以上の領域 (担当領域はご希望やご経験に応じて調整させて頂きます)
      - ○○ のフロントエンド開発 (Svelte)
      - ○○ のバックエンド開発 (Hono + Cloudflare Workers)
      - ○○ のモバイルアプリ開発 (React Native: Android 及び iOS)
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-1",
    location: "フルリモート勤務につき稲妻国内の任意の場所",
    salary: "年収800万円",
    company: "株式会社八重堂",
    deadline: dayjs().add(1, "month").toDate(),
    employerId: employers[0].id,
  },
  {
    id: "dummy-job-2",
    title: "【フルリモート】SRE",
    description: `
      弊社オンライン書店のインフラストラクチャーを担当する SRE を募集します。
      …
    `.trim(),
    requirements: `
      # 必須要件

      - SRE 又はインフラエンジニアとしての実務経験2年以上
      - Infrastructure as Code ツールを用いた実務運用経験1年以上 (Docker/Docker Compose/Kubernetes、Terraform、Ansible など)

      # 歓迎要件

      - Node.js サーバーの運用経験
    `.trim(),
    responsibilities: `
      弊社オンライン書店のサーバー管理及び SRE 活動をご担当頂きます。
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-2",
    location: "フルリモート勤務につき稲妻国内の任意の場所",
    salary: "年収800万円",
    company: "株式会社八重堂",
    deadline: dayjs().add(1, "month").toDate(),
    employerId: employers[0].id,
  },
  {
    id: "dummy-job-3",
    title: "コーポレートエンジニア",
    description: `
      幕府で運用する基幹システムの開発・保守を行うコーポレートエンジニアを募集します。
      …
    `.trim(),
    requirements: `
      # 必須要件

      - コーポレートエンジニア、社内 SE、情報システム担当等としての実務経験2年以上

      # 歓迎要件

      - Jamf を用いたデバイス管理の経験
    `.trim(),
    responsibilities: `
      幕府の基幹システムの開発・保守
    `.trim(),
    applicationUrl: "https://phanective.org/job-example-3",
    location: "鳴神島稲妻城下 1-1-2 稲妻幕府電算奉行所",
    salary: "年収900万円",
    company: "稲妻幕府 電算奉行所",
    deadline: dayjs().add(1, "month").toDate(),
    employerId: employers[1].id,
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
