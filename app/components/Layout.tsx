import { Outlet, useLoaderData } from "@remix-run/react";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Document } from "~/components/Document";
import { Settings } from "~/lib/types";

export function Layout() {
  const data = useLoaderData<Settings>();

  return (
    <Document theme={data.theme} locale={data.locale}>
      <ThemeProvider defaultTheme={data.theme} storageKey="app-theme">
        <Outlet />
      </ThemeProvider>
    </Document>
  );
}
