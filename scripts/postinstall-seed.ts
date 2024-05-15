import dayjs from "dayjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    full_name: "神里 綾華",
    email: "ayaka.kamisato@phanective.org",
    password: "Pa$$w0rd!",
    role: "インフラエンジニア",
  },
});

await prisma.job.create({
  data: {
    title: "【フルリモート】TypeScript エンジニア (Svelte / Hono / React Native)",
    description: `
弊社サービス ○○ のフロントエンド、バックエンド、モバイルアプリのうちいずれかまたは複数に関して開発を担当するソフトウェアエンジニアを募集します。
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
弊社サービス ○○ の開発のうち、以下の1つまたはそれ以上の領域 (ご希望やご経験に応じて調整させて頂きます)
- ○○ のフロントエンド開発 (Svelte)
- ○○ のバックエンド開発 (Hono + Cloudflare Workers)
- ○○ のモバイルアプリ開発 (React Native: Android 及び iOS)
`.trim(),
    applicationUrl: "https://phanective.org/job-example",
    location: "フルリモート勤務につき日本国内の任意の場所",
    salary: "年収800万円",
    company: "△△株式会社",
    employer: {
      create: {
        full_name: "雷電 影",
        email: "ei.raiden@phanective.org",
        password: "Pa$$w0rd!",
        role: "代表取締役社長",
      },
    },
    deadline: dayjs().add(1, "month").toDate(),
  },
});
