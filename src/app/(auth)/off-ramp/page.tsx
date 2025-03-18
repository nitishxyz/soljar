"use client";
import { Banknote, ArrowRight, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function OffRampPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] p-8 px-4 sm:px-6 space-y-8">
        <h1 className="text-3xl font-medium">USD Off-Ramp</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-blue-100/30 to-transparent dark:from-blue-950/20 dark:via-blue-900/10 dark:to-transparent">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute h-32 w-32 -top-10 -right-10 bg-blue-500/20 rounded-full blur-3xl" />

            <CardContent className="p-8">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500/10 p-3 rounded-lg">
                    <Banknote className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-semibold">
                        Direct Bank Transfers
                      </h2>
                      <Badge className="ml-4 bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        Coming Q2 2025
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      Convert your stablecoins to USD instantly
                    </p>
                  </div>
                </div>

                <div className="bg-blue-500/5 rounded-xl p-6 space-y-5">
                  <h3 className="text-lg font-medium">Upcoming Features</h3>

                  <div className="space-y-4">
                    <Feature
                      title="USDC/USDT to USD Conversion"
                      description="Convert your stablecoins to USD at competitive rates"
                    />
                    <Feature
                      title="Direct Bank Deposits"
                      description="Transfer funds directly to your bank account"
                    />
                    <Feature
                      title="Fast Settlement"
                      description="Receive funds within 1-2 business days"
                    />
                    <Feature
                      title="Low Fees"
                      description="Competitive fee structure with volume discounts"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <p className="text-muted-foreground">
                    We&apos;re working hard to bring you this feature.
                  </p>

                  {/* <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() =>
                        window.open("https://forms.gle/yourFormLink", "_blank")
                      }
                    >
                      Join Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500/20 text-blue-500 hover:bg-blue-500/10"
                    >
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      Get Updates
                    </Button>
                  </div> */}
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="max-w-md space-y-6">
              <h2 className="text-2xl font-semibold">How It Will Work</h2>

              <div className="space-y-6">
                <Step
                  number={1}
                  title="Connect Your Bank Account"
                  description="Securely link your bank account through our trusted financial partners."
                />

                <Step
                  number={2}
                  title="Choose Amount & Currency"
                  description="Select how much USDC or USDT you want to convert to USD."
                />

                <Step
                  number={3}
                  title="Confirm Transfer"
                  description="Review and confirm the transaction details."
                />

                <Step
                  number={4}
                  title="Receive Funds"
                  description="Your USD will be transferred directly to your bank account within 1-2 business days."
                />
              </div>

              <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mt-8">
                <h3 className="font-medium text-blue-600 dark:text-blue-400">
                  Why Off-Ramp?
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Convert your crypto earnings to traditional currency without
                  leaving the SolJar platform. Perfect for businesses,
                  freelancers, and creators who need to pay bills or manage
                  expenses in traditional banking systems.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex">
      <div className="mr-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500/20">
        <CheckIcon className="h-4 w-4 text-blue-500" />
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex">
      <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white font-medium">
        {number}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
