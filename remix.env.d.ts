/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/cloudflare" />
/// <reference types="@cloudflare/workers-types" />
import type { AppLoadContext as OriginalAppLoadContext } from "@remix-run/server-runtime";

declare module "@remix-run/server-runtime" {
  export interface AppLoadContext extends OriginalAppLoadContext {
    cloudflare: {
      env: {
        OPENAI_BASE_URL: string;
        OPENAI_API_KEY: string;
      };
    };
  }
}
