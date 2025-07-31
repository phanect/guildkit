import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { auth } from "$lib/auth.ts";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) =>
  svelteKitHandler({ event, resolve, auth, building }) as Promise<Response>;
