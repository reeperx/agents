"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "../../../../supabase/client";
import { Camera, Check, User } from "lucide-react";
import UserAvatar from "@/components/user-avatar";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
    location: "",
    website: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/sign-in");
          return;
        }

        setUser(user);

        // Fetch user profile
        const { data: profileData, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching profile:", error);
        }

        if (profileData) {
          setProfile(profileData);
          setFormData({
            fullName: profileData.full_name || "",
            email: user.email || "",
            bio: profileData.bio || "",
            location: profileData.location || "",
            website: profileData.website || "",
          });
        } else {
          setFormData({
            fullName: user.user_metadata?.full_name || "",
            email: user.email || "",
            bio: "",
            location: "",
            website: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [supabase, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    setUploading(true);

    try {
      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase.from("profiles").upsert({
        id: user.id,
        avatar_url: filePath,
        updated_at: new Date().toISOString(),
      });

      if (updateError) throw updateError;

      // Show success message
      setSuccessMessage("Avatar updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      // Refresh the page to show the new avatar
      router.refresh();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Update auth metadata
      await supabase.auth.updateUser({
        data: { full_name: formData.fullName },
      });

      // Update profile in database
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: formData.fullName,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      // Show success message
      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col">
        <DashboardNavbar />
        <main className="flex-1 container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <DashboardNavbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

        <Tabs defaultValue="profile" className="mb-8">
          <TabsList className="bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gray-800"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-gray-800"
            >
              Account Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Avatar Section */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-fit">
                <h2 className="text-xl font-semibold mb-4">Profile Picture</h2>
                <div className="flex flex-col items-center">
                  <div className="mb-4 relative group">
                    <UserAvatar user={user} size="lg" />
                    <label
                      htmlFor="avatar-upload"
                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                    >
                      <Camera className="h-6 w-6 text-white" />
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    Click on the avatar to upload a new image
                  </p>
                  {uploading && (
                    <div className="mt-2 flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-cyan-500 mr-2"></div>
                      <span className="text-sm">Uploading...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Form */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {successMessage && (
                    <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-4 py-2 rounded-md flex items-center">
                      <Check className="h-4 w-4 mr-2" />
                      {successMessage}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className="bg-gray-800 border-gray-700 text-gray-400"
                    />
                    <p className="text-xs text-gray-400">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Change Password</h3>
                  <p className="text-gray-400 mb-4">
                    Update your password to keep your account secure
                  </p>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-700"
                    onClick={() => router.push("/dashboard/reset-password")}
                  >
                    Change Password
                  </Button>
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-lg font-medium mb-2">Delete Account</h3>
                  <p className="text-gray-400 mb-4">
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </p>
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
