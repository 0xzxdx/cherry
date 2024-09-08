import { useEffect } from "react";
import { useLocation, Outlet, useLoaderData } from "@remix-run/react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "~/components/ThemeProvider";
import { Document } from "~/components/Document";
import { Settings } from "~/lib/types";
import i18n from "~/lib/i18n";
import { getLanguageFromPath } from "~/lib/utils";

export function Layout() {
  const data = useLoaderData<Settings>();
  const location = useLocation();

  useEffect(() => {
    const lang = getLanguageFromPath(location.pathname);
    i18n.changeLanguage(lang);
  }, [location.pathname]);

  return (
    <Document theme={data.theme} language={data.language}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme={data.theme} storageKey="app-theme">
          <Outlet />
        </ThemeProvider>
      </I18nextProvider>
    </Document>
  );
}
