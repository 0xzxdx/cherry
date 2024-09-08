import "~/lib/tailwind.css";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/Layout";
import { Settings } from "~/lib/types";
import { getThemeFromCookie } from "~/lib/utils";
import i18nServer from "~/lib/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";

export const handle = { i18n: ["translation"] };

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  const locale = await i18nServer.getLocale(request);

  return json<Settings>({ theme, locale });
};

export default function App() {
  const data = useLoaderData<Settings>();
  useChangeLanguage(data.locale);
  return <Layout />;
}
