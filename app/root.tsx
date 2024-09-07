import { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunction, json } from "@remix-run/cloudflare";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "~/components/ThemeProvider";
import styles from "./tailwind.css?url";
import { getThemeFromCookie } from "~/lib/theme";
import { Settings } from "~/types/settings";
import { Theme } from "~/types/theme";
import i18n from "~/lib/i18n";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  return json<Settings>({ theme: theme as Theme, language: "en" });
};

function Document({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function Layout() {
  const data = useLoaderData<Settings>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      i18n.changeLanguage("en");
    }
  }, []);

  return (
    <Document theme={data.theme}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme={data.theme} storageKey="app-theme">
          <Outlet />
        </ThemeProvider>
      </I18nextProvider>
    </Document>
  );
}

export default function App() {
  return <Layout />;
}
