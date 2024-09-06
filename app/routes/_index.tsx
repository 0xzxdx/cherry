import type { MetaFunction } from "@remix-run/cloudflare";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "~/components/theme-provider";

export const meta: MetaFunction = () => {
  return [
    { title: "翻译 | Translate" },
    {
      name: "description",
      content:
        "简单高效的在线翻译工具 | Simple and efficient online translation tool",
    },
  ];
};

export default function Index() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-bold">翻译 | Translate</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <MoonIcon className="h-5 w-5" />
            ) : (
              <SunIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择源语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">英语</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                {/* 添加更多语言选项 */}
              </SelectContent>
            </Select>
            <Textarea
              className="mt-2"
              placeholder="在此输入要翻译的文本"
              rows={10}
            />
          </div>

          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择目标语言" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">英语</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
                {/* 添加更多语言选项 */}
              </SelectContent>
            </Select>
            <Textarea
              className="mt-2"
              placeholder="翻译结果将显示在这里"
              rows={10}
              readOnly
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <Button>翻译</Button>
        </div>
      </main>
    </div>
  );
}
