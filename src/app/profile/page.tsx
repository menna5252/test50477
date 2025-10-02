"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { UpdateUserProfile, UpdateUserPassword } from "@/app/apis/profileApi";
import Link from "next/link";

const profileFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be valid"),
});
type ProfileFormPayload = z.infer<typeof profileFormSchema>;


const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });
type PasswordFormPayload = z.infer<typeof passwordFormSchema>;

export default function ProfilePage() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

 
  const profileForm = useForm<ProfileFormPayload>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });


  const passwordForm = useForm<PasswordFormPayload>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });


  async function onSubmitProfile(values: ProfileFormPayload) {
    setLoadingProfile(true);
    const res = await UpdateUserProfile(values);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setLoadingProfile(false);
  }

 
  async function onSubmitPassword(values: PasswordFormPayload) {
    setLoadingPassword(true);
    const res = await UpdateUserPassword(values);

    if (res.success) {
      toast.success(res.message);
      passwordForm.reset(); 
    } else {
      toast.error(res.message);
    }

    setLoadingPassword(false);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r p-6">
        <h2 className="text-lg font-bold mb-6">My Account</h2>
        <nav className="space-y-3">
          <Link href="/profile" className="block text-gray-700 hover:text-red-500">
            Profile
          </Link>
          <Link href="/allorders" className="block text-gray-700 hover:text-red-500">
            Orders
          </Link>
        </nav>
      </aside>


      <main className="flex-1 flex items-start justify-center p-10">
        <div className="w-full max-w-3xl space-y-12">

          <div className="bg-white rounded-xl shadow-md p-10">
            <h2 className="text-2xl font-bold mb-8">Edit Your Profile</h2>

            <Form {...profileForm}>
              <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" placeholder="Your Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} className="h-12" placeholder="you@example.com" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} className="h-12" placeholder="01XXXXXXXXX" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center pt-6">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loadingProfile}
                    className="bg-red-500 hover:bg-red-600 h-12 px-8 text-lg flex items-center gap-2"
                  >
                    {loadingProfile ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Password Form */}
          <div className="bg-white rounded-xl shadow-md p-10">
            <h2 className="text-2xl font-bold mb-8">Change Password</h2>

            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className="h-12" placeholder="Enter current password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className="h-12" placeholder="Enter new password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="rePassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} className="h-12" placeholder="Confirm new password" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center pt-6">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loadingPassword}
                    className="bg-red-500 hover:bg-red-600 h-12 px-8 text-lg flex items-center gap-2"
                  >
                    {loadingPassword ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Password"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
