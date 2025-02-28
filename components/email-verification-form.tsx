"use client";

import type React from "react";

import { verifyEmail } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function EmailVerificationForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await verifyEmail(email);

      if ("success" in result && result.success) {
        setSuccess(true);
      } else {
        setError(
          typeof result.error === "string"
            ? result.error
            : "Failed to send verification email"
        );
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Sign in with Email</h1>
        <p className="text-muted-foreground">
          Enter your email to sign in or create an account
        </p>
      </div>

      {!success ? (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending link..." : "Send magic link"}
          </Button>
        </form>
      ) : (
        <div className="p-4 bg-green-50 rounded-md dark:bg-green-900/20">
          <p className="text-center text-green-700 dark:text-green-300">
            Check your email for a sign in link!
          </p>
        </div>
      )}
    </div>
  );
}
