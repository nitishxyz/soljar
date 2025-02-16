"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Code, Copy, Check, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";
import { useState } from "react";

export default function MorePage() {
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (isLoading || !user) {
    return <div>Loading...</div>;
  }

  const embedExamples = [
    {
      title: "HTML Button Embed",
      code: `<a href="https://soljar.xyz/tip/${user.username}" target="_blank">
  <button style="background-color: #4F46E5; color: white; padding: 12px 24px; border-radius: 4px; border: none; cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 500; display: inline-flex; align-items: center; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.15); transition: all 0.2s ease;">
    <svg style="margin-right: 8px;" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2"/>
      <path d="M8.5 12.5L11 15L15.5 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    Tip with Soljar
  </button>
</a>`,
      description: "Simple HTML button that links to your Soljar profile",
    },
    {
      title: "Markdown Link",
      code: `[![Tip with Soljar](https://soljar.xyz/button.svg)](https://soljar.xyz/tip/${user.username})`,
      description: "Perfect for GitHub READMEs and other markdown files",
    },
    {
      title: "HTML Image Link",
      code: `<a href="https://soljar.xyz/tip/${user.username}" target="_blank">
  <img src="https://soljar.xyz/button.svg" alt="Tip with Soljar" width="200" />
</a>`,
      description: "Image-based button that links to your Soljar profile",
    },
  ];

  return (
    <div className="container mx-auto p-8 px-4 sm:px-6">
      <div className="space-y-8">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <Settings className="w-7 h-7 text-accent-purple" />
          More
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Info Card */}
          <Card className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Info
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user?.username}
                  readOnly
                  className="bg-purple-500/5 border-purple-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet">Wallet</Label>
                <Input
                  id="wallet"
                  type="text"
                  value={user?.user.toBase58()}
                  readOnly
                  className="bg-purple-500/5 border-purple-500/20"
                />
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
          {/* Platform Links Card */}
          <Card className="group relative overflow-hidden">
            {/* <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" /> */}
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Platform Links
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Follow Us</Label>
                  <p className="text-sm text-muted-foreground">
                    <Button
                      variant="link"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
                      onClick={() =>
                        window.open("https://twitter.com/soljarxyz", "_blank")
                      }
                    >
                      @soljarxyz
                    </Button>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Refer Friends</Label>
                  <p className="text-sm text-muted-foreground">
                    Share Soljar with your friends.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500/20 hover:bg-blue-500/10"
                  onClick={() =>
                    copyToClipboard(
                      "https://soljar.xyz?ref=" + user.username,
                      -1
                    )
                  }
                >
                  {copiedIndex === -1 ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Documentation</Label>
                  <p className="text-sm text-muted-foreground">
                    <Button
                      variant="link"
                      className="text-blue-500 hover:text-blue-600 p-0 h-auto font-normal"
                      onClick={() =>
                        window.open("https://docs.soljar.xyz", "_blank")
                      }
                    >
                      Learn more about Soljar
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        </div>

        <h2 className="text-2xl font-medium mt-6 mb-4">
          Embed Soljar Anywhere
        </h2>
        <p className="text-muted-foreground">
          Copy and paste these snippets to add Soljar tipping to any platform.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {embedExamples.map((example, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
              <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />

              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  {example.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {example.description}
                </p>
                <div className="relative">
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(example.code, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
