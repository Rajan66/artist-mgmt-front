"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AccountSettings, SecuritySettings } from ".";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs
          defaultValue="account"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="flex w-full bg-transparent">
              <TabsTrigger
                value="account"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Account
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account" className="mt-6">
            <AccountSettings />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <SecuritySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
