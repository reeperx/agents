import { redirect } from "next/navigation";
import { createClient } from "../../../../../supabase/server";
import AdminDashboardLayout from "@/components/admin/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  Bot,
  Brain,
  Cpu,
  FileJson,
  FileText,
  Image,
  Upload,
} from "lucide-react";
import Link from "next/link";

export default async function EditAgent({
  params,
}: {
  params: { id: string };
}) {
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

  // Mock agent data based on ID
  const isNewAgent = params.id === "new";
  const agent = isNewAgent
    ? {
        id: "new",
        title: "",
        icon: <Brain className="w-12 h-12" />,
        price: "",
        salePrice: "",
        description: "",
        longDescription: "",
        features: [],
        specifications: {
          version: "",
          releaseDate: "",
          lastUpdated: "",
          compatibility: "",
          fileFormats: "PDF, JSON",
          languages: "",
        },
        tags: [],
        trending: false,
        status: "draft",
      }
    : {
        id: parseInt(params.id),
        title: "Content Creator Pro",
        icon: <Brain className="w-12 h-12" />,
        price: "49.99",
        salePrice: "",
        description:
          "Generate blog posts, social media content, and marketing copy with advanced language capabilities",
        longDescription:
          "Content Creator Pro is an advanced AI agent that leverages state-of-the-art language models to generate various types of content. From blog posts and articles to social media captions and marketing copy, this agent can help you create engaging content that resonates with your audience.",
        features: [
          "Blog post generation with SEO optimization",
          "Social media content creation for multiple platforms",
          "Marketing copy and ad text generation",
          "Email newsletter content creation",
          "Product descriptions and promotional material",
        ],
        specifications: {
          version: "2.1.0",
          releaseDate: "2023-09-15",
          lastUpdated: "2023-10-10",
          compatibility: "Works with all major platforms",
          fileFormats: "PDF, JSON",
          languages: "English, Spanish, French, German",
        },
        tags: ["Content", "Marketing", "GPT-4"],
        trending: true,
        status: "active",
      };

  return (
    <AdminDashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href="/admin/agents"
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h2 className="text-3xl font-bold tracking-tight">
                {isNewAgent ? "Add New Agent" : "Edit Agent"}
              </h2>
            </div>
            <p className="text-gray-400">
              {isNewAgent
                ? "Create a new AI agent to sell in the marketplace"
                : "Update the details of this AI agent"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Save as Draft
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90">
              {isNewAgent ? "Create Agent" : "Update Agent"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="basic"
              className="data-[state=active]:bg-gray-800"
            >
              Basic Info
            </TabsTrigger>
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-gray-800"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="pricing"
              className="data-[state=active]:bg-gray-800"
            >
              Pricing
            </TabsTrigger>
            <TabsTrigger
              value="files"
              className="data-[state=active]:bg-gray-800"
            >
              Files
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-gray-800"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Agent Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter agent title"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.title}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Agent Icon</Label>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-lg p-4 h-24 w-24">
                      <div className="text-cyan-400">{agent.icon}</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="border-gray-700 text-gray-300 hover:bg-gray-700 w-full justify-start"
                        >
                          <Image className="mr-2 h-4 w-4" /> Choose Icon
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            <Brain className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            <Bot className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            <Cpu className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short-description">Short Description</Label>
                  <textarea
                    id="short-description"
                    rows={3}
                    placeholder="Brief description of the agent"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue={agent.description}
                  ></textarea>
                  <p className="text-xs text-gray-400">
                    This will appear in cards and search results (max 150
                    characters)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags separated by commas"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.tags.join(", ")}
                  />
                  <p className="text-xs text-gray-400">
                    Tags help users find your agent (e.g., Content, Marketing,
                    GPT-4)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="e.g., 1.0.0"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.specifications.version}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="release-date">Release Date</Label>
                    <Input
                      id="release-date"
                      type="date"
                      className="bg-gray-800 border-gray-700 text-white"
                      defaultValue={agent.specifications.releaseDate}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last-updated">Last Updated</Label>
                    <Input
                      id="last-updated"
                      type="date"
                      className="bg-gray-800 border-gray-700 text-white"
                      defaultValue={agent.specifications.lastUpdated}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages">Supported Languages</Label>
                  <Input
                    id="languages"
                    placeholder="e.g., English, Spanish, French"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.specifications.languages}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Description Tab */}
          <TabsContent value="description" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-description">Full Description</Label>
                <div className="border border-gray-700 rounded-md overflow-hidden">
                  <div className="bg-gray-900 border-b border-gray-700 px-3 py-2 flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Bold
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Italic
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Link
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      List
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Image
                    </Button>
                  </div>
                  <textarea
                    id="full-description"
                    rows={10}
                    placeholder="Detailed description of the agent"
                    className="w-full bg-gray-800 border-none px-3 py-2 text-white focus:outline-none"
                    defaultValue={agent.longDescription}
                  ></textarea>
                </div>
                <p className="text-xs text-gray-400">
                  This is the full description that will appear on the agent's
                  detail page
                </p>
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="bg-gray-800 border border-gray-700 rounded-md p-4 space-y-3">
                  {agent.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Feature description"
                        className="bg-gray-700 border-gray-600 text-white"
                        defaultValue={feature}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 text-red-400 hover:text-red-300 hover:bg-gray-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new feature"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="regular-price">Regular Price ($)</Label>
                  <Input
                    id="regular-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="e.g., 49.99"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.price}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sale-price">Sale Price ($)</Label>
                  <Input
                    id="sale-price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Leave empty if no sale"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.salePrice}
                  />
                  <p className="text-xs text-gray-400">
                    If set, this price will be shown as the current price with
                    the regular price shown as strikethrough
                  </p>
                </div>

                <div className="flex items-center space-x-2 pt-4">
                  <Switch id="trending" defaultChecked={agent.trending} />
                  <Label htmlFor="trending">Mark as Trending</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Feature on Homepage</Label>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-md p-6">
                <h3 className="text-lg font-semibold mb-4">Price Preview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Regular Price:</span>
                    <span
                      className={
                        agent.salePrice
                          ? "line-through text-gray-400"
                          : "text-white font-bold"
                      }
                    >
                      ${agent.price || "0.00"}
                    </span>
                  </div>

                  {agent.salePrice && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Sale Price:</span>
                      <span className="text-purple-400 font-bold">
                        ${agent.salePrice}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <span className="text-gray-400">Customer Pays:</span>
                    <span className="text-2xl font-bold text-white">
                      ${agent.salePrice || agent.price || "0.00"}
                    </span>
                  </div>

                  {agent.trending && (
                    <div className="mt-6 bg-yellow-900/20 border border-yellow-700/30 rounded-md p-3 text-yellow-400 text-sm flex items-center">
                      <Star className="h-4 w-4 mr-2 fill-yellow-400" />
                      This agent will be marked as trending in the marketplace
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Files Tab */}
          <TabsContent value="files" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Agent Image</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-6 flex flex-col items-center justify-center bg-gray-800">
                    <Image className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400 mb-2">
                      Drag and drop an image here, or click to browse
                    </p>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload Image
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Recommended size: 800x600px, Max size: 2MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>PDF File</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-6 flex flex-col items-center justify-center bg-gray-800">
                    <FileText className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400 mb-2">
                      Upload the PDF version of the agent
                    </p>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload PDF
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Max size: 10MB</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>JSON File</Label>
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-6 flex flex-col items-center justify-center bg-gray-800">
                    <FileJson className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400 mb-2">
                      Upload the JSON configuration file
                    </p>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    >
                      <Upload className="mr-2 h-4 w-4" /> Upload JSON
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">Max size: 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Agent Status</Label>
                  <select
                    id="status"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    defaultValue={agent.status}
                  >
                    <option value="draft">
                      Draft - Not visible in marketplace
                    </option>
                    <option value="active">
                      Active - Available for purchase
                    </option>
                    <option value="archived">
                      Archived - Hidden from marketplace
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Primary Category</Label>
                  <select
                    id="category"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="content">Content Creation</option>
                    <option value="data">Data Analysis</option>
                    <option value="support">Customer Support</option>
                    <option value="development">Development</option>
                    <option value="research">Research</option>
                    <option value="social">Social Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="compatibility">Compatibility</Label>
                  <Input
                    id="compatibility"
                    placeholder="e.g., Works with all major platforms"
                    className="bg-gray-800 border-gray-700 text-white"
                    defaultValue={agent.specifications.compatibility}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Visibility Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="show-in-search" defaultChecked />
                      <Label htmlFor="show-in-search">
                        Show in search results
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="allow-reviews" defaultChecked />
                      <Label htmlFor="allow-reviews">
                        Allow customer reviews
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="show-related" defaultChecked />
                      <Label htmlFor="show-related">Show related agents</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Label className="text-red-400">Danger Zone</Label>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-md p-4">
                    <h4 className="text-red-400 font-medium mb-2">
                      Delete this agent
                    </h4>
                    <p className="text-sm text-gray-400 mb-3">
                      Once deleted, this agent will be permanently removed from
                      the marketplace and all associated files will be deleted.
                    </p>
                    <Button
                      variant="destructive"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete Agent
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
