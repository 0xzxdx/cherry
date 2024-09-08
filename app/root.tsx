import { LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare";
import styles from "./tailwind.css?url";
import { Settings } from "~/types/settings";
import { Theme } from "~/types/theme";
import { getLanguageFromPath, getThemeFromCookie } from "~/lib/utils";
import { Layout } from "~/components/Layout";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  const language = getLanguageFromPath(request.url);
  return json<Settings>({ theme: theme as Theme, language: language });
};

export default function App() {
  return <Layout />;
}
