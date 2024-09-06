import { createCookie } from "@remix-run/cloudflare";
import type { Theme } from "~/types/theme";

const themeCookie = createCookie("theme", {
  maxAge: 34560000, // 400 days
});

export async function getThemeFromCookie(request: Request): Promise<Theme> {
  const cookieHeader = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieHeader);
  return (theme as Theme) || "dark"; // 默认使用暗色主题
}

export { themeCookie };
