"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bank, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ComingSoonCard() {
  return (
    <Card className="group relative overflow-hidden">
      {/* Decorative grid background */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />

      {/* Decorative gradient orb */}
      <div className="absolute h-32 w-32 -top-16 -right-16 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardHeader className="flex-row items-center justify-between relative">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <div className="relative">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <div className="absolute inset-0 h-2 w-2 rounded-full bg-blue-500 animate-ping opacity-25" />
          </div>
          <span>Coming Soon</span>
          <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-500 border-blue-500/20">
            Q2 2025
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 relative p-6">
        <div className="flex items-start space-x-4">
          <div className="bg-blue-500/10 p-3 rounded-lg">
            <Bank className="w-6 h-6 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">USD Off-Ramps</h3>
            <p className="text-sm text-muted-foreground">
              Direct USDC/USDT to bank account transfers. Convert your stablecoins to USD and withdraw directly to your bank account.
            </p>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-6 right-6 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </CardContent>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Card>
  );
}