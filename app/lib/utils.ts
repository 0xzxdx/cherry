import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Theme } from "~/lib/types";
import { createCookie } from "@remix-run/node";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLanguageFromPath = (path: string) => {
  return path.startsWith("/zh") ? "zh" : "en";
};

export const themeCookie = createCookie("theme", {
  maxAge: 34560000,
});

export async function getThemeFromCookie(request: Request): Promise<Theme> {
  const cookieHeader = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieHeader);
  return (theme as Theme) || "dark";
}
