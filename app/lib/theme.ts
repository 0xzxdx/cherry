import { createCookie } from "@remix-run/cloudflare";
import type { Theme } from "~/types/theme";

const themeCookie = createCookie("theme", {
  maxAge: 34560000,
});

export async function getThemeFromCookie(request: Request): Promise<Theme> {
  const cookieHeader = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieHeader);
  return (theme as Theme) || "dark";
}

export { themeCookie };
