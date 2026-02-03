"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProviderAuthModal({
  open,
  onOpenChange,
  initialMode = "signup",
}) {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setFormError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setFormError(error.message);
      setLoading(false);
      return;
    }

    if (!data?.session) {
      setFormError(
        "Please confirm your email to complete sign up, then log in."
      );
      setLoading(false);
      return;
    }

    if (data?.user) {
      const profileRes = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!profileRes.ok) {
        const profileError = await profileRes.json();
        setFormError(profileError.error || "Failed to save profile.");
        setLoading(false);
        return;
      }
    }

    onOpenChange(false);
    router.push("/provider/app");
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setFormError("");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setFormError(error.message);
      setLoading(false);
      return;
    }

    onOpenChange(false);
    router.push("/provider/app");
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      setMode(initialMode);
    }
  }, [open, initialMode]);

  const submit = (event) => {
    event.preventDefault();
    if (mode === "signup") {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === "signup" ? "Create your provider account" : "Welcome back"}
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={submit}>
          {mode === "signup" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  placeholder="Jordan"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  placeholder="Rivers"
                  required
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="doctor@practice.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {formError && (
            <p className="text-sm text-red-600" role="alert">
              {formError}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "signup"
                ? "Create account"
                : "Log in"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? "Already have an account?" : "New to CareFirst?"}
            <button
              type="button"
              onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700"
            >
              {mode === "signup" ? "Log in" : "Sign up"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
