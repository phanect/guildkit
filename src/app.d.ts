/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type { User, Session } from "$lib/auth.ts";

declare global {
  namespace App {
    interface Locals {
      user?: User;
      session?: Session;
    };
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
