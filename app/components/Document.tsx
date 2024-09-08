import { Links, Meta, Scripts, ScrollRestoration } from "@remix-run/react";
import { Theme } from "~/lib/types";

interface DocumentProps {
  children: React.ReactNode;
  theme: Theme;
  language: string;
}

export function Document({ children, theme, language }: DocumentProps) {
  return (
    <html lang={language} className={theme} suppressHydrationWarning>
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
