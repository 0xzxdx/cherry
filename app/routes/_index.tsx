import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix on Cloudflare!",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
