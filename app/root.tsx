import { LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare";
import styles from "~/lib/tailwind.css?url";
import { Settings } from "~/lib/types";
import { getLanguageFromPath, getThemeFromCookie } from "~/lib/utils";
import { Layout } from "~/components/Layout";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  const language = getLanguageFromPath(request.url);
  return json<Settings>({ theme: theme, language: language });
};

export default function App() {
  return <Layout />;
}
