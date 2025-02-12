"use client";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, User, Bell, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useSoljarUser } from "@/web3/hooks/use-soljar-user";

export default function SettingsPage() {
  const { getUser } = useSoljarUser();
  const { data: user, isLoading } = getUser;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1400px] p-6 space-y-6">
        <h1 className="text-3xl font-medium">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings Card */}
          <Card className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Settings
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-purple-500/20 focus:border-purple-500 focus:ring-purple-500/20"
                />
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

          {/* Notification Settings Card */}
          <Card className="group relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for tips
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Browser Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive browser notifications for tips
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>

          {/* Security Settings Card */}
          <Card className="group relative overflow-hidden md:col-span-2">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] transition-colors" />
            <div className="absolute h-32 w-32 -top-16 -right-16 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 group-hover:scale-150 transition-all duration-500" />

            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-green-500/20 hover:bg-green-500/10 text-green-700 dark:text-green-400"
                >
                  Enable 2FA
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Connected Wallets</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage your connected wallets
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-green-500/20 hover:bg-green-500/10 text-green-700 dark:text-green-400"
                >
                  Manage
                </Button>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        </div>
      </div>
    </div>
  );
}
