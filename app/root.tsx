import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare";
import { ThemeProvider } from "~/components/theme-provider";
import styles from "./tailwind.css?url";
import { getThemeFromCookie } from "~/utils/theme.server";
import type { Theme } from "~/types/theme";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = {
  theme: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  return json<LoaderData>({ theme: theme as Theme });
};

export function Layout() {
  const data = useLoaderData<LoaderData>();

  return (
    <html lang="en" className={data.theme} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider defaultTheme={data.theme} storageKey="app-theme">
          <Outlet />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Layout />;
}
