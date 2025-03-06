import { Hono } from "hono";
import { icewallAPIs, icewallMiddleware, type IcewallEnv } from "icewall";
import type { RequestHandler } from "@sveltejs/kit";

// Cloudflare Worker から Worker へのサブリクエストは無料なので SvelteKit に Hono を統合する必要はなく、このファイルは不要
const honoApp = new Hono<IcewallEnv>()
  .route("/", icewallAPIs)
  // TODO check paths to protect
  .use("/dashboard", icewallMiddleware)
  // TODO check path to redirect
  .get("/auth/postlogin", async (c) => c.redirect("/dashboard"));

export const GET: RequestHandler = ({ request }) => honoApp.fetch(request);
export const POST: RequestHandler = ({ request }) => honoApp.fetch(request);
