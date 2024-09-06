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
import { ThemeProvider } from "~/components/theme-provider";
import styles from "./tailwind.css?url";
import { getThemeFromCookie } from "~/utils/theme.server";
import type { Theme } from "~/types/theme";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

type LoaderData = {
  theme: Theme;
  language: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const theme = await getThemeFromCookie(request);
  return json<LoaderData>({ theme: theme as Theme, language: "en" });
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
  const data = useLoaderData<LoaderData>();

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
