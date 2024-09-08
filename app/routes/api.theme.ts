import { ActionFunction, json } from "@remix-run/cloudflare";
import { themeCookie } from "~/lib/utils";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const theme = formData.get("theme");

  if (
    typeof theme !== "string" ||
    !["light", "dark", "system"].includes(theme)
  ) {
    return json({ success: false }, { status: 400 });
  }

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await themeCookie.serialize(theme),
      },
    }
  );
};
