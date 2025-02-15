import { redirect, type Handle } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");
  const path = event.route.id;

  if (path?.includes("protected") && !token) {
    return redirect(303, "/auth/login");
  }
  if (path?.includes("admin")) {
    try {
      const userData = jwt.verify(token, JWT_SECRET);
      if (typeof userData !== "string" && userData.role === "admin") {
        return resolve(event);
      } else {
        return redirect(303, "/auth/login");
      }
    } catch (error) {
      console.log(error);
      return redirect(303, "/auth/login");
    }
  }

  return resolve(event);
};
