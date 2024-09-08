import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      envOnlyMacros(),
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true,
        },
        serverModuleFormat: "esm",
      }),
      tsconfigPaths(),
    ],
    define: {
      "process.env.OPENAI_API_KEY": JSON.stringify(env.OPENAI_API_KEY),
      "process.env.OPENAI_BASE_URL": JSON.stringify(env.OPENAI_BASE_URL),
    },
    optimizeDeps: {
      exclude: ["stream"],
    },
  };
});
