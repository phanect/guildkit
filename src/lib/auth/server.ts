import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { auth } from "$lib/auth.ts";
import { db } from "$lib/db/db.ts";
import { userProps } from "$lib/db/schema/user.ts";
import type { User, Session } from "./types.ts";

type Recruiter = Omit<User, "recruitsFor" | "props"> & {
  recruitsFor: NonNullable<User["recruitsFor"]>;
  props: User["props"] & {
    type: "recruiter";
  };
};

export const requireAuthAs = async <ExpectedType extends NonNullable<User["props"]["type"]> | "any">(
  expectedType: ExpectedType,
) => {
  const { user, session } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.props.type) {
    return redirect(302, "/auth/signup/candidate");
  }

  if (expectedType === "recruiter" && user.props.type === "recruiter" && !user.recruitsFor) {
    throw new Error("You are recruiter who does not belong to any organization. Ask your organization owner to invite, or create a new organization.");
  }

  if (expectedType === "any" || expectedType === user.props.type) {
    return {
      user: user as ExpectedType extends "recruiter" ? Recruiter : User,
      session,
    };
  } else {
    return error(401, { message: `This page is for the ${ expectedType }s.` });
  }
};

export const getSession = async (...args: Parameters<typeof auth.api.getSession>) => {
  const { user, session } = await auth.api.getSession(...args) ?? {};

  if (!user) {
    return;
  }

  const props = await db.select().from(userProps)
    .where(eq(userProps.id, user?.propsId))
    .limit(1);

  return {
    user: {
      ...user,
      props: props[0],
    },
    session,
  };
};
