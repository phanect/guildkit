import type { currencies } from "@/intermediate/currencies.ts";
import type { flattenError } from "zod/v4/core";

export type Currency = typeof currencies[number];

export type ActionState<SCHEMA = unknown> = {
  errors?: ReturnType<typeof flattenError<SCHEMA>>;
};
