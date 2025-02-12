import { useState } from "react";
import { QrCode } from "react-qrcode-pretty";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Copy, Check, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";

interface QRCodeSectionProps {
  url: string;
}

export function QRCodeSection({ url }: QRCodeSectionProps) {
  const [copied, setCopied] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  // Use resolvedTheme instead of theme as it gives us the actual computed theme
  const isDark = resolvedTheme === "dark";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Create Phantom URL with proper format
  const phantomUrl = `https://phantom.app/ul/browse/${encodeURIComponent(
    url
  )}?ref=${encodeURIComponent(window.location.origin)}`;

  // Theme-aware colors
  const qrColors = {
    light: {
      eyes: "#7C3AED", // accent-purple
      body: "#7C3AED", // accent-purple
      bgColor: "#FFFFFF",
    },
    dark: {
      eyes: "#fafafa", // lighter accent-purple
      body: "#fafafa", // lighter accent-purple
      bgColor: "#1A1A1A", // dark background
    },
  };

  const colors = isDark ? qrColors.dark : qrColors.light;

  console.log("Theme:", theme, "Resolved Theme:", resolvedTheme);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full flex flex-col py-4 sm:py-6 md:py-8"
    >
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-accent-purple" />
          </div>
        </div>
        <h2 className="text-xl font-semibold">Tip via Phantom</h2>
        <p className="text-sm text-muted-foreground">
          Scan with your phone&apos;s camera to open in Phantom wallet
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center my-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
          <div
            className={`relative p-4 rounded-xl flex justify-center ${
              isDark ? "bg-[#1A1A1A]" : "bg-white"
            }`}
          >
            <QrCode
              value={phantomUrl}
              variant={{
                eyes: "gravity",
                body: "rounded",
              }}
              color={{
                eyes: colors.eyes,
                body: colors.body,
              }}
              padding={6}
              margin={0}
              bgColor={isDark ? "#1A1A1A" : "#FFFFFF"}
              bgRounded
              divider
              size={230}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {/* Mobile: Show Open in Phantom as primary button */}
        <div className="block lg:hidden space-y-3">
          <Button
            className="w-full h-11 bg-accent-purple hover:bg-accent-purple/90 text-white flex items-center justify-center gap-2"
            asChild
          >
            <a href={phantomUrl} target="_blank" rel="noopener noreferrer">
              <Smartphone className="w-4 h-4" />
              Open in Phantom
            </a>
          </Button>
          <Button
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 h-11"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </Button>
        </div>

        {/* Desktop: Show Copy as primary button */}
        <div className="hidden lg:block space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-accent-purple/20 hover:border-accent-purple/30 h-11"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            or open directly in{" "}
            <a
              href={phantomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-purple hover:text-accent-purple/80 transition-colors"
            >
              Phantom Browser
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
