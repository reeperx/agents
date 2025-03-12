import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Bot,
  CreditCard,
  Globe,
  Image,
  Mail,
  Palette,
  Save,
} from "lucide-react";

export default async function AdminSettings() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Check if user is admin (in a real app, you'd check a role field)
  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!userData || userData.role !== "admin") {
    return redirect("/dashboard");
  }

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Store Settings</h2>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-gray-800"
            >
              <Globe className="h-4 w-4 mr-2" /> General
            </TabsTrigger>
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-gray-800"
            >
              <Palette className="h-4 w-4 mr-2" /> Appearance
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="data-[state=active]:bg-gray-800"
            >
              <CreditCard className="h-4 w-4 mr-2" /> Payment
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="data-[state=active]:bg-gray-800"
            >
              <Mail className="h-4 w-4 mr-2" /> Email
            </TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="store-name">Store Name</Label>
                  <Input
                    id="store-name"
                    placeholder="Enter store name"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue="AI Agent Marketplace"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-description">Store Description</Label>
                  <textarea
                    id="store-description"
                    rows={3}
                    placeholder="Brief description of your store"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue="A marketplace for AI agents that help users boost productivity and transform their workflow."
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="Enter contact email"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue="contact@aimarketplace.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    placeholder="Enter support email"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue="support@aimarketplace.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Store Logo</Label>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-4 h-24 w-24">
                      <Bot className="h-12 w-12 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:bg-gray-700 w-full justify-start mb-2"
                      >
                        <Image className="mr-2 h-4 w-4" /> Change Logo
                      </Button>
                      <p className="text-xs text-gray-400">
                        Recommended size: 200x200px, Max size: 1MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Store Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="maintenance-mode" />
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-account" defaultChecked />
                      <Label htmlFor="require-account">
                        Require Account for Purchase
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="show-ratings" defaultChecked />
                      <Label htmlFor="show-ratings">
                        Show Ratings and Reviews
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="allow-guest-browsing" defaultChecked />
                      <Label htmlFor="allow-guest-browsing">
                        Allow Guest Browsing
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="utc">UTC</option>
                    <option value="est" selected>
                      Eastern Time (EST/EDT)
                    </option>
                    <option value="cst">Central Time (CST/CDT)</option>
                    <option value="mst">Mountain Time (MST/MDT)</option>
                    <option value="pst">Pacific Time (PST/PDT)</option>
                  </select>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Appearance Settings Tab */}
          <TabsContent value="appearance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Colors</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color" className="text-sm">
                        Primary Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md bg-gradient-to-r from-cyan-500 to-purple-600"></div>
                        <Input
                          id="primary-color"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue="#0891b2 to #9333ea"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color" className="text-sm">
                        Secondary Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md bg-gray-800"></div>
                        <Input
                          id="secondary-color"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue="#1f2937"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color" className="text-sm">
                        Accent Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md bg-cyan-400"></div>
                        <Input
                          id="accent-color"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue="#22d3ee"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="text-color" className="text-sm">
                        Text Color
                      </Label>
                      <div className="flex gap-2">
                        <div className="h-10 w-10 rounded-md bg-white"></div>
                        <Input
                          id="text-color"
                          className="bg-gray-800 border-gray-700 text-white"
                          defaultValue="#ffffff"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Theme Mode</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-md p-4 bg-gray-800 flex items-center gap-3 cursor-pointer relative">
                      <div className="h-16 w-16 bg-gray-900 rounded-md flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-gray-700"></div>
                      </div>
                      <div>
                        <div className="font-medium">Dark Mode</div>
                        <div className="text-sm text-gray-400">
                          Default theme
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 h-4 w-4 bg-cyan-400 rounded-full"></div>
                    </div>

                    <div className="border border-gray-700 rounded-md p-4 bg-white flex items-center gap-3 cursor-pointer">
                      <div className="h-16 w-16 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          Light Mode
                        </div>
                        <div className="text-sm text-gray-500">
                          Optional theme
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Homepage Layout</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-700 rounded-md p-4 bg-gray-800 flex flex-col items-center gap-2 cursor-pointer relative">
                      <div className="h-24 w-full bg-gray-700 rounded-md mb-2"></div>
                      <div className="grid grid-cols-3 gap-2 w-full">
                        <div className="h-12 bg-gray-700 rounded-md"></div>
                        <div className="h-12 bg-gray-700 rounded-md"></div>
                        <div className="h-12 bg-gray-700 rounded-md"></div>
                      </div>
                      <div className="text-sm font-medium mt-2">
                        Grid Layout
                      </div>
                      <div className="absolute top-2 right-2 h-4 w-4 bg-cyan-400 rounded-full"></div>
                    </div>

                    <div className="border border-gray-700 rounded-md p-4 bg-gray-800 flex flex-col items-center gap-2 cursor-pointer">
                      <div className="h-12 w-full bg-gray-700 rounded-md mb-2"></div>
                      <div className="w-full space-y-2">
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                        <div className="h-10 bg-gray-700 rounded-md"></div>
                      </div>
                      <div className="text-sm font-medium mt-2">
                        List Layout
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Font Settings</Label>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="heading-font" className="text-sm">
                        Heading Font
                      </Label>
                      <select
                        id="heading-font"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="inter" selected>
                          Inter
                        </option>
                        <option value="roboto">Roboto</option>
                        <option value="opensans">Open Sans</option>
                        <option value="montserrat">Montserrat</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="body-font" className="text-sm">
                        Body Font
                      </Label>
                      <select
                        id="body-font"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="inter" selected>
                          Inter
                        </option>
                        <option value="roboto">Roboto</option>
                        <option value="opensans">Open Sans</option>
                        <option value="montserrat">Montserrat</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom CSS</Label>
                  <textarea
                    rows={4}
                    placeholder="Add custom CSS here"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-sm"
                  ></textarea>
                  <p className="text-xs text-gray-400">
                    Advanced: Add custom CSS to override default styles
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Payment Settings Tab */}
          <TabsContent value="payment" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>PayPal Integration</Label>
                  <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">
                          P
                        </div>
                        <span className="font-medium">PayPal</span>
                      </div>
                      <Switch id="paypal-enabled" defaultChecked />
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="paypal-client-id" className="text-sm">
                          Client ID
                        </Label>
                        <Input
                          id="paypal-client-id"
                          className="bg-gray-700 border-gray-600 text-white"
                          defaultValue="AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq"
                          type="password"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="paypal-secret" className="text-sm">
                          Secret Key
                        </Label>
                        <Input
                          id="paypal-secret"
                          className="bg-gray-700 border-gray-600 text-white"
                          defaultValue="EeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVv"
                          type="password"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="paypal-mode" className="text-sm">
                          Mode
                        </Label>
                        <select
                          id="paypal-mode"
                          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                          <option value="sandbox">Sandbox (Testing)</option>
                          <option value="live">Live</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Stripe Integration</Label>
                  <div className="bg-gray-800 border border-gray-700 rounded-md p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                          S
                        </div>
                        <span className="font-medium">Stripe</span>
                      </div>
                      <Switch id="stripe-enabled" />
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="stripe-public-key" className="text-sm">
                          Public Key
                        </Label>
                        <Input
                          id="stripe-public-key"
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="pk_test_..."
                        />
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="stripe-secret-key" className="text-sm">
                          Secret Key
                        </Label>
                        <Input
                          id="stripe-secret-key"
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="sk_test_..."
                          type="password"
                        />
                      </div>

                      <div className="space-y-1">
                        <Label
                          htmlFor="stripe-webhook-secret"
                          className="text-sm"
                        >
                          Webhook Secret
                        </Label>
                        <Input
                          id="stripe-webhook-secret"
                          className="bg-gray-700 border-gray-600 text-white"
                          placeholder="whsec_..."
                          type="password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Currency Settings</Label>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="currency" className="text-sm">
                        Default Currency
                      </Label>
                      <select
                        id="currency"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="usd" selected>
                          USD ($)
                        </option>
                        <option value="eur">EUR (€)</option>
                        <option value="gbp">GBP (£)</option>
                        <option value="cad">CAD ($)</option>
                        <option value="aud">AUD ($)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="currency-position" className="text-sm">
                        Currency Position
                      </Label>
                      <select
                        id="currency-position"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="before" selected>
                          Before - $49.99
                        </option>
                        <option value="after">After - 49.99$</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="thousand-separator" className="text-sm">
                        Thousand Separator
                      </Label>
                      <select
                        id="thousand-separator"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="comma" selected>
                          Comma (,)
                        </option>
                        <option value="period">Period (.)</option>
                        <option value="space">Space</option>
                        <option value="none">None</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="decimal-separator" className="text-sm">
                        Decimal Separator
                      </Label>
                      <select
                        id="decimal-separator"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="period" selected>
                          Period (.)
                        </option>
                        <option value="comma">Comma (,)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tax Settings</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="enable-tax" defaultChecked />
                      <Label htmlFor="enable-tax">
                        Enable Tax Calculations
                      </Label>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="tax-rate" className="text-sm">
                        Default Tax Rate (%)
                      </Label>
                      <Input
                        id="tax-rate"
                        type="number"
                        step="0.01"
                        min="0"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="8.00"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="tax-name" className="text-sm">
                        Tax Name
                      </Label>
                      <Input
                        id="tax-name"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="Sales Tax"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="prices-include-tax" />
                      <Label htmlFor="prices-include-tax">
                        Prices Include Tax
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Email Settings Tab */}
          <TabsContent value="email" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Provider</Label>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="email-provider" className="text-sm">
                        Provider
                      </Label>
                      <select
                        id="email-provider"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="smtp" selected>
                          SMTP
                        </option>
                        <option value="sendgrid">SendGrid</option>
                        <option value="mailchimp">Mailchimp</option>
                        <option value="ses">Amazon SES</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="smtp-host" className="text-sm">
                        SMTP Host
                      </Label>
                      <Input
                        id="smtp-host"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="smtp.example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="smtp-port" className="text-sm">
                        SMTP Port
                      </Label>
                      <Input
                        id="smtp-port"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="587"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="smtp-username" className="text-sm">
                        SMTP Username
                      </Label>
                      <Input
                        id="smtp-username"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="user@example.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="smtp-password" className="text-sm">
                        SMTP Password
                      </Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="password"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="smtp-secure" defaultChecked />
                      <Label htmlFor="smtp-secure">
                        Use Secure Connection (TLS/SSL)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Templates</Label>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor="email-from-name" className="text-sm">
                        From Name
                      </Label>
                      <Input
                        id="email-from-name"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="AI Agent Marketplace"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email-from-address" className="text-sm">
                        From Email Address
                      </Label>
                      <Input
                        id="email-from-address"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="noreply@aimarketplace.com"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email-template" className="text-sm">
                        Email Template
                      </Label>
                      <select
                        id="email-template"
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      >
                        <option value="welcome">Welcome Email</option>
                        <option value="purchase">Purchase Confirmation</option>
                        <option value="download">Download Links</option>
                        <option value="password">Password Reset</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email-subject" className="text-sm">
                        Email Subject
                      </Label>
                      <Input
                        id="email-subject"
                        className="bg-gray-800 border-gray-700 text-white"
                        defaultValue="Welcome to AI Agent Marketplace"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email-content" className="text-sm">
                        Email Content
                      </Label>
                      <textarea
                        id="email-content"
                        rows={6}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        defaultValue="Hello {{name}},\n\nThank you for joining AI Agent Marketplace! We're excited to have you as part of our community.\n\nBest regards,\nThe AI Agent Marketplace Team"
                      ></textarea>
                      <p className="text-xs text-gray-400">
                        Use {{ name }} for customer name, {{ order_id }} for
                        order ID, etc.
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      Send Test Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  );
}
